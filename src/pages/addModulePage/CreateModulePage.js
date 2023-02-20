import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import UserNewEditForm from '../../sections/auth/@addModule/user/UserNewEditForm';
// sections


// ----------------------------------------------------------------------

export default function CreateModulePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> User: Create a new user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Module"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Module',
              href: PATH_DASHBOARD.user.list,
            },
            { name: 'Create Module' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
