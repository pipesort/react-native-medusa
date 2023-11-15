import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

import Loader from '@app/components/Loader';

import useGetCustomerData from '@app/hooks/useGetCustomerData';
import useGetCustomerAccessToken from '@app/hooks/useGetCustomerAccessToken';
import SCREENS from '../../../../Screens';

import styles from './styles';

const ShippingAddress = ({ navigation, route }) => {
  const [customerData, setCustomerData] = useState(null);

  const { data, loading, error, refetch } = useGetCustomerData();

  useEffect(() => {
    if (data) {
      setCustomerData(data);
    }
  }, [data]);

  const [hasRefetched, setHasRefetched] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Check if the update has occurred
      if (route.params?.addressUpdated) {
        refetch(); // Refetch the updated data
        navigation.setParams({ addressUpdated: false }); // Reset the flag
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, route.params]);

  const { customerAccessToken } = useGetCustomerAccessToken();

  const addresses = customerData?.customer?.shipping_addresses;

  if (loading) {
    return (
      <View style={styles.container}>
        <Loader loadingText="Getting your shipping addresses..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            navigation.navigate(SCREENS.NEW_SHIPPING_ADDRESS, {
              screen: [SCREENS.SHIPPING_ADDRESS_DETAILS],
              customerAccessToken,
              addNewAddress: true,
            })
          }
        >
          <Text style={styles.addBtnTitle}>Add New Address +</Text>
        </TouchableOpacity>
        {addresses && addresses.length > 0 ? (
          addresses.map((node) => (
            <View style={styles.addressContainer} key={node.id}>
              <View style={styles.subAddressContainer}>
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
                You have no addresses assciated with your account. Please add a
                new one!!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ShippingAddress;
