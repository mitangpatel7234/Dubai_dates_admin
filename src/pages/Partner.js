import React, { useState,useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select,Input } from "@windmill/react-ui";
import PartnerTable from "../components/PartnerTable";
import axios from "axios";
import { server } from "../server";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Partner = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  
  const [page, setPage] = useState(1);
    
  
  

    const [data, setData] = useState([]);
    const [filterone, setFilter] = useState([]);
    
  
    // pagination setup
    const [totalResults, setTotalResults] = useState(0);
  
   
  
  
  
   // Function to fetch orders data from API
   const fetchGoals = async () => {
    try {
      const response = await axios.get(`${server}/partner/get-partners`);
      setData(response.data); // Update data state with fetched orders
      setTotalResults(response.data.length); 
      setFilter(response.data.slice(0, resultsPerPage));
      // Update totalResults with total count of orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  console.log(data)
  // Load data on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

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

// Function to handle updating a flavor



  

  return (
    <div>
      <PageTitle>Partner</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Partner</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center gap-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
              Add Partner
            </p>
           
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
      <PartnerTable onPageChange={onPageChange} resultsPerPage={resultsPerPage} totalResults={totalResults} filterone={filterone} />
    </div>
  );
};

export default Partner;
