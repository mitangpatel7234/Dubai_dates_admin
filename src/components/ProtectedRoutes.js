// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, authToken, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;


// import React from "react"
// import { Redirect } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, authToken }) => {
  
//   console.log(authToken)
//     if (!authToken) {
//       return <Redirect to="/login" replace/>;
//     } else {
//         return <Redirect to="/app" replace/>;
//     }
    
  
// };

// export default ProtectedRoute;
