import React, { useState,useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "../icons";
import { Card, CardBody, Label, Select,Input } from "@windmill/react-ui";
// import HeroTable from "../components/HeroTable";
import axios from "axios";
import { server } from "../server";
import FooterTable from "../components/FooterTable";


function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Footer = () => {
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [footImage, setFootImage] = useState(null);
    const [quickLinks, setQuickLinks] = useState([{ name: "", links: "" }]);
    const [contactUs, setContactUs] = useState({
      email: "",
      phoneNumber: "",
      address: "",
    });
    const [socialLinks, setSocialLinks] = useState([{ name: "", links: "" }]);
    const [selectedFooter, setSelectedFooter] = useState(null);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [filterOne, setFilterOne] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
  
    const handleQuickLinksChange = (index, event) => {
      const newQuickLinks = [...quickLinks];
      newQuickLinks[index][event.target.name] = event.target.value;
      setQuickLinks(newQuickLinks);
    };
  
    const handleAddQuickLink = () => {
      setQuickLinks([...quickLinks, { name: "", links: "" }]);
    };
  
    const handleSocialLinksChange = (index, event) => {
      const newSocialLinks = [...socialLinks];
      newSocialLinks[index][event.target.name] = event.target.value;
      setSocialLinks(newSocialLinks);
    };
  
    const handleAddSocialLink = () => {
      setSocialLinks([...socialLinks, { name: "", links: "" }]);
    };
  
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   const formData = new FormData();
    //   formData.append("foot_image", footImage);
    //   formData.append("quickLinks", JSON.stringify(quickLinks));
    //   formData.append("contactUs", JSON.stringify(contactUs));
    //   formData.append("socialLinks", JSON.stringify(socialLinks));
  
    //   try {
    //     const response = await axios.post(`${server}/footer/footer-add`, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `${localStorage.getItem("authToken")}`,
    //       },
    //     });
    //     console.log("Footer added successfully", response.data);
    //     setFootImage(null);
    //     setQuickLinks([{ name: "", links: "" }]);
    //     setContactUs({ email: "", phoneNumber: "", address: "" });
    //     setSocialLinks([{ name: "", links: "" }]);
    //     window.location.reload();
    //   } catch (error) {
    //     console.error("Error adding footer:", error);
    //   }
    // };
  
    const fetchFooters = async () => {
      try {
        const response = await axios.get(`${server}/footer/footerget`);
        setData(response.data);
        setTotalResults(response.data.length);
        setFilterOne(response.data.slice(0, resultsPerPage));
      } catch (error) {
        console.error("Error fetching footers:", error);
      }
    };
  
    useEffect(() => {
      fetchFooters();
    }, []);
  
    const onPageChange = (p) => {
      setPage(p);
    };
  
    useEffect(() => {
      const paginatedData = data.slice(
        (page - 1) * resultsPerPage,
        page * resultsPerPage
      );
      setFilterOne(paginatedData);
    }, [page, resultsPerPage]);
  
    const handleUpdate = async (event) => {
      event.preventDefault();
      if (!selectedFooter) return;
  
      const formData = new FormData();
      formData.append("image", footImage);
      formData.append("quickLinks", JSON.stringify(quickLinks));
      formData.append("contactUs", JSON.stringify(contactUs));
      formData.append("socialLinks", JSON.stringify(socialLinks));
  
      try {
        const response = await axios.post(
          `${server}/footer/footer-add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${localStorage.getItem("authToken")}`,
            },
          }
        );
        console.log("Footer updated successfully", response.data);
        setSelectedFooter(null);
        setFootImage(null);
        setQuickLinks([{ name: "", links: "" }]);
        setContactUs({ email: "", phoneNumber: "", address: "" });
        setSocialLinks([{ name: "", links: "" }]);
        window.location.reload();
      } catch (error) {
        console.error("Error updating footer:", error);
      }
    };
  
    const handleSelectFooter = (footer) => {
      setSelectedFooter(footer);
      setFootImage(null);
      setQuickLinks(footer.quickLinks);
      setContactUs(footer.contactUs);
      setSocialLinks(footer.socialLinks);
    };
  

  return (
    <div>
      <PageTitle>Footer</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Footer</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center gap-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
              Add Footer
            </p>
           
            
            {selectedFooter ? (
                <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  
                  <Label className="mt-3">
                    <span>Quick Links</span>
                    {quickLinks.map((link, index) => (
                      <div key={index} className="flex mt-2">
                        <Input
                          className="mr-2"
                          name="name"
                          placeholder="Name"
                          value={link.name}
                          onChange={(e) => handleQuickLinksChange(index, e)}
                        />
                        <Input
                          name="links"
                          placeholder="Link"
                          value={link.links}
                          onChange={(e) => handleQuickLinksChange(index, e)}
                        />
                        {index === quickLinks.length - 1 && (
                          <button
                            type="button"
                            onClick={handleAddQuickLink}
                            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    ))}
                  </Label>
                  <Label className="mt-3">
                    <span>Contact Us</span>
                    <Input
                      className="mt-1"
                      placeholder="Email"
                      value={contactUs.email}
                      onChange={(e) =>
                        setContactUs({ ...contactUs, email: e.target.value })
                      }
                    />
                    <Input
                      className="mt-1"
                      placeholder="Phone Number"
                      value={contactUs.phoneNumber}
                      onChange={(e) =>
                        setContactUs({ ...contactUs, phoneNumber: e.target.value })
                      }
                    />
                    <Input
                      className="mt-1"
                      placeholder="Address"
                      value={contactUs.address}
                      onChange={(e) =>
                        setContactUs({ ...contactUs, address: e.target.value })
                      }
                    />
                  </Label>
                  <Label className="mt-3">
                    <span>Social Links</span>
                    {socialLinks.map((link, index) => (
                      <div key={index} className="flex mt-2">
                        <Input
                          className="mr-2"
                          name="name"
                          placeholder="Name"
                          value={link.name}
                          onChange={(e) => handleSocialLinksChange(index, e)}
                        />
                        <Input
                          name="links"
                          placeholder="Link"
                          value={link.links}
                          onChange={(e) => handleSocialLinksChange(index, e)}
                        />
                        {index === socialLinks.length - 1 && (
                          <button
                            type="button"
                            onClick={handleAddSocialLink}
                            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    ))}
                  </Label>
                  <Label className="mt-3">
                    <span>Footer Image</span>
                    <Input
                      className="mt-1"
                      type="file"
                      onChange={(e) => setFootImage(e.target.files[0])}
                    />
                  </Label>
                  <button
                    type="submit"
                    className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Update Footer
                  </button>
                </div>
              </form>
        ):(
            null
        )}
            
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <FooterTable onPageChange={onPageChange} resultsPerPage={resultsPerPage} totalResults={totalResults} filterone={data} onSelectHero={handleSelectFooter}/>
    </div>
  );
};

export default Footer;
