import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@app/components/Button';
import RadioButton from '@app/components/RadioButton';
import { BASE_URL } from '@app/constants/url';
import useGetCustomerData from '@app/hooks/useGetCustomerData';
import useGetCustomerAccessToken from '@app/hooks/useGetCustomerAccessToken';
import storage from '@app/utils/storage';
import SCREENS from '../../../Screens';
import styles from './styles';
import { CardField, confirmPayment } from '@stripe/stripe-react-native';

export default function Checkout({ navigation }) {
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState('');
  const [selectedShippingAddressOption, setSelectedShippingAddressOption] =
    useState('');

  const { data } = useGetCustomerData();
  const { customerAccessToken } = useGetCustomerAccessToken();

  useEffect(() => {
    if (data) {
      setShippingAddress(data.customer?.shipping_addresses);
    }
  }, [data]);

  const [paymentInfo, setPaymentInfo] = useState({});
  const [paymentSession, setPaymentSession] = useState({});

  const handlePaymentInputChange = (card) => {
    setPaymentInfo(card);
  };

  const completeCart = async () => {
    try {
      const cartId = storage.getString('cart_id');
      const response = await fetch(
        `${BASE_URL}/store/carts/${cartId}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Body: ${text}`,
        );
      }

      storage.delete('cart_id');
      const cartStorage = storage.getString('cart_id');

      if (!cartStorage) {
        Alert.alert('Order created successfully ');
        navigation.navigate(SCREENS.HOME, { cartUpdated: true });
      } else {
        Alert.alert('error creating order');
      }
    } catch (error) {
      console.error('Error completing cart:', error);
    }
  };
  const handlePayment = async () => {
    // Getting client secret from the payment session state
    const clientSecret = paymentSession.data
      ? paymentSession.data.client_secret
      : paymentSession.client_secret;

    const billingDetails = {
      email: data.customer.email,
      phone: selectedShippingAddressOption.phone,
      name:
        selectedShippingAddressOption.first_name +
        selectedShippingAddressOption.last_name,
      address: {
        city: selectedShippingAddressOption.city,
        country: selectedShippingAddressOption.country_code,
        line1: selectedShippingAddressOption.address_1,
        line2: selectedShippingAddressOption.address_2,
        postal_code: selectedShippingAddressOption.postal_code,
      },
    };
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });
    if (error) {
      console.log(error);
      Alert.alert('Payment failed', error);
    }
    if (paymentIntent) {
      Alert.alert('Payment successful');
      // Calling the complete cart function to empty the cart and redirect to the home screen
      completeCart();
    }
  };

  const placeOrder = async () => {
    const cart_id = await storage.getString('cart_id');

    const {
      company,
      first_name,
      last_name,
      address_1,
      address_2,
      city,
      country_code,
      province,
      postal_code,
      phone,
    } = selectedShippingAddressOption;

    const addressToSend = {
      company,
      first_name,
      last_name,
      address_1,
      address_2,
      city,
      country_code,
      province,
      postal_code,
      phone,
    };
    const selectedOption = getShippingOptionDetails(selectedShippingOption);
    if (selectedOption) {
      Alert.alert(
        'Order Confirmation',
        `The shipping cost of $${selectedOption.amount / 100} for ${
          selectedOption.name
        } has been added to your order.`,
      );
    }

    fetch(`${BASE_URL}/store/carts/${cart_id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shipping_address: addressToSend,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `HTTP error! Status: ${response.status}, Body: ${text}`,
            );
          });
        }

        return response.json();
      })
      .then(() => {
        return fetch(`${BASE_URL}/store/carts/${cart_id}/shipping-methods`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            option_id: selectedShippingOption,
          }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then(() => {
        // completeCart();
        handlePayment();
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  const fetchPaymentOption = async () => {
    const cart_id = storage.getString('cart_id');

    fetch(`${BASE_URL}/store/shipping-options/${cart_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setShippingOptions(data.shipping_options);

        InitializePaymentSessions();
      })
      .catch((error) => {
        console.error('Error fetching payment option:', error);
      });
  };

  const InitializePaymentSessions = async () => {
    // Getting cart id from storage
    const cart_id = storage.getString('cart_id');

    // Initializing payment session
    fetch(`${BASE_URL}/store/carts/${cart_id}/payment-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        return fetch(`${BASE_URL}/store/carts/${cart_id}/payment-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ provider_id: 'stripe' }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('data =>', data.cart.payment_session);
        setPaymentSession(data.cart.payment_session);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  useEffect(() => {
    fetchPaymentOption();
  }, []);
  const getShippingOptionDetails = (optionId) => {
    return shippingOptions.find((option) => option.id === optionId);
  };
  console.log('shhh', shippingOptions);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.address}>
          <Text style={styles.title}>Shipping Address</Text>

          {shippingAddress && shippingAddress.length > 0 ? (
            shippingAddress.map((node) => (
              <View style={styles.addressContainer} key={node.id}>
                <View style={styles.subAddressContainer}>
                  <RadioButton
                    onPress={() => setSelectedShippingAddressOption(node)}
                    key={node.id}
                    selected={selectedShippingAddressOption.id === node.id}
                  />
                  <Text style={styles.shippingAddressTitle}>
                    {`${node.first_name} ${node.last_name}`}
                  </Text>
                  <Text style={styles.shippingAddress}>
                    {node &&
                      [
                        node.address_1,
                        node.address_2,
                        node.country,
                        node.city,
                        node.province,
                        node.postal_code,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                  </Text>
                </View>
                <View styles={styles.addressBtnsContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate(SCREENS.NEW_SHIPPING_ADDRESS, {
                        screen: [SCREENS.SHIPPING_ADDRESS_DETAILS],
                        address: node,
                        customerAccessToken,
                      })
                    }
                  >
                    <Text style={styles.buttonTitle}>Update Address</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.addressContainer}>
              <View style={styles.subAddressContainer}>
                <Text style={styles.shippingTitle}>
                  You have no addresses assciated with your account. Please add
                  a new one!!
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.shipping}>
          <Text style={styles.title}>Shipping Options</Text>
          {shippingOptions.map((option) => (
            <View style={styles.shippingOption} key={option.id}>
              <RadioButton
                onPress={() => {
                  setSelectedShippingOption(option.id);
                  const selectedOption = getShippingOptionDetails(option.id);
                  if (selectedOption) {
                    Alert.alert(
                      'Selected Shipping Option',
                      `Name: ${selectedOption.name}, Charge: $${
                        selectedOption.amount / 100
                      }`, // Assuming the amount is in cents
                    );
                  }
                }}
                key={option.id}
                selected={selectedShippingOption === option.id}
                children={option.name}
              />
            </View>
          ))}
          <View style={styles.payment}>
            <Text style={styles.title}>Payment</Text>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                handlePaymentInputChange(cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log('focusField', focusedField);
              }}
            />
          </View>
          <Button
            onPress={placeOrder}
            large
            title="Place Order"
            disabled={!selectedShippingAddressOption || !selectedShippingOption}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
