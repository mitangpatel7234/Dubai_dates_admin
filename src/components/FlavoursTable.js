import React, { useState, useEffect, useContext } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Button,
  Pagination,
} from "@windmill/react-ui";
import response from "../utils/demo/ordersData";
import { server } from "../server";
import axios from "axios";
import {
  EditIcon,
  EyeIcon,
  GridViewIcon,
  HomeIcon,
  ListViewIcon,
  TrashIcon,
} from "../icons";
import OrderProduct from "../pages/OrderProduct";
import { UserPermissionContext } from "../context/UserPermissionsContext";


const FlavoursTable = ({ resultsPerPage,filterone,onSelectFlavor,totalResults,onPageChange }) => {
    const {userPermission}=useContext(UserPermissionContext)
    const handleDelete = async (flavourId) => {
      if( !(userPermission==='ALL'||userPermission.includes('deleteFlavour'))) return;
        try {
          const response = await axios.delete(`${server}/flavour/delete/${flavourId}`, {
            headers: {
              Authorization: `${localStorage.getItem('authToken')}`,
            },
          });
    
          console.log("Flavor deleted successfully", response.data);
          window.location.reload();
           // Notify parent component of deletion
        } catch (error) {
          console.error("Error deleting flavor:", error);
        }
      };
  

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Flavour id</TableCell>
              <TableCell>Flavour name</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filterone.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{user?._id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.name}</span>
                </TableCell>
                <TableCell>
                      <div className="flex">
                        
                      { (userPermission==='ALL'||userPermission.includes('updateFlavour')) &&
                        (<Button
                          icon={EditIcon}
                          className="mr-3"
                          layout="outline"
                          aria-label="Edit"
                          onClick={() => onSelectFlavor(user)}
                        />)}
                  { (userPermission==='ALL'||userPermission.includes('deleteFlavour')) &&
                        (<Button
                          icon={TrashIcon}
                          layout="outline"
                          
                          aria-label="Delete"
                          onClick={() => handleDelete(user._id)}
                        />)}
                      </div>
                    </TableCell>
                
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

    </div>
  );
};

export default FlavoursTable;
