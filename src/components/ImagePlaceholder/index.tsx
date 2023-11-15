import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ImagePlaceholder = ({ src }) => {
  const [imgVisible, setImgVisible] = useState(false);
  return (
    <ShimmerPlaceholder
      width={wp('40%')}
      height={hp('16%')}
      shimmerStyle={{
        alignSelf: 'center',
      }}
      visible={imgVisible}
    >
      <FastImage
        source={{ uri: src }}
        resizeMode="contain"
        style={styles.image}
        onLoadEnd={() => setImgVisible(true)}
      />
    </ShimmerPlaceholder>
  );
};

export default ImagePlaceholder;
