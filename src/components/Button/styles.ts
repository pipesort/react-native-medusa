import { widthPercentageToDP as widthToDp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { colors } from '@app/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 5,
    width: widthToDp(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 59,
  },
  large: {
    width: '100%',
    marginTop: 10,
    height: widthToDp(12),
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Style for the disabled state
  disabled: {
    backgroundColor: '#A8A8A8',
  },
});
