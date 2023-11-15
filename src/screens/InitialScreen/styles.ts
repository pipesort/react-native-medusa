import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { colors, fonts } from '@app/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // backgroundColor: colors.secondary,
    marginHorizontal: wp('6.93%'),
    alignItems: 'center',
    marginVertical: hp('4%'),
  },
  logOutButton: {
    backgroundColor: colors.white,
    // borderWidth: 1,
    width: wp('85.33%'),
    height: hp('6.16%'),
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.white,
    // borderWidth: 1,
    width: wp('85.33%'),
    height: hp('6.16%'),
    justifyContent: 'center',
  },
  signUpButton: {
    backgroundColor: colors.primary,
    // borderWidth: 1,
    width: wp('85.33%'),
    height: hp('6.16%'),
    justifyContent: 'center',
  },
  signupStyles: {
    fontSize: fonts.buttonTitle,
    fontFamily: 'Oswald-Medium',
    fontWeight: '500',
    textAlign: 'center',
    color: colors.white,
  },
  loginSignupButtonContainer: {
    // backgroundColor: colors.secondary,
    height: hp('14.16%'),
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyles: {
    fontSize: fonts.buttonTitle,
    fontFamily: 'Oswald-Medium',
    fontWeight: '500',
    textAlign: 'center',
    color: colors.secondary,
  },
  images: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: colors.secondary,
  },
  image: {
    marginTop: -65,
    width: wp('96.29%'),
    height: hp('43.1%'),
    marginBottom: Platform.OS === 'ios' ? hp('3%') : hp('5.54%'),
  },
  startBrowsing: {
    flex: 0.2,
    justifyContent: 'flex-end',
    // backgroundColor: colors.secondary,
    marginBottom: hp('1.85%'),
  },
  link: {
    color: colors.white,
    fontSize: Platform.OS === 'ios' ? wp('4.4%') : wp('4.4'),
    fontWeight: '500',
    fontFamily: 'Oswald-Medium',
  },
});
