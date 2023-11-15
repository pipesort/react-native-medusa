import { object, string } from 'yup';

export default object().shape({
  email: string().email('Invalid email').required('Required'),
  password: string().required('No password provided'),
});
