import React, { memo, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import isEmpty from 'lodash/isEmpty';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import SwiperFlatList from 'react-native-swiper-flatlist';

import LogoImg from '@app/assets/images/top_bar.png';

import SCREENS from '../../../Screens';
import Section from './Section';
import styles from './styles';
import CURRENCY_CODE from '@app/utils/currency';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Home = ({
  collection,
  loading,
  navigation,
  images,
  productIds,
  loadingCollection,
}: any) => {
  const navigateTo = (index: any) => {
    navigation.navigate(SCREENS.PRODUCT, {
      product: { id: productIds[index] },
    });
  };

  const [newProducts, setNewProducts] = useState<any>([]);

  useEffect(() => {
    if (collection && collection.products) {
      const sorted = [...collection.products].sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA;
      });
      setNewProducts(sorted);
    }
  }, [collection]);

  const [productsSortedByLowestPrice, setProductsSortedByLowestPrice] =
    useState<any>([]);
  const [productsSortedByHighestPrice, setProductsSortedByHighestPrice] =
    useState<any>([]);

  useEffect(() => {
    if (collection && collection.products) {
      // Sort by lowest price
      const sortedByLowestPrice = [...collection.products].sort((a, b) => {
        const lowestPriceA = getLowestPrice(a.variants, CURRENCY_CODE);
        const lowestPriceB = getLowestPrice(b.variants, CURRENCY_CODE);
        return lowestPriceA - lowestPriceB; // For ascending order
      });

      // Sort by highest price
      const sortedByHighestPrice = [...collection.products].sort((a, b) => {
        const highestPriceA = getHighestPrice(a.variants, CURRENCY_CODE);
        const highestPriceB = getHighestPrice(b.variants, CURRENCY_CODE);
        return highestPriceB - highestPriceA; // For descending order
      });

      setProductsSortedByLowestPrice(sortedByLowestPrice);
      setProductsSortedByHighestPrice(sortedByHighestPrice);
    }
  }, [collection]);
  const getLowestPrice = (variants: any, currencyCode: string) => {
    let lowest = null;

    variants.forEach((variant) => {
      // Filter the prices for the current variant based on the specified currency code
      const filteredPrices = variant.prices.filter(
        (price) => price.currency_code === currencyCode,
      );

      if (filteredPrices.length > 0) {
        // Find the lowest price for the current variant
        const lowestVariantPrice = Math.min(
          ...filteredPrices.map((price) => price.amount),
        );

        // Update the overall lowest price if necessary
        if (lowest === null || lowestVariantPrice < lowest) {
          lowest = lowestVariantPrice;
        }
      }
    });

    return lowest;
  };

  const getHighestPrice = (variants: any, currencyCode: string) => {
    let highest = null;

    variants.forEach((variant) => {
      // Filter the prices for the current variant based on the specified currency code
      const filteredPrices = variant.prices.filter(
        (price) => price.currency_code === currencyCode,
      );

      if (filteredPrices.length > 0) {
        // Find the highest price for the current variant
        const highestVariantPrice = Math.max(
          ...filteredPrices.map((price) => price.amount),
        );

        // Update the overall highest price if necessary
        if (highest === null || highestVariantPrice > highest) {
          highest = highestVariantPrice;
        }
      }
    });

    return highest;
  };

  return (
    <SafeAreaView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScrollView>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.logoContainer}>
          <Image source={LogoImg} resizeMode="contain" style={styles.logo} />
        </View>
        {loadingCollection ? (
          <ShimmerPlaceholder
            width={wp('100%')}
            height={250}
            shimmerStyle={{
              alignSelf: 'center',
            }}
            visible={false}
          />
        ) : !isEmpty(images) ? (
          <View style={styles.coverImageContainer}>
            <SwiperFlatList
              autoplay
              autoplayDelay={4}
              autoplayLoop
              showPagination
              index={0}
              paginationActiveColor="black"
              paginationStyleItem={styles.dotStyle}
            >
              {images.map((image: any, index: any) => (
                <TouchableOpacity
                  style={styles.slideImageView}
                  key={index}
                  onPress={() => navigateTo(index)}
                >
                  <Image source={{ uri: image }} style={styles.carouselImage} />
                </TouchableOpacity>
              ))}
            </SwiperFlatList>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.body}>
          <Section
            navigation={navigation}
            title="NEW"
            collection={collection && newProducts}
            loading={loading}
            screen={SCREENS.NEW}
            sortKey="CREATED_AT"
            reverse
          />

          <Section
            navigation={navigation}
            title="LOWEST PRICE"
            collection={collection && productsSortedByLowestPrice}
            loading={loading}
            screen={SCREENS.LOWEST_PRICE_PRODUCTS}
            sortKey="PRICE"
            reverse={false}
          />
          <Section
            navigation={navigation}
            title="HIGHEST PRICE"
            collection={collection && productsSortedByHighestPrice}
            loading={loading}
            screen={SCREENS.HIGHEST_PRICE_PRODUCTS}
            sortKey="PRICE"
            reverse
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Home);
