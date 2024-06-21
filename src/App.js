import React, {useState, useEffect, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import axios from "axios";
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoutes";
import { ToastContainer, toast } from 'react-toast'
const Layout = lazy(() => import("./containers/Layout"));

const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      setAuthToken(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  const handleSetAuthToken = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };


  
  return (
    <>
      <Router>
      <ToastContainer />
        <AccessibleNavigationAnnouncer />
        <Switch>
        <Route path="/login">s
        {authToken ? <Redirect to="/app" /> : <Login setAuthToken={handleSetAuthToken} />}
        </Route>
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <ProtectedRoute path="/app" component={Layout} authToken={authToken}/>
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect from="/" to="/app" />
        </Switch>
      </Router>
    </>
  );
}

export default App;