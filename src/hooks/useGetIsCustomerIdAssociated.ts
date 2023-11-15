import { BASE_URL } from '@app/constants/url';
import { useState, useEffect } from 'react';

const useGetIsCustomerIdAssociated = (cartId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/store/carts/${cartId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cart = await response.json();

      setData(cart.cart.customer_id);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { associatedCustomerId: data, loading, error, refetch: fetchData };
};

export default useGetIsCustomerIdAssociated;
