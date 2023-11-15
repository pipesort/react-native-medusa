import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import { CircleFade } from 'react-native-animated-spinkit';

import FormInput from '@app/components/FormInput';
import FormButton from '@app/components/FormButton';
import ErrorMessage from '@app/components/ErrorMessage';
import DropDown from '@app/components/DropDown';

import useAddShippingAddress from '@app/hooks/useAddShippingAddress';
import useUpdateShippingAddress from '@app/hooks/useUpdateShippingAddress';
import useGetCustomerData from '@app/hooks/useGetCustomerData';
import SCREENS from '../../../Screens';

import styles from './styles';

import validationSchema from './validationSchema';

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

const onShippingAddressSubmit = async ({
  values,
  navigation,
  route,
  addAddress,
  updateShippingAddress,
}) => {
  const {
    firstName,
    lastName,
    phone,
    country,
    province,
    city,
    address1,
    address2,
    zip,
    company,
  } = values;

  const address = {
    first_name: firstName,
    last_name: lastName,
    phone,
    country_code: country,
    province,
    city,
    address_1: address1,
    address_2: address2,
    postal_code: zip,
    company,
  };

  if (company) {
    address.company = company;
  }

  const customerAccessToken = route.params.customerAccessToken;
  const fromCheckoutPage = route.params.fromCheckoutPage;

  if (customerAccessToken) {
    if (route.params.address) {
      const addressId = route.params.address.id;

      await updateShippingAddress(customerAccessToken, addressId, address);
      const addressUpdated = true;

      if (route.params.screen[0] === SCREENS.CONFIRM_PRODUCT) {
        navigation.navigate(SCREENS.CONFIRM_PRODUCT, {
          screen: [SCREENS.NEW_SHIPPING_ADDRESS],
          addressUpdated,
        });
      } else {
        navigation.navigate(SCREENS.SHIPPING_ADDRESS_DETAILS, {
          addressUpdated,
        });
      }
    } else {
      await addAddress(address);
      const addressUpdated = true;

      if (route.params.screen[0] === SCREENS.CONFIRM_PRODUCT) {
        return navigation.navigate(SCREENS.CONFIRM_PRODUCT, {
          screen: [SCREENS.NEW_SHIPPING_ADDRESS],
          addressUpdated,
        });
      }
      navigation.navigate(SCREENS.SHIPPING_ADDRESS_DETAILS, {
        addressUpdated,
      });
    }
  }
};

