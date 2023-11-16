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

export default function Checkout({ cart, navigation }) {
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState('');
  const [selectedShippingAddressOption, setSelectedShippingAddressOption] =
    useState('');

  const { data, loading, error, refetch } = useGetCustomerData();
  const { customerAccessToken } = useGetCustomerAccessToken();

  useEffect(() => {
    if (data) {
      setShippingAddress(data.customer?.shipping_addresses);
    }
  }, [data]);

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
        completeCart();
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
    const cart_id = storage.getString('cart_id');

    fetch(`${BASE_URL}/store/carts/${cart_id}/payment-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() =>
        fetch(`${BASE_URL}/store/carts/${cart_id}/payment-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider_id: 'manual',
          }),
        }),
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error initializing payment sessions:', error);
      });
  };

  useEffect(() => {
    fetchPaymentOption();
  }, []);

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

        <View style={styles.payment} />
        <View style={styles.shipping}>
          <Text style={styles.title}>Shipping Options</Text>
          {shippingOptions.map((option) => (
            <View style={styles.shippingOption} key={option.id}>
              <RadioButton
                onPress={() => setSelectedShippingOption(option.id)}
                key={option.id}
                selected={selectedShippingOption === option.id}
                children={option.name}
              />
            </View>
          ))}

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
