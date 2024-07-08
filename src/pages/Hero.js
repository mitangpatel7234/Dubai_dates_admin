import React, { useState,useEffect, useContext } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select,Input } from "@windmill/react-ui";
import HeroTable from "../components/HeroTable";
import axios from "axios";
import { server } from "../server";
import { UserPermissionContext } from "../context/UserPermissionsContext";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Hero = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [heroName, setHeroName] = useState('');
  const {userPermission}=useContext(UserPermissionContext)
  const [selectedHero, setSelectedHero] = useState(null);
  const [page, setPage] = useState(1);
  const [heroImage, setHeroImage] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!(userPermission==='ALL'||userPermission.includes('createHero'))) return;
    const formData = new FormData();
    formData.append('hero_name', heroName);
    
    if (heroImage) {
      formData.append('image', heroImage); // Append the image file
    }

        try {
            // Send POST request to backend API
            const response = await axios.post(`${server}/hero/create`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${localStorage.getItem('authToken')}`,
                  },
            })
            .then((response) => {
                console.log("Product deleted successfully", response.data);
                // Optionally, you can redirect or update state after successful delete
               
                window.location.reload();
                setHeroName('');
                
        setHeroImage(null);
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
      const response = await axios.get(`${server}/hero/hero`);
      setData(response.data.hero); // Update data state with fetched orders
      setTotalResults(response.data.hero.length); 
      setFilter(response.data.hero.slice(0, resultsPerPage));
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
  if(!(userPermission==='ALL'||userPermission.includes('updateHero'))) return;
    if (!selectedHero) return;

    const formData = new FormData();
    formData.append('hero_name', heroName);
    
    if (heroImage) {
      formData.append('image', heroImage); // Append the image file for update
    }

    try {
      const response = await axios.put(
        `${server}/hero/update/${selectedHero._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem('authToken')}`,
          },
        }
      ).then((response) => {
        console.log("Category updated successfully", response.data);
        setHeroName('');
        
        setHeroImage(null);
        setSelectedHero(null);// Clear selected flavor
      
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


  const handleSelectHero = (hero) => {
    setSelectedHero(hero);
    setHeroName(hero.hero_name);
     // Set the selected flavor name in the input field
  };

  return (
    <div>
      <PageTitle>Hero</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Hero</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center gap-5">
        {(userPermission==='ALL'||userPermission.includes('createHero')) &&

          (<p className="text-sm text-gray-600 dark:text-gray-400">
              Add Hero
            </p>)}
           
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
            {selectedHero ? (
                <form onSubmit={handleUpdate} className="flex">
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter Updated hero name"
                    type="text"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    
                  />
                </Label>
                
                <Label className="mx-3">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    type="file"
                    onChange={(e) => setHeroImage(e.target.files[0])}
                    
                  />
                </Label>
                <button type="submit" className="px-4 bg-white">
                  Update Hero
                </button>
              </form>
        ):(
        <form onSubmit={handleSubmit} className="flex"> 
            <Label className="mx-3">
            <Input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Enter hero name here"
                  type="text"
                  value={heroName}
                        onChange={(e) => setHeroName(e.target.value)}
                        required
                  
                />
            </Label>
            
            
            <Label className="mx-3">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    type="file"
                    onChange={(e) => setHeroImage(e.target.files[0])}
                    required
                  />
                </Label>  
            
            <button type="submit" className="px-4 bg-white">Add Hero</button>

            
            </form>
        )}
            
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <HeroTable onPageChange={onPageChange} resultsPerPage={resultsPerPage} totalResults={totalResults} filterone={filterone} onSelectHero={handleSelectHero}/>
    </div>
  );
};

export default Hero;
