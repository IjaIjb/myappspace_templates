import { lazy } from "react";


// use lazy for better code splitting, a.k.a. load faster
const HomePage = lazy(() => import("../pages/first/home/Home"));



const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/home",
    component: HomePage,
  },



  
];

export default routes;
