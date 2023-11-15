import { StyleSheet } from 'react-native';
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
    flex: 1,
  },
  productContainer: {
    flex: 0.2,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.5,
    elevation: 10,
  },
  addressContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
    padding: 0,
  },
  subAddressContainer: {
    margin: 10,
  },
  productImage: {
    flex: 0.5,
    height: 190,
    marginBottom: 15,
  },
  productDescriptionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginVertical: hp('2%'),
  },
  productDescription: {
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
  orderDescription: {
    fontSize: fonts.small,
    fontFamily: 'Oswald-Medium',
    padding: 5,
  },
  price: {
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
    color: '#404040',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
  subProductDescription: {
    fontSize: fonts.small,
    fontFamily: 'Oswald-Medium',
    color: '#545454',
    padding: 5,
  },
  addressBtnsContainer: {
    width: wp('85.4%'),
    height: hp('6.16%'),
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: colors.primary,
    width: wp('85.4%'),
    height: hp('6.16%'),
    marginHorizontal: wp('7.2%'),
  },
  buttonTitle: {
    color: colors.buttonTitle,
    textAlign: 'center',
    fontFamily: 'Oswald-Medium',
    fontSize: fonts.medium,
  },
  noMoreOrders: {
    flex: 0.2,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.5,
    elevation: 10,
  },
  noOrdersContainer: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 5,
    padding: 0,
  },
  noOrdersTitle: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: fonts.secondaryTitle,
    fontFamily: 'Oswald-Medium',
    marginBottom: 5,
    marginTop: 5,
    padding: 8,
  },
  noOrdersText: {
    textAlign: 'center',
    color: '#545454',
    fontSize: fonts.buttonTitle,
    fontFamily: 'Oswald-Medium',
    marginBottom: 5,
    marginTop: 5,
    padding: 8,
  },
  productStatusDescription: {
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    color: colors.primary,
  },
  span: {
    color: '#545454',
  },
});
