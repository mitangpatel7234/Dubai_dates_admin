import React, { useState,useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select,Input } from "@windmill/react-ui";
// import HeroTable from "../components/HeroTable";
import axios from "axios";
import { server } from "../server";
import PromoTable from "../components/PromoTable";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Promo = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [promoName, setPromoName] = useState('');
  const [promoTitle, setPromoTitle] = useState('');
 
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [page, setPage] = useState(1);
  const [promoImage, setPromoImage] = useState(null);
  const [promoMobileImage, setPromoMobileImage] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
    const formData = new FormData();
    formData.append('promo_title', promoName);
    formData.append('promo_subTitle', promoTitle);
    
    if (promoImage) {
      formData.append('promo_image', promoImage); // Append the image file
    }
    if (promoMobileImage) {
      formData.append('promo_mobileImage', promoMobileImage); // Append the image file
    }

        try {
            // Send POST request to backend API
            const response = await axios.post(`${server}/promo/create`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${localStorage.getItem('authToken')}`,
                  },
            })
            .then((response) => {
                console.log("Product deleted successfully", response.data);
                // Optionally, you can redirect or update state after successful delete
               
                window.location.reload();
                setPromoName('');
                setPromoTitle('');
                
                setPromoMobileImage(null);
        setPromoImage(null);
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
   const fetchPromo = async () => {
    try {
      const response = await axios.get(`${server}/promo/get`);
      setData(response.data.promos); // Update data state with fetched orders
      setTotalResults(response.data.promos.length); 
      setFilter(response.data.promos.slice(0, resultsPerPage));
      // Update totalResults with total count of orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  console.log(data)
  // Load data on component mount
  useEffect(() => {
    fetchPromo();
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
    if (!selectedPromo) return;

    const formData = new FormData();
    formData.append('promo_title', promoName);
    formData.append('promo_subTitle', promoTitle);
    
    if (promoImage) {
      formData.append('promo_image', promoImage); // Append the image file
    }
    if (promoMobileImage) {
      formData.append('promo_mobileImage', promoMobileImage); // Append the image file
    }

    try {
      const response = await axios.put(
        `${server}/promo/update/${selectedPromo._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem('authToken')}`,
          },
        }
      ).then((response) => {
        console.log("Category updated successfully", response.data);
        setPromoName('');
        setPromoTitle('');
        
        setPromoMobileImage(null);
        setPromoImage(null);
        setSelectedPromo(null);// Clear selected flavor
      
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


  const handleSelectHero = (promo) => {
    setSelectedPromo(promo);
    setPromoName(promo.promo_title);
    setPromoTitle(promo.promo_subTitle);
     // Set the selected flavor name in the input field
  };

  return (
    <div>
      <PageTitle>Promo</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Promo</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center gap-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
              Add Promo
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
            {selectedPromo ? (
                <form onSubmit={handleUpdate} className="grid grid-col-2"> 
                <div className="flex ">
                    <Label className="mx-3">
                    <Input
                          className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                          placeholder="Enter Promo  description"
                          type="text"
                          value={promoName}
                                onChange={(e) => setPromoName(e.target.value)}
                                required
                          
                        />
                    </Label>
                    
                    <Label className="mx-3">
                          <Input
                            className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                            placeholder="Enter Promo Title"
                            type="text"
                            value={promoTitle}
                            onChange={(e) => setPromoTitle(e.target.value)}
                            
                          />
                        </Label>
                        </div>  
                        <div className="flex mt-3">
                        <Label className="mx-3">
                        <Label>Mobile Image</Label>
                          <input
                            className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                            type="file"
                            onChange={(e) => setPromoMobileImage(e.target.files[0])}
                            
                          />
                        </Label>
                    <Label className="mx-3">
                        <Label>Desktop Image</Label>
                          <input
                            className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                            type="file"
                            onChange={(e) => setPromoImage(e.target.files[0])}
                            required
                          />
                        </Label>  
                        </div> 
                    <button type="submit" className="px-4 bg-white mt-3">update Promo</button>
        
                    
                    </form>
        ):(
        <form onSubmit={handleSubmit} className="grid grid-col-2"> 
        <div className="flex ">
            <Label className="mx-3">
            <Input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Enter Promo  description"
                  type="text"
                  value={promoName}
                        onChange={(e) => setPromoName(e.target.value)}
                        required
                  
                />
            </Label>
            
            <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter Promo Title"
                    type="text"
                    value={promoTitle}
                    onChange={(e) => setPromoTitle(e.target.value)}
                    
                  />
                </Label>
                </div>  
                <div className="flex mt-3">
                <Label className="mx-3">
                <Label>Mobile Image</Label>
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    type="file"
                    onChange={(e) => setPromoMobileImage(e.target.files[0])}
                    
                  />
                </Label>
            <Label className="mx-3">
                <Label>Desktop Image</Label>
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    type="file"
                    onChange={(e) => setPromoImage(e.target.files[0])}
                    required
                  />
                </Label>  
                </div> 
            <button type="submit" className="px-4 bg-white mt-3">Add Promo</button>

            
            </form>
        )}
            
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <PromoTable onPageChange={onPageChange} resultsPerPage={resultsPerPage} totalResults={totalResults} filterone={filterone} onSelectHero={handleSelectHero}/>
    </div>
  );
};

export default Promo;
