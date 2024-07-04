import React,{useState,useEffect} from "react";
import PageTitle from "../components/Typography/PageTitle";
import UserManagement from "../components/UserManagement";
import StaffTable from "../components/StaffTable";
import { AddIcon,GridViewIcon } from "../icons";
const Profile = () => {

  const [isUpdated,setIsUpdated]=useState(false)
  const [isUserManagement,setIsUserManagement]=useState(false)
  const [component,setComponent]=useState() 
  const handleAddUserClick=()=>{
    if(isUpdated){
      setIsUpdated(false)
      setComponent(<StaffTable 
        setIsUpdated={setIsUpdated}
        setComponent={setComponent}/>)
    }
    else if(!isUserManagement){
    setComponent(<UserManagement setIsUpdated={setIsUpdated}
      isUpdated={isUpdated}/>)
    setIsUserManagement(true)
    }else{
      setComponent(<StaffTable 
        setIsUpdated={setIsUpdated}
        setComponent={setComponent}/>)
      setIsUserManagement(false)
    }
  }
  useEffect(() => {
    setComponent(<StaffTable 
      setIsUpdated={setIsUpdated}
      setComponent={setComponent}/>)
    setIsUserManagement(false)
  }, [])
  
  return (
    <div>
<div className="flex items-center justify-start m-2">
      <PageTitle>Manage your Profile</PageTitle>
      <button onClick={handleAddUserClick}>
        <div className="flex ml-5 text-gray-800 dark:text-gray-300">
        <div>
          {isUserManagement||isUpdated?"View Users":"Add User"}
        </div>
        {isUserManagement||isUpdated?<GridViewIcon className="h-5 w-5 "/>:<AddIcon className="h-5 w-5 "/>}
        </div>
      </button>
    </div>
      {/* <UserManagement/> */}
      {component}
    </div>
  );
};

export default Profile;
