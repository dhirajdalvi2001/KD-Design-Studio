import * as yup from 'yup';

export const initialValue = {
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  is_superuser: false,
};

export const userFormSchema = yup.object().shape({
  username: yup.string().required('Username is required').trim(),
  first_name: yup.string().required('First name is required').trim(),
  last_name: yup.string().required('Last name is required').trim(),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().optional(),
  is_superuser: yup.boolean().required('Is superuser is required'),
});
