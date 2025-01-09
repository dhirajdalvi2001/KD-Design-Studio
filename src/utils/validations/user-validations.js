import * as yup from 'yup';

export const initialValue = {
  username: '',
  email: '',
  password: '',
  role: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  phone: '',
  secondary_phone: '',
  designation: '',
};

export const userFormSchema = yup.object().shape({
  username: yup.string().required('Username is required').trim(),
  first_name: yup.string().required('First name is required').trim(),
  middle_name: yup.string().required('Middle name is required').trim(),
  last_name: yup.string().required('Last name is required').trim(),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role is required'),
  phone: yup.string().required('Phone is required').trim(),
  secondary_phone: yup.string().required('Secondary phone is required').trim(),
  designation: yup.string().required('Designation is required').trim(),
});
