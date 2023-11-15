import React from 'react';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Skeleton = ({ imgVisible }:any) => (
  <ScrollView
    style={styles.imageContainer}
    horizontal
    showsHorizontalScrollIndicator={false}
  >
    {[...Array.from({ length: 10 }, (_, i) => i)].map((product, index) => (
      <View
        style={{
          ...styles.imageView,
          marginLeft: index === 0 ? wp('7.71%') : 0,
        }}
        key={product}
      >
        <TouchableOpacity>
          <ShimmerPlaceholder
            width={wp('43.7%')}
            height={hp('16%')}
            shimmerStyle={{
              marginBottom: hp('4%'),
            }}
            visible={imgVisible}
          />
          <ShimmerPlaceholder
            width={wp('43.7%')}
            height={hp('2.7%')}
            shimmerStyle={{}}
            visible={imgVisible}
          />
          <ShimmerPlaceholder
            width={wp('43.7%')}
            height={hp('2.7%')}
            shimmerStyle={{
              marginTop: 10,
            }}
            visible={imgVisible}
          />
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
);
export default Skeleton;
