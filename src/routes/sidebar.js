
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/app/orders",
    icon: "CartIcon",
    name: "Orders",
    requiredPermission:['fetchAllOrder','updateOrder','createOrder']
  },
  {
    icon: "TruckIcon",
    name: "Products",
    routes: [
      {
        path: "/app/all-products",
        name: "All Products"
      },
      {
        path: "/app/add-product",
        name: "Add Product",
        requiredPermission:['createProduct']
      },
      {
        path: "/app/flavours",
        name: "Add flavours", 
        requiredPermission:['createFlavour','updateFlavour','deleteFlavour']
      },
      {
        path: "/app/goal",
        name: "Add goal",
        requiredPermission:[  'createGoal','updateGoal','deleteGoal']
      },
      {
        path: "/app/category",
        name: "Add Category",
        requiredPermission:['fetchCategory','createCategory','deleteCategory','updateCategory']
      },
    ],
  },
  {
    path: "/app/customers",
    icon: "GroupIcon",
    name: "Customers",
    requiredPermission:['fetchAllUser']
  },
  {
    path: "/app/hero",
    icon: "ChatIcon",
    name: "Hero",
    requiredPermission :['createHero','updateHero','deleteHero']
  },
  {
    path: "/app/promo",
    icon: "ChatIcon",
    name: "Promo",
    requiredPermission:['createPromoProduct','updatePromoProduct','deletePromoProduct']
  },
  {
    path: "/app/footer",
    icon: "ChatIcon",
    name: "Footer",
  },
  {
    path: "/app/coupon",
    icon: "ChatIcon",
    name: "Coupon",
    requiredPermission:['fetchAllCoupon','applyCoupon ','deleteCoupon','createCoupon']
  },
  {
    path: "/app/partner",
    icon: "GroupIcon",
    name: "Partner",
    requiredPermission:['fetchPartner']
  },
  {
    path: "/app/manage-profile",
    icon: "UserIcon",
    name: "Profile",
    requiredPermission:['fetchStaff']
  },
  {
    path: "/app/settings",
    icon: "OutlineCogIcon",
    name: "Settings",
  },
  {
    path: "/app/logout",
    icon: "OutlineLogoutIcon",
    name: "Logout",
  },
];

export default routes;
