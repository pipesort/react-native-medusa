import { Platform, StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors, fonts } from '@app/theme';

export default StyleSheet.create({
  product: {
    width: Platform.OS === 'ios' ? '42.5%' : '42.5%',
    marginBottom: Platform.OS === 'ios' ? hp('3.55%') : hp('3.55%'),
  },
  productDescription: {
    width: '100%',
    textAlign: 'left',
    color: colors.secondary,
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
    height: Platform.OS === 'ios' ? hp('9%') : hp('11.2%'),
  },
  price: {
    textAlign: 'left',
    color: '#404040',
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
  },
  imageWrapper: {
    width: '100%',
    height: hp('18.47%'),
  },
  titleWrapper: {
    width: '100%',
    height: 100,
  },
});
