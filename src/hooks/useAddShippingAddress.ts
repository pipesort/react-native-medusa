import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '@app/constants/url';
import storage from '@app/utils/storage';
import useGetCustomerAccessToken from './useGetCustomerAccessToken';

const useAddShippingAddress = () => {
  const [addShippingAddressLoading, setAddShippingAddressLoading] =
    useState(false);
  const [addShippingAddressError, setAddShippingAddressError] =
    useState<any>(null);
  const [addShippingAddressResponse, setAddShippingAddressResponse] =
    useState(null);

  const { customerAccessToken } = useGetCustomerAccessToken();

  const addAddress = useCallback(
    async (addressData) => {
      if (!customerAccessToken) {
        setAddShippingAddressError('No access token available.');
        return;
      }

      setAddShippingAddressLoading(true);
      setAddShippingAddressError(null);
      setAddShippingAddressResponse(null);

      try {
        const response = await fetch(
          `${BASE_URL}/store/customers/me/addresses`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${customerAccessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: addressData }),
          },
        );

        const data = await response.json();
        setAddShippingAddressResponse(data);

        if (!response.ok) {
          throw new Error(
            data?.error || 'An error occurred while updating the address',
          );
        }
      } catch (err) {
        console.error('Error in addAddress:', err);
        setAddShippingAddressError(err.message);
      } finally {
        setAddShippingAddressLoading(false);
      }
    },
    [customerAccessToken],
  );

  return {
    addAddress,
    addShippingAddressLoading,
    addShippingAddressError,
    addShippingAddressResponse,
  };
};

export default useAddShippingAddress;
