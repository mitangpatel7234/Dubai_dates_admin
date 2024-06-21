import React, { useState,useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select,Input } from "@windmill/react-ui";
import GoalTable from "../components/GoalTable";
import axios from "axios";
import { server } from "../server";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Goal = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [goalName, setGoalName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [page, setPage] = useState(1);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to backend API
            const response = await axios.post(`${server}/goal/create`, { name: goalName },{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('authToken')}`,
                  },
            })
            .then((response) => {
                console.log("Product deleted successfully", response.data);
                // Optionally, you can redirect or update state after successful delete
               
                window.location.reload();
                setGoalName('');
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
   const fetchGoals = async () => {
    try {
      const response = await axios.get(`${server}/goal/get-goal`);
      setData(response.data.Goals); // Update data state with fetched orders
      setTotalResults(response.data.Goals.length); 
      setFilter(response.data.Goals.slice(0, resultsPerPage));
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
const handleUpdate = async (event) => {
    event.preventDefault();
    if (!selectedGoal) return;

    try {
      const response = await axios.put(
        `${server}/goal/update/${selectedGoal._id}`,
        { name: goalName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem('authToken')}`,
          },
        }
      ).then((response) => {
        console.log("Goal updated successfully", response.data);
      setGoalName(''); // Clear input field after successful update
      setSelectedGoal(null); // Clear selected flavor
      
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


  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
    setGoalName(goal.name); // Set the selected flavor name in the input field
  };

  return (
    <div>
      <PageTitle>Goals</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Goals</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center gap-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
              Add Goal
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
            {selectedGoal ? (
                <form onSubmit={handleUpdate} className="flex">
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter Updated Flavour name"
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    required
                  />
                </Label>
                <button type="submit" className="px-4 bg-white">
                  Update Goal
                </button>
              </form>
        ):(
        <form onSubmit={handleSubmit} className="flex"> 
            <Label className="mx-3">
            <Input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Enter Flavour name here"
                  type="text"
                  value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        required
                  
                />
            </Label>
            
                
            
            <button type="submit" className="px-4 bg-white">Add Goal</button>

            
            </form>
        )}
            
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <GoalTable onPageChange={onPageChange} resultsPerPage={resultsPerPage} totalResults={totalResults} filterone={filterone} onSelectGoal={handleSelectGoal}/>
    </div>
  );
};

export default Goal;
