import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { GrCycle } from "react-icons/gr";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { CartApis } from "../../apis/userApi/cartApis";
import { AxiosResponse } from "axios";
import { useSelector } from 'react-redux';
// import { Dispatch } from "redux";
// import { login } from "../../reducer/loginSlice";
import { useNavigate } from "react-router-dom";
import { UserApis } from "../../apis/userApi/userApi";
// import { Listbox } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { setCurrency } from "../../store/stateSlice";
import NavCurrency from "./NavCurrency";

const Navbar = () => {
  // const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoginData = useSelector((state:any) => state.data.login.value);
  const [search, setSearch] = React.useState('');

  // console.log(userLoginData)
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  // const [total, setTotal] = React.useState<any>('');
  const [name, setname] = React.useState('');
  // const [storeData, setStoreData] = React.useState('');
  const [storeCurrency, setStoreCurrency] = React.useState<any>('');
 
  const storeCode = "31958095"

  React.useEffect(() => {
    CartApis.getCart(storeCode).then(
        (response: AxiosResponse<any>) => {
            if (response?.data) {
                console.log(response?.data.cart_items)
                const totalQuantity = response?.data?.cart_items.reduce(
                  (sum: number, item: any) => sum + Number(item.quantity),
                  0
                );
        
                setname(totalQuantity); 
                // setname(response?.data?.cart_items.length);
                // setTotal(response?.data?.total)
                
            } else {
                // dispatch(login([]))
            }
        }
    ).catch(function (error) {
        // handle error
        console.log('eror');
    })

}, []);
const [selectedCurrency, setSelectedCurrency] = useState(storeCurrency?.default_currency || "USD");
// console.log(name)
  React.useEffect(() => {
    UserApis.fetchStoreData(storeCode).then((response) => {
      if (response?.data) {
        // console.log(response.data);
        // setStoreData(response?.data?.store);
        setStoreCurrency(response?.data?.configs.settings);
        setSelectedCurrency(response?.data?.configs.settings?.default_currency || "");
        dispatch(setCurrency(response?.data?.configs.settings?.default_currency || ""));

 
      }
    });
  }, [storeCode]);
// console.log(storeCurrency)

const logOut = () => {
  // dispatch(login([]))
  // navigate("/sign-in");
  UserApis.logout(storeCode, '').then(
      (response: AxiosResponse<any>) => {
          if (response) {
              navigate('/sign-in');

          }
      }
  ).catch(function (error: any) {
      // handle error
      console.log(error.response.data);
      console.log("new error");
  })

};


  // React.useEffect(() => {
  //   CartApis.getSelectedCurrency(storeCode).then((response) => {
  //     if (response?.data) {
  //       console.log(response.data);
  //       // setGetSingleProduct(response?.data?.product);

 
  //     }
  //   });
  // }, [storeCode]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting by default
// console.log(search)
    if (search.trim() !== '') {
        navigate('/product', { state: { searchMe: search } });
    } else {
        alert("Please enter a keyword to search.");
    }
  };
  return (
    <div>
   <NavCurrency />
      <nav className="hidden md:block border-b">
        <div className="flex justify-center w-full ">
          <div className="max-w-[1500px] w-full">
            <div className="flex justify-between items-center py-4 gap-4 md:px-[40px] px-3">
              <NavLink to={"/"}>
                <img
                  src="/images/white-logo.png"
                  width={"100px"}
                  className=""
                  alt="mart Logo"
                />
              </NavLink>

              <div className="">
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-start">
                    <label
                      htmlFor="search-dropdown"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only"
                    >
                      Search
                    </label>

                    <div className="relative w-auto md:w-[200px] lg:w-[500px]">
                      <input
                        type="text"
                        defaultValue={search}
                         onChange={e => setSearch(e.target.value)}
                        id="search-dropdown"
                        className="block p-3.5 w-full z-20 text-sm text-gray-900  rounded-full  border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search everything at M Mart online and in store"
                      />
                      <button
                        type="submit"
                        className="absolute top-[4px] right-[4px] p-2.5 px-7 text-sm font-medium text-white rounded-full border border-blue-200"
                        style={{ backgroundColor: "#FFFF" }}
                      >
                        <div className="flex gap-2 text-[#0071BC]">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                          </svg>
                          <span className="">Search</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
                {/* <AutoCompleteSearch /> */}
              </div>
              <div className="flex flex-row font-medium mt-0  space-x-6 text-sm">
                {/* <div className="flex  gap-2">
                  <GrCycle className=" w-6 h-6" />
                  {
                    <NavLink to={"/"}>
                      <h3 className="text-[11.6px]  font-normal">Wishlist</h3>
                    </NavLink>
                  }
                </div> */}

                <div className="flex gap-2">
                  <FaRegHeart className=" w-6 h-6" />
                  {
                    <NavLink to={"/"}>
                      <h3 className="text-[11.6px]  font-normal">Wishlist</h3>
                    </NavLink>
                  }
                </div>

                <NavLink to={"/view-cart"} className="flex  gap-3">
                  <div className="relative  flex justify-end ">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_920_2264)">
                        <g clip-path="url(#clip1_920_2264)">
                          <g clip-path="url(#clip2_920_2264)">
                            <mask
                              id="mask0_920_2264"
                              maskUnits="userSpaceOnUse"
                              x="1"
                              y="0"
                              width="25"
                              height="25"
                            >
                              <path
                                d="M25.0137 0.496521H1.01367V24.4965H25.0137V0.496521Z"
                                fill="white"
                              />
                            </mask>
                            <g mask="url(#mask0_920_2264)">
                              <path
                                d="M25.0136 3.49652H5.25567L5.21367 3.14552C5.12772 2.41594 4.77706 1.74326 4.22816 1.25499C3.67927 0.766744 2.9703 0.496863 2.23567 0.496521H1.01367V2.49652H2.23567C2.4806 2.49655 2.71701 2.58648 2.90004 2.74924C3.08308 2.912 3.20001 3.13627 3.22867 3.37953L4.81367 16.8475C4.89962 17.5771 5.25029 18.2498 5.79918 18.738C6.34808 19.2263 7.05704 19.4962 7.79167 19.4965H21.0136V17.4965H7.79167C7.54658 17.4965 7.31005 17.4064 7.127 17.2434C6.94394 17.0805 6.8271 16.8559 6.79867 16.6125L6.66767 15.4965H22.8496L25.0136 3.49652ZM21.1776 13.4965H6.43267L5.49167 5.49652H22.6206L21.1776 13.4965Z"
                                fill="#253D4E"
                              />
                              <path
                                d="M8.01367 24.4965C9.11824 24.4965 10.0137 23.6011 10.0137 22.4965C10.0137 21.3919 9.11824 20.4965 8.01367 20.4965C6.9091 20.4965 6.01367 21.3919 6.01367 22.4965C6.01367 23.6011 6.9091 24.4965 8.01367 24.4965Z"
                                fill="#253D4E"
                              />
                              <path
                                d="M18.0137 24.4965C19.1183 24.4965 20.0137 23.6011 20.0137 22.4965C20.0137 21.3919 19.1183 20.4965 18.0137 20.4965C16.9092 20.4965 16.0137 21.3919 16.0137 22.4965C16.0137 23.6011 16.9092 24.4965 18.0137 24.4965Z"
                                fill="#253D4E"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_920_2264">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(0.519531 0.130005)"
                          />
                        </clipPath>
                        <clipPath id="clip1_920_2264">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(0.519531 0.130005)"
                          />
                        </clipPath>
                        <clipPath id="clip2_920_2264">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(0.519531 0.130005)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="absolute inline-flex items-center justify-center  w-[20px] h-[20px] text-xs font-medium text-black bg-[#FFC220] border border-[#000] rounded-full -top-1 -right-2">
                      {
                        userLoginData?.data ? name :
                        "0"
                      }
                    </div>
                  </div>
                  <h3 className="text-[10px] ">Cart</h3>
                </NavLink>

                <div className="flex items-center space-x-2">
                  <div className="">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_920_2277)">
                        <g clip-path="url(#clip1_920_2277)">
                          <g clip-path="url(#clip2_920_2277)">
                            <mask
                              id="mask0_920_2277"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="25"
                              height="25"
                            >
                              <path
                                d="M24.4648 0.496521H0.464844V24.4965H24.4648V0.496521Z"
                                fill="white"
                              />
                            </mask>
                            <g mask="url(#mask0_920_2277)">
                              <path
                                d="M21.4648 24.4965H19.4648V19.4535C19.464 18.6695 19.1522 17.9179 18.5979 17.3635C18.0435 16.8091 17.2918 16.4973 16.5078 16.4965H8.42184C7.63783 16.4973 6.88617 16.8091 6.3318 17.3635C5.77743 17.9179 5.46563 18.6695 5.46484 19.4535V24.4965H3.46484V19.4535C3.46642 18.1393 3.98919 16.8794 4.91846 15.9501C5.84773 15.0209 7.10764 14.4981 8.42184 14.4965H16.5078C17.822 14.4981 19.0819 15.0209 20.0112 15.9501C20.9405 16.8794 21.4632 18.1393 21.4648 19.4535V24.4965Z"
                                fill="#253D4E"
                              />
                              <path
                                d="M12.4648 12.4965C11.2782 12.4965 10.1181 12.1446 9.13142 11.4853C8.14472 10.826 7.37569 9.88898 6.92156 8.79262C6.46744 7.69626 6.34862 6.48986 6.58013 5.32598C6.81164 4.1621 7.38308 3.09299 8.2222 2.25388C9.06131 1.41476 10.1304 0.843323 11.2943 0.611812C12.4582 0.380301 13.6646 0.499121 14.7609 0.953247C15.8573 1.40737 16.7944 2.1764 17.4537 3.1631C18.1129 4.14979 18.4648 5.30983 18.4648 6.49652C18.4632 8.08733 17.8306 9.61253 16.7057 10.7374C15.5809 11.8623 14.0557 12.4949 12.4648 12.4965ZM12.4648 2.49652C11.6737 2.49652 10.9004 2.73112 10.2426 3.17064C9.58476 3.61017 9.07207 4.23488 8.76932 4.9658C8.46657 5.69669 8.38736 6.50097 8.5417 7.27689C8.69604 8.0528 9.077 8.76554 9.63641 9.32495C10.1958 9.88437 10.9086 10.2653 11.6845 10.4197C12.4604 10.574 13.2647 10.4948 13.9956 10.192C14.7265 9.8893 15.3512 9.37661 15.7907 8.71881C16.2302 8.06101 16.4648 7.28764 16.4648 6.49652C16.4648 5.43565 16.0434 4.41824 15.2933 3.66809C14.5431 2.91795 13.5257 2.49652 12.4648 2.49652Z"
                                fill="#253D4E"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_920_2277">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(0.0195312 0.130005)"
                          />
                        </clipPath>
                        <clipPath id="clip1_920_2277">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(0.0195312 0.130005)"
                          />
                        </clipPath>
                        <clipPath id="clip2_920_2277">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(0.0195312 0.130005)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  {
                    userLoginData?.token ?
                        <Tippy hideOnClick={true} trigger="click" theme="light" interactive={true} arrow={false} placement="bottom-end" offset={[0, -10]}  content={

                            <div>
                                <ul>
                                    <li className='py-2 cursor-pointer hover:bg-gray-200 px-2'><NavLink to={'/user/profile'}>Profile</NavLink> </li>
                                    <hr />
                                    <li className='py-2 cursor-pointer hover:bg-gray-200 px-2'><NavLink to={'/user/view-purchase'}>Orders</NavLink></li>

                                    <hr />
                                    <li className='py-2 cursor-pointer hover:bg-gray-200 px-2'><NavLink to={'/user/wishlist'}>Wishlist</NavLink></li>
                                    <hr />
                                    <li 
                                    onClick={logOut} 
                                    className='py-2 cursor-pointer hover:bg-gray-200 px-2'>Logout</li>
                                </ul>
                            </div>

                        }>
                            <h3 className='text-[11.4px] font-normal mt-2 cursor-pointer'>Hi, {userLoginData?.data?.first_name}</h3>
                        </Tippy>
                        :
                    <NavLink to={"/sign-in"}>
                      <h3 className="text-[14px]  font-semibold">Account</h3>
                    </NavLink>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className=" block md:hidden border-b pr-3">
        <div className="flex items-center justify-between py-4 ">
          <div
            className={`items-stretch md:opacity-100 md:relative md:mt-4 z-50 md:shadow-none shadow bg-[#0071BC] absolute top-0 left-0 right-0 h-auto z-3 rounded transition-transform duration-500 ${
              collapseShow === "hidden"
                ? "-translate-x-full"
                : "p-5 mr-5 translate-x-0"
            }`} 
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-1 mb-4  ">
              <div className="flex justify-between ">
                <span
                  className="flex justify-start cursor-pointer gap-1"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <IoArrowBack
                    style={{ color: "#333333" }}
                    className="bg-gray-200 text-xs text-gray-500 rounded-full p-1 h-6 w-6"
                  />{" "}
                  <span className="text-white ml-2">Back</span>
                </span>
              </div>
            </div>

            <ul className="flex-col list-none flex bg-[#0071BC]  md:mt-1 mt-2">
              <li className="items-center mt-5 mx-3 mb-3">
                <NavLink
                  onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor:
                      window.location.href.indexOf("/") !== -1
                        ? "rgba(255, 255, 255, 0.1)"
                        : "text-black hover:text-blueGray-500",
                  }}
                  className={
                    "text-xs cursor-pointer pl-3 block " +
                    (window.location.href.indexOf("/") !== -1
                      ? "text-white rounded-[8px]"
                      : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                  }
                  to="/"
                >
                  <span className="flex py-2.5 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      className="mr-3 "
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        fill-rule="evenodd"
                        d="M7.435 1.25h9.13c.57 0 1.054 0 1.453.041c.426.044.82.14 1.192.37c.371.23.633.539.863.9c.215.34.432.772.687 1.282l.016.033c.01.02.019.039.027.06l1.403 3.547c.168.423.353.95.407 1.488c.055.552-.02 1.183-.453 1.73a2.753 2.753 0 0 1-1.41.945v9.604H22a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5h1.25v-9.604a2.754 2.754 0 0 1-1.41-.944c-.432-.548-.508-1.18-.453-1.73c.054-.54.24-1.066.406-1.489l1.404-3.548a.747.747 0 0 1 .027-.06l.016-.032c.255-.51.471-.943.687-1.282c.23-.361.492-.67.863-.9c.372-.23.766-.326 1.191-.37c.4-.041.884-.041 1.454-.041M18 10.888a2.75 2.75 0 0 0 1.25.758v9.604h-4v-2.782c0-.44 0-.82-.028-1.13c-.03-.33-.096-.656-.273-.963a2.251 2.251 0 0 0-.824-.824c-.307-.177-.633-.243-.962-.273c-.312-.028-.691-.028-1.13-.028h-.065c-.44 0-.82 0-1.13.028c-.33.03-.656.096-.963.273a2.25 2.25 0 0 0-.824.824c-.177.307-.243.633-.273.962c-.028.312-.028.691-.028 1.13v2.783h-4v-9.603a2.75 2.75 0 0 0 1.25-.76a2.742 2.742 0 0 0 2 .863c.788 0 1.499-.331 2-.863a2.742 2.742 0 0 0 2 .863c.788 0 1.499-.331 2-.863a2.742 2.742 0 0 0 2 .863c.788 0 1.499-.331 2-.863M10.25 21.25h3.5V18.5c0-.481 0-.792-.022-1.027c-.02-.225-.055-.307-.079-.348a.75.75 0 0 0-.274-.274c-.04-.024-.123-.058-.348-.079A12.776 12.776 0 0 0 12 16.75c-.481 0-.792 0-1.027.022c-.225.02-.307.055-.348.079a.75.75 0 0 0-.274.274c-.024.04-.059.123-.079.348c-.021.235-.022.546-.022 1.027zM6.75 9a1.25 1.25 0 0 0 2.5 0a.75.75 0 0 1 1.5 0a1.25 1.25 0 0 0 2.5 0a.75.75 0 0 1 1.5 0a1.25 1.25 0 0 0 2.5 0a.75.75 0 0 1 1.5 0a1.25 1.25 0 0 0 2.232.773c.114-.144.17-.342.138-.652c-.032-.322-.151-.688-.308-1.086L19.42 4.517c-.268-.535-.447-.89-.613-1.15c-.16-.252-.274-.361-.386-.43c-.111-.07-.26-.123-.557-.154c-.314-.032-.72-.033-1.336-.033H7.472c-.617 0-1.023 0-1.336.033c-.297.031-.446.085-.557.154c-.112.069-.226.178-.386.43c-.167.26-.345.615-.613 1.15L3.188 8.035c-.157.398-.276.764-.308 1.086c-.031.31.024.508.138.652A1.25 1.25 0 0 0 5.25 9a.75.75 0 0 1 1.5 0"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span
                      style={{ fontSize: "15px" }}
                      className=" font-normal mt-1"
                    >
                      {" "}
                      Home
                    </span>
                  </span>
                </NavLink>
              </li>

              <li className="items-center mt-5 mx-3 mb-3">
                <NavLink
                  onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor:
                      window.location.href.indexOf("/user/view-purchase") !== -1
                        ? "rgba(255, 255, 255, 0.1)"
                        : "text-black hover:text-blueGray-500",
                  }}
                  className={
                    "text-xs cursor-pointer pl-3 block " +
                    (window.location.href.indexOf("/user/view-purchase") !== -1
                      ? "text-white rounded-[8px]"
                      : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                  }
                  to="/user/view-purchase"
                >
                  <span className="flex py-2.5 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      className="mr-3 "
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M18 6H4.27l2.55 6H15c.33 0 .62-.16.8-.4l3-4c.13-.17.2-.38.2-.6a1 1 0 0 0-1-1m-3 7H6.87l-.77 1.56L6 15a1 1 0 0 0 1 1h11v1H7a2 2 0 0 1-2-2a2 2 0 0 1 .25-.97l.72-1.47L2.34 4H1V3h2l.85 2H18a2 2 0 0 1 2 2c0 .5-.17.92-.45 1.26l-2.91 3.89c-.36.51-.96.85-1.64.85"
                      />
                    </svg>
                    <span
                      style={{ fontSize: "15px" }}
                      className=" font-normal mt-1"
                    >
                      {" "}
                      Orders
                    </span>
                  </span>
                </NavLink>
              </li>

              {/* <li className="items-center mt-5 mx-3 mb-3">
                        <NavLink
                            onClick={() => setCollapseShow("hidden")}
                            style={{
                                backgroundColor: (window.location.href.indexOf("/user/wallet") !== -1
                                    ? "rgba(255, 255, 255, 0.1)"
                                    : "text-black hover:text-blueGray-500")
                            }}
                            className={
                                "text-xs cursor-pointer pl-3 block " +
                                (window.location.href.indexOf("/user/wallet") !== -1
                                    ? "text-white rounded-[8px]"
                                    : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                            }
                            to="/user/wallet"
                        >
                            <span className="flex py-2.5 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg"  width="23" height="23" className="mr-3 " viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></g></svg>
                                <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Wallet</span>
                            </span>

                        </NavLink>
                    </li> */}

              <li className="items-center mt-5 mx-3 mb-3">
                <NavLink
                  onClick={() => setCollapseShow("hidden")}
                  style={{
                    backgroundColor:
                      window.location.href.indexOf("/user/wishlist") !== -1
                        ? "rgba(255, 255, 255, 0.1)"
                        : "text-black hover:text-blueGray-500",
                  }}
                  className={
                    "text-xs cursor-pointer pl-3 block " +
                    (window.location.href.indexOf("/user/wishlist") !== -1
                      ? "text-white rounded-[8px]"
                      : "text-white border border-white/[0.1] rounded-[8px] hover:bg-white/[0.1]")
                  }
                  to="/user/wishlist"
                >
                  <span className="flex py-2.5 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      className="mr-3 "
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                        d="m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22"
                      />
                    </svg>
                    <span
                      style={{ fontSize: "15px" }}
                      className=" font-normal mt-1"
                    >
                      {" "}
                      Wishlist
                    </span>
                  </span>
                </NavLink>
              </li>

              {
                userLoginData?.token ?
                    <li className="items-center mt-[45vh] mx-3 mb-[20vh] pl-3 pb-6">
                        <span
                            className={
                                "text-xs cursor-pointer block  bg-[#FF0000] rounded-md px-3 w-fit"
                            }

                            onClick={logOut}
                        >

                            <span className="flex py-2  cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="white" d="M16 13v-2H7V8l-5 4l5 4v-3z" /><path fill="white" d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" /></svg>
                                <span className=" text-[15px] mt-1 font-normal text-white">Log out</span>
                            </span>

                        </span>
                    </li>
                    :
                <li className="items-center mt-[45vh] mb-[20vh] mx-3 ">
                  <NavLink
                    onClick={() => setCollapseShow("hidden")}
                    style={{
                      backgroundColor:
                        window.location.href.indexOf("/sign-in") !== -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500",
                    }}
                    className={
                      "text-xs cursor-pointer pl-3 block " +
                      (window.location.href.indexOf("/sign-in") !== -1
                        ? "text-white rounded-[8px]"
                        : "text-white rounded-[8px] hover:bg-white/[0.1]")
                    }
                    to="/sign-in"
                  >
                    <span className="flex py-2.5 px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="mr-3 "
                        viewBox="0 0 24 24"
                      >
                        <path fill="white" d="M16 13v-2H7V8l-5 4l5 4v-3z" />
                        <path
                          fill="white"
                          d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
                        />
                      </svg>
                      <span
                        style={{ fontSize: "15px" }}
                        className=" font-normal mt-1"
                      >
                        {" "}
                        Sign In
                      </span>
                    </span>
                  </NavLink>
                </li>
              }
            </ul>
          </div>
          <div className="flex justify-start gap-2">
            <span className="ml-2 mt-1">
              <button
                className="cursor-pointer text-white md:hidden text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                type="button"
                onClick={() => setCollapseShow(" mr-5 py-4 px-3 ")}
              >
                <b className="fas fa-bars text-3xl">
                  <svg
                    width="21"
                    height="15"
                    viewBox="0 0 21 15"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.92857 0H9.07143C9.45031 0 9.81367 0.158035 10.0816 0.43934C10.3495 0.720644 10.5 1.10218 10.5 1.5C10.5 1.89782 10.3495 2.27936 10.0816 2.56066C9.81367 2.84196 9.45031 3 9.07143 3H1.92857C1.54969 3 1.18633 2.84196 0.918419 2.56066C0.65051 2.27936 0.5 1.89782 0.5 1.5C0.5 1.10218 0.65051 0.720644 0.918419 0.43934C1.18633 0.158035 1.54969 0 1.92857 0ZM11.9286 12H19.0714C19.4503 12 19.8137 12.158 20.0816 12.4393C20.3495 12.7206 20.5 13.1022 20.5 13.5C20.5 13.8978 20.3495 14.2794 20.0816 14.5607C19.8137 14.842 19.4503 15 19.0714 15H11.9286C11.5497 15 11.1863 14.842 10.9184 14.5607C10.6505 14.2794 10.5 13.8978 10.5 13.5C10.5 13.1022 10.6505 12.7206 10.9184 12.4393C11.1863 12.158 11.5497 12 11.9286 12ZM1.92857 6H19.0714C19.4503 6 19.8137 6.15804 20.0816 6.43934C20.3495 6.72064 20.5 7.10218 20.5 7.5C20.5 7.89782 20.3495 8.27936 20.0816 8.56066C19.8137 8.84196 19.4503 9 19.0714 9H1.92857C1.54969 9 1.18633 8.84196 0.918419 8.56066C0.65051 8.27936 0.5 7.89782 0.5 7.5C0.5 7.10218 0.65051 6.72064 0.918419 6.43934C1.18633 6.15804 1.54969 6 1.92857 6Z"
                      fill=""
                    />
                  </svg>
                </b>
                <span className="text-white "> </span>
              </button>
            </span>

            <span>
              <NavLink to={"/"}>
                <img
                  src="/images/white-logo.png"
                  width={"95px"}
                  className=""
                  alt="mart Logo"
                />
              </NavLink>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex  gap-2">
                {/* <div className=''> */}
                <GrCycle className=" w-4 h-4" />
                {/* </div> */}
                {
                  <NavLink to={"/"}>
                    <h3 className="text-[11.6px]  font-normal">Wishlist</h3>
                  </NavLink>
                }
              </div>

              <div className="flex gap-2">
                {/* <div className=''> */}
                <FaRegHeart className=" w-4 h-4" />
                {/* </div> */}
                {
                  <NavLink to={"/"}>
                    <h3 className="text-[11.6px]  font-normal">Wishlist</h3>
                  </NavLink>
                }
              </div>
            </div>

            <div className="flex items-center gap-3">
              <NavLink to={"/view-cart"} className="flex  gap-3">
                <div className="relative  flex justify-end ">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_920_2264)">
                      <g clip-path="url(#clip1_920_2264)">
                        <g clip-path="url(#clip2_920_2264)">
                          <mask
                            id="mask0_920_2264"
                            maskUnits="userSpaceOnUse"
                            x="1"
                            y="0"
                            width="25"
                            height="25"
                          >
                            <path
                              d="M25.0137 0.496521H1.01367V24.4965H25.0137V0.496521Z"
                              fill="white"
                            />
                          </mask>
                          <g mask="url(#mask0_920_2264)">
                            <path
                              d="M25.0136 3.49652H5.25567L5.21367 3.14552C5.12772 2.41594 4.77706 1.74326 4.22816 1.25499C3.67927 0.766744 2.9703 0.496863 2.23567 0.496521H1.01367V2.49652H2.23567C2.4806 2.49655 2.71701 2.58648 2.90004 2.74924C3.08308 2.912 3.20001 3.13627 3.22867 3.37953L4.81367 16.8475C4.89962 17.5771 5.25029 18.2498 5.79918 18.738C6.34808 19.2263 7.05704 19.4962 7.79167 19.4965H21.0136V17.4965H7.79167C7.54658 17.4965 7.31005 17.4064 7.127 17.2434C6.94394 17.0805 6.8271 16.8559 6.79867 16.6125L6.66767 15.4965H22.8496L25.0136 3.49652ZM21.1776 13.4965H6.43267L5.49167 5.49652H22.6206L21.1776 13.4965Z"
                              fill="#253D4E"
                            />
                            <path
                              d="M8.01367 24.4965C9.11824 24.4965 10.0137 23.6011 10.0137 22.4965C10.0137 21.3919 9.11824 20.4965 8.01367 20.4965C6.9091 20.4965 6.01367 21.3919 6.01367 22.4965C6.01367 23.6011 6.9091 24.4965 8.01367 24.4965Z"
                              fill="#253D4E"
                            />
                            <path
                              d="M18.0137 24.4965C19.1183 24.4965 20.0137 23.6011 20.0137 22.4965C20.0137 21.3919 19.1183 20.4965 18.0137 20.4965C16.9092 20.4965 16.0137 21.3919 16.0137 22.4965C16.0137 23.6011 16.9092 24.4965 18.0137 24.4965Z"
                              fill="#253D4E"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_920_2264">
                        <rect
                          width="25"
                          height="25"
                          fill="white"
                          transform="translate(0.519531 0.130005)"
                        />
                      </clipPath>
                      <clipPath id="clip1_920_2264">
                        <rect
                          width="25"
                          height="25"
                          fill="white"
                          transform="translate(0.519531 0.130005)"
                        />
                      </clipPath>
                      <clipPath id="clip2_920_2264">
                        <rect
                          width="25"
                          height="25"
                          fill="white"
                          transform="translate(0.519531 0.130005)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="absolute inline-flex items-center justify-center  w-[15px] h-[15px] text-xs font-medium text-black bg-[#FFC220] border border-[#000] rounded-full -top-1 -right-2">
                    {
                      // userLoginData?.data ? name :
                      "0"
                    }
                  </div>
                </div>
                <h3 className="text-[10px] ">Cart</h3>
              </NavLink>

              <div className="flex  space-x-2">
                <div className="">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_920_2277)">
                      <g clip-path="url(#clip1_920_2277)">
                        <g clip-path="url(#clip2_920_2277)">
                          <mask
                            id="mask0_920_2277"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="25"
                          >
                            <path
                              d="M24.4648 0.496521H0.464844V24.4965H24.4648V0.496521Z"
                              fill="white"
                            />
                          </mask>
                          <g mask="url(#mask0_920_2277)">
                            <path
                              d="M21.4648 24.4965H19.4648V19.4535C19.464 18.6695 19.1522 17.9179 18.5979 17.3635C18.0435 16.8091 17.2918 16.4973 16.5078 16.4965H8.42184C7.63783 16.4973 6.88617 16.8091 6.3318 17.3635C5.77743 17.9179 5.46563 18.6695 5.46484 19.4535V24.4965H3.46484V19.4535C3.46642 18.1393 3.98919 16.8794 4.91846 15.9501C5.84773 15.0209 7.10764 14.4981 8.42184 14.4965H16.5078C17.822 14.4981 19.0819 15.0209 20.0112 15.9501C20.9405 16.8794 21.4632 18.1393 21.4648 19.4535V24.4965Z"
                              fill="#253D4E"
                            />
                            <path
                              d="M12.4648 12.4965C11.2782 12.4965 10.1181 12.1446 9.13142 11.4853C8.14472 10.826 7.37569 9.88898 6.92156 8.79262C6.46744 7.69626 6.34862 6.48986 6.58013 5.32598C6.81164 4.1621 7.38308 3.09299 8.2222 2.25388C9.06131 1.41476 10.1304 0.843323 11.2943 0.611812C12.4582 0.380301 13.6646 0.499121 14.7609 0.953247C15.8573 1.40737 16.7944 2.1764 17.4537 3.1631C18.1129 4.14979 18.4648 5.30983 18.4648 6.49652C18.4632 8.08733 17.8306 9.61253 16.7057 10.7374C15.5809 11.8623 14.0557 12.4949 12.4648 12.4965ZM12.4648 2.49652C11.6737 2.49652 10.9004 2.73112 10.2426 3.17064C9.58476 3.61017 9.07207 4.23488 8.76932 4.9658C8.46657 5.69669 8.38736 6.50097 8.5417 7.27689C8.69604 8.0528 9.077 8.76554 9.63641 9.32495C10.1958 9.88437 10.9086 10.2653 11.6845 10.4197C12.4604 10.574 13.2647 10.4948 13.9956 10.192C14.7265 9.8893 15.3512 9.37661 15.7907 8.71881C16.2302 8.06101 16.4648 7.28764 16.4648 6.49652C16.4648 5.43565 16.0434 4.41824 15.2933 3.66809C14.5431 2.91795 13.5257 2.49652 12.4648 2.49652Z"
                              fill="#253D4E"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_920_2277">
                        <rect
                          width="25"
                          height="25"
                          fill="white"
                          transform="translate(0.0195312 0.130005)"
                        />
                      </clipPath>
                      <clipPath id="clip1_920_2277">
                        <rect
                          width="25"
                          height="25"
                          fill="white"
                          transform="translate(0.0195312 0.130005)"
                        />
                      </clipPath>
                      <clipPath id="clip2_920_2277">
                        <rect
                          width="25"
                          height="25"
                          fill="white"
                          transform="translate(0.0195312 0.130005)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {
                  userLoginData?.token ?
                      <Tippy hideOnClick={true} trigger="click" theme="light" interactive={true} arrow={false} placement="bottom-end" offset={[0, -10]}  content={

                          <div>
                              <ul>
                                  <li className='py-2 cursor-pointer hover:bg-gray-200 px-2'><NavLink to={'/user/profile'}>Profile</NavLink> </li>
                                  <hr />
                                  <li className='py-2 cursor-pointer hover:bg-gray-200 px-2'><NavLink to={'/user/view-purchase'}>Orders</NavLink></li>

                                  <hr />
                                  <li className='py-2 cursor-pointer hover:bg-gray-200 px-2'><NavLink to={'/user/wishlist'}>Wishlist</NavLink></li>
                                  <hr />
                                  <li 
                                  onClick={logOut} 
                                  className='py-2 cursor-pointer hover:bg-gray-200 px-2'>Logout</li>
                              </ul>
                          </div>

                      }>
                          <h3 className='text-[11.6px] font-normal mt-2 cursor-pointer text-white'>Hi, User</h3>
                      </Tippy>
                      :
                  <NavLink to={"/"}>
                    <h3 className="text-[14px]  font-semibold">Account</h3>
                  </NavLink>
                }
              </div>
            </div>
          </div>

          {/* <div className='flex mt-1 mr-3'>
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.024 1.984H5.024V5.984H1.024V1.984ZM0.512 0.991995C0.362667 0.991995 0.24 1.04 0.144 1.13599C0.048 1.23199 0 1.35466 0 1.50399V6.496C0 6.64533 0.048 6.76799 0.144 6.864C0.24 6.96 0.362667 7.008 0.512 7.008H5.504C5.65333 7.008 5.776 6.96 5.872 6.864C5.968 6.76799 6.016 6.64533 6.016 6.496V1.50399C6.016 1.35466 5.968 1.23199 5.872 1.13599C5.776 1.04 5.65333 0.991995 5.504 0.991995H0.512ZM9.024 1.984V5.984H13.024V1.984H9.024ZM8.512 0.991995H13.504C13.6533 0.991995 13.776 1.04 13.872 1.13599C13.968 1.23199 14.016 1.35466 14.016 1.50399V6.496C14.016 6.64533 13.968 6.76799 13.872 6.864C13.776 6.96 13.6533 7.008 13.504 7.008H8.512C8.36267 7.008 8.24 6.96 8.144 6.864C8.048 6.76799 8 6.64533 8 6.496V1.50399C8 1.35466 8.048 1.23199 8.144 1.13599C8.24 1.04 8.36267 0.991995 8.512 0.991995ZM1.024 9.984V13.984H5.024V9.984H1.024ZM0.512 8.992H5.504C5.65333 8.992 5.776 9.04 5.872 9.136C5.968 9.232 6.016 9.35466 6.016 9.504V14.496C6.016 14.6453 5.968 14.768 5.872 14.864C5.776 14.96 5.65333 15.008 5.504 15.008H0.512C0.362667 15.008 0.24 14.96 0.144 14.864C0.048 14.768 0 14.6453 0 14.496V9.504C0 9.35466 0.048 9.232 0.144 9.136C0.24 9.04 0.362667 8.992 0.512 8.992ZM9.024 9.984V13.984H13.024V9.984H9.024ZM8.512 8.992H13.504C13.6533 8.992 13.776 9.04 13.872 9.136C13.968 9.232 14.016 9.35466 14.016 9.504V14.496C14.016 14.6453 13.968 14.768 13.872 14.864C13.776 14.96 13.6533 15.008 13.504 15.008H8.512C8.36267 15.008 8.24 14.96 8.144 14.864C8.048 14.768 8 14.6453 8 14.496V9.504C8 9.35466 8.048 9.232 8.144 9.136C8.24 9.04 8.36267 8.992 8.512 8.992Z" fill="#F2B705" />
      </svg>

      <h3 className='text-[15px]'>Categories</h3>
    </div> */}
        </div>

        <div className="flex justify-center my-5 pb-3 mx-2">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-start">
              <div className="relative w-9/12]">
                <input
                  type="text"
                  //  defaultValue={search}
                  //  onChange={e => setSearch(e.target.value)}
                  id="search-dropdown"
                  className="block p-2.5 w-[85vw] z-20 text-sm text-gray-900 bg-[#0071BC] rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search everything here"
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-[#0071BC] text-sm font-medium rounded-full border border-blue-200"
                  style={{ backgroundColor: "#FFFF" }}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
          {/* <AutoCompleteSearch /> */}
        </div>
      </nav>

      {/* <div className="border-y my-1">
        <div className=" w-full">
          <div className="flex justify-center w-full">
            <div className="max-w-[1500px] w-full">
              <div className="md:flex justify-between items-center py-2 gap-4 md:px-[40px] px-3">
                <div className="flex gap-3">
                  <div className="bg-[#027DCB] rounded-md flex gap-2 items-center px-3 py-2 text-white">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_920_2290)">
                        <path
                          d="M7.86 8.05667H0.5V2.72333C0.5 2.19 0.695556 1.72778 1.08667 1.33667C1.47778 0.945555 1.95778 0.75 2.52667 0.75H7.86V8.05667ZM1.83333 6.72333H6.52667V2.08333H2.52667C2.31333 2.08333 2.14444 2.14556 2.02 2.27C1.89556 2.39444 1.83333 2.54556 1.83333 2.72333V6.72333ZM16.5 8.05667H9.19333V0.75H14.5267C15.06 0.75 15.5222 0.945555 15.9133 1.33667C16.3044 1.72778 16.5 2.20778 16.5 2.77667V8.05667ZM10.5267 6.72333H15.1667V2.72333C15.1667 2.54556 15.1044 2.39444 14.98 2.27C14.8556 2.14556 14.7044 2.08333 14.5267 2.08333H10.5267V6.72333ZM7.86 16.75H2.52667C1.95778 16.75 1.47778 16.5544 1.08667 16.1633C0.695556 15.7722 0.5 15.31 0.5 14.7767V9.39H7.86V16.75ZM1.83333 10.7233V14.7233C1.83333 14.9367 1.89556 15.1056 2.02 15.23C2.14444 15.3544 2.31333 15.4167 2.52667 15.4167H6.52667V10.7233H1.83333ZM14.5267 16.75H9.19333V9.39H16.5V14.7233C16.5 15.2922 16.3044 15.7722 15.9133 16.1633C15.5222 16.5544 15.0422 16.75 14.4733 16.75H14.5267ZM10.5267 15.4167H14.5267C14.7044 15.4167 14.8556 15.3544 14.98 15.23C15.1044 15.1056 15.1667 14.9367 15.1667 14.7233V10.7233H10.5267V15.4167Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_920_2290">
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="matrix(1 0 0 -1 0.5 16.75)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <h4 className="text-[16px] font-[700]">
                      Browse All Categories
                    </h4>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_920_2294)">
                        <path
                          d="M10.3199 3.21666L6.21992 7.34999C6.13103 7.41666 6.03103 7.44999 5.91992 7.44999C5.80881 7.44999 5.70881 7.41666 5.61992 7.34999L1.51992 3.21666L0.919922 3.81666L5.01992 7.91666C5.28659 8.1611 5.58659 8.28333 5.91992 8.28333C6.25326 8.28333 6.55326 8.1611 6.81992 7.91666L10.9199 3.81666L10.3199 3.21666Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_920_2294">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="matrix(1 0 0 -1 0.919922 10.75)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-1 ">
                      <svg
                        width="21"
                        height="22"
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_920_2298)">
                          <g clip-path="url(#clip1_920_2298)">
                            <g clip-path="url(#clip2_920_2298)">
                              <mask
                                id="mask0_920_2298"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="21"
                                height="21"
                              >
                                <path
                                  d="M20.9199 0.767151H0.919922V20.7672H20.9199V0.767151Z"
                                  fill="white"
                                />
                              </mask>
                              <g mask="url(#mask0_920_2298)">
                                <path
                                  d="M14.5869 4.16046C13.5869 3.31296 12.5569 2.43379 11.5144 1.39463L10.9202 0.804626L10.3369 1.39546C8.46025 3.27713 7.57358 6.16629 7.18858 7.89963C6.89389 7.44288 6.67522 6.94137 6.54108 6.41463L6.18858 5.05379L5.16358 6.01713C3.36775 7.70296 2.17025 9.37546 2.17025 12.0538C2.15348 13.9857 2.78268 15.8678 3.95793 17.4012C5.13317 18.9345 6.78706 20.0313 8.65692 20.5172C9.22031 20.6542 9.79534 20.7379 10.3744 20.7672C10.5555 20.7901 10.7377 20.802 10.9202 20.803C11.016 20.803 11.1094 20.7947 11.2027 20.7888C13.4728 20.7205 15.627 19.7703 17.2079 18.1397C18.7888 16.5091 19.6721 14.3266 19.6702 12.0555C19.6702 8.47713 17.3144 6.47713 14.5869 4.16046ZM11.0869 19.1222C11.0035 19.1222 10.9202 19.1305 10.8319 19.1297C10.0818 19.1067 9.37007 18.7931 8.84696 18.2551C8.32386 17.7171 8.03039 16.9967 8.02858 16.2463C8.02858 15.1897 8.59525 14.663 9.87775 13.5713C10.2011 13.2963 10.5527 12.9972 10.9227 12.6547C11.2469 12.9488 11.5619 13.2155 11.8527 13.463C13.141 14.5563 13.8135 15.1772 13.8135 16.2438C13.8121 16.9809 13.529 17.6896 13.0221 18.2247C12.5151 18.7598 11.8228 19.0809 11.0869 19.1222ZM15.2702 17.6463L15.2535 17.658C15.4031 17.2023 15.4796 16.7259 15.4802 16.2463C15.4802 14.3588 14.2419 13.3072 12.9319 12.1947C12.4677 11.8013 11.9885 11.3947 11.5102 10.9163L10.9202 10.3272L10.3311 10.9163C9.79108 11.4555 9.26275 11.9055 8.79691 12.3022C7.49025 13.4138 6.36108 14.3747 6.36108 16.2463C6.36286 16.7465 6.44733 17.2429 6.61108 17.7155C5.74363 17.0494 5.04189 16.1918 4.56066 15.2097C4.07943 14.2276 3.83173 13.1475 3.83692 12.0538C3.82321 10.5915 4.3892 9.18323 5.41108 8.13713C5.5871 8.49423 5.79577 8.83429 6.03442 9.15296C6.20872 9.38816 6.44803 9.56722 6.72286 9.66806C6.99769 9.7689 7.29602 9.78711 7.58108 9.72046C7.87107 9.6559 8.13633 9.50918 8.34514 9.29786C8.55396 9.08653 8.69749 8.81953 8.75858 8.52879C9.10751 6.6135 9.86218 4.79502 10.9719 3.19546C11.851 4.02879 12.7219 4.76629 13.5077 5.43379C16.1177 7.65046 18.0077 9.25213 18.0077 12.0588C18.0097 13.1377 17.7639 14.2026 17.2891 15.1714C16.8143 16.1402 16.1241 16.9869 15.2702 17.6463Z"
                                  fill="#027DCB"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_920_2298">
                            <rect
                              width="20"
                              height="21"
                              fill="white"
                              transform="translate(0.919922 0.25)"
                            />
                          </clipPath>
                          <clipPath id="clip1_920_2298">
                            <rect
                              width="20"
                              height="21"
                              fill="white"
                              transform="translate(0.919922 0.25)"
                            />
                          </clipPath>
                          <clipPath id="clip2_920_2298">
                            <rect
                              width="20"
                              height="21"
                              fill="white"
                              transform="translate(0.919922 0.25)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <h4 className="text-[16px] font-[700] text-[#253D4E]">
                        Deals
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="flex md:mt-0 mt-2 items-center gap-4">
                  <svg
                    width="37"
                    height="39"
                    viewBox="0 0 37 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_920_2326)">
                      <g clip-path="url(#clip1_920_2326)">
                        <g clip-path="url(#clip2_920_2326)">
                          <path
                            d="M31.8584 20.386V18.25C31.8584 14.6696 30.4361 11.2358 27.9044 8.70406C25.3726 6.17232 21.9389 4.75 18.3584 4.75C14.778 4.75 11.3442 6.17232 8.81251 8.70406C6.28076 11.2358 4.85845 14.6696 4.85845 18.25V20.386C3.28519 21.0787 1.99765 22.2909 1.21138 23.8196C0.425111 25.3483 0.187838 27.1006 0.539283 28.7834C0.890728 30.4661 1.80956 31.977 3.14195 33.0632C4.47435 34.1494 6.13943 34.7449 7.85845 34.75H10.8584V19.75H7.85845V18.25C7.85845 15.4652 8.96469 12.7945 10.9338 10.8254C12.903 8.85625 15.5737 7.75 18.3584 7.75C21.1432 7.75 23.8139 8.85625 25.7831 10.8254C27.7522 12.7945 28.8584 15.4652 28.8584 18.25V19.75H25.8584V31.75H19.8584V34.75H28.8584C30.5775 34.7449 32.2425 34.1494 33.5749 33.0632C34.9073 31.977 35.8262 30.4661 36.1776 28.7834C36.5291 27.1006 36.2918 25.3483 35.5055 23.8196C34.7192 22.2909 33.4317 21.0787 31.8584 20.386ZM7.85845 31.75C6.66497 31.75 5.52038 31.2759 4.67647 30.432C3.83255 29.5881 3.35845 28.4435 3.35845 27.25C3.35845 26.0565 3.83255 24.9119 4.67647 24.068C5.52038 23.2241 6.66497 22.75 7.85845 22.75V31.75ZM28.8584 31.75V22.75C30.0519 22.75 31.1965 23.2241 32.0404 24.068C32.8843 24.9119 33.3584 26.0565 33.3584 27.25C33.3584 28.4435 32.8843 29.5881 32.0404 30.432C31.1965 31.2759 30.0519 31.75 28.8584 31.75Z"
                            fill="#253D4E"
                          />
                        </g>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_920_2326">
                        <rect
                          width="36"
                          height="38"
                          fill="white"
                          transform="translate(0.359375 0.75)"
                        />
                      </clipPath>
                      <clipPath id="clip1_920_2326">
                        <rect
                          width="36"
                          height="38"
                          fill="white"
                          transform="translate(0.359375 0.75)"
                        />
                      </clipPath>
                      <clipPath id="clip2_920_2326">
                        <rect
                          width="36"
                          height="36"
                          fill="white"
                          transform="translate(0.359375 1.75)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <div>
                    <h4 className="text-[#027DCB] text-[26px] font-[700]">
                      1900 - 888
                    </h4>
                    <h4 className="text-[#7E7E7E] text-[12px] font-[500]">
                      24/7 Support Center
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
