import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../server';
import {toast} from "react-toast"
import StaffTable from './StaffTable';
function elementWiseComparison(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
const UserManagement = ({staffEmail,staffPassword,staffPermissions,staffId,setComponent,setIsUpdated,isUpdated}) => {
    const [email, setEmail] = useState(staffEmail||'');
    const [password, setPassword] = useState(staffPassword||'');
    const [permissions, setPermissions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(staffPermissions){
        var selectedPermissions={}
        staffPermissions.forEach((permission) => {
            selectedPermissions[permission]=true
        })
        setSelectedPermissions(selectedPermissions)
    }
    // Fetch permissions from API
    axios.get(`${server}/staff/permissions`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem('jwt')}`,
          },
    })
      .then(response => {
        console.log(response.data);
        setPermissions(response.data.formattedPermissions);
      })
      .catch(error => {
        console.error('Error fetching permissions:', error);
      });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setSelectedPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };
  const validateForm = () => {
    let formErrors = {};
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if(Object.keys(selectedPermissions).length==0){
        return false;
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const isFormValid = () => {
    if(isUpdated){
        const selectedPermissionsArray = Object.keys(selectedPermissions).filter(
            (key) => selectedPermissions[key]
          );        
          
          return !elementWiseComparison(selectedPermissionsArray,staffPermissions);
    }
    return (
      email &&
      /\S+@\S+\.\S+/.test(email) &&
      password &&
      password.length >= 6&&
      Object.keys(selectedPermissions).length>0
    );
  };
  console.log(isUpdated)
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isUpdated){
        if(isFormValid){
            const selectedPermissionsArray = Object.keys(selectedPermissions).filter(
                (key) => selectedPermissions[key]
              );        
              axios.put(`${server}/staff/permissions/${staffId}`,{
                permissions:selectedPermissionsArray,
                
              },{
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `${localStorage.getItem('jwt')}`
                }
              }).then(res=>{
                if(res.status===200){
                    toast.success('User Permissions Updated Successfully')
                    setIsUpdated(false)
                    setComponent(<StaffTable
                        setIsUpdated={setIsUpdated}
                        setComponent={setComponent}/>)
                }else{
                    toast.error(res.data.message??'Something went wrong')
                }
              }).catch(e=>{
                toast.error(e.message)
              })
        }
    }
    else if (validateForm()) {
      // Handle form submission logic here, such as making an API call
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Permissions:', selectedPermissions);
      // Reset form after submission
      const selectedPermissionsArray = Object.keys(selectedPermissions).filter(
        (key) => selectedPermissions[key]
      );
      axios.post(`${server}/staff/register`, {
        email: email,
        password: password,
        permissions: selectedPermissionsArray
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem('jwt')}`
        }
      }).then(res=>{
        if(res.status===201){
            setEmail('');
            setPassword('');
            setSelectedPermissions({});
            setErrors({});
            toast.success("User added Successfully!")
        }else{
            console.log(res)
            toast.error("Something went wrong! Try again later.")
        }
      }).catch(e=>{
        console.log(e)
        toast.error(e.response?.data?.message)
      })
  
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mx-auto mt-10 p-5 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-5">{isUpdated?"Update Permissions":"Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={isUpdated}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-3 py-2 border rounded pr-10"
            value={password}
            onChange={handlePasswordChange}
            required
            disabled={isUpdated}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center text-sm leading-5"
          >
            {showPassword ? (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 12l-3 3-3-3m6-3l-3-3-3 3"></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m9 0a7.975 7.975 0 001.485-2.893M19.927 6.074a8 8 0 010 11.852M14.586 5.414a2 2 0 012.828 0l2.828 2.828a2 2 0 010 2.828m0 4.244a2 2 0 010 2.828l-2.828 2.828a2 2 0 01-2.828 0M9.414 18.586a2 2 0 01-2.828 0L3.757 15.758a2 2 0 010-2.828m0-4.244a2 2 0 010-2.828L6.586 4.414a2 2 0 012.828 0m4.244 0a2 2 0 012.828 0m2.828 2.828a2 2 0 010 2.828m-9.172 9.172a2 2 0 010-2.828M4.414 9.414a2 2 0 010-2.828l2.828-2.828a2 2 0 012.828 0"></path>
              </svg>
            )}
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Permissions:</label>
          <div className="grid grid-cols-3 gap-4">
            {permissions.map((permission) => (
              <div key={permission.id} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name={permission.name}
                    className="form-checkbox"
                    checked={selectedPermissions[permission.name] || false}
                    onChange={handlePermissionChange}
                  />
                  <span className="ml-2">{permission.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded ${isFormValid() ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-800 cursor-not-allowed'}`}
          disabled={!isFormValid()}
        >
{isUpdated?"Update Permissions":"Add User"}        </button>
      </form>
    </div>
  );
};

export default UserManagement;
