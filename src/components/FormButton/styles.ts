import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { fonts, colors } from '@app/theme';

export default StyleSheet.create({
  button: {
    width: wp('85.33%'),
    height: hp('6.16%'),
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: hp('3.08%'),
    marginBottom: hp('2.22%'),
  },
  disableButton: {
    backgroundColor: colors.disabledButton,
    borderColor: colors.disable,
  },
  textOnButton: {
    textAlign: 'center',
    fontSize: fonts.buttonTitle,
    color: colors.buttonTitle,
    fontFamily: 'Oswald-Medium',
    fontWeight: '800',
  },
  textOnButtonDisable: {
    color: colors.disabledButtonTitle,
  },
  bottomButton: {
    width: wp('85.33%'),
    height: hp('6.16%'),
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginTop: hp('3.08%'),
    marginBottom: hp('2.22%'),
    textAlign: 'center',
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: fonts.buttonTitle,
    color: colors.buttonTitle,
    fontFamily: 'Oswald-Medium',
  },
});
