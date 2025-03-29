import * as yup from 'yup';

export const signUpFormSchema = yup.object().shape({
  username: yup.string().required('Username is required').trim(),
  email: yup.string().required('Email is required').trim(),
  password: yup.string().required('Password is required'),
});