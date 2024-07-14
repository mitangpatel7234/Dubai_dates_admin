import { lazy } from "react";

// Use lazy for better code splitting, a.k.a. load faster
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
const Unauthorized = lazy(() => import("../pages/404"));

const routes = [
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/orders",
    component: Orders,
    requiredPermission:['fetchAllOrder','updateOrder','createOrder']
  },
  {
    path: "/all-products",
    component: ProductsAll
    },
  {
    path: "/add-product",
    component: AddProduct,
    requiredPermission:['createProduct']
  },
  {
    path: "/product/update/:id",
    component: UpdateProduct,
    requiredPermission:['updateProduct']
  },
  {
    path: "/flavours",
    component: Flavours,
    requiredPermission:['createFlavour','updateFlavour','deleteFlavour']
  },
  {
    path: "/category",
    component: Category,
    requiredPermission:['fetchCategory','createCategory','deleteCategory','updateCategory']
  },
  {
    path: "/goal",
    component: Goal,
    requiredPermission:[  'createGoal','updateGoal','deleteGoal']
  },
  {
    path: "/product/:id",
    component: SingleProduct
    },

  {
    path: "/customers",
    component: Customers,
    requiredPermission: ["fetchAllUser"]
  },
  {
    path: "/hero",
    component: Hero,
    requiredPermission:['createHero','updateHero','deleteHero']

    },
  {
    path: "/promo",
    component: Promo,
    requiredPermission:['createPromoProduct','updatePromoProduct','deletePromoProduct']
    },
  {
    path: "/footer",
    component: Footer
    },
  {
    path: "/coupon",
    component: Coupon,
    requiredPermission:['fetchAllCoupon','applyCoupon','deleteCoupon','createCoupon']
  },
  {
    path: "/partner",
    component: Partner,
    requiredPermission: ["fetchPartner"]
  },
  {
    path: "/manage-profile",
    component: Profile, 
    requiredPermission: ["updateProfile"]
  },
  {
    path: "/settings",
    component: Settings
  },
  {
    path: "/unauthorized",
    component: Unauthorized
  },
];

export default routes;
