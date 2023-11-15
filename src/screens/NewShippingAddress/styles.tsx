import { StyleSheet, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getModel } from 'react-native-device-info';

import { colors } from '@app/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  formHeader: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: Platform.OS === 'ios' ? 'center' : 'center',
  },
  scrollView: {
    flex: 0.7,
    marginHorizontal: 20,
    paddingVertical: 0,
  },
  formInput: {
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
  },
  titleContainer: {
    flex: 0.1,
    marginTop:
      Platform.OS === 'ios' ? (getModel() === 'iPhone 12' ? 20 : 15) : 0,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderColor: colors.light,
    borderBottomWidth: 0.8,
  },
  title: {
    flex: 0.8,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  buttonContainer: {
    marginTop: Platform.OS === 'ios' ? 0 : hp('0.65%'),
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
    marginHorizontal: wp('7.4%'),
  },
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  wrapper: {
    flex: 0.45,
    flexDirection: 'column',
  },
});
