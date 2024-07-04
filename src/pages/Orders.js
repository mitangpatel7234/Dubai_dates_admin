import React, { useState,useContext } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select } from "@windmill/react-ui";
import OrdersTable from "../components/OrdersTable";
import { UserPermissionContext } from "../context/UserPermissionsContext";
function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Orders = () => {
  const { userPermission } = useContext(UserPermissionContext);
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [filter, setFilter] = useState("all");
  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilter = (filter_name) => {
    console.log(filter_name);
    if (filter_name == "All") {
      setFilter("all");
    }
    if (filter_name == "cod") {
      setFilter("cod");
    }
    if (filter_name == "success") {
      setFilter("success");
    }
    
  };
  const handleFilterStatus = (filter_name) => {
    console.log(filter_name);
    if (filter_name == "All") {
      setFilterStatus("all");
    }
    if (filter_name == "Pending") {
      setFilterStatus("Pending");
    }
    if (filter_name == "In Transit") {
      setFilterStatus("In Transit");
    }
    if (filter_name == "Delivered") {
      setFilterStatus("Delivered");
    }
    
  };

  return  (
    <div>
      <PageTitle>Orders</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Orders</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter Orders
            </p>

            <Label className="mx-3">
              <Select
                className="py-3"
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option>All</option>
                <option>cod</option>
                <option>success</option>
                
              </Select>
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter Orders
            </p>

            <Label className="mx-3">
              <Select
                className="py-3"
                onChange={(e) => handleFilterStatus(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>In Transit</option>
                <option>Delivered</option>
                
              </Select>
            </Label>

            <Label className="">
              {/* <!-- focus-within sets the color for the icon when input is focused --> */}
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  value={resultsPerPage}
                  onChange={(e) => setResultPerPage(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  {/* <SearchIcon className="w-5 h-5" aria-hidden="true" /> */}
                  Results on Table
                </div>
              </div>
            </Label>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <OrdersTable resultsPerPage={resultsPerPage} filter={filter} filterStatus={filterStatus}/>
    </div>
  );
};

export default Orders;
