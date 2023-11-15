import { Platform, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { colors, fonts } from '@app/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackground,
  },
  body: {
    marginLeft: wp('7.2%'),
    marginRight: wp('7.47%'),
    marginTop: Platform.OS === 'ios' ? 0 : 0,
  },
  productContainer: {
    flex: 0.8,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
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
  endOfList: {
    padding: 10,
    textAlign: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: hp('18.47%'),
  },
  titleWrapper: {
    width: '100%',
    height: 100,
  },
  priceWrapper: {
    width: '100%',
    height: 50,
  },
});
