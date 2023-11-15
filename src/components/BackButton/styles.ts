import {StyleSheet, Platform, ViewStyle} from 'react-native';
import {fonts} from '@app/theme';

const backArrowStyle: ViewStyle = Platform.select({
  ios: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    elevation: 5,
  },
  android: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  default: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
});

export default StyleSheet.create({
  backArrow: backArrowStyle,
  content: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'flex-start',
  },
  header: {
    fontFamily: 'Oswald',
    fontSize: fonts.large,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  arrow: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleContainer: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
