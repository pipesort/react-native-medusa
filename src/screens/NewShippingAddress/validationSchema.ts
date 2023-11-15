import { object, string } from 'yup';

export default object().shape({
  firstName: string().required('Required'),
  lastName: string().required('Required'),
  address1: string().required('Required'),
  phone: string()
    .min(10, 'Please enter 10 digit valid phone number')
    .max(10, 'Invalid phone number')
    .required('Required'),
  city: string().required('Required'),
  province: string().required('Required'),
  country: string().required('Required'),
  zip: string().required('Required'),
  company: string(),
});
