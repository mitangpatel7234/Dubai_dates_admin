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


const PartnerTable = ({ resultsPerPage,filterone,totalResults,onPageChange }) => {
  
    
  

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              {/* <TableCell>Partner id</TableCell> */}
              <TableCell>Partner name</TableCell>
              <TableCell>Partner phoneNumber</TableCell>
              <TableCell>Partner email</TableCell>
              
            </tr>
          </TableHeader>
          <TableBody>
            {filterone.map((user, i) => (
              <TableRow key={i}>
                
                <TableCell>
                  <span className="text-sm">{user.name}</span>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{user.phoneNumber}</span>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm">{user.email}</span>
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

export default PartnerTable;
