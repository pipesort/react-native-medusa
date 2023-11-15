import {View, Text} from 'react-native';
import React from 'react';
import {widthPercentageToDP as widthToDp} from 'react-native-responsive-screen';
import styles from './styles';
export default function Button({
  title,
  onPress,
  style,
  textSize,
  large,
  disabled,
}: any) {
  // Adjusted style when button is disabled
  const disabledStyle = disabled ? styles.disabled : {};

  return (
    <View
      style={[styles.container, style, large && styles.large, disabledStyle]}>
      <Text
        style={[
          styles.text,
          {fontSize: textSize ? textSize : widthToDp(3.5)},
          disabledStyle,
        ]}
        // Disable onPress event when the button is disabled
        onPress={!disabled ? onPress : null}>
        {title}
      </Text>
    </View>
  );
}
