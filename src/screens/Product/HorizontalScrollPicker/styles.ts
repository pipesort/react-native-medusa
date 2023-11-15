import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  timelineContainer: {
    flex: 1,
    flexGrow: 0,
    flexDirection: 'row',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
  },
  item: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    width: 70,
  },
  selectedItem: {
    flex: 1,
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12,
  },
});
