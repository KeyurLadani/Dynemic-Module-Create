import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField } from '../../../components/hook-form';
import { addModuleValue, updateDataValue } from '../../../Redux/ModuleReducer';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  module: PropTypes.object,
  moduleName: PropTypes.string,
  index: PropTypes.number,
  row: PropTypes.object,
};

export default function UserNewEditForm({
  isEdit = false,
  currentUser,
  module,
  moduleName,
  index,
  row,
}) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const state = useSelector((State) => State.module);
  const NewUserSchema = Yup.object().shape({
    // Module: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      // Module: currentUser?.name || moduleName,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    // resolver: yupResolver(NewUserSchema),
    // defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

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
      // state.moduleData.filter((val) => val.moduleName === moduleName)
      const findModule = [];
      let moduleIndex = 0;
      state.moduleData.map((val, i) => {
        if (val.moduleName === moduleName) {
          findModule.push(val);
          moduleIndex = i;
        }
        return val;
      });

      if (row === undefined) {
        if (findModule.length > 0) {
          const modules = { ...findModule[0] };
          if (modules.data === undefined) {
            modules.data = [data];
            Object.preventExtensions(modules);
            dispatch(addModuleValue({ modules, moduleIndex }));
          } else {
            const dataAdd = [...modules.data];
            dataAdd.push(data);
            modules.data = [...dataAdd];
            Object.preventExtensions(modules);
            dispatch(addModuleValue({ modules, moduleIndex }));
          }
        }
      } else {
        dispatch(updateDataValue({ data, index,moduleIndex }));
      }
      const key = Object.keys(data)
      key.map((val,i) =>{
        setValue(val,"")
        return val
      })
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (row !== undefined && row !== null) {
      const kay = Object.keys(row);
      kay.map((val, i) => {
        setValue(val, row[val]);
        return val;
      });
    }
  }, [row, setValue]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {module.Filds.map((val, i) =>
                val.type === 'Boolan' ? (
                  <RHFSwitch
                    name={val.keys}
                    labelPlacement="start"
                    label={
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        {val.keys}
                      </Typography>
                    }
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                ) : (
                  <RHFTextField name={val.keys} label={val.keys} type={val.type} />
                )
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {index === undefined && row === undefined
                  ? `Create ${moduleName}`
                  : `Update ${moduleName}`}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
