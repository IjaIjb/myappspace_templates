import React, { useEffect } from 'react'
import Navbar from '../../components/Navbars/Navbar'
import UserSidebar from '../../components/Sidebar/UserSidebar'
import Footer from '../../components/footer/Footer'
import CardWishlist from './CardWishlist'

const Wishlist = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
  return (
    <>

      <Navbar />
      <div className="flex relative  bg-white">

      <div className="hidden md:flex md:w-1/5">
          <UserSidebar title="Purchase List" />
        </div>

        <div className="md:w-4/5 w-full md:px-10 ">
        <CardWishlist />
        </div>
      
        
       
      </div>
      <Footer/>




    </>
  )
}

export default Wishlist