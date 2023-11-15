/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { hasNotch } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Platform, StyleSheet } from 'react-native';
import SCREENS from '../Screens';
import Home from '@app/screens/Home';
import AccountSettings from '@app/screens/AccountSettings';
import { colors } from '@app/theme';
import Cart from './screens/Cart';
import useGetCustomerId from './hooks/useGetCustomerId';
import { BASE_URL } from './constants/url';

import useGetRegionId from './hooks/useGetRegion';
import useGetCartId from './hooks/useGetCartId';

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  barStyle: {
    height: 84,
    backgroundColor: colors.white,
    padding: 0,
    borderColor: '#9e9e9e',
    borderWidth: 1,
    justifyContent:
      Platform.OS === 'ios' ? (hasNotch() ? 'flex-start' : 'center') : 'center',
  },
});

const BottomTabNavigator = ({ route }: any) => {
  const { data } = useGetCustomerId();

  const { cartId } = useGetCartId();

  const addCustomerIdToCart = async (cartId, customerId) => {
    try {
      const response = await fetch(`${BASE_URL}/store/carts/${cartId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Body: ${text}`,
        );
      }

      const updatedCart = await response.json();

      console.dir('Cart updated with customer ID:', updatedCart);
    } catch (error) {
      console.error('Error adding customer ID to cart:', error);
    }
  };

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      activeColor={colors.primary}
      inactiveColor={colors.tertiary}
      shifting={false}
      barStyle={styles.barStyle}
      labeled={false}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntIcon name="home" color={color} size={22} focused={focused} />
          ),
          tabBarColor: 'white',
        }}
      />

      <Tab.Screen
        name={SCREENS.CART}
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cart-outline" color={color} size={22} />
          ),
          tabBarColor: 'white',
          header: {
            visible: true,
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (cartId && data) {
              addCustomerIdToCart(cartId, data)
                .then(() => {
                  navigation.navigate(SCREENS.CART);
                })
                .catch((error) => {
                  console.error('Error in addCustomerIdToCart:', error);
                });
            } else {
              navigation.navigate(SCREENS.CART);
            }
          },
        })}
      />
      <Tab.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          tabBarIcon: ({ color }) => (
            <AntIcon name="user" color={color} size={22} />
          ),
          tabBarColor: 'white',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
