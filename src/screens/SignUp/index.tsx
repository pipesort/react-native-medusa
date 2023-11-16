import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';

import { CircleFade } from 'react-native-animated-spinkit';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import FormInput from '@app/components/FormInput';
import ErrorMessage from '@app/components/ErrorMessage';
import FormButton from '@app/components/FormButton';

import { BASE_URL } from '@app/constants/url';
import useSignUp from '@app/hooks/useSignUp';
import useLogin from '@app/hooks/useLogin';
import storage from '@app/utils/storage';
import LogoImg from '@app/assets/images/logomedusa.png';

import SCREENS from '../../../Screens';

import styles from './styles';

import signUpValidationSchema from './validationSchema';

const loaderStyles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  loaderText: {
    fontFamily: 'Nunito-Regular',
    marginTop: 10,
  },
});

const SignUp = ({ navigation, route }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');

  const { signUp, customerId, error, loading, emailExists } = useSignUp();
  const {
    getAuthToken,
    accessToken,
    error: authError,
    setError: setAuthError,
    loading: loginLoading,
  } = useLogin();

  const signUpHandle = async ({ values }) => {
    const { email, password, fullName } = values;
    try {
      await signUp(email, password, fullName);

      setSubmittedEmail(email);
      setSubmittedPassword(password);
    } catch (err) {
      console.error('SignUp error:', err);
    }
  };
  const onSignUpSubmit = ({ values, navigation, route }) => {
    signUpHandle({
      values,
      navigation,
      route,
    });
  };
  const isEmptyFormValues = (values) =>
    isEmpty(values.fullName) ||
    isEmpty(values.email) ||
    isEmpty(values.password);

  useEffect(() => {
    if (emailExists) {
      Alert.alert(
        'Sign Up Error',
        'The email already exists. Please use a different email.',
      );
    }
  }, [emailExists]);

  useEffect(() => {
    const fetchAuthToken = async () => {
      if (customerId && !accessToken && submittedEmail && submittedPassword) {
        await getAuthToken(submittedEmail, submittedPassword);
      }
    };

    fetchAuthToken();
  }, [
    customerId,
    submittedEmail,
    submittedPassword,
    getAuthToken,
    accessToken,
  ]);

  useEffect(() => {
    const storeToken = async () => {
      if (accessToken) {
        try {
          storage.set('jwt_token', accessToken);
          if (route.params && route.params.screen.name) {
            return navigation.goBack();
          }
          return navigation.navigate(SCREENS.BOTTOM_TAB_NAVIGATOR);
        } catch (error) {
          console.error('Storage error:', error);
        }
      }
    };

    storeToken();
  }, [accessToken, navigation]);

  const getCartId = () => {
    fetch(`${BASE_URL}/store/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          const text = response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Body: ${text}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        storage.set('cart_id', data.cart.id);
      })
      .catch((error) => {
        console.error('Error creating cart:', error);
      });
  };

  const checkCartId = async () => {
    const cartId = storage.getString('cart_id');
    if (!cartId) {
      getCartId();
    }
  };
  useEffect(() => {
    checkCartId();
  }, []);

  if (loading || loginLoading) {
    return (
      <View style={loaderStyles.loader}>
        <CircleFade size={48} color="black" />
        <Text style={loaderStyles.loaderText}>Creating your account...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={LogoImg} resizeMode="contain" style={styles.logo} />
        </View>
        <View style={styles.body}>
          <Formik
            enableReinitialize
            initialValues={{
              fullName: '',
              email: '',
              password: '',
            }}
            onSubmit={(values) =>
              onSignUpSubmit({
                values,
                navigation,
                route,
              })
            }
            validationSchema={signUpValidationSchema}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              errors,
              values,
              handleSubmit,
              isValid,
            }) => (
              <ScrollView
                style={styles.inputContainer}
                showsVerticalScrollIndicator={false}
              >
                <FormInput
                  from={SCREENS.SIGNUP}
                  handleSubmit={handleSubmit}
                  onBlur={handleBlur('fullName')}
                  label="FULL NAME"
                  value={values.fullName}
                  keyboardType="default"
                  onChangeText={handleChange('fullName')}
                  autoCapitalize="words"
                />
                <ErrorMessage
                  errorValue={touched.fullName && errors.fullName}
                />
                <FormInput
                  from={SCREENS.SIGNUP}
                  handleSubmit={handleSubmit}
                  onBlur={handleBlur('email')}
                  label="EMAIL ADDRESS"
                  value={values.email}
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  autoCapitalize="none"
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <View style={styles.formField}>
                  <FormInput
                    from={SCREENS.SIGNUP}
                    handleSubmit={handleSubmit}
                    onBlur={handleBlur('password')}
                    label="PASSWORD"
                    value={values.password}
                    keyboardType="default"
                    onChangeText={handleChange('password')}
                    secureTextEntry={hidePassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}
                    style={
                      Platform.OS === 'ios'
                        ? { ...styles.hidePassword }
                        : { ...styles.hidePassword, height: hp('6.16%') }
                    }
                  >
                    <Icon
                      name={hidePassword ? 'eye-off' : 'eye'}
                      style={styles.hideIcon}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
                <FormButton
                  onPress={handleSubmit}
                  title="REGISTER"
                  isvalid={isValid}
                  disable={isEmptyFormValues(values)}
                />
              </ScrollView>
            )}
          </Formik>
          <TouchableOpacity
            style={styles.signUpLinkContainer}
            onPress={() => navigation.navigate(SCREENS.INITIAL)}
          >
            <Icon
              name="arrow-back"
              color="black"
              size={25}
              style={styles.backArrow}
            />

            <Text style={styles.signUpLink}>BACK TO SIGN IN PAGE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
