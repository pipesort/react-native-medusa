import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import useGetCustomerAccessToken from '@app/hooks/useGetCustomerAccessToken';
import storage from '@app/utils/storage';
import LogoImg from '@app/assets/images/main.png';

import SCREENS from '../../../Screens';

import styles from './styles';

const InitialScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { customerAccessToken } = useGetCustomerAccessToken();
  useEffect(() => {
    if (customerAccessToken) {
      navigation.navigate(SCREENS.BOTTOM_TAB_NAVIGATOR);
    }
  }, [customerAccessToken]);

  const imageStyle = {
    ...styles.image,
  };

  if (Platform.OS === 'android') {
    imageStyle.height = hp('43.1%');
  }

  if (!customerAccessToken) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <ImageBackground
          source={LogoImg}
          resizeMode="cover"
          style={styles.images}
        >
          <View style={styles.body}>
            <View style={styles.startBrowsing}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(SCREENS.BOTTOM_TAB_NAVIGATOR)
                }
              >
                <Text style={styles.link}>START BROWSING</Text>
              </TouchableOpacity>
            </View>
            {customerAccessToken ? (
              <View style={styles.loginSignupButtonContainer}>
                <TouchableOpacity
                  style={styles.logOutButton}
                  onPress={() => {
                    try {
                      storage.clearAll();
                    } catch (error) {
                      Alert.alert('Error in logout');
                    }
                  }}
                >
                  <Text style={styles.textStyles}>LOG OUT</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.loginSignupButtonContainer}>
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={() => navigation.navigate(SCREENS.SIGNUP)}
                >
                  <Text style={styles.signupStyles}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate(SCREENS.LOGIN)}
                >
                  <Text style={styles.textStyles}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }

  return null;
};

export default InitialScreen;
