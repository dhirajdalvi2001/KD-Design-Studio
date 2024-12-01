import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
  username: yup.string().required('Username is required').trim(),
  password: yup.string().required('Password is required'),
});
