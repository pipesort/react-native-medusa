/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SCREENS from './Screens';
import React from 'react';
import { Platform } from 'react-native';
import { LastSelectedProductSizeProvider } from '@app/components/LastSelectedProductSizeProvider';

import Product from '@app/screens/Product';
import { IOSBackButton, AndroidBackButton } from '@app/components/BackButton';
import Login from '@app/screens/Login';
import SignUp from '@app/screens/SignUp';
import InitialScreen from '@app/screens/InitialScreen';
import ShippingAddressDetails from './src/screens/AccountSettings/ShippingAddress';
import colors from '@app/theme/colors';
import fonts from '@app/theme/fonts';
import NewShippingAddress from '@app/screens/NewShippingAddress';
import Checkout from '@app/screens/Checkout';

import HighestPriceProducts from '@app/screens/HighestPriceProducts';
import LowestPriceProducts from '@app/screens/LowestPriceProducts';
import OrdersHistory from '@app/screens/AccountSettings/Orders';
import NewProducts from '@app/screens/NewProducts';
import BottomTabNavigator from '@app/BottomTabNavigator';

const generalScreenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const screenOptionsWithCustomBackBtn = Platform.select({
  ios: {
    ...generalScreenOptions,
    headerLeft: ({ onPress }) => (
      <IOSBackButton onPress={onPress} title={undefined} />
    ),
    headerTitleStyle: {
      textTransform: 'uppercase',
      color: colors.secondary,
      fontWeight: '500',
      fontSize: fonts.regular,
      fontFamily: 'Oswald-Medium',
    },
  },
  android: {
    ...generalScreenOptions,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      textTransform: 'uppercase',
      color: colors.secondary,
      fontWeight: '500',
      fontSize: fonts.regular,
      fontFamily: 'Oswald-Medium',
    },
  },
  default: {
    ...generalScreenOptions,
  },
});

function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <LastSelectedProductSizeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={SCREENS.INITIAL}>
          <Stack.Screen
            name={SCREENS.BOTTOM_TAB_NAVIGATOR}
            component={BottomTabNavigator}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={SCREENS.PRODUCT}
            component={Product}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: true,
              headerTitle: '',
              headerBackTitle: '',
              headerLeft: ({ onPress }) =>
                Platform.OS === 'ios' ? (
                  <IOSBackButton onPress={onPress} title={undefined} />
                ) : (
                  <AndroidBackButton onPress={onPress} title={undefined} />
                ),
              // headerShown: false
            }}
          />
          <Stack.Screen
            name={SCREENS.SIGNUP}
            component={SignUp}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={SCREENS.LOGIN}
            component={Login}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={SCREENS.INITIAL}
            component={InitialScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={SCREENS.SHIPPING_ADDRESS_DETAILS}
            component={ShippingAddressDetails}
            options={screenOptionsWithCustomBackBtn}
          />
          <Stack.Screen
            name={SCREENS.NEW_SHIPPING_ADDRESS}
            component={NewShippingAddress}
          
            options={screenOptionsWithCustomBackBtn}
          />
          <Stack.Screen
            name={SCREENS.CHECKOUT}
            component={Checkout}
       
            options={screenOptionsWithCustomBackBtn}
          />
          <Stack.Screen
            name={SCREENS.ORDERS_HISTORY}
            component={OrdersHistory}
            options={screenOptionsWithCustomBackBtn}
          />
          <Stack.Screen
            name={SCREENS.LOWEST_PRICE_PRODUCTS}
            component={LowestPriceProducts}
            options={screenOptionsWithCustomBackBtn}
          />
          <Stack.Screen
            name={SCREENS.HIGHEST_PRICE_PRODUCTS}
            component={HighestPriceProducts}
            options={screenOptionsWithCustomBackBtn}
          />
          <Stack.Screen
            name={SCREENS.NEW}
            component={NewProducts}
            options={screenOptionsWithCustomBackBtn}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LastSelectedProductSizeProvider>
  );
}

export default App;
