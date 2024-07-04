// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserPermissionContext } from '../context/UserPermissionsContext';

const ProtectedRoute = ({ component: Component, requiredPermission, ...rest }) => {
  const { userPermission,loading } = useContext(UserPermissionContext);
if (loading){
  return <div>Loading...</div>
}
  return (
    <Route
      {...rest}
      render={(props) =>
      !requiredPermission||  userPermission==="ALL"||userPermission.includes(requiredPermission) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default ProtectedRoute;
