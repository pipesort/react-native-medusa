import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

const ErrorMessage = ({ errorValue }) => (
  <Text style={styles.errorText}>{errorValue}</Text>
);

export default ErrorMessage;
