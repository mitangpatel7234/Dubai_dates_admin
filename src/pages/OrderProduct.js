import React, { useState ,useContext} from "react";
import { NavLink, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";
import response from "../utils/demo/productData";
import { Card, CardBody, Badge, Button, Avatar } from "@windmill/react-ui";
import { genRating } from "../utils/genarateRating";
import { server } from "../server";
import axios from "axios";
import { toast } from "react-toast";
import { UserPermissionContext } from "../context/UserPermissionsContext";
const OrderProduct = ({ orderItems, onClose,order }) => {
  const { userPermission } = useContext(UserPermissionContext);
    
  
    const [updatedOrderItems, setUpdatedOrderItems] = useState([...orderItems]);

  // Function to handle delivery status change
  const handleDeliveryStatusChange = (itemIndex, newStatus) => {
    const updatedItems = [...updatedOrderItems];
    updatedItems[itemIndex].delivery_status = newStatus;
    setUpdatedOrderItems(updatedItems);
  };

  // Function to save updated delivery status
  const handleSaveDeliveryStatus = async () => {
    try {
      if(userPermission==='ALL'||userPermission.includes('updateOrder')){

      let updatePromises = updatedOrderItems.map(async (item) => {
        let response = await axios.put(
          `${server}/order/update/${item.order_id}`, // Use the order_id of each item
          {
            order_items: [{
              _id: item._id,
              delivery_status: item.delivery_status,
            }]
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("authToken")}`,
            },
          }
        );
        return response.data;
      });
      const results = await Promise.all(updatePromises);
      console.log("Delivery statuses updated:", results);
      toast.success("status updated sucessfully")
    }else{
      toast.error("Not Have Permission to Edit!")
    }
      // Optionally handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error updating delivery statuses:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

    // change view component
    const [tabView, setTabView] = useState("reviews");
    const handleTabView = (viewName) => setTabView(viewName);
  
  
    return (
      <div>
        <PageTitle>Product Details</PageTitle>
  
        
  
        {/* Product overview  */}
        <Card className="my-8 shadow-md">
          <CardBody>
            {order && (
                <div>
                <div className="flex justify-between">
                <div className="text-gray-900 dark:text-gray-400 text-l font-semibold flex gap-3">
                   Customer name:  <p> {order.user_id.name}</p>
                </div>
                <div className="text-gray-900 dark:text-gray-400 text-l font-semibold flex gap-3">
                   Customer email:  <p> {order.user_id.email}</p>
                </div>
                <div className="text-gray-900 dark:text-gray-400 text-l font-semibold flex gap-3">
                   Customer contact:  <p> {order.user_id.phoneNumber}</p>
                </div>
                </div>
                <div className="text-gray-900 dark:text-gray-400 text-l font-semibold flex mt-5 mb-3 ">
                {order.user_id.addresses.map((address, addrIndex) => (
                    <div key={addrIndex}>
                        <p className="mb-2 text-yellow-400">Customer address:</p>
                      <p >Full Address: {address.full_address}</p>
                      <p>City: {address.city}</p>
                      <p>State: {address.state}</p>
                      <p>Zip Code: {address.zipCode}</p>
                      <p>landmark: {address.landmark}</p>
                      <p>locality: {address.locality}</p>
                      <p>Alternate Phone no: {address.alt_phoneNumber}</p>
                      {/* Add other address fields as needed */}
                    </div>
                  ))}
                  </div>
                  </div>
            )}
            <div className="text-gray-900 dark:text-gray-400 mt-3 mb-3 flex items-center justify-center text-xl font-bold">
            <h1 >Product Ordered</h1>
            </div>
          {orderItems.map((item,index) => (
            <div className="grid grid-col items-center md:grid-cols-2 lg:grid-cols-2" key={item._id}>
              <div>
                <img src={item?.image} alt={item.name} className="w-[350px] rounded-lg" />
              </div>
  
              <div className="mx-8 pt-5 md:pt-0">
                <h1 className="text-3xl mb-4 font-semibold text-gray-700 dark:text-gray-200">
                {item?.name}
                </h1>
  
                <Badge
                  type={item?.stock_level > 0 ? "success" : "danger"}
                  className="mb-2"
                >
                  <p className="break-normal">
                    {item?.stock_level > 0 ? `In Stock` : "Out of Stock"}
                  </p>
                  
                </Badge>
  
                {/* <p className="mb-2 text-sm text-gray-800 dark:text-gray-300">
                 Quantity: {item?.quantity}
                </p> */}
                <p className="mb-3 text-l text-gray-800 dark:text-gray-300">
                  Weight: {item?.weight}
                </p>
                
                    <div>
                <label className="text-gray-900 dark:text-gray-400" htmlFor={`deliveryStatus${item._id}`}>
                  Delivery Status
                </label>
                <select
                  id={`deliveryStatus${item._id}`}
                  className="block text-gray-900 dark:text-gray-400 w-[800px] mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={item.delivery_status}
                  onChange={(e) =>
                    handleDeliveryStatusChange(index, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  {/* Add more delivery statuses as needed */}
                </select>
                {(userPermission==='ALL'||userPermission.includes('updateOrder')) &&(<Button className="mt-5" onClick={handleSaveDeliveryStatus}>Save</Button>)}
                </div>
            
                <h4 className="mt-4 text-purple-600 text-2xl font-semibold">
                  Price: {item?.price}
                </h4>
                <p className="text-l text-gray-900 dark:text-gray-400">
                  Product Quantity :  {item?.quantity}
                </p>
              </div>
            </div>
            ))}
          </CardBody>
        </Card>
  
        
        
      </div>
    );
  };
  
  export default OrderProduct;