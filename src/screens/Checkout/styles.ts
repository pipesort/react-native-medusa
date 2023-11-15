import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as heightToDp,
  widthPercentageToDP as widthToDp,
} from 'react-native-responsive-screen';
import colors from '@app/theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  address: {
    marginHorizontal: widthToDp(5),
  },
  payment: {
    marginHorizontal: widthToDp(5),
    marginTop: heightToDp(4),
  },
  shipping: {
    marginHorizontal: widthToDp(5),
  },
  title: {
    fontSize: widthToDp(4.5),
  },
  shippingOption: {
    marginTop: heightToDp(2),
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.defaultBackground,
  // },
  body: {
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
  },
  addressContainer: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: colors.light,
    borderWidth: 1.5,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 7,
  },
  subAddressContainer: {
    margin: 10,
  },
  shippingTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  shippingAddressTitle: {
    marginTop: 10,
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },
  shippingAddress: {
    marginVertical: 5,
    fontFamily: 'Nunito-Regular',
  },
  addressBtnsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addBtn: {
    backgroundColor: colors.primary,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
  addBtnTitle: {
    color: colors.buttonTitle,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
  button: {
    backgroundColor: colors.primary,
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  buttonTitle: {
    color: colors.buttonTitle,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
});
