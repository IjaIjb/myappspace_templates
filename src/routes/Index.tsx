import { lazy } from "react";


// use lazy for better code splitting, a.k.a. load faster
const HomePage = lazy(() => import("../pages/first/home/Home"));
const SigninPage = lazy(() => import("../components/auth/Login"));
const RegisterPage = lazy(() => import("../components/auth/Register"));
const ProductPage = lazy(() => import("../pages/first/product/Products"));
const ViewCartPage = lazy(() => import("../pages/first/cart/CartPage"));
const ViewProductPage = lazy(() => import("../pages/first/product/ViewProduct"));
const ProfilePage = lazy(() => import("../pages/profile/Profile"));
const WishListPage = lazy(() => import("../pages/profile/Wishlist"));
const AddressPage = lazy(() => import("../pages/profile/Address"));
const CreateAddressPage = lazy(() => import("../pages/profile/CreateAddress"));
const AboutPage = lazy(() => import("../pages/first/about/About"));
const RefundPolicyPage = lazy(() => import("../pages/first/refund/RefunPolicy"));
const ViewPaymentPage = lazy(() => import("../pages/first/cart/ViewPaymentPage"));

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/sign-in",
    component: SigninPage,
  },
  {
    path: "/sign-up",
    component: RegisterPage,
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/product",
    component: ProductPage,
  },
  {
    path: "/view-cart",
    component: ViewCartPage,
  },
  {
    path: "/user/profile",
    component: ProfilePage,
  },
  {
    path: "/user/wishlist",
    component: WishListPage,
  },
  {
    path: "/user/address",
    component: AddressPage,
  },
  {
    path: "/user/add-address",
    component: CreateAddressPage,
  },
  {
    path: "/view-product/:id",
    component: ViewProductPage,
  },
  {
    path: "/verify-payment-details",
    component: ViewPaymentPage,
  },
  {
    path: "/user/about-us",
    component: AboutPage,
  },
  {
    path: "/refund-policy",
    component: RefundPolicyPage,
  },
];


export default routes;
