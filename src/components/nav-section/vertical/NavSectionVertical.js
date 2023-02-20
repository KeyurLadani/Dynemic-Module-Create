import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { List, Stack } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
//
import { StyledSubheader } from './styles';
import NavList from './NavList';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { ICONS } from '../../../layouts/dashboard/nav/config-navigation';
import { createRoutes } from '../../../Redux/ModuleReducer';


// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
};

export default function NavSectionVertical({ data, sx, ...other }) {
  const { translate } = useLocales();
  const state = useSelector((State) => State.module);
  const [routes, setRoutes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const Route = [];
    const createRoutesData = (val) => {
      const RouteObj = { title: val.moduleName, path: `/module/${val.moduleName}`, icon: ICONS.ecommerce };
      Route.push(RouteObj);
    };
    
    if(state.moduleData.length > 0){
      state?.moduleData?.map((val, index) => createRoutesData(val));
      setRoutes(Route)
      
    }
    
  }, [state?.moduleData,dispatch]);


  useEffect(()=>{
    if(routes.length > 0){
      dispatch(createRoutes(routes))
    }
  },[routes,dispatch])

  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;
        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{`${translate(group.subheader)}`}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
          </List>
        );
      })}
      <List disablePadding sx={{ px: 2 }}>
        {routes.map((list) => (
          <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} />
        ))}
      </List>
    </Stack>
  );
}
