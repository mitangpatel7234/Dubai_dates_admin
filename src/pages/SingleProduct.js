import React, { useState,useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";
import response from "../utils/demo/productData";

import { genRating } from "../utils/genarateRating";
import { server } from "../server";
import axios from "axios";
import {
  Card,
  CardBody,
  Label,
  Select,
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // change view component
  const [tabView, setTabView] = useState("reviews");
  const handleTabView = (viewName) => setTabView(viewName);

  //   get product
  // let product = response.filter((product) => product.id == id)[0];
  useEffect(() => {
    axios.get(`${server}/product/products/${id}`) // Replace with your API endpoint
        .then((response) => {
            setData(response.data);
            setLoading(false);
            
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

  return (
    <div>
      <PageTitle>Product Details</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <NavLink exact to="/app/all-products" className="mx-2 text-purple-600">
          All Products
        </NavLink>
        {">"}
        <p className="mx-2">{data.name}</p>
      </div>

      {/* Product overview  */}
      <Card className="my-8 shadow-md">
        <CardBody>
          <div className="grid grid-col items-center md:grid-cols-2 lg:grid-cols-2">
            <div>
              <img src={data?.product_image} alt="" className="w-[200px] rounded-lg" />
            </div>

            <div className="mx-8 pt-5 md:pt-0">
              <h1 className="text-3xl mb-2 font-semibold text-gray-700 dark:text-gray-200">
                {data?.name}
              </h1>

              <Badge
                type={data?.stock_levels > 0 ? "success" : "danger"}
                className="mb-2"
              >
                <p className="break-normal">
                  {data?.stock_levels > 0 ? `In Stock` : "Out of Stock"}
                </p>
              </Badge>
              <h4 className="mt-2 text-purple-600 text-2xl font-semibold">
                Stock: {data?.stock_levels}
              </h4>
              
              
              {/* <p className="mb-3 text-sm text-gray-800 dark:text-gray-300">
                {product?.featureDescription}
              </p> */}

              {/* <p className="text-sm text-gray-900 dark:text-gray-400">
                Product Rating
              </p>
              <div>{genRating(product.rating, product.reviews.length, 6)}</div> */}

              <h4 className="mt-4 text-purple-600 text-2xl font-semibold">
               Sale Price: {data?.sale_price}
              </h4>
              <p className="text-sm text-gray-900 dark:text-gray-400">
                Product MRP : {data?.mrp}
              </p>
                <p className="text-m mt-3 font-semibold text-gray-900 dark:text-gray-400">
                Product Falvours 
              </p>
              <Label className="mx-3 mt-1 w-[25px]">
                <Select className="py-3 w-[250px]" >
                  {data?.product_falvours.map((flavour, index) => (
                    <option key={flavour._id} value={flavour}>
                      {flavour.name}
                    </option>
                  ))}
                </Select>
              </Label>
              <p className="text-m mt-3 font-semibold text-gray-900 dark:text-gray-400">
                Product Goals 
              </p>  
              <Label className="mx-3 mt-1 w-[25px]">
                <Select className="py-3 w-[250px]" >
                  {data?.product_goal.map((goal, index) => (
                    <option key={goal._id} value={goal}>
                      {goal.name}
                    </option>
                  ))}
                </Select>
              </Label>
              <p className="text-m mt-3 font-semibold text-gray-900 dark:text-gray-400">
                Product Category 
              </p>
              <Label className="mx-3 mt-1 w-[25px]">
                <Select className="py-3 w-[250px]" >
                  {data?.product_categories.map((category, index) => (
                    <option key={category._id} value={category}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Label>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Product Reviews and Description */}
      <Card className="my-8 shadow-md">
        <CardBody>
          {/* Navigation Area */}
          <div className="flex items-center">
            <Button
              className="mx-5"
              layout="link"
              onClick={() => handleTabView("reviews")}
            >{`Reviews (${data.product_reviews.length})`}</Button>
            <Button layout="link" onClick={() => handleTabView("description")}>
              Description
            </Button>
            <Button layout="link" onClick={() => handleTabView("faq")}>
              FAQ
            </Button>
          </div>

          {/* Divider */}
          <hr className="mx-3 my-2 customeDivider" />

          {/* Component area */}
          <div className="mx-3 mt-4">
            {tabView === "reviews" ? (
              <>
                
               

                <div className="mt-4">
                  {data?.product_reviews.map((review, i) => (
                    <div className="flex py-3" key={i}>
                      
                      <div>
                        <p className="font-medium text-lg text-gray-800 dark:text-gray-300">
                          {review.user_name}
                        </p>
                        {genRating(review.rating, null, 4)}
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : tabView === "description" ? (
              <>
                <div className="px-3">
                <p className="text-sm text-gray-800 dark:text-gray-300 font-semibold">Product Overview:</p>
                  <p className="text-sm text-gray-800 dark:text-gray-300">
                    {data?.product_description}
                  </p>
                </div>
              </>
            ) : tabView === "faq" ? (
              <><div className="px-3">
                <p className="text-sm text-gray-800 dark:text-gray-300 font-semibold">Product Overview:</p>
              <p className="mb-2 text-sm text-gray-800 dark:text-gray-300">
                {data?.product_overview}
              </p>
              <p className="mt-3 text-sm text-gray-800 dark:text-gray-300 font-semibold">Product Benifits:</p>
              <p className="mb-2 text-sm text-gray-800 dark:text-gray-300">
                {data?.product_benefits}
              </p>
              <p className="mt-3 text-sm text-gray-800 dark:text-gray-300 font-semibold">Product Ingridents: </p>
              <p className="mb-2 text-sm text-gray-800 dark:text-gray-300">
               {data?.product_ingredients}
              </p>
            </div></>
            ) : (
              <></>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SingleProduct;
