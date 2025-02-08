import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/Navbars/Navbar";
import UserSidebar from "../../components/Sidebar/UserSidebar";
import { CartApis } from "../../apis/userApi/cartApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import COUNTRYDATA from "../../components/assets/country-list.json";
import { useNavigate } from "react-router-dom";


const CreateAddress = () => {
  const navigate = useNavigate();

    const optionCountries = COUNTRYDATA.map((item) => ({
        label: item.name,
        value: item.name,
        states: item.states || [], // Ensure states is always an array
      }));

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
  const storeCode = "31958095";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

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
          console.log(response);
          if (response?.data?.status === true) {
            toast.success("address successfuly added");
            navigate("/user/address")
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
    [userData, navigate]
  );

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="hidden md:flex md:w-1/5">
          <UserSidebar title="Purchase List" />
        </div>

        <div className="md:w-4/5 w-full md:px-10 ">
        <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row lg:justify-between max-w-screen-xl mx-auto  mt-5">
                <div className="relative flex flex-col min-w-0 break-words w-full  ">
                  <div className="flex-auto   py-10 pt-0">
                    <div className=" ">
                   <div className="grid lg:grid-cols-2 gap-3 mb-3">
                    <div className="relative w-full ">
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
                    
                    
                   <div className="relative w-full ">
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
                  
                        </div>

                   <div className="grid lg:grid-cols-2 gap-3">

                   <div className="relative w-full ">
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
              
                        <div className=" w-full relative">
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
                            value={optionCountries.find((option) => option.value === userData.country)}
                          />
                        </div>
                 
</div>


<div className="grid lg:grid-cols-2 gap-3 mb-3">

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
                            noOptionsMessage={() => (userData.country ? "No states available" : "Select a Country first")}
                            onChange={handleStateChange}
                            value={stateOptions.find((option:any) => option.value === userData.state)}
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
           </div>

           <div className="grid lg:grid-cols-2 gap-3 mb-3">
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
      </div>
      <Footer />
    </>
  );
};

export default CreateAddress;
