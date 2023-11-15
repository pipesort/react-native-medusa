import { useState } from 'react';
import { BASE_URL } from '@app/constants/url';

const useLogin = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/store/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMsg = `Token request failed with status: ${response.status}`;
        throw new Error(errorMsg);
      }

      const data = await response.json();

      setAccessToken(data.access_token); // Assuming the token is in the 'access_token' field
    } catch (err) {
      setError(err.message || 'Failed to get access token.');
    } finally {
      setLoading(false);
    }
  };
  const getCustomerId = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/store/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMsg = `Token request failed with status: ${response.status}`;
        throw new Error(errorMsg);
      }

      const data = await response.json();

      setCustomerId(data.customer.id);
    } catch (err) {
      setError(err.message || 'Failed to get access token.');
    }
  };

  return {
    getAuthToken,
    accessToken,
    loading,
    error,
    setError,
    customerId,
    getCustomerId,
  };
};

export default useLogin;
