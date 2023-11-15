import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { colors, fonts } from '@app/theme';

const styles = StyleSheet.create({
  modalView: {
    height: hp('39.41%'),
    width: wp('85.33%'),
    alignSelf: 'center',
    marginHorizontal: 15,
    justifyContent: 'center',
    marginTop: 85,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonLogin: {
    width: wp('74.67%'),
    height: hp('6.16%'),
    backgroundColor: colors.primary,
    marginVertical: hp('1.85%'),
    justifyContent: 'center',
  },
  modalButtonSignUp: {
    width: wp('74.67%'),
    height: hp('6.16%'),
    backgroundColor: colors.secondary,
    marginTop: hp('1.85%'),
    marginBottom: hp('3%'),
    justifyContent: 'center',
  },
  textOnButton: {
    textAlign: 'center',
    fontSize: fonts.medium,
    color: colors.white,
    fontFamily: 'Oswald-Medium',
  },
  modalTitle: {
    width: '80%',
    textAlign: 'center',
    fontSize: wp('7.47%'),
    color: colors.secondary,
    fontFamily: 'Oswald-Medium',
  },
  close: {
    marginHorizontal: 15,
    alignSelf: 'flex-end',
  },
});

const LoginModal = ({
  modalVisible,
  onClickLogin,
  onClickSignUp,
  setModalVisible,
}) => (
  <Modal animationType="fade" transparent visible={modalVisible}>
    <View style={styles.modalView}>
      <Icon
        name="close"
        color="black"
        size={25}
        style={styles.close}
        onPress={() => setModalVisible(false)}
      />
      <Text style={styles.modalTitle}>Login or sign up to continue</Text>
      <TouchableOpacity
        style={styles.modalButtonLogin}
        onPress={() => onClickLogin()}
      >
        <Text style={styles.textOnButton}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalButtonSignUp}
        onPress={() => onClickSignUp()}
      >
        <Text style={styles.textOnButton}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default LoginModal;
