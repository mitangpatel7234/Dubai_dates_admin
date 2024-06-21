import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Button,
  Pagination,
} from "@windmill/react-ui";
import response from "../utils/demo/ordersData";
import { server } from "../server";
import axios from "axios";
import {
  EditIcon,
  EyeIcon,
  GridViewIcon,
  HomeIcon,
  ListViewIcon,
  TrashIcon,
} from "../icons";
import OrderProduct from "../pages/OrderProduct";


const FooterTable = ({ resultsPerPage,filterone,onSelectHero,totalResults,onPageChange }) => {
  
    
  console.log(filterone)

  return (
    <div className="filterone-container bg-gray-800 text-white py-10">
      <div className="filterone-content max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="filterone-section p-4">
          {filterone.foot_image && (
            <div className="filterone-logo mb-4">
              <img
                src={filterone.foot_image}
                alt="Footer Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
          )}
          <div className="flex-row justify-between gap-5">
          {filterone.contactUs && (
            <div className="contact-us mb-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              {filterone.contactUs.email && (
                <p>
                  <strong>Email:</strong> {filterone.contactUs.email}
                </p>
              )}
              {filterone.contactUs.phoneNumber && (
                <p>
                  <strong>Phone:</strong> {filterone.contactUs.phoneNumber}
                </p>
              )}
              {filterone.contactUs.address && (
                <p>
                  <strong>Address:</strong> {filterone.contactUs.address}
                </p>
              )}
            </div>
          )}
          {filterone.categories && (
            <div className="quick-links mb-4">
              <h4 className="text-lg font-semibold">categories</h4>
              <ul>
                {filterone.categories.map((link, index) => (
                  <li key={index} className="mb-2">
                    <div  className="text-blue-400">
                      {link.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {filterone.quickLinks && (
            <div className="quick-links mb-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul>
                {filterone.quickLinks.map((link, index) => (
                  <li key={index} className="mb-2">
                    <a href={link.links} className="text-blue-400">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {filterone.socialLinks && (
            <div className="social-links mb-4">
              <h4 className="text-lg font-semibold">Social Links</h4>
              <ul>
                {filterone.socialLinks.map((link, index) => (
                  <li key={index} className="mb-2">
                    <a href={link.links} className="text-blue-400">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button
            icon={EditIcon}
            layout="outline"
            className="mt-4"
            onClick={() => onSelectHero(filterone)}
          >
            Edit
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTable;
