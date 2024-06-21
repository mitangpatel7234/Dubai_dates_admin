import React, { useState, useEffect } from "react";
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


const CouponTable = ({ resultsPerPage,filterone,totalResults,onPageChange }) => {
  
    const handleDelete = async (couponId) => {
        try {
          const response = await axios.delete(`${server}/coupon/delete/${couponId}`, {
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
              <TableCell>Coupon  name</TableCell>
              <TableCell>Coupon discount type</TableCell>
              <TableCell>Coupon  Amount</TableCell>
              <TableCell>Coupon  discount scope</TableCell>
              <TableCell>Coupon  from_date</TableCell>
              <TableCell>Coupon  valid_date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filterone.map((user, i) => (
              <TableRow key={i}>
                
                <TableCell>
                  <span className="text-sm">{user.coupon_name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.discount_type}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.discount_amount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.discount_scope}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.from_date}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.valid_date}</span>
                </TableCell>
                <TableCell>
                      <div className="flex">
                        
                        
                        
                       
                        <Button
                          icon={TrashIcon}
                          layout="outline"
                          
                          aria-label="Delete"
                          onClick={() => handleDelete(user._id)}
                        />
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

export default CouponTable;
