import { StyleSheet, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  formField: {
    width: Platform.OS === 'ios' ? wp('85.33%') : wp('85.33%'),
    marginTop: Platform.OS === 'ios' ? hp('3.4%') : hp('3.2%'),
  },
});
