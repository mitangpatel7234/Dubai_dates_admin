import React, { useState, useEffect } from "react";
import { useParams, useHistory,NavLink } from "react-router-dom";
import { Card, CardBody, Label, Input, Textarea, Button } from "@windmill/react-ui";
import axios from "axios";
import { server } from "../server";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon, EditIcon,AddIcon } from "../icons";

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const UpdateProduct = () => {
  const history = useHistory();
  const { id } = useParams(); // Get product ID from URL params

  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState("");
  const [weighttype, setWeightType] = useState("");
  const [sku, setSku] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [taxTypeTag, setTaxTypeTag] = useState("");
  const [stockLevels, setStockLevels] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productOverview, setProductOverview] = useState("");
  const [productBenefits, setProductBenefits] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [category, setCategory] = useState([]);
  const [flavour, setFlavour] = useState([]);
  const [goal, setGoal] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFlavours, setSelectedFlavours] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

  const [productImage, setProductImage] = useState(null);
  const [productSlideImage, setProductSlideImage] = useState(null);
  const [productPromoBannerImage, setProductPromoBannerImage] = useState(null);
  const [productVideoImage, setProductVideoImage] = useState(null);
  const [productCreativeImage, setProductCreativeImage] = useState(null);

  useEffect(() => {
    
      // Fetch existing product details if ID is present
      axios
        .get(`${server}/product/products/${id}`)
        .then((response) => {
          const product = response.data;
          setProductName(product.name);
          setWeight(product.weight);
          setWeightType(product.weight_type);
          setSku(product.sku);
          setSalePrice(product.sale_price);
          setMrp(product.mrp);
          setTaxTypeTag(product.tax_type_tag);
          setStockLevels(product.stock_levels);
          setProductDescription(product.product_description);
          setProductOverview(product.product_overview);
          setProductBenefits(product.product_benefits);
          setProductIngredients(product.product_ingredients);
          setSelectedCategories(product.product_categories.map(cat => cat.id) || []);
      setSelectedFlavours(product.product_falvours.map(flav => flav.id) || []);
      setSelectedGoals(product.product_goal.map(goal => goal.id) || []);
        })
        .catch((error) => {
          console.error("Error fetching product details", error);
        });
    
  }, []);
  console.log(selectedCategories)

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleFlavourChange = (e) => {
    const flavourId = parseInt(e.target.value);
    if (selectedFlavours.includes(flavourId)) {
      setSelectedFlavours(selectedFlavours.filter((id) => id !== flavourId));
    } else {
      setSelectedFlavours([...selectedFlavours, flavourId]);
    }
  };

  const handleGoalChange = (e) => {
    const goalId = parseInt(e.target.value);
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("weight", weight);
    formData.append("weight_type", weighttype);
    formData.append("sku", sku);
    formData.append("sale_price", salePrice);
    formData.append("mrp", mrp);
    formData.append("tax_type_tag", taxTypeTag);
    formData.append("stock_levels", stockLevels);
    formData.append("product_description", productDescription);
    formData.append("product_overview", productOverview);
    formData.append("product_benefits", productBenefits);
    formData.append("product_ingredients", productIngredients);

    if (productImage) formData.append("product_image", productImage);
    if (productSlideImage) formData.append("product_slide_image", productSlideImage);
    if (productPromoBannerImage) formData.append("product_promo_banner_image", productPromoBannerImage);
    if (productVideoImage) formData.append("product_video_image", productVideoImage);
    if (productCreativeImage) formData.append("product_creative_image", productCreativeImage);

    selectedCategories.forEach(categoryId => formData.append("product_categories", categoryId));
  selectedFlavours.forEach(flavourId => formData.append("product_falvours", flavourId));
  selectedGoals.forEach(goalId => formData.append("product_goal", goalId));

    try {
      await axios.put(`${server}/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      history.push("/app/all-products"); // Redirect to the products page after successful submission
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  useEffect(() => {
    axios.get(`${server}/category/categories`)
      .then((response) => {
        setCategory(response.data.categories);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${server}/flavour/get-flavours`, {
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        setFlavour(response.data.flavours);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${server}/goal/get-goal`, {
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        setGoal(response.data.Goals);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div>
      <PageTitle>Update Product</PageTitle>

      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Update Product</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
          <Card className="row-span-2 md:col-span-2">
            <CardBody>
              <FormTitle>Product Image</FormTitle>
              <input
                type="file"
                className="mb-4 text-gray-800 dark:text-gray-300"
                onChange={(e) => handleFileChange(e, setProductImage)}
              />
              <FormTitle>Product Slide Image</FormTitle>
              <input
                type="file"
                className="mb-4 text-gray-800 dark:text-gray-300"
                onChange={(e) => handleFileChange(e, setProductSlideImage)}
              />
              <FormTitle>Product Promo Banner Image</FormTitle>
              <input
                type="file"
                className="mb-4 text-gray-800 dark:text-gray-300"
                onChange={(e) => handleFileChange(e, setProductPromoBannerImage)}
              />
              <FormTitle>Product Video Image</FormTitle>
              <input
                type="file"
                className="mb-4 text-gray-800 dark"
onChange={(e) => handleFileChange(e, setProductVideoImage)}
              />

              <FormTitle>Product Creative Image</FormTitle>
              <input
                type="file"
                className="mb-4 text-gray-800 dark:text-gray-300"
                onChange={(e) => handleFileChange(e, setProductCreativeImage)}
              />
            <FormTitle>Product Name</FormTitle>
            <Label>
              <Input className="mb-4" placeholder="Type product name here" value={productName}
                  onChange={(e) => setProductName(e.target.value)}/>
            </Label>

            <FormTitle>Weight</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Enter weight here"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Label>
            <FormTitle>Weight Type</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Enter weight Type KG Gm here"
                  value={weighttype}
                  onChange={(e) => setWeightType(e.target.value)}
                />
              </Label>

              <FormTitle>SKU</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Enter SKU here"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </Label>

              <FormTitle>Sale Price</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Enter sale price here"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </Label>

              <FormTitle>MRP</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Enter MRP here"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                />
              </Label>

              <FormTitle>Tax Tag</FormTitle>
              <Label>
                <Input
                  className="mb-4"
                  placeholder="Enter tax tag here"
                  value={taxTypeTag}
                  onChange={(e) => setTaxTypeTag(e.target.value)}
                />
              </Label>

            <FormTitle>Stock Qunatity</FormTitle>
            <Label>
              <Input
                className="mb-4"
                placeholder="Enter product stock quantity"
                value={stockLevels}
                  onChange={(e) => setStockLevels(e.target.value)}
              />
            </Label>

            <FormTitle>Full description</FormTitle>
            <Label>
              <Textarea
                className="mb-4"
                rows="5"
                placeholder="Enter product full description here"
                value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
              />
            </Label>
            <FormTitle>Full Ingrident</FormTitle>
            <Label>
              <Textarea
                className="mb-4"
                rows="5"
                placeholder="Enter product full Ingrident here"
                value={productIngredients}
                  onChange={(e) => setProductIngredients(e.target.value)}
              />
            </Label>
            <FormTitle>Full Overview</FormTitle>
            <Label>
              <Textarea
                className="mb-4"
                rows="5"
                placeholder="Enter product full description here"
                value={productOverview}
                  onChange={(e) => setProductOverview(e.target.value)}
              />
            </Label>
            <FormTitle>Full Benifts</FormTitle>
            <Label>
              <Textarea
                className="mb-4"
                rows="5"
                placeholder="Enter product full Benifits here"
                value={productBenefits}
                  onChange={(e) => setProductBenefits(e.target.value)}
              />
            </Label>

            
          </CardBody>
        </Card>

        <Card className="h-50">
          <CardBody>
            {/* <div className="flex mb-8">
              <Button layout="primary" className="mr-3" iconLeft={PublishIcon}>
                Publish
              </Button>
              <Button layout="link" iconLeft={StoreIcon}>
                Save as Draft
              </Button>
            </div> */}
            <Label className="mt-4">
            <FormTitle>Product Categories</FormTitle>
    {category.map((cat) => (
      <Label key={cat._id} check className="mb-2">
        <Input
          type="checkbox"
          value={cat._id}
          checked={selectedCategories.includes(cat._id)}
          onChange={handleCategoryChange}
        />
        <span className="ml-2">{cat.name}</span>
      </Label>
    ))}
            </Label>
            <Label className="mt-4">
            <FormTitle>Product Goals</FormTitle>
    {goal.map((goal) => (
      <Label key={goal._id} check className="mb-2">
        <Input
          type="checkbox"
          value={goal._id}
          checked={selectedGoals.includes(goal._id)}
          onChange={handleGoalChange}
        />
        <span className="ml-2">{goal.name}</span>
      </Label>
    ))}
            </Label>
            <Label className="mt-4">
            <FormTitle>Product Flavours</FormTitle>
    {flavour.map((falvour) => (
      <Label key={falvour._id} check className="mb-2">
        <Input
          type="checkbox"
          value={falvour._id}
          checked={selectedFlavours.includes(falvour._id)}
          onChange={handleFlavourChange}
        />
        <span className="ml-2">{falvour.name}</span>
      </Label>
    ))}
            </Label>
        <div className="w-full">
              <Button size="large"  type="submit" iconLeft={AddIcon}>
                update Product
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
