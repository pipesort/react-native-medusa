import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text } from 'react-native';
import isEmpty from 'lodash/isEmpty';

import styles from './styles';

const DropDown = ({ label, selectedValue, ...rest }) => (
  <>
    <Text style={isEmpty(selectedValue) ? styles.labelDown : styles.labelUp}>
      {label}
    </Text>
    <DropDownPicker
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      containerStyle={styles.container}
      style={styles.dropDownInnerContainer}
      itemStyle={styles.itemStyle}
      dropDownStyle={styles.dropDownStyle}
      placeholderStyle={styles.placeHolder}
      arrowColor="#90a4ae"
      arrowSize={22}
      labelStyle={styles.label}
    />
  </>
);

export default DropDown;
