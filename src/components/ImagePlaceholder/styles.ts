import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: hp('16%'),
    alignSelf: 'center',
  },
});
