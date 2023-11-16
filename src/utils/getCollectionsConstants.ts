import SCREENS from '../../Screens';

export const NO_OF_PRODUCTS_TO_GET = 6;
export const NO_OF_LOADING_SKELETEONS_TO_SHOW = 6;
export const ON_END_REACHED_THRESHOLD = 0.5;

const getCollectionsConstants = ({ route }) => {
  let noOfProductsToGet = NO_OF_PRODUCTS_TO_GET;
  let onEndReachedThreshold = ON_END_REACHED_THRESHOLD;

  if (
    route?.name &&
    (route.name === SCREENS.NEW ||
      route.name === SCREENS.HIGHEST_PRICE_PRODUCTS ||
      route.name === SCREENS.LOWEST_PRICE_PRODUCTS)
  ) {
    noOfProductsToGet = 6;
    onEndReachedThreshold = 0.7;
  }

  return {
    NO_OF_PRODUCTS_TO_GET: noOfProductsToGet,
    ON_END_REACHED_THRESHOLD: onEndReachedThreshold,
  };
};

export default getCollectionsConstants;
