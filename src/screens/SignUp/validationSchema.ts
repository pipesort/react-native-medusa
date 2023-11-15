import { object, string } from 'yup';

export default object().shape({
  fullName: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Password must be 8 characters long')
    .required('No password provided'),
});
