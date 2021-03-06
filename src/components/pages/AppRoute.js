import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState } from '../../state/contexts';

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={props =>
        isPrivate && !userDetails.token ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
            <Component {...props} />
          )
      }
      {...rest}
    />
  );
};

export default AppRoute;
