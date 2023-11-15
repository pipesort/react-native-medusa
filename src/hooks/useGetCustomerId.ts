import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '@app/constants/url';
import useGetCustomerAccessToken from './useGetCustomerAccessToken';

const useGetCustomerId = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { customerAccessToken } = useGetCustomerAccessToken();

  const fetchData = async () => {
    if (!customerAccessToken) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/store/customers/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${customerAccessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Data fetch failed with status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.customer.id);
    } catch (err) {
      console.error('Error fetching customer data:', err);
      setError(err.message || 'Failed to fetch customer data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [customerAccessToken, data]);

  return {
    data,
    loading,
    error,
  };
};

export default useGetCustomerId;
