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


const OrdersTable = ({ resultsPerPage, filter,filterStatus }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [filterone, setFilter] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // pagination setup
  const [totalResults, setTotalResults] = useState(0);

 



 // Function to fetch orders data from API
 const fetchOrders = async () => {
  try {
    const response = await axios.get(`${server}/order/all`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`, // Retrieve authToken from localStorage
      },
    });
    setData(response.data.orders); // Update data state with fetched orders
    setTotalResults(response.data.orders.length); // Update totalResults with total count of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

// Load data on component mount
useEffect(() => {
  fetchOrders();
}, []);

console.log(data)
 // pagination change control
 function onPageChange(p) {
  setPage(p);
}


// Handle click to view order items
const handleClickViewItems = (orderItems) => {
  setSelectedOrderItems(orderItems.order_items);
  setSelectedOrder(orderItems);
};

// Clear selected order items
const clearSelectedOrderItems = () => {
  setSelectedOrderItems(null);
};

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    // If Filters Applied
    
    if (filter === "success") {
      setFilter(
        data
          .filter((order) => order.payment_status === "Success")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    else if (filter === "cod") {
      setFilter(
        data
          .filter(order => order.payment_status === "cod")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    } else if (filter === "all") {
      const paginatedData = data.slice(
        (page - 1) * resultsPerPage,
        page * resultsPerPage
      );
      setFilter(paginatedData);
    }
  }, [page, resultsPerPage, filter, data]);

  useEffect(() => {
    filterOrders();
  }, [data, filterStatus]);
  
  const filterOrders = () => {
    if (filterStatus === 'all') {
      setFilter(data);
    } else {
      const filtered = data.filter(order =>
        order.order_items.some(item => item.delivery_status === filterStatus)
      );
      setFilter(filtered);
    }
  };

  
  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Client emailID</TableCell>
              <TableCell>order date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filterone.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{user.user_id?.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.user_id?.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.created_date}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.total_price}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      user.payment_status === "fail"
                        ? "danger"
                        : user.payment_status === "Success"
                        ? "success"
                        : "neutral"
                    }
                  >
                    {user.payment_status}
                  </Badge>
                  {/* <span className="text-sm">{user.payment_status}</span> */}
                </TableCell>
                {/* <TableCell>
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
                  </span>
                </TableCell> */}
                <TableCell>
                  {/* Button to view order items */}
                  <Button
                            icon={EyeIcon}
                            className="mr-3"
                            aria-label="Preview"
                            onClick={() => handleClickViewItems(user)}
                          />
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
{selectedOrder && (
  <div>
      {selectedOrderItems && (
        <OrderProduct orderItems={selectedOrderItems} order={selectedOrder} onClose={clearSelectedOrderItems} />
      )}
      </div>
    )}
    </div>
  );
};

export default OrdersTable;