const ShippingAddress = ({ navigation, route }) => {
  let countryList = [{ label: 'US', value: 'us' }]; // Important: Must be inside the component.
  let states = [
    // Important: Must be inside the componenet.
    {
      label: 'Alabama',
      value: 'alabama',
      abbreviation: 'AL',
    },
    {
      label: 'Alaska',
      value: 'alaska',
      abbreviation: 'AK',
    },
    {
      label: 'American Samoa',
      value: 'american samoa',
      abbreviation: 'AS',
    },
    {
      label: 'Arizona',
      value: 'arizona',
      abbreviation: 'AZ',
    },
    {
      label: 'Arkansas',
      value: 'arkansas',
      abbreviation: 'AR',
    },
    {
      label: 'California',
      value: 'california',
      abbreviation: 'CA',
    },
    {
      label: 'Colorado',
      value: 'colorado',
      abbreviation: 'CO',
    },
    {
      label: 'Connecticut',
      value: 'connecticut',
      abbreviation: 'CT',
    },
    {
      label: 'Delaware',
      value: 'delaware',
      abbreviation: 'DE',
    },
    {
      label: 'District Of Columbia',
      value: 'district of columbia',
      abbreviation: 'DC',
    },
    {
      label: 'Federated States Of Micronesia',
      value: 'federated states of micronesia',
      abbreviation: 'FM',
    },
    {
      label: 'Florida',
      value: 'florida',
      abbreviation: 'FL',
    },
    {
      label: 'Georgia',
      value: 'georgia',
      abbreviation: 'GA',
    },
    {
      label: 'Guam Gu',
      value: 'guam gu',
      abbreviation: 'GU',
    },
    {
      label: 'Hawaii',
      value: 'hawaii',
      abbreviation: 'HI',
    },
    {
      label: 'Idaho',
      value: 'idaho',
      abbreviation: 'ID',
    },
    {
      label: 'Illinois',
      value: 'illinois',
      abbreviation: 'IL',
    },
    {
      label: 'Indiana',
      value: 'indiana',
      abbreviation: 'IN',
    },
    {
      label: 'Iowa',
      value: 'iowa',
      abbreviation: 'IA',
    },
    {
      label: 'Kansas',
      value: 'kansas',
      abbreviation: 'KS',
    },
    {
      label: 'Kentucky',
      value: 'kentucky',
      abbreviation: 'KY',
    },
    {
      label: 'Louisiana',
      value: 'louisiana',
      abbreviation: 'LA',
    },
    {
      label: 'Maine',
      value: 'maine',
      abbreviation: 'ME',
    },
    {
      label: 'Marshall Islands',
      value: 'marshall islands',
      abbreviation: 'MH',
    },
    {
      label: 'Maryland',
      value: 'maryland',
      abbreviation: 'MD',
    },
    {
      label: 'Massachusetts',
      value: 'massachusetts',
      abbreviation: 'MA',
    },
    {
      label: 'Michigan',
      value: 'michigan',
      abbreviation: 'MI',
    },
    {
      label: 'Minnesota',
      value: 'minnesota',
      abbreviation: 'MN',
    },
    {
      label: 'Mississippi',
      value: 'mississippi',
      abbreviation: 'MS',
    },
    {
      label: 'Missouri',
      value: 'missouri',
      abbreviation: 'MO',
    },
    {
      label: 'Montana',
      value: 'montana',
      abbreviation: 'MT',
    },
    {
      label: 'Nebraska',
      value: 'nebraska',
      abbreviation: 'NE',
    },
    {
      label: 'Nevada',
      value: 'nevada',
      abbreviation: 'NV',
    },
    {
      label: 'New Hampshire',
      value: 'new hampshire',
      abbreviation: 'NH',
    },
    {
      label: 'New Jersey',
      value: 'new jersey',
      abbreviation: 'NJ',
    },
    {
      label: 'New Mexico',
      value: 'new mexico',
      abbreviation: 'NM',
    },
    {
      label: 'New York',
      value: 'new york',
      abbreviation: 'NY',
    },
    {
      label: 'North Carolina',
      value: 'north carolina',
      abbreviation: 'NC',
    },
    {
      label: 'North Dakota',
      value: 'north dakota',
      abbreviation: 'ND',
    },
    {
      label: 'Northern Mariana Islands',
      value: 'northern mariana islands',
      abbreviation: 'MP',
    },
    {
      label: 'Ohio',
      value: 'ohio',
      abbreviation: 'OH',
    },
    {
      label: 'Oklahoma',
      value: 'oklahoma',
      abbreviation: 'OK',
    },
    {
      label: 'Oregon',
      value: 'oregon',
      abbreviation: 'OR',
    },
    {
      label: 'Palau',
      value: 'palau',
      abbreviation: 'PW',
    },
    {
      label: 'Pennsylvania',
      value: 'pennsylvania',
      abbreviation: 'PA',
    },
    {
      label: 'Puerto Rico',
      value: 'puerto rico',
      abbreviation: 'PR',
    },
    {
      label: 'Rhode Island',
      value: 'rhode island',
      abbreviation: 'RI',
    },
    {
      label: 'South Carolina',
      value: 'south carolina',
      abbreviation: 'SC',
    },
    {
      label: 'South Dakota',
      value: 'south dakota',
      abbreviation: 'SD',
    },
    {
      label: 'Tennessee',
      value: 'tennessee',
      abbreviation: 'TN',
    },
    {
      label: 'Texas',
      value: 'texas',
      abbreviation: 'TX',
    },
    {
      label: 'Utah',
      value: 'utah',
      abbreviation: 'UT',
    },
    {
      label: 'Vermont',
      value: 'vermont',
      abbreviation: 'VT',
    },
    {
      label: 'Virgin Islands',
      value: 'virgin islands',
      abbreviation: 'VI',
    },
    {
      label: 'Virginia',
      value: 'virginia',
      abbreviation: 'VA',
    },
    {
      label: 'Washington',
      value: 'washington',
      abbreviation: 'WA',
    },
    {
      label: 'West Virginia',
      value: 'west virginia',
      abbreviation: 'WV',
    },
    {
      label: 'Wisconsin',
      value: 'wisconsin',
      abbreviation: 'WI',
    },
    {
      label: 'Wyoming',
      value: 'wyoming',
      abbreviation: 'WY',
    },
  ];

  let initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    province: '',
    city: '',
    address1: '',
    address2: '',
    company: '',
    zip: '',
  };

  if (route.params.address) {
    const {
      address_1,
      address_2,
      city,
      company,
      first_name,
      last_name,
      phone,
      province,
      country_code,
      postal_code,
    } = route.params.address;

    countryList = countryList.map((country) => {
      if (country_code === country.value) {
        return { ...country, selected: true };
      }

      return country;
    });

    states = states.map((state) => {
      if (province === state.value) {
        return { ...state, selected: true };
      }

      return state;
    });

    initialValues = {
      firstName: first_name,
      lastName: last_name,
      phone,
      country: country_code,
      province,
      city,
      address1: address_1,
      address2: address_2,
      company,
      zip: postal_code,
    };
  }

  const { addAddress, addShippingAddressLoading, addShippingAddressError } =
    useAddShippingAddress();
  const {
    updateShippingAddress,
    error: updateLoading,
    isLoading: updateCustomerAddressLoading,
  } = useUpdateShippingAddress();

  const { refetch } = useGetCustomerData();

  return (
    <View style={styles.container}>
      {updateCustomerAddressLoading ? (
        <View style={loaderStyles.loader}>
          <CircleFade size={48} color="black" />
          <Text style={loaderStyles.loaderText}>
            Saving the Address to your account...
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.body}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) =>
              onShippingAddressSubmit({
                values,
                navigation,
                route,
                addAddress,
                updateShippingAddress,
              })
            }
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              errors,
              values,
              handleSubmit,
              setFieldValue,
            }) => (
              <View style={styles.inputContainer}>
                <ScrollView
                  decelerationRate="fast"
                  style={styles.scrollView}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled // We need this for formik dropdown field to also be scrollable in android.
                >
                  <View style={styles.formInput}>
                    <FormInput
                      label="FIRST NAME *"
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                    />
                    <ErrorMessage
                      errorValue={touched.firstName && errors.firstName}
                    />
                  </View>

                  <View style={styles.formInput}>
                    <FormInput
                      label="LAST NAME *"
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                    />
                    <ErrorMessage
                      errorValue={touched.lastName && errors.lastName}
                    />
                  </View>

                  <View style={styles.formInput}>
                    <FormInput
                      label="PHONE *"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      keyboardType="number-pad"
                      onBlur={handleBlur('phone')}
                    />
                    <ErrorMessage errorValue={touched.phone && errors.phone} />
                  </View>

                  <TouchableWithoutFeedback>
                    <DropDown
                      items={countryList}
                      onChangeItem={(selectedCountry) => {
                        setFieldValue('country', selectedCountry.value);
                      }}
                      placeholder="Select country"
                      label="COUNTRY *"
                      selectedValue={values.country}
                    />
                  </TouchableWithoutFeedback>
                  <ErrorMessage errorValue={errors.country} />

                  <TouchableWithoutFeedback>
                    <DropDown
                      items={states}
                      onChangeItem={(selectedState) => {
                        setFieldValue('province', selectedState.value);
                      }}
                      placeholder="Select province"
                      label="STATE *"
                      selectedValue={values.province}
                    />
                  </TouchableWithoutFeedback>

                  <ErrorMessage errorValue={errors.province} />

                  <View style={styles.formInput}>
                    <FormInput
                      label="CITY *"
                      onChangeText={handleChange('city')}
                      value={values.city}
                      onBlur={handleBlur('city')}
                    />
                    <ErrorMessage errorValue={touched.city && errors.city} />
                  </View>

                  <View style={styles.formInput}>
                    <FormInput
                      label="ADDRESS1 (street address or PO Box number) *"
                      value={values.address1}
                      onChangeText={handleChange('address1')}
                      onBlur={handleBlur('address1')}
                    />
                    <ErrorMessage
                      errorValue={touched.address1 && errors.address1}
                    />
                  </View>

                  <View style={{ ...styles.formInput, marginBottom: 15 }}>
                    <FormInput
                      label="ADDRESS2 (number of the apartment,or suite)"
                      value={values.address2}
                      onChangeText={handleChange('address2')}
                      onBlur={handleBlur('address2')}
                    />
                  </View>

                  <View style={styles.formInput}>
                    <FormInput
                      label="ZIP CODE *"
                      value={values.zip}
                      onChangeText={handleChange('zip')}
                      onBlur={handleBlur('zip')}
                      keyboardType="number-pad"
                    />
                    <ErrorMessage errorValue={touched.zip && errors.zip} />
                  </View>

                  <View style={styles.formInput}>
                    <FormInput
                      label="COMPANY"
                      value={values.company}
                      onChangeText={handleChange('company')}
                      onBlur={handleBlur('company')}
                    />
                    <ErrorMessage
                      errorValue={touched.company && errors.company}
                    />
                  </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                  <FormButton
                    title={route.params.address ? 'UPDATE' : 'SAVE'}
                    onPress={handleSubmit}
                    type="bottomButton"
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      )}
    </View>
  );
};

export default ShippingAddress;
