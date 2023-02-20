import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
// utils
// components
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { UserTableToolbar } from './list';
import { addFilds, CreateModule } from '../../../../Redux/ModuleReducer';

// ----------------------------------------------------------------------

const ROLE_OPTIONS = ['String', 'number', 'Boolan', 'date'];

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();
  const [filterRole, setFilterRole] = useState('');
  const state = useSelector((State) => State.module);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    key: Yup.string().required('City is required'),
    module: Yup.string().required('Role is required'),
  });

  const defaultValues = useMemo(
    () => ({
      key: currentUser?.key || '',
      module: currentUser?.module || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const keyData = getValues('key');
  const typeData = filterRole;
  const ModuleName = getValues('module');
  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      const Data = {
        keys: keyData,
        type: typeData,
      };
      const collectionPages = Object.assign([], state.filds[0]?.Filds);
      collectionPages.push(Data);
      const Obj = { ...state.filds[0] };
      Object.preventExtensions(Obj);
      Obj.Filds = collectionPages;
      const filter = state.moduleData.filter((val) => val.moduleName === ModuleName);
      console.log(filter);
      // if(childrens){
      if (filter.length === 0) {
        dispatch(CreateModule({ Obj, ModuleName }));
      } else {
        alert(`${ModuleName} is available So please Create a Deferant Name`);
        setValue('module', '');
      }

      // }
      setValue('key', '');
      setFilterRole('');
      setValue('module','');
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const addNewFild = () => {
    const Data = {
      keys: keyData,
      type: typeData,
    };
    if (keyData !== '' && typeData !== '' && ModuleName !== '') {
      const Obj = {
        ModuleName,
        Data,
      };
      dispatch(addFilds(Obj));
    }
    const a = (value, index) => {
      setValue(`key${index}`, value.keys);
    };
    state.filds[0]?.Filds?.map((value, index) => a(value, index));

    setValue('key', '');
    setFilterRole('');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
            <Box rowGap={3} display="flex" alignItems="center" columnGap={2} sx={{ pb: 3 }}>
              <RHFTextField name="module" label="Module Name" />
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ width: 250, height: 55 }}
                onClick={() => {
                  addNewFild();
                }}
              >
                Add Fild
              </LoadingButton>
            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {state.filds[0]?.Filds?.map((input, index) => (
                <>
                  <RHFTextField name={`key${index}`} label="Key" value={input.keys} />
                  <RHFTextField name={`type${index}`} label="Type" value={input.type} />
                </>
              ))}

              <RHFTextField name="key" label="Key" />
              <UserTableToolbar
                filterRole={filterRole}
                optionsRole={ROLE_OPTIONS}
                onFilterRole={handleFilterRole}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Create Module
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
