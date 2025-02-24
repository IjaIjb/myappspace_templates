import React, { useEffect, useState, Fragment, useCallback } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { UserApis } from "../../../apis/userApi/userApi";
// import Navbar from "../../../components/Navbars/Navbar";
import Footer from "../../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
// import { debounce } from "lodash"; // For optimizing search
import { IoArrowBack } from "react-icons/io5";
import { GrCycle } from "react-icons/gr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { CartApis } from "../../../apis/userApi/cartApis";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { login } from "../../../reducer/loginSlice";
import { Menu, Transition } from "@headlessui/react";
import { IoMdMore } from "react-icons/io";
import NavCurrency from "../../../components/Navbars/NavCurrency";
// import { RootState } from "../../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: Dispatch = useDispatch();

  const userLoginData = useSelector((state: any) => state.data.login.value);
  const storedLogo:any = localStorage.getItem("storeLogo");

  // const { product } = location.state || {};
  // console.log(product)
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  //   React.useEffect(() => {
  //     CartApis.getCart(storeCode).then(
  //         (response: AxiosResponse<any>) => {
  //             if (response?.data) {
  //                 // console.log(response?.data)
  //                 // setname(response?.data?.cart_count);
  //                 setTotal(response?.data?.total)
  //             } else {
  //                 // dispatch(login([]))
  //             }
  //         }
  //     ).catch(function (error) {
  //         // handle error
  //         console.log('eror');
  //     })

  // }, []);
  const selectedCurrency = localStorage.getItem("selectedCurrency") || "";

  const [selectedCategory, setSelectedCategory] = useState<any>(
    location.state?.category_name || location.state
  );

  console.log(selectedCategory);
  const [categories, setCategories] = React.useState<any>([]);
  const [filterProducts, setFilteredProducts] = React.useState<any>([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchresult] = React.useState("");
  // const carouselRefTwo = useRef<any>(null);
  const [loader, setLoader] = React.useState<boolean>(false);
  // const [total, setTotal] = React.useState<any>('');
  const [name, setname] = React.useState("");
  // const normalizeString = (string: any) => {
  //   // Normalize the category string by removing spaces and special characters
  //   return string.replace(/\s+/g, "").replace(/&/g, "");
  // };
console.log(filterProducts)
const storeCode = localStorage.getItem("storeCode") || "";

  console.log(storeCode)
  React.useEffect(() => {
    UserApis.getCategory(storeCode)
      .then((response) => {
        if (response?.data) {
          // console?.log(response?.data);
          setCategories(response?.data?.categories?.data || []);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {});
  }, [storeCode]);

  // Fetch products when category or search changes
  useEffect(() => {
    if (!selectedCategory) return;

    setLoader(true);
    let query: any = [];
    if (location?.state?.searchMe) {
      setSearchresult(location?.state?.searchMe);
      setSearch(location?.state?.searchMe);
      query = {
        search: location?.state?.searchMe,
        // name: loc,
        category_id: selectedCategory.id || "",
      };
    } else {
      const trimmedSearch = search.trim(); // Ensure search doesn't send unnecessary spaces
      query = {
        search: trimmedSearch,
        category_id: selectedCategory.id || "",
      };
    }
    UserApis.getProduct(storeCode, query)
      .then((response) => {
        setLoader(false);
        if (response?.data?.products) {
          // Map products to parse and extract price based on selectedCurrency
          const updatedProducts = response.data.products.map((product: any) => {
            const parsedSellingPrice = JSON.parse(
              product.selling_price || "{}"
            );
            return {
              ...product,
              display_price: parsedSellingPrice[selectedCurrency] || "0", // Fallback in case currency doesn't exist
            };
          });

          setFilteredProducts(updatedProducts); // ✅ Update state with modified prices

          console.log("Fetched Products:", response.data.products);
        } else {
          setFilteredProducts([]); // ✅ Prevent undefined issues
          console.log("No products found");
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("Error fetching products:", error);
      });
  }, [
    storeCode,
    selectedCategory,
    searchResult,
    location?.state?.searchMe,
    search,
    selectedCurrency
  ]);
  
  const [wishlist, setWishlist] = React.useState(new Set());

  React.useEffect(() => {
    CartApis.getCart(storeCode)
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          console.log(response?.data);
          setname(response?.data?.cart_items.length);
          // setTotal(response?.data?.total)
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {
        // handle error
        console.log("eror");
      });
  }, [storeCode]);

  const toggleWishlist = useCallback(
    async (productInfo: any) => {
      const productId = productInfo?.id;
      const isWished = wishlist.has(productId);
  
      try {
        if (isWished) {
          // Remove from wishlist
          const response = await UserApis.removeWishlist(storeCode, productId);
          console.log(response);
          if (response?.data) {
            setWishlist((prev:any) => {
              const updatedSet = new Set([...prev]); // Ensure a new reference
              updatedSet.delete(productId);
              return updatedSet;
            });
            toast.success(response.data.message);
          }
        } else {
          // Add to wishlist
          const response = await UserApis.addToWishlist(storeCode, { product_id: productId });
          console.log(response);
          if (response?.data) {
            setWishlist((prev:any) => {
              const updatedSet = new Set([...prev]); // Ensure a new reference
              updatedSet.add(productId);
              return updatedSet;
            });
            toast.success(response.data.message);
          }
        }
      } catch (error) {
        console.error("Wishlist error:", error);
        toast.error("Something went wrong.");
      }
    },
    [wishlist, storeCode]
  );
  

  React.useEffect(() => {
    UserApis.getAllWishlist(storeCode)
      .then((response) => {
        if (response?.data) {
          // console.log(response.data.wishlist);
          const wishListIds = new Set(
            response?.data?.wishlist.map((item: any) => item.product_id)
          );
          setWishlist(wishListIds);
        } else {
          dispatch(login([]));
        }
      })
      .catch(function (error) {
        console.error("Error fetching wishlist:", error);
      });
  }, [storeCode, dispatch]);
  const logOut = () => {
    dispatch(login([]));
    navigate("/sign-in");
    // AuthApis.logout('').then(
    //     (response: AxiosResponse<any>) => {
    //         if (response) {
    //             navigate('/');

    //         }
    //     }
    // ).catch(function (error: any) {
    //     // handle error
    //     console.log(error.response.data);
    //     console.log("new error");
    // })
  };
  // console.log(wishlist)
  // console.log(categories)

  // Fetch products when category changes
  // useEffect(() => {
  //   // if (!selectedCategory) return;
  //   const trimmedSearch = search.trim(); // Remove unnecessary spaces

  //   if (trimmedSearch === "") return; // Prevent empty search from affecting results

  //   setLoader(true);
  //   const query: any = {
  //     search: encodeURIComponent(trimmedSearch),

  //   };
  //   UserApis.getCategoryProduct(storeCode, selectedCategory.id, query)
  //     .then((response) => {
  //       // setLoader(false);
  //       console.log(response)
  //       setFilteredProducts(response?.data?.products || []);
  //     })
  //     .catch((error) => {
  //       setLoader(false);
  //       console.error("Error fetching products:", error);
  //     });
  // }, [storeCode, selectedCategory, search]);

  // console.log(filterProducts);
  // console.log(selectedCategory);
  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 6,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 6, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 3, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 2, // optional, default to 1.
  //   },
  // };

  // Function to manually trigger left navigation
  // const handlePrevClickOne = () => {
  //   carouselRefTwo.current.previous();
  // };

  // // Function to manually trigger right navigation
  // const handleNextClickOne = () => {
  //   carouselRefTwo.current.next();
  // };

  // Handle category selection
  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setSearch(""); // Reset search when category changes
  };

  const hasMore = categories?.categories?.data?.length > 6;
  // const hasMoreMedium = categories?.categories?.data?.length > 4;
  const hasMoreMobile = categories?.categories?.data?.length > 3;

  // Debounced search to optimize API calls
  // const handleSearchChange = debounce((e: any) => {
  //   setSearch(e.target.value);
  // }, 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting by default

    // if (search.trim() !== '') {
    //     navigate('/product', { state: { searchMe: search } });
    // } else {
    //     alert("Please enter a keyword to search.");
    // }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <NavCurrency />
        <nav className="hidden md:block border-b">
          <div className="flex justify-center w-full ">
            <div className="max-w-[1500px] w-full">
              <div className="flex justify-between items-center py-4 gap-4 md:px-[40px] px-3">
                <NavLink to={"/"}>
                  <img
                    src={storedLogo}
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
                          // defaultValue={search}
                          onChange={(e) => setSearch(e.target.value)}
                          id="search-dropdown"
                          className="block p-3.5 w-full z-20 text-sm text-gray-900  rounded-full  border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Search everything  online and in store"
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
                  <div className="flex gap-2">
                    {/* <div className=''> */}
                    <FaRegHeart className=" w-6 h-6" />
                    {/* </div> */}
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
                        {userLoginData?.data ? name : "0"}
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
                    {userLoginData?.token ? (
                      <Tippy
                        hideOnClick={true}
                        trigger="click"
                        theme="light"
                        interactive={true}
                        arrow={false}
                        placement="bottom-end"
                        offset={[0, -10]}
                        content={
                          <div>
                            <ul>
                              <li className="py-2 cursor-pointer hover:bg-gray-200 px-2">
                                <NavLink to={"/user/profile"}>Profile</NavLink>{" "}
                              </li>
                              <hr />
                              <li className="py-2 cursor-pointer hover:bg-gray-200 px-2">
                                <NavLink to={"/user/view-purchase"}>
                                  Orders
                                </NavLink>
                              </li>

                              <hr />
                              <li className="py-2 cursor-pointer hover:bg-gray-200 px-2">
                                <NavLink to={"/user/wishlist"}>
                                  Wishlist
                                </NavLink>
                              </li>
                              <hr />
                              <li
                                onClick={logOut}
                                className="py-2 cursor-pointer hover:bg-gray-200 px-2"
                              >
                                Logout
                              </li>
                            </ul>
                          </div>
                        }
                      >
                        <h3 className="text-[11.4px] font-normal mt-2 cursor-pointer">
                          Hi, {userLoginData?.data?.first_name}
                        </h3>
                      </Tippy>
                    ) : (
                      <NavLink to={"/"}>
                        <h3 className="text-[14px]  font-semibold">Account</h3>
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <nav className=" block md:hidden border-b pr-3">
          <div className="flex items-center justify-between py-4 ">
            <div
              className={`items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow bg-[#0071BC] absolute top-0 left-0 right-0 h-auto z-3 rounded transition-transform duration-500 ${
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
                        window.location.href.indexOf("/user/view-purchase") !==
                        -1
                          ? "rgba(255, 255, 255, 0.1)"
                          : "text-black hover:text-blueGray-500",
                    }}
                    className={
                      "text-xs cursor-pointer pl-3 block " +
                      (window.location.href.indexOf("/user/view-purchase") !==
                      -1
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

                {userLoginData?.token ? (
                  <li className="items-center mt-[45vh] mx-3 mb-[20vh] pl-3 pb-6">
                    <span
                      className={
                        "text-xs cursor-pointer block  bg-[#FF0000] rounded-md px-3 w-fit"
                      }
                      onClick={logOut}
                    >
                      <span className="flex py-2  cursor-pointer">
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
                        <span className=" text-[15px] mt-1 font-normal text-white">
                          Log out
                        </span>
                      </span>
                    </span>
                  </li>
                ) : (
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
                )}
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
                  {userLoginData?.token ? (
                    <Tippy
                      hideOnClick={true}
                      trigger="click"
                      theme="light"
                      interactive={true}
                      arrow={false}
                      placement="bottom-end"
                      offset={[0, -10]}
                      content={
                        <div>
                          <ul>
                            <li className="py-2 cursor-pointer hover:bg-gray-200 px-2">
                              <NavLink to={"/user/profile"}>Profile</NavLink>{" "}
                            </li>
                            <hr />
                            <li className="py-2 cursor-pointer hover:bg-gray-200 px-2">
                              <NavLink to={"/user/view-purchase"}>
                                Orders
                              </NavLink>
                            </li>

                            <hr />
                            <li className="py-2 cursor-pointer hover:bg-gray-200 px-2">
                              <NavLink to={"/user/wishlist"}>Wishlist</NavLink>
                            </li>
                            <hr />
                            <li
                              onClick={logOut}
                              className="py-2 cursor-pointer hover:bg-gray-200 px-2"
                            >
                              Logout
                            </li>
                          </ul>
                        </div>
                      }
                    >
                      <h3 className="text-[11.6px] font-normal mt-2 cursor-pointer text-white">
                        Hi, User
                      </h3>
                    </Tippy>
                  ) : (
                    <NavLink to={"/"}>
                      <h3 className="text-[14px]  font-semibold">Account</h3>
                    </NavLink>
                  )}
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
                    onChange={(e) => setSearch(e.target.value)}
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
      </div>

      <div className="bg-gray-200 w-full py-3">
        <div className="max-w-[1500px] w-full md:px-[40px] px-3">
          <div className="lg:hidden block">
            <div className="flex justify-between items-center gap-3 md:gap-8 w-full">
              {categories?.length > 0 ? (
                categories?.slice(0, 3).map((cat: any) => (
                  <div
                    // onClick={() => {
                    //   setProduct(cat?.category_name);
                    //   getCategory(cat?.category_name);
                    // }}
                    onClick={() => handleCategoryClick(cat)}
                    key={cat?.id}
                    className={`cursor-pointer px-4  transition-all duration-300 ${
                      selectedCategory?.id === cat.id
                        ? "border-b-4 border-blue-500 font-bold text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    <div className="border rounded-lg flex justify-center">
                      {/* <img
                  src={cat?.category_image}
                  className="rounded-[8px] w-[180px] h-[180px] object-contain"
                  alt="mart Logo"
                /> */}
                    </div>
                    <div>
                      <h4 className="text-center text-[#262626]text-[20px] font-[700] mt-2">
                        {cat?.category_name}
                      </h4>
                    </div>
                  </div>
                ))
              ) : (
                <div>No category available</div>
              )}
              <div className="">
                {hasMoreMobile && (
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex  items-center px-4 py-2 rounded-lg font-semibold">
                      More
                      <IoMdMore className="w-6 h-6" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
                        {categories?.categories?.data
                          ?.slice(3)
                          .map((cat: any) => (
                            <Menu.Item key={cat.id}>
                              {({ active }) => (
                                <button
                                  onClick={() => handleCategoryClick(cat)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block w-full text-left px-4 py-2 text-[#262626] font-medium`}
                                >
                                  {cat.category_name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex justify-between items-center gap-3 md:gap-8 w-full">
              {categories?.length > 0 ? (
                categories?.slice(0, 6).map((cat: any) => (
                  <div
                    // onClick={() => {
                    //   setProduct(cat?.category_name);
                    //   getCategory(cat?.category_name);
                    // }}
                    onClick={() => handleCategoryClick(cat)}
                    key={cat?.id}
                    className={`cursor-pointer px-4  transition-all duration-300 ${
                      selectedCategory?.id === cat.id
                        ? "border-b-4 border-blue-500 font-bold text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    <div className="border rounded-lg flex justify-center">
                      {/* <img
                  src={cat?.category_image}
                  className="rounded-[8px] w-[180px] h-[180px] object-contain"
                  alt="mart Logo"
                /> */}
                    </div>
                    <div>
                      <h4 className="text-center text-[#262626]text-[20px] font-[700] mt-2">
                        {cat?.category_name}
                      </h4>
                    </div>
                  </div>
                ))
              ) : (
                <div>No category available</div>
              )}
              <div className="">
                {hasMore && (
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex  items-center px-4 py-2 rounded-lg font-semibold">
                      More
                      <IoMdMore className="w-6 h-6" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
                        {categories?.categories?.data
                          ?.slice(3)
                          .map((cat: any) => (
                            <Menu.Item key={cat.id}>
                              {({ active }) => (
                                <button
                                  onClick={() => handleCategoryClick(cat)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block w-full text-left px-4 py-2 text-[#262626] font-medium`}
                                >
                                  {cat.category_name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="max-w-[1500px] w-full md:px-[40px] px-3">
          <div className="flex justify-center py-7"></div>

          <div className="py-4">
            <span className="py-3 text-[16px] font-[400]">
              {" "}
              Products: {selectedCategory?.category_name || "All"}
              {/* <span className="text-[21px] font-bold">{searchResult}</span> */}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 ">
            {!loader ? (
              filterProducts?.length >= 1 ? (
                filterProducts?.map((data: any, index: number) => (
                  <div key={data.id} className=" md:w-full  hover:bg-[#f1f6f9] border-2 bg-gray-200 border-[#E6F1FC] rounded-lg p-2 cursor-pointer">
                    <span
                      className="flex justify-end cursor-pointer"
                      onClick={() => toggleWishlist(data)}
                    >
               {wishlist.has(data.id) ? ( 
  <FaHeart className="text-blue-700" />
) : (
  <FaRegHeart className="text-blue-700" />
)}


                    </span>

                    <NavLink to={`/view-product/${data?.id}`}>
                      <p
                        className="mb-2 tracking-tight m-2 rounded-lg p-2 bg-[#F4FBFF] h-44"
                        style={{
                          fontSize: "16px",
                          color: "#595959",
                          backgroundImage: `url(${data?.product_images[0]})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                      ></p>
                      <div className="px-3">
                        <h5 className="text-[18px] pb-1 font-semibold text-gray-900 ">
                        {data?.product_name
                           ? data?.product_name.charAt(0).toUpperCase() +
                           data?.product_name.slice(1) : ""}
      
                          {data?.product_name}
                        </h5>
                        <p>
                          {" "}
                          {selectedCurrency} {data?.display_price}
                        </p>
                      </div>
                      <div>
                        {/* {data?.is_under_deal ? (
                            <div className="flex flex-col">
                              <span className="line-through mr-2 text-gray-500">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "NGN",
                                }).format(data?.original_price)}
                              </span>
                              <h3 className="text-[16px] font-semibold">
                                NGN{data?.discounted_price}
                              </h3>
                            </div>
                          ) : (
                            <h3 className="text-[16px] font-semibold pt-2">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "NGN",
                              }).format(data?.product_price)}{" "}
                            </h3>
                          )} */}
                      </div>

                      {/* <div className="flex justify-between">
                          <span className="rounded-[2px] text-[11px] text-[#004F9A] bg-[#E6F1FC] px-1 py-1.5">
                            same day delivery
                          </span>
                        </div> */}
                    </NavLink>
                  </div>
                ))
              ) : (
                <div className="md:p-6 min-w-[90vw]">
                  <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className=" bg-gray-400 rounded-full text-center text-white mb-2.5">
                    {" "}
                    No Product Availabe
                  </div>

                  <div className="flex items-center mt-4 space-x-3"></div>
                </div>
              )
            ) : (
              <div
                className="p-4 rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700"
                style={{ height: "70vh", width: "92vw" }}
              >
                <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-400"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                <div className="flex items-center mt-4 space-x-3"></div>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>

        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>

      <Footer />
    </div>
  );
};

export default Products;
