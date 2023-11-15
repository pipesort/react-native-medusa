import { useState, useEffect } from 'react';

import storage from '@app/utils/storage';

const useGetCustomerAccessToken = () => {
  const [customerAccessToken, setCustomerAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCustomerAccessToken = () => {
      try {
        const token = storage.getString('jwt_token');
        if (token) {
          setCustomerAccessToken(token);
        } else {
          setCustomerAccessToken(null);
        }
      } catch (error) {
        console.error('AsyncStorage Error', error);
        setError('Failed to retrieve token from storage.');
      } finally {
        setIsLoading(false); // Set loading to false regardless of outcome
      }
    };

    getCustomerAccessToken();
  }, []);

  return { customerAccessToken, error, isLoading };
};

export default useGetCustomerAccessToken;
