import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { IoLogoTiktok } from "react-icons/io5";
import { UserApis } from '../../apis/userApi/userApi';

const Footer = () => {
  const date = new Date();
 
  // const storeCode = localStorage.getItem("storeCode") || "";
  const [storeLogo, setStoreLogo] = useState<any>(null); // Store logo URL
  const storeCode = localStorage.getItem("storeCode") || "";
  const storeAbbreviation = localStorage.getItem("storeabbreviation") || "";
      
  
  const [storeContact, setStoreContact] = React.useState<any>([]);
    
    useEffect(() => {
    const storedLogo = localStorage.getItem("storeLogo");
   
        if (storedLogo) {
            setStoreLogo(storedLogo);
        }
    }, []);

      React.useEffect(() => {
        UserApis.fetchStoreData(storeCode).then((response) => {
          if (response?.data) {
              console.log(response.data);
            // setStoreData(response?.data?.store);
            setStoreContact(response?.data?.configs?.contacts?.settings);
       
          }
        });
      }, [storeCode]);
      console.log(storeContact)
  return (
    <div className="  left-0 right-0 bottom-0  pt-10  ">
    <div className=" bg-[#004F9A] py-2">
      <span className="flex justify-center text-white">
        <NavLink to={"/"}>
          <img
            src={storeLogo}
         
            className="w-full h-6"
            alt=""
          />
        </NavLink>
      </span>
    </div>
    <footer className="bg-[#E6F1FC] py-3">
      <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden "></div>
      <div className="container md:max-w-[1100px] mx-auto px-4">
        <div className="grid  lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
          <div className="lg:hidden block ">
            <h4 className="text-[#004F9A] text-[16px] md:text-[18px] font-[600] mb-3 mt-5 md:mt-0 ">
              Contact Us
            </h4>

{storeContact?.phoneNumber && (
     <div className="flex space-x-2">
     <img src="/images/phone.png" className="" alt="payments" />
     <h3 className="mb-2 text-[10px] md:text-[12px] font-medium text-[#131212]">
      {storeContact?.phoneNumber}
     </h3>
   </div>
)}
       
            <div className="flex space-x-2 mt-2">
              <img src="/images/email.png" className="" alt="payments" />
              <h3 className="mb-2 text-[10px] md:text-[12px] font-medium text-[#131212] mt-1">
                Info@mmartplus.com
              </h3>
            </div>
            <div className="flex space-x-2 mt-2">
              <img src="/images/location.png" className="" alt="payments" />
              <h3 className="mb-2 text-[10px] md:text-[12px] font-medium text-[#131212] mt-1">
                Plot 1407G Shalom Road, Amuwo Odofin,
              </h3>
            </div>
          </div>
          <div className="lg:hidden block">
            <h4 className="text-[#004F9A] text-[16px] md:text-[18px] font-[600] md:mt-0 mt-5 mb-3">
              Payment method
            </h4>
            <div className="flex space-x-3">
              {/* <img src="/images/payment.png" className="" alt="payments" /> */}
              <img src="/images/visa.png" className="" alt="payments" />
              <img src="/images/book.png" className="" alt="payments" />
              <img src="/images/master.png" className="" alt="payments" />
            </div>
          </div>
          <div className="lg:hidden block">
            {/* <h4 className="text-[#004F9A] text-[16px] md:text-[18px] font-[600] md:mt-0 mt-5 mb-3">
              Download App
            </h4>
            <div className="flex space-x-3">
              <img src="/images/playstore.png" className="" alt="payments" />
              <img src="/images/appstore.png" className="" alt="payments" />
            </div> */}

            <h4 className="text-[#004F9A] text-[16px] md:text-[18px] font-[600] mt-5 mb-3">
              Our Socials
            </h4>
            <div className="flex space-x-3">
              <a target="_blank"  rel="noreferrer" href="/">
                <img src="/images/fbook.png" className="" alt="socials" />
              </a>
              <a target="_blank"  rel="noreferrer" href="https://www.X.com/mmartplus_">
                <img src="/images/twitter.png" className="" alt="socials" />
              </a>
              <a href="https://www.instagram.com/mmartplus_" target="_blank"  rel="noreferrer">
                <img src="/images/instagram.png" className="" alt="socials" />
              </a>
              <a href="https://www.youtube.com/@mmartplus" target="_blank"  rel="noreferrer">
                <img src="/images/youtube.png" className="" alt="socials" />
              </a>
              <a href="https://www.tiktok.com/@mmartplus_" className="pt-1" target="_blank"  rel="noreferrer">
                <IoLogoTiktok className="text-[#FFC220] w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <h4 className="text-[#004F9A] text-[16px] md:text-[18px] font-[600] mb-3">
              Contact Us
            </h4>

            {storeContact?.phoneNumber && (
            <div className="flex space-x-2">
              <img src="/images/phone.png" className="" alt="payments" />
              <h3 className="mb-2 text-[10px] md:text-[12px] font-medium text-[#131212]">
{storeContact?.phoneNumber}
              </h3>
            </div>
            )}
       {storeContact?.email && (
  <div className="flex space-x-2 mt-2">
    <img src="/images/email.png" alt="email icon" />
    <a 
    target="_blank"  
    rel="noreferrer"
      href={`mailto:${storeContact.email}`} 
      className="mb-2 text-[10px] md:text-[12px] font-medium text-[#131212] mt-1"
    >
      {storeContact.email}
    </a>
  </div>
)}

{storeContact?.address && (
   <div className="flex space-x-2 mt-2">
   <img src="/images/location.png" className="" alt="payments" />
   <h3 className="mb-2 text-[10px] md:text-[12px] font-medium text-[#131212] mt-1">
 {storeContact?.address}
   </h3>
 </div>
)}
         
          </div>

          <div className="hidden lg:block">
            <h4 className="text-[#004F9A] text-[16px] md:text-[18px] font-[600] mb-3">
              Payment method
            </h4>
            <div className="flex space-x-3">
              {/* <img src="/images/payment.png" className="" alt="payments" /> */}
              <img src="/images/visa.png" className="" alt="payments" />
              <img src="/images/book.png" className="" alt="payments" />
              <img src="/images/master.png" className="" alt="payments" />
            </div>
          </div>

          <div className="hidden lg:block">
            {/* <h4 className="text-[#004F9A] text-[16px] md:text-[18px] font-[600] mb-3">
              Download App
            </h4>
            <div className="flex space-x-3">
              <img src="/images/playstore.png" className="" alt="payments" />
              <img src="/images/appstore.png" className="" alt="payments" />
            </div> */}
            <h4 className="text-[#004F9A] text-[16px] md:text-[18px] font-[600] mt-5 mb-3">
              Our Socials
            </h4>
            <div className="flex space-x-5">
              {storeContact?.facebook && (
  <a target="_blank"  rel="noreferrer" href={storeContact?.facebook}>
  <img src="/images/fbook.png" className="" alt="socials" />
</a>
              )}
            
            {storeContact?.twitter && (
 <a target="_blank"  rel="noreferrer" href={storeContact?.twitter}>
 <img src="/images/twitter.png" className="" alt="socials" />
</a>
            )}
             
              {/* to="https://www.instagram.com/mmartplus_" */}
              {storeContact?.instagram && (
  <a href={storeContact?.instagram} target="_blank"  rel="noreferrer">
  <img src="/images/instagram.png" className="" alt="socials" />
</a>
              )}
            
            {storeContact?.youtube && (
  <a href={storeContact?.youtube} target="_blank"  rel="noreferrer">
  <img src="/images/youtube.png" className="" alt="socials" />
</a>
            )}
            
            {storeContact?.tiktok && (
  <a href={storeContact?.tiktok} className="pt-1" target="_blank"  rel="noreferrer">
  <IoLogoTiktok className="text-[#FFC220] w-5 h-5" />
</a>
            )}
            
            </div>
          </div>
        </div>
        <div className="lg:flex hidden justify-center lg:mt-5 lg:mb-0 mb-1">
          <NavLink
              to={"/contact"}
            className=" bg-[#004F9A] text-white font-normal px-8 py-1.5 lg:rounded-[70px] rounded-[5px]  items-center justify-center align-center"
            type="button"
          >
            Contact Us
          </NavLink>
        </div>
      </div>

      <div className="lg:hidden flex justify-center text-center ">
        <div className="w-full lg:w-6/12 px-4">
          {/* <span className=" text-[15px] mt-0 mb-2 text-blueGray-600">
            We’d love to hear what you think!
          </span> */}
          <div className="lg:mt-5 mt-8 lg:mb-0 mb-1">
            <NavLink
              to={"/contact"}
              className=" bg-[#004F9A] text-white font-normal px-20 py-2  rounded-full  items-center justify-center align-center"
              type="button"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
    <footer>
      <div className=" bg-[#004F9A] py-4 lg:px-16 px-4">
        <div className="md:flex hidden items-center justify-between">
          <div className="flex flex-col md:flex-row md:space-x-6  items-center text-center">
            <NavLink to={"/user/about-us"}>
              <h3 className="text-[14px] text-white"> About Us</h3>
            </NavLink>
            {/* <NavLink to={"/terms-and-condition"}>
              <h3 className="text-[14px] text-white">Terms and Condition</h3>
            </NavLink> */}
            <NavLink to={"/refund-policy"}>
              <h3 className="text-[14px] text-white">Refund Policy</h3>
            </NavLink>
          </div>
          <div className="text-center lg:mt-0 mt-3">
            <span className="text-[14px] text-white ">
              
              &copy; {date.getFullYear()} {storeAbbreviation}. All Rights Reserved.
            </span>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-center">
          <div>
            <div className="flex flex-col lg:flex-row lg:space-x-6 gap-y-2 items-center text-center">
              <NavLink to={"/privacy-policy"}>
                <h3 className="text-[14px] text-white">About Us</h3>
              </NavLink>
              {/* <NavLink to={"/terms-and-condition"}>
                <h3 className="text-[14px] text-white">
                  Terms and Condition
                </h3>
              </NavLink> */}
              <NavLink to={"/refund-policy"}>
                <h3 className="text-[14px] text-white">Refund Policy</h3>
              </NavLink>
            </div>
            <div className="text-center lg:mt-0 mt-3">
              <span className="text-[14px] text-white ">
              
                &copy; {date.getFullYear()} {storeAbbreviation}. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  )
}

export default Footer