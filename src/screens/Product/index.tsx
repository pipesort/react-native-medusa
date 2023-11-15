import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  Vibration,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import isEmpty from 'lodash/isEmpty';

import { lastSelectedProductSizeContext } from '@app/components/LastSelectedProductSizeProvider';

import { BASE_URL } from '@app/constants/url';
import useGetProduct from '@app/hooks/useGetProduct';
import useGetCustomerAccessToken from '@app/hooks/useGetCustomerAccessToken';

import storage from '@app/utils/storage';
import SCREENS from '../../../Screens';

import LoginModal from './LoginModal';

import HorizontalScrollPicker from './HorizontalScrollPicker';

import styles from './styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Product = ({ navigation, route }) => {
  const lastSelectedProductSize = useContext(lastSelectedProductSizeContext);
  const productId = route.params && route.params.product.id;

  const getCartId = () => {
    fetch(`${BASE_URL}/store/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          const text = response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Body: ${text}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        storage.set('cart_id', data.cart.id);
      })
      .catch((error) => {
        console.error('Error creating cart:', error);
      });
  };

  const checkCartId = () => {
    const cartId = storage.getString('cart_id');
    if (!cartId) {
      getCartId();
    }
  };
  useEffect(() => {
    checkCartId();
  }, []);

  const { product: productData, loading: productLoading } =
    useGetProduct(productId);

  const [modalVisible, setModalVisible] = useState(false);

  const [availableVariants, setAvailableVariants] = useState([]);
  const [totalSizes, setSizes] = useState([]);
  const [selected, setSelected] = useState(0);

  const { customerAccessToken } = useGetCustomerAccessToken();

  // Functions

  const getSizes = (variants) => {
    const sizes = variants.map((size) => size.title);
    return sizes;
  };
  const getSelectedSizeIndex = (sizes) => {
    if (route.params.product.selectedVariant) {
      return sizes.indexOf(route.params.product.selectedVariant);
    }
    if (isEmpty(lastSelectedProductSize.lastSelectedProductSize)) {
      return null;
    }

    const indexOfLastSelectedProductSize = sizes.indexOf(
      lastSelectedProductSize.lastSelectedProductSize,
    );

    if (indexOfLastSelectedProductSize !== -1) {
      return indexOfLastSelectedProductSize;
    }

    return null;
  };

  const getInitialIndex = (sizes, index) => {
    if (!isNaN(index)) {
      return index;
    }
    if (sizes.length === 3) {
      return 1;
    }
    if (sizes.length > 3) {
      return 2;
    }
    return 0;
  };

  const getSizesData = () => {
    const availableSizes =
      availableVariants && availableVariants.map((variant) => variant.title);
    if (totalSizes) {
      const sizes = totalSizes.map((size, idx) => ({
        label: size,
        value: idx,
        isAvailable: !!availableSizes.includes(size),
      }));
      return sizes;
    }
    return '';
  };

  useEffect(() => {
    if (productData) {
      const variants = productData.variants;
      const sizes = getSizes(variants);
      setSizes(sizes);
      const index = getSelectedSizeIndex(sizes);
      setAvailableVariants(variants);
      if (index !== null) {
        setSelected(getInitialIndex(sizes, index));
      } else {
        let newSelected = 0;

        if (sizes?.length === 3) {
          newSelected = 1;
        } else if (sizes?.length > 3) {
          newSelected = 2;
        }

        setSelected(newSelected);
      }
    }
  }, [productData]);

  const productImages = () => {
    if (productData) {
      const urls = productData?.images.map((img) => img.url);
      return urls;
    }
    return null;
  };

  const addToCart = async (variant) => {
    const cartId = storage.getString('cart_id');
    const variantId = variant.id;

    fetch(`${BASE_URL}/store/carts/${cartId}/line-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variant_id: variantId,
        quantity: 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        alert(`Item ${productData.title} added to cart`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSelectByNow = () => {
    const customerToken = storage.getString('jwt_token');

    if (!customerToken) {
      setModalVisible(true);
    } else {
      const variant = availableVariants.find(
        (availableVariant) => availableVariant.title === totalSizes[selected],
      );

      addToCart(variant);
    }
  };

  const onClickLogin = () => {
    setModalVisible(false);
    navigation.navigate(SCREENS.LOGIN, { screen: { name: 'productScreen' } });
  };
  const onClickSignUp = () => {
    setModalVisible(false);
    navigation.navigate(SCREENS.SIGNUP, { screen: { name: 'productScreen' } });
  };

  const handleChange = (sizeSelected) => {
    Vibration.vibrate(100);

    const currentSizeSelectedIndex = sizeSelected.value;
    const currentSizeSelectedLabel = sizeSelected.label;

    setSelected(currentSizeSelectedIndex);

    lastSelectedProductSize.setLastSelectedProductSize(
      currentSizeSelectedLabel,
    );
  };

  const isVariantAvailable = (variants, selectedSize) =>
    variants.some(
      (variant) =>
        variant.title === selectedSize && variant.inventory_quantity > 0,
    );
  const isSelectedSizeAvailable = () => {
    if (isEmpty(availableVariants)) {
      return null;
    }

    return isVariantAvailable(availableVariants, totalSizes[selected]);
  };

  const getPrice = () => {
    if (isEmpty(availableVariants)) {
      return ' ';
    }

    const variant = availableVariants.find(
      (availableVariant) => availableVariant.title === totalSizes[selected],
    );

    // here as we have selected us region as default
    const CURRENCY_CODE = 'usd';
    const priceObject = variant.prices.find(
      (price) => price.currency_code === CURRENCY_CODE,
    );

    // Calculate the amount if the price object is found
    let amount;
    if (priceObject) {
      amount = (priceObject.amount / 100).toFixed(2);
    }

    return amount;
  };

  const prodImages = productImages();

  return (
    <View style={styles.container}>
      {Platform.OS !== 'ios' && (
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      )}
      <View style={styles.body}>
        {productLoading ? (
          <ScrollView>
            <View style={styles.sliderContainer}>
              <View style={styles.slideImageView}>
                <ShimmerPlaceholder
                  height={hp('22.29%')}
                  width={wp('72%')}
                  shimmerStyle={{
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    marginTop: Platform.OS === 'ios' ? hp('4%') : hp('4%'),
                    marginBottom:
                      Platform.OS === 'ios' ? hp('10%') : hp('5.42%'),
                  }}
                  visible={false}
                />
              </View>
            </View>
            <ShimmerPlaceholder
              height={300}
              width={wp('100%')}
              shimmerStyle={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
              visible={false}
            />
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <LoginModal
              modalVisible={modalVisible}
              onClickLogin={onClickLogin}
              onClickSignUp={onClickSignUp}
              setModalVisible={setModalVisible}
            />

            <View style={styles.sliderContainer}>
              {prodImages ? (
                <SwiperFlatList
                  showPagination={prodImages.length > 1}
                  index={0}
                  paginationActiveColor="black"
                  paginationStyleItem={styles.dotStyle}
                >
                  {prodImages.map((image, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <View style={styles.slideImageView} key={index}>
                      <Image
                        source={{ uri: image }}
                        style={styles.carouselImage}
                      />
                    </View>
                  ))}
                </SwiperFlatList>
              ) : (
                <View style={styles.slideImageView}>
                  <ShimmerPlaceholder
                    height={hp('22.29%')}
                    width={wp('72%')}
                    shimmerStyle={{
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      marginTop: Platform.OS === 'ios' ? hp('1%') : hp('4%'),
                      marginBottom:
                        Platform.OS === 'ios' ? hp('10%') : hp('5.42%'),
                    }}
                    visible={false}
                  />
                </View>
              )}
            </View>
            <View style={styles.sizeChart}>
              <View style={styles.titleSection}>
                <View style={styles.titleContainer}>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {isEmpty(productData) ? ' ' : productData.title}
                  </Text>
                </View>
              </View>
              <View style={styles.details}>
                <View style={styles.conditionContainer}>
                  <Text style={styles.productCondition} />
                </View>
                <View style={styles.styleContainer}>
                  <Text style={styles.productCondition}>
                    <Text style={styles.colorBlack}>STYLE: </Text>
                  </Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>
                    {isEmpty(productData) ? ' ' : productData.description}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      {productLoading ? (
        <View style={styles.footer}>
          <ShimmerPlaceholder
            height={hp('5%')}
            width={wp('100%')}
            shimmerStyle={{}}
            visible={false}
          />
          <ShimmerPlaceholder
            height={hp('6.16%')}
            width={wp('85.33%')}
            shimmerStyle={{
              marginHorizontal: wp('7.2%'),
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#F6F6F6',
            }}
            visible={false}
          />
        </View>
      ) : (
        <View style={styles.footer}>
          <View>
            <ScrollView>
              {totalSizes.length > 0 || selected ? (
                <HorizontalScrollPicker
                  initialIdx={selected}
                  items={getSizesData() ? getSizesData() : []}
                  textStyle={styles.sizeTitle}
                  selectedTextStyle={
                    Platform.OS === 'ios' ? {} : styles.selectedItem
                  }
                  containerStyle={styles.scrollPickerContainer}
                  itemStyle={styles.item}
                  selectorStyle={styles.selector}
                  onSelect={(sizeSelected) => handleChange(sizeSelected)}
                />
              ) : null}
            </ScrollView>
          </View>

          <View>
            {isSelectedSizeAvailable() ? (
              productLoading ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity disabled style={styles.button}>
                    <Text style={styles.buttonTitle}>Please wait....</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => onSelectByNow()}
                    style={styles.button}
                  >
                    <Text style={styles.buttonTitle}>ADD TO CART</Text>
                    <Text style={styles.productPrice}>${getPrice()}</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <View
                style={[styles.buttonContainer, styles.disableButtonContainer]}
              >
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.outOfStock}>OUT OF STOCK</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Product;
