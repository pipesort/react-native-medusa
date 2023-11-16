// import {BASE_URL} from '@app/constants/url';
// import {useState, useCallback, useEffect} from 'react';

// export const useCollections = ({initialLimit = 5}) => {
//   const [collection, setCollection] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [totalItems, setTotalItems] = useState(0);
//   const [offset, setOffset] = useState(0);

//   const loadProducts = useCallback(async () => {
//     if (isLoading || (totalItems !== 0 && collection.length >= totalItems))
//       return;

//     setIsLoading(true);
//     console.log(`Loading products: offset=${offset}, limit=${initialLimit}`);

//     try {
//       const response = await fetch(
//         `${BASE_URL}/store/products?limit=${initialLimit}&offset=${offset}`,
//       );
//       if (!response.ok) throw new Error('Network response was not ok.');

//       const data = await response.json();
//       setCollection(prev => [...prev, ...data.products]);
//       setTotalItems(data.count);
//       setOffset(prevOffset => prevOffset + data.products.length);

//       console.log(
//         `Fetched ${data.products.length} products, total: ${data.count}`,
//       );
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [initialLimit, offset, isLoading, totalItems]);

//   useEffect(() => {
//     if (collection.length === 0) {
//       loadProducts();
//     }
//   }, [loadProducts]);

//   return {
//     collection,
//     isLoading,
//     loadMoreProducts: loadProducts,
//     hasNextPage: collection.length < totalItems,
//   };
// };

import { BASE_URL } from '@app/constants/url';
import { useState, useCallback, useEffect } from 'react';
import SCREENS from '../../Screens';
export const useCollections = ({ initialLimit = 5, screenName }) => {
  const [collection, setCollection] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);

  const getApiUrl = () => {
    switch (screenName) {
      case SCREENS.NEW:
        return `${BASE_URL}/store/products?limit=${initialLimit}&offset=${offset}`;
      case SCREENS.LOWEST_PRICE_PRODUCTS:
        //  initialLimit + 3 has to be add as for this case it results less data , do not remove this
        return `${BASE_URL}/store/products?limit=${
          initialLimit + 3
        }&offset=${offset}&order=variants.prices.amount`;
      case SCREENS.HIGHEST_PRICE_PRODUCTS:
        // return `${BASE_URL}/store/products?limit=${initialLimit}&offset=${offset}&order=-variants.prices.amount`; 
        return `${BASE_URL}/store/products?limit=${initialLimit}&offset=${offset}`;
      default:
        return `${BASE_URL}/store/products?limit=${initialLimit}&offset=${offset}`;
    }
  };

  const loadProducts = useCallback(async () => {
    if (isLoading || (totalItems !== 0 && collection.length >= totalItems))
      return;

    setIsLoading(true);

    try {
      const apiUrl = getApiUrl();
      console.log(`Loading products from: ${apiUrl}`);

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok.');

      const data = await response.json();
      setCollection((prev) => [...prev, ...data.products]);
      setTotalItems(data.count);
      setOffset((prevOffset) => prevOffset + data.products.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initialLimit, offset, isLoading, totalItems, screenName]);

  useEffect(() => {
    if (collection.length === 0) {
      loadProducts();
    }
  }, [loadProducts]);

  console.log("offset",offset)

  return {
    collection,
    isLoading,
    loadMoreProducts: loadProducts,
    hasNextPage: collection.length < totalItems,
  };
};
