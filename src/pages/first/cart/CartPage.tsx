import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../../components/Navbars/Navbar";
// import { useSelector } from "react-redux";
// import dayjs from "dayjs";
import Modal from "react-awesome-modal";
import {
  icontypesEnum,
  SvgElement,
} from "../../../components/assets/svgElement";

import { CartApis } from "../../../apis/userApi/cartApis";
import { AxiosResponse } from "axios";
// import { NavLink } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import COUNTRYDATA from "../../../components/assets/country-list.json";
import { Oval } from "react-loader-spinner";
// import { UserApis } from "../../../apis/userApi/userApi";

const CartPage = () => {
  // const navigate = useNavigate();

  // const userLoginData = useSelector((state: any) => state.data.login.value);
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [totalItem, setTotalItem] = React.useState(0);
  // console.log(userLoginData);
  const [visible2, setVisible2] = React.useState(false);
  const [address, setAddress] = React.useState([]);
  // const [suggestions, setSuggestions] = useState([]);
  // const searchBoxRef = useRef<any>(null);
  const [loader, setLoader] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  // console.log(address);
  // console.log(selectedAddress);
  const selectedCurrency = localStorage.getItem("selectedCurrency") || "USD";

  // const [loading, setLoading] = useState(false);
  const optionCountries = COUNTRYDATA.map((item) => ({
    label: item.name,
    value: item.name,
    states: item.states || [], // Ensure states is always an array
  }));
  // const optionState: any = [];
  // COUNTRYDATA.forEach((item) => {
  //   optionCountries.push({ label: item.name, value: item.name });
  // });

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      height: 46,
      minHeight: 46,
      background: "#FFFFFF",
      color: "#1F2337",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#1F2337", // Custom colour
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      display: "none",
    }),
    menu: (base: any) => ({
      ...base,
      background: "white",
      color: "#1F2337",
    }),
    input: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "black",
      };
    },
    singleValue: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "black",
      };
    },
  };

  function customTheme(theme: any) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#bac9e8",
        primary: "#0084CE",
      },
    };
  }

  const [userData, setUserdata] = useState({
    address_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone_number: "",
    is_default: "0",
  });
  const [stateOptions, setStateOptions] = useState<any>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };
  const storeCode = localStorage.getItem("storeCode") || "";

  // Handle country selection
  const handleCountryChange = (selectedOption: any) => {
    if (selectedOption) {
      setUserdata({ ...userData, country: selectedOption.value, state: "" }); // Reset state
      setStateOptions(
        selectedOption.states.map((state: any) => ({
          label: state.name,
          value: state.name,
        }))
      );
    }
  };

  // Handle state selection
  const handleStateChange = (selectedOption: any) => {
    setUserdata({
      ...userData,
      state: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSubmit = React.useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("address_name", userData?.address_name);
      formData.append("address_line_1", userData?.address_line_1);
      formData.append("address_line_2", userData?.address_line_2);
      formData.append("postal_code", userData?.postal_code);
      formData.append("country", userData?.country);
      formData.append("phone_number", userData?.phone_number);
      formData.append("state", userData?.state);
      formData.append("city", userData?.city);

      CartApis.addAddress(storeCode, formData)
        .then((response: any) => {
          // console.log(response);
          if (response?.data?.status === true) {
            toast.success("address successfuly added");
            window.location.reload();
          } else {
            toast.error("Information already exist.");
          }

          toast.success(response?.data?.message);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          toast.error("Offfline");
        });
    },
    [userData, storeCode]
  );


  React.useEffect(() => {
    CartApis.getCart(storeCode)
      .then((response: AxiosResponse<any>) => {
        if (response?.data) {
          // console.log(response?.data?.cart_items);
          setData(response?.data?.cart_items);
          // setTotal(response?.data?.total)
          // let tot = 0;
          // let totItem = 0;
          // response?.data?.cart_items?.map((data: any) => {
          //   tot = tot += data?.quantity * data?.price;
          //   totItem = totItem += 1;
          // });
          // setTotal(tot);
          // setTotalItem(totItem);
          let tot = 0;
          let totItem = 0;

          response?.data?.cart_items?.forEach((data: any) => {
            tot += data?.quantity * data?.price;
            totItem += 1;
          });

          setTotal(tot);
          setTotalItem(totItem);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {
        // handle error
        console.log("eror");
      });
  }, [storeCode]);

  React.useEffect(() => {
    setLoader(true);
    CartApis.getAllAddress(storeCode)
      .then((response) => {
        if (response?.data) {
          // console?.log(response);
          setAddress(response?.data?.data);
          setLoader(false);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {});
  }, [storeCode]);

  // console.log(address)
  const addCartCount = React.useCallback(
    (productInfo: any) => {
      // if (!userLoginData?.data?.id) {
      //   navigate("/sign-in");
      // }
      let data = {
        product_id: productInfo?.product_id,
        // product_price: productInfo?.price, // Ensure price is a number
        // price: productInfo?.price, // Ensure price is a number
        quantity: 1,
      };

      CartApis.createCart(storeCode, data)
        .then((response) => {
          if (response?.data?.status) {
            CartApis.getCart(storeCode).then((response) => {
              if (response?.data) {
                setData(response?.data?.cart_items);
                // let tot = 0;
                // let totItem = 0;
                // response?.data?.cart_items?.map((data: any) => {
                //   tot = tot += data?.quantity * data?.price;
                //   totItem = totItem += 1;
                // });
                // setTotal(tot);
                // setTotalItem(totItem);
                let tot = 0;
                let totItem = 0;

                response?.data?.cart_items?.forEach((data: any) => {
                  tot += data?.quantity * data?.price;
                  totItem += 1;
                });

                setTotal(tot);
                setTotalItem(totItem);
              }
            });
            window.location.reload();
          }
          window.location.reload();
        })
        .catch(function (error) {
          // handle error
          console.log(error.response.data);
          toast.error("Offfline");
        })
        .finally(() => {});
    },
    [storeCode]
  );

  const reduceCartCount = React.useCallback(
    (productInfo: any) => {
      // if (!userLoginData?.data?.id) {
      //   navigate("/sign-in");
      // }

      CartApis.reduceCart(storeCode, productInfo?.product_id)
        .then((response) => {
          if (response?.data?.status) {
            CartApis.getCart(storeCode).then((response) => {
              if (response?.data) {
                setData(response?.data?.cart_items);
                // let tot = 0;
                // let totItem = 0;
                // response?.data?.cart_items?.map((data: any) => {
                //   tot = tot += data?.quantity * data?.price;
                //   totItem = totItem += 1;
                // });

                // setTotal(tot);
                // setTotalItem(totItem);
                let tot = 0;
                let totItem = 0;

                response?.data?.cart_items?.forEach((data: any) => {
                  tot += data?.quantity * data?.price;
                  totItem += 1;
                });

                setTotal(tot);
                setTotalItem(totItem);
              }
            });
          }
          window.location.reload();
        })
        .catch(function (error) {
          // handle error
          console.log(error.response.data);
          toast.error("Offfline");
        })
        .finally(() => {});
    },
    [storeCode]
  );

  const deleteItem = React.useCallback(
    (productInfo: any) => {
      // if (!userLoginData?.id) {
      //   navigate("/sign-in");
      // }

      CartApis.deleteCart(storeCode, productInfo?.id)
        .then((response) => {
          // console.log(response);
          if (response?.data) {
            CartApis.getCart(storeCode).then((response: AxiosResponse<any>) => {
              // console.log(response?.data?.cart_items);
              setData(response?.data?.cart_items);
              // let tot = 0;
              // let totItem = 0;
              // response?.data?.cart_items?.map((data: any) => {
              //   tot = tot += data?.quantity * data?.price;
              //   totItem = totItem += 1;
              // });
              // setTotal(tot);
              // setTotalItem(totItem);
              let tot = 0;
              let totItem = 0;

              response?.data?.cart_items?.forEach((data: any) => {
                tot += data?.quantity * data?.price;
                totItem += 1;
              });

              setTotal(tot);
              setTotalItem(totItem);

              window.location.reload();
            });

            toast.success("deleted Successfully");
            window.location.reload();
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error.response.data);
          toast.error("Offfline");
        })
        .finally(() => {});
    },
    [storeCode]
  );

  const handlePayment = async () => {
    setLoader(true);
    // setError("");

    const paymentData = {
      // cart_token: "abc123xyz",
      customer_address_id: selectedAddress,
      // payment_method: "flutterwave",
      delivery_method: "standard",
      // coupon_code: "DISCOUNT10",
      // recipient_name: userLoginData?.name,
      // phone_number: userLoginData?.data?.phone_number,
      // email: userLoginData?.data?.email,
      // address_line_1: userLoginData?.data?.address ? userLoginData?.data?.address : "address",
      // address_line_2: userLoginData?.data?.address,
      // city: userLoginData?.data?.state ? userLoginData?.data?.state : "lagos",
      // state: userLoginData?.data?.state,
      // postal_code: "10001",
      // country: userLoginData?.data?.country ? userLoginData?.data?.country : "Nigeria",
    };

    try {
      const response = await CartApis.makePayment(storeCode, paymentData);
      // console.log("Payment successful", response);
      if (response?.data) {
        window.location.replace(response.data.paymentLink.data.link);
        console.log(response.data)
      }
      // Handle success (e.g., redirect, show message, etc.)
    } catch (err) {
      console.error("Payment failed", err);
      // setError("Payment failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  // const handleLoad = (searchBox: any) => {
  //   searchBoxRef.current = searchBox;
  // };

  // const handlePlacesChanged = () => {
  //   const places = searchBoxRef.current?.getPlaces();
  //   if (places && places.length > 0) {
  //     setAddress(places[0].formatted_address || "");
  //     setSuggestions([]);
  //   }
  // };

  // const handleInputChange = async (e: any) => {
  //   const input = e.target.value;
  //   setAddress(input);

  //   if (input.length > 2) {
  //     const autocompleteService =
  //       new window.google.maps.places.AutocompleteService();
  //     autocompleteService.getPlacePredictions(
  //       {
  //         input,
  //         componentRestrictions: { country: "NG" },
  //         location: new window.google.maps.LatLng(9.082, 8.6753), // Nigeria's approximate center
  //         radius: 500000, // 500 km radius
  //       },
  //       (predictions: any, status: any) => {
  //         if (
  //           status === window.google.maps.places.PlacesServiceStatus.OK &&
  //           predictions
  //         ) {
  //           setSuggestions(predictions);
  //         } else {
  //           setSuggestions([]);
  //         }
  //       }
  //     );
  //   } else {
  //     setSuggestions([]);
  //   }
  // };

  // const handleSuggestionClick = (suggestion: any) => {
  //   // const selectedStoreAddress = selectedStore; // Get the currently selected store address
  //   setAddress(suggestion.description);
  //   setSuggestions([]);
  //   // Pass both the selected store and the suggestion description to getLocation
  //   // getLocation(selectedStoreAddress?.id, suggestion.description);
  // };
  return (
    <>
      <Navbar />

      <div className="md:flex justify-between gap-10">
        <div className=" md:basis-8/12 mt-10">
          <div className=" border-[2px] rounded-lg px-4 py-3 border-[#E3E4E5] ">
            {/* <div className="border-[2px] rounded-lg px-4 py-3 border-[#E3E4E5] bg-[#F2F8FD]">
              <span className="flex justify-center font-[700] py-5">
                Free shipping, arrives between today, {dayjs().format("MMM DD")}{" "}
                – tomorrow, {dayjs().add(1, "day").format("MMM DD")}
              </span>
            </div> */}

            <hr className="my-4" />

            <div className="flex flex-col gap-2">
              {data?.map((cart: any) => (
                <div className="border-[2px] rounded-lg px-4 py-3 border-[#E3E4E5]">
                  <Link
                    // to={`/`}
                    to={`/view-product/${cart?.product_id}`}
                    className="flex justify-between"
                  >
                    <div className="flex justify-start gap-2">
                      <span
                        className="border-[2px] rounded-lg px-7 py-6 border-[#E3E4E5] w-3"
                        style={{
                          backgroundImage: `url(${cart?.product?.product_images[0]})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                      >
                        <img
                          src={cart?.product?.product_images[0]}
                          className=" w-fit"
                          alt=""
                        />
                      </span>

                      <span className="mt-3">
                      {cart?.product_name
                           ? cart?.product_name.charAt(0).toUpperCase() +
                           cart?.product_name.slice(1) : ""}
      
                        {cart?.product?.product_name}
                      </span>
                    </div>

                    <span className="mt-3">
{selectedCurrency}{" "}
                      { (
                            Number(cart?.price?.replace(/,/g, "")) *
                              cart?.quantity || 0.0
                          )}
                    </span>
                  </Link>

                  <div className="flex justify-end gap-3">
                    <span
                      className=" cursor-pointer"
                      onClick={() => deleteItem(cart?.product)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.615 20C7.155 20 6.771 19.846 6.463 19.538C6.15433 19.2293 6 18.845 6 18.385V5.99998H5V4.99998H9V4.22998H15V4.99998H19V5.99998H18V18.385C18 18.845 17.846 19.229 17.538 19.537C17.2293 19.8456 16.845 20 16.385 20H7.615ZM9.808 17H10.808V7.99998H9.808V17ZM13.192 17H14.192V7.99998H13.192V17Z"
                          fill="#E53945"
                        />
                      </svg>
                    </span>

                    <div>
                      <button
                        className="text-white hover:bg-blue-800 bg-[#027DCB] rounded-l-lg px-2 "
                        onClick={() => reduceCartCount(cart)}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span className="border border-[#E3E4E5] px-1">
                        {" "}
                        {cart?.quantity ? cart?.quantity : "0"}
                        {/* }{" "} */}
                      </span>
                      <button
                        className="text-white hover:bg-blue-800 bg-[#027DCB] rounded-r-lg px-2 "
                        onClick={() => addCartCount(cart)}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className=" md:basis-4/12 mt-10 mb-5">
          <div className=" border-[2px] rounded-lg px-4 py-3 border-[#E3E4E5]">
            <div className="flex flex-col">
              <div className="flex justify-between my-3">
                <span>Sub Total</span>
                <span className=" font-[200] text-[13px]">
                  ({totalItem} Items)&nbsp;&nbsp;{" "}
                  {selectedCurrency} { new Intl.NumberFormat("en-US", {

                      }).format(total ? total : 0.0)}{" "}
                </span>
              </div>

              {/* <div className="flex items-center justify-between my-3">
                <div className="flex flex-col">
                  <span>Shipping</span>
                  <span>(Service fee inclusive)</span>
                </div>
                <span className=" font-[200] text-[13px]">
                  {" "}
                 </span>
              </div> */}

              {/* <div className="flex justify-between my-3">
                <span>Taxes</span>
                <span className=" font-[200] text-[13px]">
                  Calculated at checkout{" "}
                </span>
              </div> */}

              <div className="flex justify-between my-3">
                <span>Estimated Total</span>
                <span>
                {selectedCurrency} {" "}
                  { new Intl.NumberFormat("en-US", {
                      
                      }).format(
                        total
                          ? total
                          : // +
                            //     (selectedPaymentMethod !== "payAtStore" &&
                            //     selectedDeliveryMethod === "shipping"
                            //       ? location
                            //       : 0.0)
                            0.0
                      )}
                </span>
              </div>
              {/* <div className="relative w-full lg:w-12/12">
                <StandaloneSearchBox
                  onLoad={handleLoad}
                  onPlacesChanged={handlePlacesChanged}
                >
               
                  <div className="relative ">
                    <label className="block mb-2 text-sm font-semibold text-[#414143]">
                      Address
                    </label>

                    <textarea
                      className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                      placeholder="Enter Delivery Address"
                      name="address"
                      required
                      value={address ? address : ""}
                      onChange={(e) => handleInputChange(e)}
                      // placeholder="Enter your address"
                      // onChange={() => handleChange}
                    />
                  </div>
                </StandaloneSearchBox>
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion:any) => (
                      <li
                        key={suggestion.place_id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div> */}
              {/* <div className="relative flex flex-col gap-3 mt-5">
                <StandaloneSearchBox
                  onLoad={handleLoad}
                  onPlacesChanged={handlePlacesChanged}
                >
                 
                    <div className="relative w-full lg:w-12/12">
                      <label className="block mb-2 text-sm font-semibold text-[#414143]">
                        Delivery Address
                      </label>

                      <textarea
                        className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                        placeholder="Enter Delivery Address"
                        name="address"
                        required
                        value={address ? address : ""}
                        onChange={(e) => handleInputChange(e)}
                      // placeholder="Enter your address"
                      // onChange={() => handleChange}

                      />

                    </div>

                </StandaloneSearchBox>
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setAddress(suggestion.description);
                          setSuggestions([]);
                        }}
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}

            </div> */}

              <hr className="my-3" />

              <div>
                <h3 className="text-[#595959] text-[16px] pb-4 pt-1">
                  Select an Address:
                </h3>
                {address && address?.length > 0 ? (
                  <form className="flex flex-col pb-3 gap-4">
                    {address?.map((store: any) => (
                      <div className="flex gap-3 items-center" key={store.id}>
                        <label className="flex gap-3 items-center">
                          <input
                            type="radio"
                            name="store"
                            value={store?.id} // Use store ID as the value
                            onChange={() => setSelectedAddress(store.id)}
                            checked={selectedAddress === store?.id} // onChange={(e) => handleStoreSelection(e, store)}

                            // checked={selectedStore?.id === store?.id} // Ensure it's checked when selected
                          />
                          {store?.address_name}
                        </label>
                      </div>
                    ))}
                  </form>
                ) : loader ? (
                  <span>
                    <Oval
                      visible={loader}
                      height="20"
                      width="80"
                      color="blue"
                      secondaryColor="#E6F1FC"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </span>
                ) : (
                  <p>No active stores available.</p>
                )}

                <button
                  onClick={() => setVisible2(true)}
                  className="bg-blue-600 text-white px-2 py-1 rounded-lg"
                >
                  Add Address
                </button>
                {/* Display selected store ID for confirmation */}
                {/* {selectedStore && <p>Selected Store ID: {selectedStore}</p>} */}
              </div>

              <hr className="my-3" />

              <button
                type="button"
                onClick={handlePayment}
                // disabled={
                //   !selectedPaymentMethod ||
                //   !selectedStore ||
                //   loader ||
                //   !selectedDeliveryMethod ||
                //   total === 0
                // }
                className="mt-2 w-full disabled:bg-[#5c5c5c] text-white bg-[#0071BC] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <span className="flex justify-center">
                  <span>
                    {loader ? (
                      <Oval
                        visible={loader}
                        height="20"
                        width="80"
                        color="white"
                        secondaryColor="#E6F1FC"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      "Proceed"
                    )}
                  </span>

                  <span></span>
                </span>
              </button>
              {/* Delivery Method */}
              {/* {selectedStore && (
                <div>
                  <h3 className="text-[#595959] text-[16px] pb-4 pt-1">
                    Select Delivery Method:
                  </h3>
                  <div className="flex flex-col pb-3 gap-5">
                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        id="shipping"
                        name="deliveryMethod"
                        value="shipping"
                        onChange={(e) =>
                          setSelectedDeliveryMethod(e.target.value)
                        }
                        checked={selectedDeliveryMethod === "shipping"}
                      />
                      <label htmlFor="shipping">Shipping</label>
                    </div>
                    <div className="flex gap-3 items-center">
  <input
    type="radio"
    id="pickup"
    name="deliveryMethod"
    value="pickup"
    disabled={
      selectedStore?.other_data?.is_pick_up_available === false
    } // Disable based on selected store's pick-up availability
    onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
    checked={selectedDeliveryMethod === "pickup"}
  />
  <label
    htmlFor="pickup"
    className={
      selectedStore?.other_data?.is_pick_up_available === false
        ? "text-gray-400"
        : ""
    }
  >
    Pickup
  </label>
</div>

                  </div>
                </div>
              )} */}

              {/* Address Input for Shipping */}
              {/* {selectedDeliveryMethod === "shipping" && (
                <div className="relative w-full lg:w-12/12">
                  <StandaloneSearchBox
                    onLoad={handleLoad}
                    onPlacesChanged={handlePlacesChanged}
                  >
                   
                    <div className="relative ">
                      <label className="block mb-2 text-sm font-semibold text-[#414143]">
                        Address
                      </label>

                      <textarea
                        className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                        placeholder="Enter Delivery Address"
                        name="address"
                        required
                        value={address ? address : ""}
                        onChange={(e) => handleInputChange(e)}
                        // placeholder="Enter your address"
                        // onChange={() => handleChange}
                      />
                    </div>
                  </StandaloneSearchBox>
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.place_id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <hr className="my-3" /> */}

              {/* Payment Method */}
              {/* {(selectedDeliveryMethod === "pickup" ||
                selectedDeliveryMethod === "shipping") && (
                <div>
                  <h3 className="text-[#595959] text-[16px] pb-4 pt-1">
                    Payment Method
                  </h3>
                  <div className="flex flex-col pb-3 gap-5">
                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        id="checkout"
                        name="paymentMethod"
                        value="checkout"
                        checked={selectedPaymentMethod === "checkout"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                      />
                      <label htmlFor="checkout">Pay with Card</label>
                    </div>
                    {selectedDeliveryMethod === "pickup" && (
                      <div className="flex gap-3 items-center">
                        <input
                          type="radio"
                          id="payAtStore"
                          name="paymentMethod"
                          value="payAtStore"
                          checked={selectedPaymentMethod === "payAtStore"}
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.value)
                          }
                        />
                        <label htmlFor="payAtStore">Pay in Store</label>
                      </div>
                    )}

                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        id="payWithTransfer"
                        name="paymentMethod"
                        value="payWithTransfer"
                        checked={selectedPaymentMethod === "payWithTransfer"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                      />
                      <label htmlFor="payWithTransfer">Pay With Transfer</label>
                    </div>
                  
                  </div>
                </div>
              )}
              {selectedPaymentMethod &&
                selectedDeliveryMethod === "shipping" && (
                  <div className="py-4 flex justify-center">
                    {location !== "1" &&
                    selectedPaymentMethod !== "payAtStore" ? (
                      <p className="text-[12px] text-gray-500">
                        {" "}
                        ❗ You will be charged{" "}
                        <b className=" font-bold">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                          }).format(location ? location : 0.0)}{" "}
                        </b>{" "}
                        for delivery.
                      </p>
                    ) : (
                      ""
                    )}

                    {location == "1" ? (
                      <p className="text-[12px] text-gray-500">
                        {" "}
                        ❗We could not estinate your address location to our
                        store.
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                )}

              {selectedStore &&
              selectedDeliveryMethod &&
              selectedPaymentMethod ? (
                <>
                  <button
                    type="button"
                    onClick={handleProceed}
                    disabled={
                      !selectedPaymentMethod ||
                      !selectedStore ||
                      loader ||
                      !selectedDeliveryMethod ||
                      total === 0
                    }
                    className="mt-2 w-full disabled:bg-[#5c5c5c] text-white bg-[#0071BC] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <span className="flex justify-center">
                      <span>
                        {loader ? (
                          <Oval
                            visible={loader}
                            height="20"
                            width="80"
                            color="white"
                            secondaryColor="#E6F1FC"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        ) : (
                          "Proceed"
                        )}
                      </span>

                      <span></span>
                    </span>
                  </button>
                </>
              ) : (
                <div>
                  <button
                    type="button"
                    disabled={
                      total == 0
                        ? true
                        : false ||
                          !address ||
                          !selectedStore ||
                          !selectedDeliveryMethod ||
                          total === 0
                      // ||
                      // selectedPaymentMethod === "payWithTransfer"
                    }
                    onClick={() => getLocation()}
                    style={{
                      backgroundColor:
                        total == 0 ||
                        !address ||
                        !selectedStore ||
                        !selectedDeliveryMethod ||
                        !selectedPaymentMethod ||
                        selectedPaymentMethod === "payWithTransfer" ||
                        total === 0
                          ? "#5c5c5c"
                          : "#0071BC",
                      borderRadius: "50px",
                    }}
                    className=" mt-2 w-full text-white disabled:bg-[#5c5c5c] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    <span className="flex justify-center">
                      {loader ? (
                        <Oval
                          visible={loader}
                          height="20"
                          width="80"
                          color="white"
                          secondaryColor="#E6F1FC"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "Continue"
                      )}
                    </span>
                  </button>
                </div>
              )} */}
              {/* {visible2 ? (
                <div>
                  <h3 className="text-[#595959] text-[16px] pb-4 pt-1">
                    Payment Method
                  </h3>

                  <div className="flex flex-col pb-3 gap-5">
                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        id="checkout"
                        name="paymentMethod"
                        value="checkout"
                        checked={selectedPaymentMethod === "checkout"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                      />
                      <label htmlFor="checkout">Pay with Card</label>
                    </div>
                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        id="payAtStore"
                        name="paymentMethod"
                        value="payAtStore"
                        checked={selectedPaymentMethod === "payAtStore"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                      />
                      <label htmlFor="payAtStore">Pay in Store</label>
                    </div>
                  </div>


                  <div
                className="flex gap-3 justify-between mb-3 items-center cursor-pointer"
                onClick={togglePayTransfer}
              >
                <h5>Pay transfer/Pickup at store</h5>
                {isVisible ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {isVisible && (
                <div className="bg-gray-100 p-4 rounded">
                  <p>Here are the payment details:</p>
                  <p><b>Account Number:</b> 4831280948</p>
                  <p><b>Bank:</b> Moniepoint MFB</p>
                  <p><b>Account Name:</b> M-MART PLUS ENTERPRISE - M-MART PLUS ENTERPRISE</p>
                  <p>Message  <a
                      href="https://wa.me/2348148268019?text=Hello%20I%20would%20like%20to%20confirm%20my%20transfer%20"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-blue-700  underline"
                    >
                     +2348148268019
                    </a>  for confirmation. Pickup is available at our store during working hours.</p>
                </div>
              )}
                  <div className="py-4 flex justify-center">
                    {location !== "1" &&
                    selectedPaymentMethod !== "payAtStore" ? (
                      <p className="text-[12px] text-gray-500">
                        {" "}
                        ❗ You will be charged{" "}
                        <b className=" font-bold">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                          }).format(location ? location : 0.0)}{" "}
                        </b>{" "}
                        for delivery.
                      </p>
                    ) : (
                      ""
                    )}

                    {location == "1" ? (
                      <p className="text-[12px] text-gray-500">
                        {" "}
                        ❗We could not estinate your address location to our
                        store.
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleProceed}
                    disabled={
                      !selectedPaymentMethod || !selectedStore || loader
                    }
                    className="mt-2 w-full disabled:bg-[#5c5c5c] text-white bg-[#0071BC] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <span className="flex justify-center">
                      <span>
                        {loader ? (
                          <Oval
                            visible={loader}
                            height="20"
                            width="80"
                            color="white"
                            secondaryColor="#E6F1FC"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        ) : (
                          "Proceed"
                        )}
                      </span>

                      <span></span>
                    </span>
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    disabled={
                      total == 0 ? true : false || !address || !selectedStore
                    }
                    onClick={() => getLocation()}
                    style={{
                      backgroundColor:
                        total == 0 || !address || !selectedStore
                          ? "#5c5c5c"
                          : "#0071BC",
                      borderRadius: "50px",
                    }}
                    className=" mt-2 w-full text-white disabled:bg-[#5c5c5c] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    <span className="flex justify-center">
                      {loader ? (
                        <Oval
                          visible={loader}
                          height="20"
                          width="80"
                          color="white"
                          secondaryColor="#E6F1FC"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "Continue"
                      )}
                    </span>
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <section>
        <Modal
          visible={visible2}
          width="400"
          height="500"
          effect="fadeInUp"
          onClickAway={() => setVisible2(false)}
        >
          <div className="px-3 " style={{ height: "100%", overflow: "auto" }}>
            <span className="flex justify-between px-2 py-2">
              <span className="pt-3 text-[20px] font-bold">Add Address</span>
              <p
                className="cursor-pointer font-bold"
                onClick={(e) => setVisible2(false)}
              >
                <SvgElement type={icontypesEnum.CANCEL} />
              </p>
            </span>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row lg:justify-between max-w-screen-xl mx-auto  mt-5">
                <div className="relative flex flex-col min-w-0 break-words w-full  ">
                  <div className="flex-auto   py-10 pt-0">
                    <div className="flex flex-wrap ">
                      <div className="relative w-full mb-3">
                        <label className="block mb-2 text-sm font-semibold text-[#414143]">
                          Address Name
                        </label>
                        <input
                          type="text"
                          className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                          placeholder="Enter Address Name"
                          name="address_name"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block mb-2 text-sm font-semibold text-[#414143]">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                          placeholder="Enter Address Line"
                          name="address_line_1"
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block mb-2 text-sm font-semibold text-[#414143]">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                          placeholder="Enter Address Line"
                          name="address_line_2"
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3  w-full relative">
                        <label
                          htmlFor="country"
                          className="pb-2 text-[#969696] text-[16px] md:text-[20px] font-[500] "
                        >
                          Country
                        </label>
                        <Select
                          name="country"
                          options={optionCountries}
                          isSearchable
                          theme={customTheme}
                          styles={customStyles}
                          placeholder="select country"
                          noOptionsMessage={() => "Country not found"}
                          onChange={handleCountryChange}
                          value={optionCountries.find(
                            (option) => option.value === userData.country
                          )}
                        />
                      </div>

                      <div className="mb-3 w-full relative">
                        <label
                          htmlFor="state"
                          className=" text-[#969696] text-[16px] md:text-[20px] font-[500] "
                        >
                          State
                        </label>
                        <CreatableSelect
                          name="state"
                          options={stateOptions}
                          isSearchable
                          isClearable
                          theme={customTheme}
                          styles={customStyles}
                          placeholder="select a state"
                          noOptionsMessage={() =>
                            userData.country
                              ? "No states available"
                              : "Select a Country first"
                          }
                          onChange={handleStateChange}
                          value={stateOptions.find(
                            (option: any) => option.value === userData.state
                          )}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block mb-2 text-sm font-semibold text-[#414143]">
                          City
                        </label>
                        <input
                          type="text"
                          className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                          placeholder="Enter City"
                          name="city"
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block mb-2 text-sm font-semibold text-[#414143]">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                          placeholder=""
                          name="postal_code"
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block mb-2 text-sm font-semibold text-[#414143]">
                          Phone Number
                        </label>

                        <input
                          type="number"
                          className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                          placeholder="Enter Phone Number"
                          name="phone_number"
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-[70%] text-white bg-[#027DCB]  font-medium rounded-[5px] text-sm px-5 py-3 mr-2 mb-2"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CartPage;
