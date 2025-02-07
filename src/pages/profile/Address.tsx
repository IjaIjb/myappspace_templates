import React from "react";
import Navbar from "../../components/Navbars/Navbar";
import UserSidebar from "../../components/Sidebar/UserSidebar";
import Footer from "../../components/footer/Footer";
import CardAddress from "./CardAddress";

const Address = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="hidden md:flex md:w-1/5">
          <UserSidebar title="Purchase List" />
        </div>

        <div className="md:w-4/5 w-full md:px-10 ">
          <CardAddress />
        </div>
      </div> 
      <Footer />


      {/* 
     <Sidebar title="Profile"/>
     <div className="relative md:ml-64 bg-white">
       <AdminNavbar title="Profile" />
       <div className="flex flex-wrap mt-4">
         <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4">
           <CardUpdateProfile />
         </div>
       </div>
     </div> */}
    </>
  );
};

export default Address;
