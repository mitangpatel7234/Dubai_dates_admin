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


const CutomersTable = ({ resultsPerPage }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filterone, setFilter] = useState([]);
  

  // pagination setup
  const [totalResults, setTotalResults] = useState(0);

 



 // Function to fetch orders data from API
 const fetchCustomers = async () => {
  try {
    const response = await axios.get(`${server}/user/alluser`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
      }});
    setData(response.data); // Update data state with fetched orders
    setTotalResults(response.data.length); 
    setFilter(response.data.slice(0, resultsPerPage));// Update totalResults with total count of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};
console.log(data)
// Load data on component mount
useEffect(() => {
    fetchCustomers();
}, []);

console.log(data)
 // pagination change control
 function onPageChange(p) {
  setPage(p);
}

useEffect(() => {
    const paginatedData = data.slice(
      (page - 1) * resultsPerPage,
      page * resultsPerPage
    );
    setFilter(paginatedData);
  }, [page, resultsPerPage]);


  // on page change, load new sliced data
  // here you would make another server request for new data
  

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client Name</TableCell>
              <TableCell>Client emailID</TableCell>
              <TableCell>Client Phone no</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Joined at</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filterone.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.phoneNumber}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.dateOfBirth}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.created_date}</span>
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

export default CutomersTable;
