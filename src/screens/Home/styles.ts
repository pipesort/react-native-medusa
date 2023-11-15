import { StyleSheet, Dimensions, Platform } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { fonts, colors } from '@app/theme';

const screenWidth = Dimensions.get('window').width;

export const StatusBarHeight = Platform.select({
  ios: hasNotch() ? 44 : 20,
  android: 0,
  default: 0,
});

export default StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  logo: {
    height: 38.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: StatusBarHeight,
  },
  coverImageContainer: {
    width: '100%',
    height: 240,
    marginBottom: Platform.OS === 'ios' ? hp('1.8%') : hp('1.8'), // 43px for layout 375*1133
  },
  dotStyle: {
    width: 10,
    height: 10,
    marginTop: 10, // dot height 10px and margintop 10px total 20px distance to image and dots as given in mock
  },
  carouselImage: {
    width: screenWidth,
    height: 220,
    resizeMode: 'stretch',
  },
  slideImageView: {
    height: 220,
  },
  body: {
    flex: 0.8,
    flexDirection: 'column',
    width: '100%',
  },
  linksContainer: {
    flexDirection: 'column',
    height: Platform.OS === 'ios' ? hp('34%') : hp('36%'),
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  popularStylesContainer: {
    flexDirection: 'column',
    height: Platform.OS === 'ios' ? hp('26%') : hp('26%'),
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  popularStylesHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? hp('3.5%') : hp('4.5%'),
    width: wp('85.33%'),
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  scrollView: {
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: hp('19%'),
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? hp('3.5%') : hp('4.5%'),
    width: wp('85.33%'),
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
    marginLeft: wp('7.71%'),
  },
  imageView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: wp('58.57%'),
    height: hp('35.5%'),
  },
  popularImageView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: wp('58.57%'),
    height: hp('35.5%'),
  },
  popularImage: {
    width: wp('43.7%'),
    height: hp('16%'),
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  image: {
    width: wp('43.7%'),
    height: hp('16%'),
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginBottom: Platform.OS === 'ios' ? hp('1%') : hp('1%'),
  },
  descriptionContainer: {
    width: wp('43.7%'),
    height: 'auto',
  },
  popularDescription: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
    width: wp('42.7%'),
    height: Platform.OS === 'ios' ? hp('6.5%') : hp('8.2%'),
  },
  productPriceDescription: {
    textAlign: 'left',
    color: '#404040',
    fontSize: fonts.medium,
    fontWeight: '400',
    fontFamily: 'Oswald-Medium',
  },
  link: {
    color: colors.secondary,
    fontWeight: '500',
    fontSize: fonts.regular,
    fontFamily: 'Oswald-Medium',
  },
  shopAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopAllLink: {
    fontSize: fonts.buttonTitle,
    color: colors.primary,
    fontWeight: '500',
    fontFamily: 'Oswald-Medium',
  },
  filterIcon: {
    // marginLeft: 5, // Adjust as needed for spacing
  },
});
