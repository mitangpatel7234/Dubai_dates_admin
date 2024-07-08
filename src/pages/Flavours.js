import React, { useState,useEffect, useContext } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select,Input } from "@windmill/react-ui";
import FlavoursTable from "../components/FlavoursTable";
import axios from "axios";
import { server } from "../server";
import { UserPermissionContext } from "../context/UserPermissionsContext";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Flavours = () => {
  // pagination setup
  const {userPermission}=useContext(UserPermissionContext)
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [flavorName, setFlavorName] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [page, setPage] = useState(1);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to backend API
            const response = await axios.post(`${server}/flavour/create`, { name: flavorName },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('authToken')}`,
                  },
            })
            .then((response) => {
                console.log("Product deleted successfully", response.data);
                // Optionally, you can redirect or update state after successful delete
               
                window.location.reload();
                setFlavorName('');
              })
              .catch((error) => {
                console.error("Error deleting product", error);
              });

            // Clear input field after successful submission
           
        } catch (error) {
            console.error('Error adding flavor:', error.message);
        }
    };
  
  

    const [data, setData] = useState([]);
    const [filterone, setFilter] = useState([]);
    
  
    // pagination setup
    const [totalResults, setTotalResults] = useState(0);
  
   
  
  
  
   // Function to fetch orders data from API
   const fetchFlavours = async () => {
    try {
      const response = await axios.get(`${server}/flavour/get-flavours`);
      setData(response.data.flavours); // Update data state with fetched orders
      setTotalResults(response.data.flavours.length); 
      setFilter(response.data.flavours.slice(0, resultsPerPage));
      // Update totalResults with total count of orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  console.log(data)
  // Load data on component mount
  useEffect(() => {
      fetchFlavours();
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
const handleUpdate = async (event) => {
    event.preventDefault();
    if(!(userPermission==='ALL'||userPermission.includes('updateFlavour'))) return;
    if (!selectedFlavor) return;

    try {
      const response = await axios.put(
        `${server}/flavour/update/${selectedFlavor._id}`,
        { name: flavorName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem('authToken')}`,
          },
        }
      ).then((response) => {
        console.log("Flavor updated successfully", response.data);
      setFlavorName(''); // Clear input field after successful update
      setSelectedFlavor(null); // Clear selected flavor
      
        // Optionally, you can redirect or update state after successful delete
        window.location.reload();
        
        
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });


      // Optionally, update the list of flavours after updating
    } catch (error) {
      console.error("Error updating flavor:", error);
    }
  };


  const handleSelectFlavor = (flavor) => {
    setSelectedFlavor(flavor);
    setFlavorName(flavor.name); // Set the selected flavor name in the input field
  };

  return (
    <div>
      <PageTitle>Flavours</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Flavours</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center gap-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
              Add Flavours
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
            {selectedFlavor ? (
                <form onSubmit={handleUpdate} className="flex">
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter Updated Flavour name"
                    type="text"
                    value={flavorName}
                    onChange={(e) => setFlavorName(e.target.value)}
                    required
                  />
                </Label>
                <button type="submit" className="px-4 bg-white">
                  Update Flavor
                </button>
              </form>
        ):(
        <form onSubmit={handleSubmit} className="flex"> 
            <Label className="mx-3">
            <Input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Enter Flavour name here"
                  type="text"
                  value={flavorName}
                        onChange={(e) => setFlavorName(e.target.value)}
                        required
                  
                />
            </Label>
            
                
            
            <button type="submit" className="px-4 bg-white">Add Flavor</button>

            
            </form>
        )}
            
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <FlavoursTable onPageChange={onPageChange} resultsPerPage={resultsPerPage} totalResults={totalResults} filterone={filterone} onSelectFlavor={handleSelectFlavor}/>
    </div>
  );
};

export default Flavours;
