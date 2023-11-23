/* eslint-disable radix */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ImagePlaceHolder from '@app/components/ImagePlaceholder';

import SCREENS from '../../../Screens';

import styles from './styles';
import CURRENCY_CODE from '@app/utils/currency';

const Product = ({ item, navigation, type = 'Collection' }) => {
  let priceToShow = '';

  const getLowestPriceVariant = (variants) => {
    return variants.reduce((lowest, variant) => {
      const selectedCurrencyPrice = variant.prices.filter(
        (price) => price.currency_code === CURRENCY_CODE,
      );

      if (selectedCurrencyPrice.length === 0) {
        return lowest;
      }

      const variantLowestPrice = selectedCurrencyPrice.reduce(
        (prev, current) => {
          return prev.amount < current.amount ? prev : current;
        },
      );

      return !lowest || variantLowestPrice.amount < lowest.amount
        ? variantLowestPrice
        : lowest;
    }, null);
  };

  // Utility function to get the price in a formatted string
  const getFormattedPrice = (variants: any, currencyCode: any) => {
    const lowestPriceVariant = getLowestPriceVariant(variants);
    if (!lowestPriceVariant) {
      return 'No price available';
    }
    // Format the price as a currency
    const price = (lowestPriceVariant.amount / 100).toFixed(2); // Converts to a decimal with two digits
    return `$ ${price}`;
  };

  return (
    <View style={styles.product}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREENS.PRODUCT, {
            product: { ...item },
          })
        }
      >
        <View style={styles.imageWrapper}>
          <ImagePlaceHolder src={item.thumbnail} />
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.productDescription} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.price}>
            {getFormattedPrice(item.variants, CURRENCY_CODE)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Product);
