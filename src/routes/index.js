import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Orders = lazy(() => import("../pages/Orders"));
const ProductsAll = lazy(() => import("../pages/ProductsAll"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const Customers = lazy(() => import("../pages/Customers"));
const Chats = lazy(() => import("../pages/Chats"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const UpdateProduct = lazy(() => import("../pages/UpdatePRoduct")); 
const Flavours = lazy(() => import("../pages/Flavours")); 
const Goal = lazy(() => import("../pages/Goal")); 
const Category = lazy(() => import("../pages/Category")); 
const Hero = lazy(() => import("../pages/Hero")); 
const Promo = lazy(() => import("../pages/Promo")); 
const Footer = lazy(() => import("../pages/Footer")); 
const Coupon = lazy(() => import("../pages/Coupon")); 
const Partner = lazy(() => import("../pages/Partner")); 

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/all-products",
    component: ProductsAll,
  },
  {
    path: "/add-product",
    component: AddProduct,
  },
  {
    path: "/flavours",
    component: Flavours,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/goal",
    component: Goal,
  },
  {
    path: "/product/:id",
    component: SingleProduct,
  },
  {
    path: "/product/update/:id",
    component: UpdateProduct,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/hero",
    component: Hero,
  },
  {
    path: "/promo",
    component: Promo,
  },
  {
    path: "/footer",
    component: Footer,
  },
  {
    path: "/coupon",
    component: Coupon,
  },
  {
    path: "/partner",
    component: Partner,
  },
  {
    path: "/manage-profile",
    component: Profile,
  },
  {
    path: "/settings",
    component: Settings,
  },
  
];

export default routes;
