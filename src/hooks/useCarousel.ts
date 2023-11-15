import {BASE_URL} from '@app/constants/url';
import {useState, useEffect} from 'react';

const useCarousel = (collectionId?: string) => {
  const [carouselData, setCarouselData] = useState<any>(null);
  const [carouselLoading, setCarouselLoading] = useState<boolean>(true);
  const [carouselError, setCarouselError] = useState<Error | null>(null);

  useEffect(() => {
    if (!collectionId) {
      setCarouselLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        const params = new URLSearchParams({'collection_id[]': collectionId});
        const url = `${BASE_URL}/store/products?${params.toString()}`;

        setCarouselLoading(true);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (isMounted) {
          setCarouselData(result);
        }
      } catch (e) {
        if (isMounted) {
          setCarouselError(e instanceof Error ? e : new Error(e.toString()));
        }
      } finally {
        if (isMounted) {
          setCarouselLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [collectionId]);

  return {carouselData, carouselLoading, carouselError};
};

export default useCarousel;
