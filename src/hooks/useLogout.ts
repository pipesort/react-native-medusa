import { useState } from 'react';

import { BASE_URL } from '@app/constants/url';
import storage from '@app/utils/storage';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);

    try {
      const accessToken = storage.getString('jwt_token');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      // Make the DELETE request to the logout endpoint
      const response = await fetch(`${BASE_URL}/store/auth`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Logout request failed with status: ${response.status}`,
        );
      }

      storage.delete('jwt_token');
    } catch (err) {
      setError(err.message || 'Failed to logout.');
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    error,
  };
};

export default useLogout;
