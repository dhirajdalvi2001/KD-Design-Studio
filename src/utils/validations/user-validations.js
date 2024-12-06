import * as yup from 'yup';

export const initialValue = {
  username: '',
  email: '',
  password: '',
  role: '',
};

export const userFormSchema = yup.object().shape({
  username: yup.string().required('Username is required').trim(),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role is required'),
});
