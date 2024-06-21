/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
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
  },
  {
    icon: "TruckIcon",
    name: "Products",
    routes: [
      {
        path: "/app/all-products",
        name: "All Products",
      },
      {
        path: "/app/add-product",
        name: "Add Product",
      },
      {
        path: "/app/flavours",
        name: "Add flavours",
      },
      {
        path: "/app/goal",
        name: "Add goal",
      },
      {
        path: "/app/category",
        name: "Add Category",
      },
    ],
  },
  {
    path: "/app/customers",
    icon: "GroupIcon",
    name: "Customers",
  },
  {
    path: "/app/hero",
    icon: "ChatIcon",
    name: "Hero",
  },
  {
    path: "/app/promo",
    icon: "ChatIcon",
    name: "Promo",
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
  },
  {
    path: "/app/partner",
    icon: "GroupIcon",
    name: "Partner",
  },
  {
    path: "/app/manage-profile",
    icon: "UserIcon",
    name: "Profile",
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
