import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../../../api/useAxios';
import AdminBodyLayout from '../../../../components/Layout/AdminBodyLayout';
import { Button, Checkbox, CheckboxGroup, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import {
  initialValue,
  roleFormSchema,
} from '../../../../utils/validations/role-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import onError from '../../../../utils/onError';

export default function NewRole() {
  const { roleId } = useParams();
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const {
    setValue,
    setError,
    watch,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(roleFormSchema),
  });

  // Available Permissions
  const { data: availablePermissions, isLoading: availablePermissionsLoading } =
    useQuery({
      queryKey: ['availablePermissions'],
      queryFn: async () => {
        const response = await axiosInstance.get('/iam/available-permissions/');
        const filteredPermissions = response.data.data.permissions.filter(
          (permission) => permission.permission.length > 0
        );
        return filteredPermissions;
      },
      refetchOnMount: true,
    });

  // Role Details
  const { data: roleDetails, isLoading: roleDetailsLoading } = useQuery({
    queryKey: ['roleDetails'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/iam/role/${roleId}`);
      return response.data.data.role;
    },
    enabled: !!roleId,
    refetchOnMount: true,
  });

  // Create Role
  const { mutate: createRole, isLoading: createRoleLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/iam/role/', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Role created successfully!');
      navigate('/admin/manage-users/roles');
    },
    onError: (error) => {
      onError(error, setError);
    },
  });

  // Update Role
  const { mutate: updateRole, isLoading: updateRoleLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put(`/iam/role/${roleId}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Role updated successfully!');
      navigate('/admin/manage-users/roles');
    },
    onError: (error) => {
      onError(error, setError);
    },
  });

  useEffect(() => {
    if (roleDetails) {
      setValue('name', roleDetails.name);
      setValue('permissions', roleDetails.permissions);
    }
    if (!roleId) {
      reset({ ...initialValue });
    }
  }, [roleId, roleDetails, setValue, reset]);

  function onSubmit(data) {
    if (roleId) {
      updateRole(data);
    } else {
      createRole(data);
    }
  }

  console.log(roleDetails, 'roleDetails DD');

  const fieldsDisabled = roleDetailsLoading || availablePermissionsLoading;
  const buttonDisabled = createRoleLoading || updateRoleLoading;

  return (
    <AdminBodyLayout
      title="New Role"
      isFormPage
      buttonDisabled={buttonDisabled}
    >
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Role Name"
          placeholder="Enter Role Name"
          size="md"
          labelPlacement="outside"
          variant="bordered"
          className="w-[350px]"
          isDisabled={fieldsDisabled}
          value={watch('name')}
          errorMessage={errors.name?.message}
          {...register('name')}
        />
        {availablePermissions?.map((permissionGroup) => (
          <CheckboxGroup
            key={permissionGroup.name}
            label={permissionGroup.name}
            orientation="horizontal"
            isDisabled={fieldsDisabled}
            value={watch('permissions')}
            errorMessage={errors.permissions?.message}
            onChange={(value) => setValue('permissions', value)}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {permissionGroup?.permission?.map((permission) => (
                <Checkbox key={permission.id} value={permission.id}>
                  {permission.name}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        ))}
        <div className="w-full h-[60px] flex items-center justify-start gap-3">
          <Button size="sm" variant="faded" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="solid"
            type="submit"
            isDisabled={buttonDisabled}
            className="bg-primary-500 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </AdminBodyLayout>
  );
}
