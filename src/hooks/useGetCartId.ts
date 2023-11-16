import { useState, useEffect } from 'react';
import storage from '@app/utils/storage';

const useGetCartId = () => {
  const [cartId, setCartId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCartId = () => {
      try {
        const cart_id = storage.getString('cart_id');
        if (cart_id) {
          setCartId(cart_id);
        } else {
          setCartId(null);
        }
      } catch (error) {
        console.error('Storage Error', error);
        setError('Failed to retrieve cart id from storage.');
      }
    };

    getCartId();
  }, []);

  return { cartId, error };
};

export default useGetCartId;
