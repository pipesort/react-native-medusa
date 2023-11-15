import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { NO_OF_LOADING_SKELETEONS_TO_SHOW } from '@app/utils/getCollectionsConstants';

import styles from './styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const EmptyProductLoadingSkeleton = ({ noResultsFound = false }) => {
  if (noResultsFound) {
    return <Text style={styles.endOfList}>No Results Found</Text>;
  }

  return (
    <View style={styles.productContainer}>
      {[
        ...Array.from(
          { length: NO_OF_LOADING_SKELETEONS_TO_SHOW },
          (_, i) => i,
        ),
      ].map((key) => (
        <View style={styles.product} key={key}>
          <TouchableOpacity>
            <ShimmerPlaceholder
              width={wp('40%')}
              height={hp('16%')}
              shimmerStyle={{
                alignSelf: 'center',
                marginBottom: hp('2.47%'),
              }}
              visible={false}
            />
            <ShimmerPlaceholder
              width={wp('40%')}
              height={Platform.OS === 'ios' ? hp('7%') : hp('10.7%')}
              shimmerStyle={{
                alignSelf: 'center',
                marginBottom: 5,
              }}
              visible={false}
            />
            <ShimmerPlaceholder
              width={wp('40%')}
              height={hp('2%')}
              shimmerStyle={{
                alignSelf: 'center',
              }}
              visible={false}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default EmptyProductLoadingSkeleton;
