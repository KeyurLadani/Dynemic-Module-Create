import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
import { useLocation } from 'react-router';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';


// ----------------------------------------------------------------------

export default function AddModuleDataPage() {
  const { themeStretch } = useSettingsContext();
  const location = useLocation()
  const module = location?.state?.moduleData
  const Index = location.state.index
  const row = location?.state?.row 

  return (
    <>
      <Helmet>
        <title> User: Create a new user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Add ${module.moduleName} Module Data`}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: module.moduleName,
              href: PATH_DASHBOARD.user.list,
            },
            { name: 'New user' },
          ]}
        />
        <UserNewEditForm module={module} moduleName={module.moduleName} index={Index} row={row} />
      </Container>
    </>
  );
}
