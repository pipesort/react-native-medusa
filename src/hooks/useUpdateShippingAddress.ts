import { useState } from 'react';
import { BASE_URL } from '@app/constants/url';

const useUpdateShippingAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const updateShippingAddress = async (accessToken, addressId, addressData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/store/customers/me/addresses/${addressId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addressData),
        },
      );

      const responseData = await response.json();
      if (response.ok) {
        setResponse(responseData);
      } else {
        throw new Error(
          responseData.message || 'Failed to update the shipping address',
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateShippingAddress, isLoading, error, response };
};

export default useUpdateShippingAddress;
