import { View, Text } from 'react-native';
import { useCallback, useState } from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import CartItem from '@app/components/CartItem';

import Button from '@app/components/Button';
import { BASE_URL } from '@app/constants/url';

import useGetCustomerId from '@app/hooks/useGetCustomerId';
import useGetCustomerAccessToken from '@app/hooks/useGetCustomerAccessToken';
import storage from '@app/utils/storage';
import SCREENS from '../../../Screens';
import styles from './styles';

export default function Cart({ navigation }) {
  const [cart, setCart] = useState([]);
  const { customerAccessToken } = useGetCustomerAccessToken();

  const { data } = useGetCustomerId();
  const cartIdInside = storage.getString('cart_id');

  const fetchCart = async () => {
    const cartId = storage.getString('cart_id');
    if (!cartId) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/store/carts/${cartId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const cartData = await response.json();
      setCart(cartData.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const deleteCartItem = async (cartId, lineItemId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/store/carts/${cartId}/line-items/${lineItemId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchCart(); // Fetch the updated cart after deleting an item
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      async function fetchAndUpdateCart() {
        const storedCartId = storage.getString('cart_id');

        const customerId = data;

        if (storedCartId) {
          await fetchCart();
          if (customerId) {
            await addCustomerIdToCart(customerId);
          }
        } else {
          setCart([]);
        }
      }

      fetchAndUpdateCart();
    }, [cartIdInside, data]),
  );

  const addCustomerIdToCart = async (customerId) => {
    const cartId = storage.getString('cart_id');
    if (!cartId) {
      return;
    }
    const region_id = storage.getString('region_id');

    try {
      const response = await fetch(`${BASE_URL}/store/carts/${cartId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          region_id,
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {cart?.items?.map((product) => (
          <CartItem
            product={product}
            deleteCartItem={deleteCartItem}
            key={product.id}
          />
        ))}
      </ScrollView>

      <View>
        <View style={styles.row}>
          <Text style={styles.cartTotalText}>Items</Text>

          <Text
            style={[
              styles.cartTotalText,
              {
                color: '#4C4C4C',
              },
            ]}
          >
            ${cart?.total ? (cart.total / 100).toFixed(2) : '0.00'}
          </Text>
        </View>
        <View style={styles.row}>
          {/* Showing the discount (if any) */}
          <Text style={styles.cartTotalText}>Discount</Text>
          <Text
            style={[
              styles.cartTotalText,
              {
                color: '#4C4C4C',
              },
            ]}
          >
            - $
            {cart?.discount_total
              ? (cart.discount_total / 100).toFixed(2)
              : '0.00'}
          </Text>
        </View>
        <View style={[styles.row, styles.total]}>
          <Text style={styles.cartTotalText}>Total</Text>
          <Text
            style={[
              styles.cartTotalText,
              {
                color: '#4C4C4C',
              },
            ]}
          >
            {/* Calculating the total */}$
            {cart?.total && cart?.discount_total
              ? ((cart.total - cart.discount_total) / 100).toFixed(2)
              : cart?.total
                ? (cart.total / 100).toFixed(2)
                : '0.00'}
          </Text>
        </View>
        <View>
          <Button
            large
            onPress={() => {
              navigation.navigate(SCREENS.CHECKOUT);
            }}
            disabled={!(cart?.items?.length > 0 && customerAccessToken)}
            title={cart?.items?.length > 0 ? 'Checkout' : 'Empty Cart'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
