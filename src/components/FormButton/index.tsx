import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

const FormButton = ({ onPress, title, isvalid, disable, type }) => {
  if (type === 'bottomButton') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.bottomButton}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={
          !disable && isvalid
            ? styles.button
            : [styles.button, styles.disableButton]
        }
      >
        <Text
          style={
            !disable && isvalid
              ? styles.textOnButton
              : [styles.textOnButton, styles.textOnButtonDisable]
          }
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FormButton;
