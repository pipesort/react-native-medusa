import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import { CircleFade } from 'react-native-animated-spinkit';
import isEmpty from 'lodash/isEmpty';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import FormButton from '@app/components/FormButton';
import FormInput from '@app/components/FormInput';
import ErrorMessage from '@app/components/ErrorMessage';

import { BASE_URL } from '@app/constants/url';
import useLogin from '@app/hooks/useLogin';
import useGetRegionId from '@app/hooks/useGetRegion';
import storage from '@app/utils/storage';
import LogoImg from '@app/assets/images/logomedusa.png';
import SCREENS from '../../../Screens';

import LoginValidationSchema from './validationSchema';

import styles from './styles';

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

const Login = ({ navigation, route }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const {
    getAuthToken,
    accessToken,
    error: authError,
    setError: setAuthError,
    loading: loginLoading,
  } = useLogin();

  const logInHandle = async ({ values, navigation, route }) => {
    const { email, password } = values;

    try {
      await getAuthToken(email, password);
    } catch (err) {
      console.error('SignIn error:', err);
    }
  };

  const onLoginSubmit = ({ values, navigation, route }) => {
    logInHandle({
      values,
      navigation,
      route,
    });
  };

  const isEmptyFormValues = (values) =>
    isEmpty(values.email) || isEmpty(values.password);

  const { regionId } = useGetRegionId();

  const getCartId = (regionId) => {
    fetch(`${BASE_URL}/store/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   region_id: regionId,
      // }),
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

  const checkCartId = () => {
    const cartId = storage.getString('cart_id');
    if (!cartId) {
      getCartId(regionId);
    }
  };
  useEffect(() => {
    checkCartId();
  }, []);
  useEffect(() => {
    const storeToken = () => {
      if (accessToken) {
        try {
          storage.set('jwt_token', accessToken);

          if (route.params && route.params.screen.name) {
            return navigation.goBack();
          }

          return navigation.navigate(SCREENS.BOTTOM_TAB_NAVIGATOR);
        } catch (error) {
          console.error('AsyncStorage error:', error);
        }
      }
    };

    storeToken();
  }, [accessToken, navigation]);

  if (authError) {
    Alert.alert('User does not exist or incorrect credentials');
    setAuthError(null);
  }

  if (loginLoading) {
    return (
      <View style={loaderStyles.loader}>
        <CircleFade size={48} color="black" />
        <Text style={loaderStyles.loaderText}>Logging you in...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {Platform.OS === 'ios' ? (
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      ) : (
        <StatusBar backgroundColor="black" barStyle="light-content" />
      )}
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={LogoImg} resizeMode="contain" style={styles.logo} />
        </View>
        <View style={styles.body}>
          <Formik
            enableReinitialize
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) =>
              onLoginSubmit({
                values,
                navigation,
                route,
              })
            }
            validationSchema={LoginValidationSchema}
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
                  from={SCREENS.LOGIN}
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
                    from={SCREENS.LOGIN}
                    handleSubmit={handleSubmit}
                    onBlur={handleBlur('password')}
                    label="PASSWORD"
                    onChangeText={handleChange('password')}
                    value={values.password}
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
                  title="LOGIN"
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

            <Text style={styles.signUpLink}>BACK TO SIGN UP PAGE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
