import {BASE_URL} from '@app/constants/url';
import {useState, useEffect} from 'react';

const useGetAllProducts = regionId => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/store/products?region_id=${regionId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      setData(products);
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

  return {data, loading, error, refetch: fetchData};
};

export default useGetAllProducts;
