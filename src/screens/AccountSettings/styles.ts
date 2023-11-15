import { StyleSheet, Platform } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors, fonts } from '@app/theme';

export const StatusBarHeight = Platform.select({
  ios: hasNotch() ? 35 : 20,
  android: 0,
  default: 0,
});

export default StyleSheet.create({
  linksContainer: {
    flex: 0.65,
  },
  logoVersionContainer: {
    flex: 0.35,
  },
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  logo: {
    height: hp('14.5%'),
    marginTop: hp('6%'),
  },
  versionTitle: {
    textAlign: 'center',
    fontSize: fonts.medium,
    color: colors.secondary,
    fontFamily: 'Oswald-Medium',
    fontWeight: '900',
  },
  container: {
    flex: 1,
    backgroundColor: colors.defaultBackground,
  },
  body: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: StatusBarHeight,
    backgroundColor: colors.defaultBackground,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: colors.defaultBackground,
    borderBottomWidth: 0.6,
    borderColor: '#90a4ae',
    justifyContent: 'center',
    minHeight: 50,
  },
  versionContainer: {
    flex: 0.12,
    flexDirection: 'row',
    backgroundColor: colors.defaultBackground,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttonTitle: {
    textAlign: 'center',
    padding: 20,
    fontSize: fonts.medium,
    color: colors.secondary,
    fontFamily: 'Oswald-Medium',
    fontWeight: '900',
  },
  logOut: {
    textAlign: 'center',
    padding: 18,
    fontSize: fonts.medium,
    color: colors.error,
    fontFamily: 'Oswald-Medium',
  },
  deleteAccount: {
    textAlign: 'center',
    padding: 18,
    fontSize: fonts.medium,
    color: colors.error,
    fontFamily: 'Oswald-Medium',
  },
  version: {
    textAlign: 'center',
    padding: 18,
    fontSize: fonts.small,
    color: colors.disable,
    fontWeight: 'bold',
  },
});
