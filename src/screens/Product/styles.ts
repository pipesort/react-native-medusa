import { StyleSheet, Platform } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { fonts, colors } from '@app/theme';

export const ButtonContainerMarginVertical = Platform.select({
  ios: hasNotch() ? 25 : 14,
  android: 15,
  default: 0,
});

const blur = Platform.select({
  ios: {
    backgroundColor: '#F6F6F6',
  },
  android: {
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: colors.disable,
    elevation: 5,
  },
  default: {
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: colors.disable,
    elevation: 5,
  },
});

const shadow = Platform.select({
  ios: {
    shadowColor: colors.disable,
    shadowOffset: { width: 1, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  android: {
    elevation: 4,
  },
  default: {
    elevation: 4,
  },
});

export default StyleSheet.create({
  scrollPickerContainer: {
    height: hp('5%'),
    backgroundColor: '#F6F6F6',
  },
  item: {},
  selector: {
    position: 'absolute',
    marginTop: 0,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  body: {
    flex: Platform.OS === 'ios' ? 7 : 7,
    flexDirection: 'column',
    width: '100%',
    ...blur,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 1.9 : 1.9,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#F6F6F6', // Uncomment to add shadows to size scroll
    justifyContent: 'space-evenly',
    ...shadow,
  },
  sizeChart: {
    flex: 1,
    width: '100%',
    height: Platform.OS === 'ios' ? '100%' : '100%',
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: wp('7.2%'),
  },
  productTitle: {
    lineHeight: 30,
    color: '#000000',
    fontSize: fonts.large,
    fontFamily: 'Oswald-Medium',
  },
  image: {
    height: 190,
    width: '75%',
    alignSelf: 'center',
    marginBottom: 35,
    backgroundColor: 'white',
  },
  descriptionContainer: {
    flex: Platform.OS === 'ios' ? 0 : 0,
    textAlign: 'center',
    flexWrap: Platform.OS === 'ios' ? 'nowrap' : 'nowrap',
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 0 : 0,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  description: {
    fontSize: fonts.small,
    fontFamily: 'Oswald-Regular',
    color: colors.secondary,
  },
  productCondition: {
    textAlign: 'left',
    color: colors.tertiary,
    fontSize: fonts.small,
    fontFamily: 'Oswald-Medium',
  },
  productPrice: {
    textAlign: 'center',
    fontFamily: 'Oswald-Medium',
    fontSize: fonts.medium,
    marginVertical: Platform.OS === 'ios' ? 0 : fonts.small,
    color: colors.white,
  },
  sizeChartTitle: {
    color: 'black',
    fontFamily: 'Oswald-Medium',
    fontSize: fonts.small,
    marginHorizontal: wp('7.2%'),
  },
  buttonContainer: {
    width: wp('85.33%'),
    height: hp('6.16%'),
    marginHorizontal: wp('7.2%'),
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  disableButtonContainer: {
    backgroundColor: colors.disable,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonTitle: {
    textAlign: 'center',
    fontFamily: 'Oswald-Medium',
    fontSize: fonts.medium,
    marginVertical: Platform.OS === 'ios' ? 0 : 15,
    color: colors.white,
  },
  backButtonView: {
    flex: 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textOnButton: {
    textAlign: 'center',
    fontSize: fonts.regular,
    color: colors.white,
    fontFamily: 'Oswald-Medium',
    fontWeight: '800',
  },
  sizeTitle: {
    textAlign: 'center',
    fontSize: fonts.small,
    fontFamily: 'Oswald-Medium',
  },
  selectedItem: {
    color: 'black',
  },
  backArrow: {
    flex: 0.1,
    width: '90%',
    margin: 15,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
  },
  titleSection: {
    flex: 4,
    marginVertical: 20,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 0.1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  details: {
    flex: 6,
    marginBottom: 10,
  },
  conditionContainer: {},
  styleContainer: {
    flex: 0,
    marginBottom: Platform.OS === 'ios' ? hp('1%') : hp('1%'),
    flexDirection: 'column',
  },
  detailsContainer: {
    marginTop: Platform.OS === 'ios' ? 0 : 0,
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
    flexDirection: 'column',
    justifyContent: Platform.OS === 'ios' ? 'center' : 'center',
  },
  shimmer: {
    flex: 1,
    flexDirection: 'column',
  },
  outOfStock: {
    textAlign: 'center',
    fontFamily: 'Oswald-Medium',
    fontSize: fonts.medium,
    color: colors.secondary,
  },
  carouselImage: {
    width: wp('72%'),
    height: hp('22.29%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? hp('4%') : hp('4%'),
    marginBottom: Platform.OS === 'ios' ? hp('10%') : hp('5.42%'),
  },
  dotStyle: {
    width: 6,
    height: 6,
    marginBottom: 15,
    marginLeft: Platform.OS === 'ios' ? -5 : -5,
  },
  wrapper: {
    height: 350,
    width: '100%',
  },
  sliderContainer: {
    width: '100%',
    flexDirection: 'column',
    height: hp('36.33%'),
    backgroundColor: colors.white,
  },
  slideImageView: {
    width: wp('100%'),
    height: 250,
    alignItems: 'center',
  },
  colorBlack: {
    color: colors.secondary,
  },
});
