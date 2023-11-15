import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';

const RadioButton = ({ onPress, selected, children }) => (
  <View style={styles.radioButtonContainer}>
    <TouchableOpacity onPress={onPress} style={styles.radioButton}>
      {selected ? <View style={styles.radioButtonIcon} /> : null}
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.radioButtonText}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export default RadioButton;
