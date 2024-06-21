import React, { useState,useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select,Input } from "@windmill/react-ui";
import CouponTable from "../components/CouponTable";
import axios from "axios";
import { server } from "../server";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Coupon = () => {
    const [resultsPerPage, setResultPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [couponName, setCouponName] = useState('');
    const [discountType, setDiscountType] = useState('FLAT');
    const [discountAmount, setDiscountAmount] = useState('');
    const [discountScope, setDiscountScope] = useState('GENERAL');
    const [productId, setProductId] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [validDate, setValidDate] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [products, setProducts] = useState([]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('coupon_name', couponName);
      formData.append('discount_type', discountType);
      formData.append('discount_amount', discountAmount);
      formData.append('discount_scope', discountScope);
      formData.append('product_id', productId);
      formData.append('from_date', fromDate);
      formData.append('valid_date', validDate);
      formData.append('min_amount', minAmount);
      
  
      try {
        const response = await axios.post(`${server}/coupon/create`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem('authToken')}`,
          },
        });
  
        console.log("Coupon added successfully", response.data);
        window.location.reload();
        // Reset form fields
        setCouponName('');
        setDiscountType('FLAT');
        setDiscountAmount('');
        setDiscountScope('GENERAL');
        setProductId('');
        setFromDate('');
        setValidDate('');
        setMinAmount('')
      } catch (error) {
        console.error('Error adding coupon:', error.message);
      }
    };
  
    const [data, setData] = useState([]);
    const [filterone, setFilter] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
  
    const fetchCoupon = async () => {
      try {
        const response = await axios.get(`${server}/coupon/list`,{
            headers: {
                Authorization: `${localStorage.getItem('authToken')}`,
              },
        });
        setData(response.data.coupons);
        setTotalResults(response.data.coupons.length);
        setFilter(response.data.coupons.slice(0, resultsPerPage));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    useEffect(() => {
      fetchCoupon();
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

    useEffect(() => {
        axios.get(`${server}/product/allproducts`) // Replace with your API endpoint
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error)
            });
      }, []);
  
    return (
      <div>
        <PageTitle>Coupons</PageTitle>
  
        <div className="flex text-gray-800 dark:text-gray-300">
          <div className="flex items-center text-purple-600">
            <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
            <NavLink exact to="/app/dashboard" className="mx-2">
              Dashboard
            </NavLink>
          </div>
          {">"}
          <p className="mx-2">Coupons</p>
        </div>
  
        <Card className="mt-5 mb-5 shadow-md">
          <CardBody>
            <div className="flex items-center gap-5">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add Coupon
              </p>
              <Label className="">
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    value={resultsPerPage}
                    onChange={(e) => setResultPerPage(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                    Results on Table
                  </div>
                </div>
              </Label>
              <form onSubmit={handleSubmit} className="grid grid-col-2">
                <div className="flex">
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Coupon Name"
                    type="text"
                    value={couponName}
                    onChange={(e) => setCouponName(e.target.value.toUpperCase())}
                    required
                  />
                </Label>
                <Label className="mx-3">
                <Select
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  required
                >
                  <option value="FLAT">FLAT</option>
                  <option value="PERCENTAGE">PERCENTAGE</option>
                </Select>
              </Label>
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Discount Amount"
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    required
                  />
                </Label>
                </div>
                <div className="flex mt-3">
                <Label className="mx-3">
                <Select
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  value={discountScope}
                  onChange={(e) => setDiscountScope(e.target.value)}
                  required
                >
                  <option value="GENERAL">GENERAL</option>
                  <option value="PRODUCT">PRODUCT</option>
                </Select>
              </Label>
              {discountScope === 'PRODUCT' && (
                <Label className="mx-3">
                  <Select
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Product</option>
                    {products.map(product => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </Select>
                </Label>
              )}
              
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="From Date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </Label>
                
                <Label className="mx-3">
                  <Input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Valid Date"
                    type="date"
                    value={validDate}
                    onChange={(e) => setValidDate(e.target.value)}
                    required
                  />
                </Label>
                
                <Label className="mx-3">
                <Input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Minimum Amount"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  
                />
              </Label>
              </div>
                <button type="submit" className="px-4 bg-white mt-3">
                  Add Coupon
                </button>
              </form>
            </div>
          </CardBody>
        </Card>
        <CouponTable onPageChange={onPageChange} resultsPerPage={resultsPerPage} totalResults={totalResults} filterone={filterone}/>
      </div>
    );
  };
  
  export default Coupon;
