import React, { useState,useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select,Input } from "@windmill/react-ui";
import CategoryTable from "../components/CategoryTable";
import axios from "axios";
import { server } from "../server";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Category = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [categoryName, setCategoryName] = useState('');
  const [categorydesc, setCategoryDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [categoryImage, setCategoryImage] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('cat_description', categorydesc);
    if (categoryImage) {
      formData.append('image', categoryImage); // Append the image file
    }

        try {
            // Send POST request to backend API
            const response = await axios.post(`${server}/category/create`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${localStorage.getItem('authToken')}`,
                  },
            })
            .then((response) => {
                console.log("Product deleted successfully", response.data);
                // Optionally, you can redirect or update state after successful delete
               
                window.location.reload();
                setCategoryName('');
                setCategoryDesc('');
        setCategoryImage(null);
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
   const fetchCategory = async () => {
    try {
      const response = await axios.get(`${server}/category/categories`);
      setData(response.data.categories); // Update data state with fetched orders
      setTotalResults(response.data.categories.length); 
      setFilter(response.data.categories.slice(0, resultsPerPage));
      // Update totalResults with total count of orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  console.log(data)
  // Load data on component mount
  useEffect(() => {
    fetchCategory();
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
    if (!selectedCategory) return;

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('cat_description', categorydesc);
    if (categoryImage) {
      formData.append('image', categoryImage); // Append the image file for update
    }

    try {
      const response = await axios.put(
        `${server}/category/update/${selectedCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem('authToken')}`,
          },
        }
      ).then((response) => {
        console.log("Category updated successfully", response.data);
        setCategoryName('');
        setCategoryDesc('');
        setCategoryImage(null);
        setSelectedCategory(null);// Clear selected flavor
      
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


  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryDesc(category.cat_description); // Set the selected flavor name in the input field
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
              Add Category
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
            {selectedCategory ? (
                <form onSubmit={handleUpdate} className="flex">
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter Updated category name"
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </Label>
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter Updated link name"
                    type="text"
                    value={categorydesc}
                    onChange={(e) => setCategoryDesc(e.target.value)}
                    required
                  />
                </Label>
                <Label className="mx-3">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    type="file"
                    onChange={(e) => setCategoryImage(e.target.files[0])}
                    required
                  />
                </Label>
                <button type="submit" className="px-4 bg-white">
                  Update Category
                </button>
              </form>
        ):(
        <form onSubmit={handleSubmit} className="flex"> 
            <Label className="mx-3">
            <Input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Enter category name here"
                  type="text"
                  value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                  
                />
            </Label>
            <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter url link"
                    type="text"
                    value={categorydesc}
                    onChange={(e) => setCategoryDesc(e.target.value)}
                    required
                  />
                </Label>
            
            <Label className="mx-3">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    type="file"
                    onChange={(e) => setCategoryImage(e.target.files[0])}
                    required
                  />
                </Label>  
            
            <button type="submit" className="px-4 bg-white">Add Category</button>

            
            </form>
        )}
            
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <CategoryTable onPageChange={onPageChange} resultsPerPage={resultsPerPage} totalResults={totalResults} filterone={filterone} onSelectGoal={handleSelectCategory}/>
    </div>
  );
};

export default Category;
