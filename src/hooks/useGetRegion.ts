import { useState, useEffect } from 'react';
import { BASE_URL } from '@app/constants/url';
import storage from '@app/utils/storage';

const useGetRegionId = () => {
  const [regionId, setRegionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const REGION = 'NA';

  useEffect(() => {
    fetch(`${BASE_URL}/store/regions`, {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const region = data.regions.find((r) => r.name === REGION);
        if (region) {
          setRegionId(region.id); // Set the ID of the found region
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching regions:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const saveRegionId = () => {
      try {
        const existingRegionId = storage.getString('region_id');
        if (!existingRegionId && regionId) {
          storage.set('region_id', regionId);
        }
      } catch (error) {
        console.error('Error accessing Storage:', error);
      }
    };

    saveRegionId();
  }, [regionId]);

  return { regionId, loading, error };
};

export default useGetRegionId;
