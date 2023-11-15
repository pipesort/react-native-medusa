import {BASE_URL} from '@app/constants/url';
import {useState, useEffect} from 'react';

const useGetProduct = (productId: string) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      fetch(`${BASE_URL}/store/products/${productId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setProduct(data.product);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [productId]);

  return {product, loading, error};
};

export default useGetProduct;
