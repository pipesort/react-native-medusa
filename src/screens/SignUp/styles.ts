import { Platform, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { fonts, colors } from '@app/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  body: {
    flex: 0.8,
    marginTop: hp('2.96'),
    flexDirection: 'column',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    height: Platform.OS === 'ios' ? hp('81.03%') - hp('4%') : hp('81.83'),
    backgroundColor: colors.white,
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.secondary,
  },
  logo: {
    height: hp('8.62%'),
    width: wp('23.2'),
    marginTop: hp('3.69%'),
  },
  inputContainer: {
    width: wp('85.33%'),
    height: hp('6.16%'),
    marginTop: Platform.OS === 'ios' ? hp('5%') : hp('12.19'),
    marginHorizontal: wp('7.2%'),
    flexDirection: 'column',
  },
  forgotLink: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  hidePassword: {
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: -35,
    marginTop: hp('3%'),
    alignItems: 'center',
  },
  hideIcon: {
    alignSelf: 'center',
    color: 'black',
    textAlign: 'left',
  },
  forgotTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Oswald',
    textAlign: 'left',
    marginBottom: 8,
    color: colors.secondary,
  },
  formField: {
    flexDirection: 'row',
    width: '94%',
  },
  input: {
    flex: 1.5,
    paddingLeft: 0,
    borderColor: '#000000',
    fontSize: 18,
  },
  signUpLink: {
    color: colors.secondary,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: fonts.buttonTitle,
    fontFamily: 'Oswald-Medium',
  },
  span: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Oswald',
    color: colors.primary,
  },
  signUpLinkContainer: {
    height: hp('10%'),
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: wp('7.2%'),
    borderTopWidth: 1,
    borderColor: colors.light,
    alignItems: 'center',
  },
  backArrow: {
    flex: 0.2,
    marginTop: Platform.OS === 'ios' ? 3 : 6,
  },
});
