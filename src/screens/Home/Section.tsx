import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import SCREENS from '../../../Screens';
import Skeleton from './Skeleton';
import SectionTitle from './SectionTitle';

import styles from './styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Section = ({
  navigation,
  title,
  collection,
  loading,
  screen,
  sortKey,
  reverse,
}: any) => {
  const [imgVisible, setImgVisible] = useState(false);
  const products = collection;

  const getLowestPriceVariant = variants => {
    return variants.reduce((lowest, variant) => {
      const variantLowestPrice = variant.prices.reduce((prev, current) => {
        return prev.amount < current.amount ? prev : current;
      });
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

  // Constant for the currency code
  const CURRENCY_CODE = 'usd';

  return (
    <>
      <View style={styles.linksContainer}>
        <SectionTitle
          navigation={navigation}
          title={title}
          navigateTo={screen}
          sortKey={sortKey}
          reverse={reverse}
        />
        {loading || !collection ? (
          <Skeleton />
        ) : (
          <ScrollView
            style={styles.imageContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {products &&
              products.map((product: any, index: any) => (
                <View
                  style={{
                    ...styles.imageView,
                    marginLeft: index === 0 ? wp('7.71%') : 0,
                  }}
                  key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(SCREENS.PRODUCT, {
                        product: {
                          ...product,
                        },
                      })
                    }>
                    <ShimmerPlaceholder
                      width={wp('43.7%')}
                      height={hp('16%')}
                      shimmerStyle={{
                        marginBottom: hp('4%'),
                      }}
                      visible={imgVisible}>
                      <FastImage
                        source={{uri: product.images[0].url}}
                        resizeMode="contain"
                        style={styles.image}
                        onLoadEnd={() => setImgVisible(true)}
                      />
                    </ShimmerPlaceholder>
                    <View style={styles.descriptionContainer}>
                      <Text numberOfLines={2}>{product.title}</Text>

                      <Text style={styles.productPriceDescription}>
                        {getFormattedPrice(product.variants, CURRENCY_CODE)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default Section;
