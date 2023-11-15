import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as heightToDp,
  widthPercentageToDP as widthToDp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#e6e6e6',
    width: widthToDp('90%'),
  },
  image: {
    width: widthToDp(30),
    height: heightToDp(20),
    borderRadius: 10,
  },
  title: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    marginLeft: widthToDp(3),
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: heightToDp(2),
    width: widthToDp(50),
  },
  description: {
    fontSize: widthToDp(3.5),
    color: '#8e8e93',
    marginTop: heightToDp(2),
  },

  price: {
    fontSize: widthToDp(4),
  },
  quantity: {
    fontSize: widthToDp(4),
  },
});
