import React, {useEffect, useState} from 'react';

import Home from './Home';
import useGetAllCollections from '@app/hooks/useGetAllCollections';
import useCarousel from '@app/hooks/useCarousel';
import useGetAllProducts from '@app/hooks/useGetAllProducts';
import useGetRegionId from '@app/hooks/useGetRegion';

const HomeIndex = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const {data: collectionsData, loading: collectionLoading} =
    useGetAllCollections();

  const recommendationCollection = collectionsData?.collections.find(
    collection => collection.title.toLowerCase() === 'recommendation',
  );

  const recommendationCollectionId = recommendationCollection?.id;

  const {carouselData, carouselLoading, error} = useCarousel(
    recommendationCollectionId,
  );

  const {regionId} = useGetRegionId();

  const {data: productsData, loading: productsLoading} =
    useGetAllProducts(regionId);

  const carouselImages = carousel => {
    const imgs = carousel.products.map(prod => prod.images[0].url);
    return imgs;
  };

  const carouselImageId = (carousel: any) => {
    const productId = carousel.products.map(product => product.id);
    return productId;
  };
  useEffect(() => {
    if (carouselData?.products) {
      setImages(carouselImages(carouselData));
      setProductIds(carouselImageId(carouselData));
    }
  }, [carouselData?.products]);
  useEffect(() => {
    if (productsData) {
      setData(productsData);
    }
  }, [productsData]);

  return (
    <Home
      collection={data}
      loading={productsLoading}
      navigation={navigation}
      loadingCollection={carouselLoading}
      images={images}
      productIds={productIds}
    />
  );
};

export default HomeIndex;
