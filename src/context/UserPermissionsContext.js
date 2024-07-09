import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { server } from "../server";

// Create context
export const UserPermissionContext = React.createContext();

export const UserPermissionProvider = ({ children }) => {
  const [userPermission, setUserPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const localToken=localStorage.getItem('authToken')
    const [token,setToken]=useState(localToken)
  
 
    useEffect(() => {
        let isMounted = true; // flag to track if the component is mounted
    
        const fetchPermissions = async () => {
          try {
            if (token) {
              const res = await axios.get(`${server}/staff/permission`, {
                headers: {
                  Authorization: token
                }
              });
    
              if (isMounted) {
                if (res.data.success) {
                  setUserPermission(res.data.permission);
                } else {
                  console.error("Error in response:", res.data);
                }
                setLoading(false);
              }
            } else {
              console.error("Token not found in localStorage");
              setLoading(false);
            }
          } catch (err) {
            console.error("Axios error:", err.message);
            setLoading(false);
          }
        };
    
        fetchPermissions();
    
        return () => {
          isMounted = false; // cleanup function to set the flag to false on unmount
        };
      }, []);  
  const value = useMemo(
    () => ({
      userPermission,
      setUserPermission,
      loading,
      setLoading,
      setToken
    }),
    [userPermission, loading]
  );

  return (
    <UserPermissionContext.Provider value={value}>
      {children}
    </UserPermissionContext.Provider>
  );
};
