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


const PromoTable = ({ resultsPerPage,filterone,onSelectHero,totalResults,onPageChange }) => {
    const {userPermission}=useContext(UserPermissionContext)
    const handleDelete = async (promoId) => {
      if(!(userPermission==='ALL'||userPermission.includes('deletePromoProduct'))) return;

        try {
          const response = await axios.delete(`${server}/promo/delete/${promoId}`, {
            headers: {
              Authorization: `${localStorage.getItem('authToken')}`,
            },
          });
    
          console.log("hero deleted successfully", response.data);
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
              <TableCell>Promo image</TableCell>
              <TableCell>Promo mobile image</TableCell>
              <TableCell>Promo Title</TableCell>
              <TableCell>Promo Subtitle</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filterone.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-4 md:block"
                          src={user.promo_image}
                          alt="Product image"
                        />
                        
                      </div>
                    </TableCell>
                <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-4 md:block"
                          src={user.promo_mobileImage}
                          alt="Product image"
                        />
                        
                      </div>
                    </TableCell>
                <TableCell>
                  <span className="text-sm">{user.promo_title}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.promo_subTitle}</span>
                </TableCell>
                
                <TableCell>
                      <div className="flex">
                        
      {(userPermission==='ALL'||userPermission.includes('updatePromoProduct'))
                        &&
                        (<Button
                          icon={EditIcon}
                          className="mr-3"
                          layout="outline"
                          aria-label="Edit"
                          onClick={() => onSelectHero(user)}
                        />)}
      {(userPermission==='ALL'||userPermission.includes('deletePromoProduct'))
                       &&
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

export default PromoTable;
