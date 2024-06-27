import React, { useState, useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Link, NavLink } from "react-router-dom";
import {
  EditIcon,
  EyeIcon,
  GridViewIcon,
  HomeIcon,
  ListViewIcon,
  TrashIcon,
} from "../icons";
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
import response from "../utils/demo/productData";
import Icon from "../components/Icon";
import { genRating } from "../utils/genarateRating";
import { server } from "../server";
import axios from "axios";

const ProductsAll = () => {
  const [view, setView] = useState("grid");

  // Table and grid data handlling
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // pagination setup
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [filterone, setFilter] = useState([]);


// Function to fetch orders data from API
useEffect(() => {
  axios.get(`${server}/product/allproducts`) // Replace with your API endpoint
      .then((response) => {
          setData(response.data.products);
          setLoading(false);
          setTotalResults(response.data.products.length)
          setFilter(response.data.products.slice(0, resultsPerPage));
      })
      .catch((error) => {
          setError(error);
          setLoading(false);
      });
}, [resultsPerPage]);


const handleDelete = (selectedDeleteProduct) => {
  
    axios.delete(`${server}/product/delete/${selectedDeleteProduct._id}`,{
      headers: {
      
      Authorization: `${localStorage.getItem("authToken")}`,
    }
    ,})
      .then((response) => {
        console.log("Product deleted successfully", response.data);
        // Optionally, you can redirect or update state after successful delete
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  
};


  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    const paginatedData = data.slice(
      (page - 1) * resultsPerPage,
      page * resultsPerPage
    );
    setFilter(paginatedData);
  }, [page, resultsPerPage]);

  // Delete action model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  async function openModal(productId) {
    let product = await data.filter((product) => product._id === productId)[0];
    // console.log(product);
    setSelectedDeleteProduct(product);
    setIsModalOpen(true);
  }
console.log(selectedDeleteProduct)
  function closeModal() {
    setIsModalOpen(false);
  }

  // Handle list view
  const handleChangeView = () => {
    if (view === "list") {
      setView("grid");
    }
    if (view === "grid") {
      setView("list");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <PageTitle>All Products</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">All Products</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All Products
              </p>

              

              <Label className="mx-3">
                <Select className="py-3">
                  <option>Filter by Category</option>
                  <option>Electronics</option>
                  <option>Cloths</option>
                  <option>Mobile Accerssories</option>
                </Select>
              </Label>

              <Label className="mr-8">
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Number of Results"
                    value={resultsPerPage}
                    onChange={(e) => setResultsPerPage(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                    {/* <SearchIcon className="w-5 h-5" aria-hidden="true" /> */}
                    Results on {`${view}`}
                  </div>
                </div>
              </Label>
            </div>
            <div className="">
              <Button
                icon={view === "list" ? ListViewIcon : GridViewIcon}
                className="p-2"
                aria-label="Edit"
                onClick={handleChangeView}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Delete product model */}
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader className="flex items-center">
          {/* <div className="flex items-center"> */}
          <Icon icon={TrashIcon} className="w-6 h-6 mr-3" />
          Delete Product
          {/* </div> */}
        </ModalHeader>
        <ModalBody>
          Make sure you want to delete product{" "}
          {selectedDeleteProduct && `"${selectedDeleteProduct.name}"`}
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          
          <div className="hidden sm:block">
            <Button onClick={() => handleDelete(selectedDeleteProduct)}>Delete</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={() => handleDelete(selectedDeleteProduct)}>
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Product Views */}
      {view === "list" ? (
        <>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Name</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>MRP</TableCell>
                  <TableCell>QTY</TableCell>
                  <TableCell>Sale Price</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {filterone.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-4 md:block"
                          src={product.product_image}
                          alt="Product image"
                        />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge type={product.stock_levels > 0 ? "success" : "danger"}>
                        {product.stock_levels > 0 ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    {/* <TableCell className="text-sm">
                      {genRating(product.rating, product.reviews.length, 5)}
                    </TableCell> */}
                    <TableCell className="text-sm">{product.mrp}</TableCell>
                    <TableCell className="text-sm">{product.sku}</TableCell>
                    <TableCell className="text-sm">{product.sale_price}</TableCell>
                    <TableCell>
                      <div className="flex">
                        <Link to={`/app/product/${product._id}`}>
                          <Button
                            icon={EyeIcon}
                            className="mr-3"
                            aria-label="Preview"
                          />
                        </Link>
                        <Link to={`/app/product/update/${product._id}`}>
                        <Button
                          icon={EditIcon}
                          className="mr-3"
                          layout="outline"
                          aria-label="Edit"
                        />
                        </Link>
                        <Button
                          icon={TrashIcon}
                          layout="outline"
                          onClick={() => openModal(product.id)}
                          aria-label="Delete"
                        />
                      </div>
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
        </>
      ) : (
        <>
          {/* Car list */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
            {filterone.map((product) => (
              <div className="" key={product._id}>
                <Card>
                  <img
                    className="object-cover w-full"
                    src={product.product_image}
                    alt="product"
                  />
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between flex-grow">
                      <p className="font-semibold truncate  text-gray-600 dark:text-gray-300">
                      {product.name.length > 20 ? product.name.slice(0, 20) + "..." : product.name}
                      </p>
                      <Badge
                        type={product.stock_levels > 0 ? "success" : "danger"}
                        className="whitespace-nowrap"
                      >
                        <p className="break-normal">
                          {product.stock_levels > 0 ? `In Stock` : "Out of Stock"}
                        </p>
                      </Badge>
                    </div>

                    <p className="mb-2 text-purple-500 font-bold text-lg">
                      {product.sale_price}
                    </p>

                    <p className="mb-8 text-gray-600 dark:text-gray-400 flex-grow">
                    {product.product_description.length > 40 ? product.product_description.slice(0, 40) + "..." : product.product_description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <Link to={`/app/product/${product._id}`}>
                          <Button
                            icon={EyeIcon}
                            className="mr-3"
                            aria-label="Preview"
                            size="small"
                          />
                        </Link>
                      </div>
                      <div>
                      <Link to={`/app/product/update/${product._id}`}>
                        <Button
                          icon={EditIcon}
                          className="mr-3"
                          layout="outline"
                          aria-label="Edit"
                          size="small"
                        />
                        </Link>
                        <Button
                          icon={TrashIcon}
                          layout="outline"
                          aria-label="Delete"
                          onClick={() => openModal(product._id)}
                          size="small"
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>

          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductsAll;
