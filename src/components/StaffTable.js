import React, { useState ,useEffect} from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from '@windmill/react-ui';
import axios from 'axios';
import { server } from '../server';
import UserManagement from './UserManagement'
// Import icons from your custom icons module
import {
  EditIcon,
  EyeIcon,
  GridViewIcon,
  TrashIcon,
} from '../icons';
import {toast} from "react-toast"

const StaffTable = ({setComponent,isUpdated,setIsUpdated}) => {
    const [staffs, setStaffs] = useState([
      // Add more staff data as needed
    ]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isDeleteModule,setIsDeleteModule]=useState(false)
    const [deletedSelectedUser,setDeletedSelectedUser]=useState({})
  useEffect(() => {
    axios.get(`${server}/staff/staffs`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem('authToken')}`,
          },
    })
      .then(response => {
        console.log(response.data);
            setStaffs(response.data.staffs)
      })
      .catch(error => {
        console.error('Error fetching permissions:', error);
      });
  }, [])
  
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };
  
    const togglePasswordVisibility = (index) => {
      const updatedStaffs = [...staffs];
      updatedStaffs[index].showPassword = !updatedStaffs[index].showPassword;
      setStaffs(updatedStaffs);
    };
  
    const openPermissionsModal = (staff) => {
      setSelectedStaff(staff);
      toggleModal();
    };
    const handleDeleteStaff=()=>{
        
        axios.delete(`${server}/staff/${deletedSelectedUser.id}`,{   headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem('authToken')}`,
          }}).then(res=>{
            if(res.status===200){
                toast.success("User Deleted Successfully")
                const remainingStaffs=staffs.filter(staff=>staff._id!==deletedSelectedUser.id)
                setStaffs(remainingStaffs)
            }else{
                toast.error(res?.data?.message??"Something went Wrong")
            }
            setIsDeleteModule(false)
            setModalOpen(false)

          }).catch(error => {
            toast.error(error.message)
            setIsDeleteModule(false)
            setModalOpen(false)
          })
    }
    const handleEditStaff=(staffEmail,staffPassword,staffPermissions,staffId)=>{
        setIsUpdated(true)
        setComponent(<UserManagement staffEmail={staffEmail} 
            staffPassword={staffPassword} setIsUpdated={setIsUpdated}
            setComponent={setComponent}
            isUpdated={true} staffId={staffId}
            staffPermissions={staffPermissions}  isStaffUpdated={true}/>)
    }
    const handleOpenDeleteModule=(id,email)=>{
        setIsDeleteModule(true)
        setDeletedSelectedUser({id,email})
        setModalOpen(true)
    }
    return (
      <div className="p-6">
        {staffs.length>0?<Table>
          <TableHeader>
            <tr>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {staffs.map((staff, index) => (
              <TableRow key={staff._id}>
                <TableCell>{staff.email}</TableCell>
                <TableCell>
                  {staff.showPassword ? (
                    <span>{staff.plainPassword}</span>
                  ) : (
                    <span>••••••••</span>
                  )}
                  <Button size="small" className="ml-2" onClick={() => togglePasswordVisibility(index)}>
                    <EyeIcon className="h-5 w-5 text-white-500" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button size="small" onClick={() => openPermissionsModal(staff)}>
                    <GridViewIcon className="h-5 w-5 text-white-500" />
                    View Permissions
                  </Button>
                </TableCell>
                <TableCell>
                  <Button size="small" onClick={()=>handleEditStaff(staff.email,staff.plainPassword,staff.permissions,staff._id)}>
                    <EditIcon className="h-5 w-5 text-white-500" />
                    Edit
                  </Button>
                  <Button size="small" className="ml-2" onClick={()=>handleOpenDeleteModule(staff._id,staff.email)}>
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </Button>
                </TableCell>
             </TableRow>
            ))}
          </TableBody>
        </Table>:<div>No Data</div>}
  
        {/* Permissions Modal */}
        {/* Permissions Modal */}
        <Modal isOpen={modalOpen} onClose={toggleModal}>
        <ModalHeader>{isDeleteModule?`Are you Sure,You want to delete ${deletedSelectedUser.email}?`:`Permissions for ${selectedStaff && selectedStaff.email}`}</ModalHeader>
        <ModalBody>
          {isDeleteModule?(<div>
            <p>Are you sure you want to delete {deletedSelectedUser.email}?</p>
            <p>Deleting this user will remove all of their data.</p>
          </div>):(<div className="overflow-y-auto max-h-80 flex flex-wrap justify-around mt-2">
            {selectedStaff && selectedStaff.permissions.map((permission, index) => (
              <Label key={index} check className="mr-1 mt-1">
                <Input type="checkbox" checked={true} /> {permission}
              </Label>
            ))}
          </div>)}
        </ModalBody>
        <ModalFooter>
          <Button onClick={isDeleteModule?handleDeleteStaff:toggleModal}>{isDeleteModule? 'Delete': 'Close'}</Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  };
  
  export default StaffTable;
  