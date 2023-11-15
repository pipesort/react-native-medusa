import React, {memo, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import isEmpty from 'lodash/isEmpty';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import SwiperFlatList from 'react-native-swiper-flatlist';

import LogoImg from '@app/assets/images/top_bar.png';

import SCREENS from '../../../Screens';
import Section from './Section';
import styles from './styles';
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
      product: {id: productIds[index]},
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
        const lowestPriceA = getLowestPrice(a.variants);
        const lowestPriceB = getLowestPrice(b.variants);
        return lowestPriceA - lowestPriceB; // For ascending order
      });

      // Sort by highest price
      const sortedByHighestPrice = [...collection.products].sort((a, b) => {
        const highestPriceA = getHighestPrice(a.variants);
        const highestPriceB = getHighestPrice(b.variants);
        return highestPriceB - highestPriceA; // For descending order
      });

      setProductsSortedByLowestPrice(sortedByLowestPrice);
      setProductsSortedByHighestPrice(sortedByHighestPrice);
    }
  }, [collection]);

  const getLowestPrice = (variants: any) => {
    return variants.reduce((lowest: any, variant: any) => {
      const lowestVariantPrice = Math.min(
        ...variant.prices.map(price => price.amount),
      );
      return lowest === null
        ? lowestVariantPrice
        : Math.min(lowest, lowestVariantPrice);
    }, null);
  };

  const getHighestPrice = (variants: any) => {
    return variants.reduce((highest: any, variant: any) => {
      const highestVariantPrice = Math.max(
        ...variant.prices.map(price => price.amount),
      );
      return highest === null
        ? highestVariantPrice
        : Math.max(highest, highestVariantPrice);
    }, null);
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
              paginationStyleItem={styles.dotStyle}>
              {images.map((image: any, index: any) => (
                <TouchableOpacity
                  style={styles.slideImageView}
                  key={index}
                  onPress={() => navigateTo(index)}>
                  <Image source={{uri: image}} style={styles.carouselImage} />
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
