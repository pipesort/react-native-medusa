import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '@app/constants/url';
import storage from '@app/utils/storage';

const useGetCustomerData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerAccessToken, setCustomerAccessToken] = useState(null);

  useEffect(() => {
    const getCustomerAccessToken = async () => {
      try {
        // const token = await AsyncStorage.getItem('jwt_token');
        const token = storage.getString('jwt_token');
        if (token) {
          setCustomerAccessToken(token);
        } else {
          setCustomerAccessToken(null);
        }
      } catch (error) {
        console.error('AsyncStorage Error', error);
        setError('Failed to retrieve token from storage.');
      }
    };
    getCustomerAccessToken();
  }, []);

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
      setData(result);
    } catch (err) {
      console.error('Error fetching customer data:', err);
      setError(err.message || 'Failed to fetch customer data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [customerAccessToken]);

  const refetch = async () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useGetCustomerData;
