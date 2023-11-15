import React, { useState } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getModel, hasNotch } from 'react-native-device-info';

import styles from './styles';
import { colors, fonts } from '@app/theme';

const FormInput = ({
  from,
  handleSubmit,
  keyboardType,
  label,
  value,
  onBlur,
  maxLength,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  const [, setViewHeight] = useState(0);

  let labelStyleTop = hp('-4%');

  if (!isFocused && value.length === 0) {
    if (Platform.OS === 'ios') {
      labelStyleTop = hasNotch() ? hp('2.25%') : hp('2%');
    } else {
      labelStyleTop = hp('1');
    }
  } else if (from) {
    labelStyleTop = hp('-3%');
  } else {
    labelStyleTop = hp('-4%');
  }

  const labelStyle = {
    position: 'absolute',
    left: !isFocused && value.length === 0 ? 21 : 2,
    top: labelStyleTop,
    fontSize: !isFocused && value.length === 0 ? fonts.medium : fonts.small,
    color: !isFocused ? 'grey' : 'grey',
    fontFamily: 'Oswald-Medium',
  };

  let inputStyleHeight = hp('6.16%');

  if (Platform.OS === 'ios') {
    const iPhoneModel = getModel();
    inputStyleHeight = hp('7.39%');

    if (iPhoneModel === 'iPhone 11') {
      inputStyleHeight = hp('8%');
    }
  }

  const inputStyle = {
    height: inputStyleHeight,
    fontSize: fonts.medium,
    fontFamily: 'Oswald-Medium',
    color: colors.secondary,
    borderWidth: 1,
    borderColor: isFocused ? colors.primary : colors.secondary,
    paddingLeft: wp('5.6%'),
  };

  const onBlurFunc = (data) => {
    setFocused(false);
    onBlur(data);
  };

  return (
    <View
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setViewHeight(height);
      }}
      style={styles.formField}
    >
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        label={label}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        style={inputStyle}
        value={value}
        keyboardType={keyboardType}
        onBlur={onBlurFunc}
        onFocus={() => setFocused(true)}
        maxLength={maxLength}
        returnKeyType="go"
        onSubmitEditing={() => {
          if (from) {
            handleSubmit();
          }
        }}
      />
    </View>
  );
};

export default FormInput;
