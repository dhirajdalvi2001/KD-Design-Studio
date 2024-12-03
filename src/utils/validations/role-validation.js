import * as yup from 'yup';

export const initialValue = {
  name: '',
  permissions: [],
};

export const roleFormSchema = yup.object().shape({
  name: yup.string().required('Role Name is required').trim(),
  permissions: yup
    .array()
    .of(yup.string())
    .required('Permissions are required'),
});
