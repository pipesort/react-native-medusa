import { StyleSheet, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getModel } from 'react-native-device-info';

import { fonts, colors } from '@app/theme';

let height = hp('6.16%');

if (Platform.OS === 'ios') {
  const iPhoneModel = getModel();

  height = hp('7.39%');

  if (iPhoneModel === 'iPhone 11') {
    height = hp('8%');
  }
}

export default StyleSheet.create({
  container: {
    height,
    width: Platform.OS === 'ios' ? wp('85.33%') : wp('85.33%'),
  },
  dropDownInnerContainer: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropDownStyle: {
    backgroundColor: 'white',
    color: 'gray',
  },
  placeHolder: {
    fontSize: fonts.medium,
    textAlign: 'left',
    color: colors.label,
  },
  label: {
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
    color: colors.secondary,
  },
  labelUp: {
    marginTop: 0,
    marginVertical: 10,
    fontSize: fonts.medium,
    color: colors.label,
    fontFamily: 'Oswald-Medium',
  },
  labelDown: {
    marginTop: 10,
    marginVertical: 10,
    color: colors.label,
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
  },
});
