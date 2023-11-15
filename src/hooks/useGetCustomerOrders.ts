import { useState, useEffect } from 'react';
import { BASE_URL } from '@app/constants/url';
import storage from '@app/utils/storage';

const useGetCustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const customerAccessToken = storage.getString('jwt_token');

  useEffect(() => {
    fetch(`${BASE_URL}/store/customers/me/orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${customerAccessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { orders, loading, error };
};

export default useGetCustomerOrders;
