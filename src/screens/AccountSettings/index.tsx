import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

// import LogoImg from '@app/assets/images/logomedusa.png';

import useLogout from '@app/hooks/useLogout';
import useGetCustomerAccessToken from '@app/hooks/useGetCustomerAccessToken';
import storage from '@app/utils/storage';
import SCREENS from '../../../Screens';

import styles from './styles';

const AccountSettings = ({ navigation }) => {
  const { customerAccessToken } = useGetCustomerAccessToken();

  const { logout, loading, error } = useLogout();

  const handleLogout = async () => {
    await logout();
    navigation.navigate(SCREENS.INITIAL);
  };

  if (customerAccessToken) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.linksContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                navigation.navigate(SCREENS.SHIPPING_ADDRESS_DETAILS, {
                  screen: [SCREENS.BOTTOM_TAB_NAVIGATOR],
                })
              }
            >
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>SHIPPING ADDRESS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate(SCREENS.ORDERS_HISTORY)}
            >
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>ORDERS</Text>
              </View>
            </TouchableOpacity>
            {customerAccessToken && (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={async () => {
                  try {
                    storage.clearAll();
                    handleLogout();
                  } catch {
                    Alert.alert('error in logout');
                  }
                }}
              >
                <View style={styles.button}>
                  <Text style={styles.logOut}>LOG OUT</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* <View style={styles.logoVersionContainer}>
              <View style={styles.logoContainer}>
                <Image
                  source={LogoImg}
                  resizeMode="contain"
                  style={styles.logo}
                />
              </View>
              <View>
                <Text style={styles.versionTitle}>V 0.1.9</Text>
              </View>
            </View> */}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        style={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate(SCREENS.INITIAL);
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>LOG IN</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.logoVersionContainer}>
          <View style={styles.logoContainer}>
            <Image source={LogoImg} resizeMode="contain" style={styles.logo} />
          </View>
          <View>
            <Text style={styles.versionTitle}>V 0.1.9</Text>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default AccountSettings;
