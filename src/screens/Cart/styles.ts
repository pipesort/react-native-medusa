import { StatusBar, StyleSheet } from 'react-native';
import { widthPercentageToDP as widthToDp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthToDp(90),
    marginTop: 10,
  },
  total: {
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopColor: '#E5E5E5',
    marginBottom: 10,
  },
  cartTotalText: {
    fontSize: widthToDp(4.5),
    color: '#989899',
  },
});
