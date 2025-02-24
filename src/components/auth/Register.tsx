import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../apis/userApi/userApi";
// import { useDispatch } from "react-redux";
// import { Dispatch } from "redux";
// import { login } from "../../reducer/loginSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const storeCode = localStorage.getItem("storeCode") || "";
 
  const [storeLogo, setStoreLogo] = useState<any>(null); // Store logo URL
  
  useEffect(() => {
  const storedLogo = localStorage.getItem("storeLogo");

      if (storedLogo) {
          setStoreLogo(storedLogo);
      }
  }, []);
  
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [userData, setUserdata] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    // checked: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
  };

  const handleSubmit = React.useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if (userData?.password !== userData?.password_confirmation) {
        return toast.error("Password does not match");
      }

      const formData = new FormData();
      formData.append("first_name", userData?.first_name);
      formData.append("last_name", userData?.last_name);
      formData.append("email", userData?.email);
      formData.append("phone_number", userData?.phone_number);
      formData.append("password", userData?.password);
      formData.append("password_confirmation", userData?.password_confirmation);

      UserApis.register(storeCode, formData)
        .then((response: any) => {
          console.log(response)
          if (response?.data) {
            // dispatch(
            //   login({
            //     login: userData?.email,
            //     token: response.data.data.token.access_token,
            //     id: response.data.data.id,
            //     name: response.data.data.customer.first_name,
            //     data: response?.data?.data.customer,
            //   })
            // );
            toast.success(response?.data?.message);
            setLoading(false);
            navigate("/verify-email", { state: { email: userData?.email } });

          } else {
            toast.error("Information already exist.");
            setLoading(false);
          }

          toast.success(response?.data?.message);
        })
        .catch(function (error) {
          setLoading(false);
          // handle error
          console.log(error);
          toast.error(error?.response?.data?.message);
        });
    },
    [userData, navigate, storeCode]
  );

  return (
    <div>
      <div className=" bg-[#FBFBFB] pt-14 ">
        <div className="container flex flex-col md:justify-center mx-auto items-center rounded-lg p-6 md:max-w-3xl">
          <div>
            <NavLink className="text-center flex justify-center" to={"/"}>
              <img
                src={storeLogo}
                className="text-center w-full h-7 flex justify-center"
                alt="mart Logo"
              />
            </NavLink>
            <h1 className=" mt-6 text-[#027DCB] text-center lg:text-[32px] text-[28px] font-semibold">
              Create your account
            </h1>
            <p className="text-center text-[#00000080] text-[14px] font-normal">
              Enter the fields below to get started
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row lg:justify-between max-w-screen-xl mx-auto  mt-5">
                <div className="relative flex flex-col min-w-0 break-words w-full  ">
                  <div className="flex-auto   py-10 pt-0">
                    <div className="flex flex-wrap ">
                      <div className="w-full lg:w-6/12 lg:pr-4">
                        <div className="relative w-full mb-6 mt-4">
                          <label className="block mb-2 text-sm font-semibold text-[#414143]">
                            First Name*
                          </label>
                          <input
                            type="text"
                            className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                            placeholder="Enter First Name"
                            name="first_name"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 ">
                        <div className="relative w-full mb-6 md:mt-4 mt-0">
                          <label className="block mb-2 text-sm font-semibold text-[#414143]">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                            placeholder="Enter Last Name"
                            name="last_name"
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 lg:pr-4 ">
                        <div className="relative w-full mb-6">
                          <label className="block mb-2 text-sm font-semibold text-[#414143]">
                            Email Address*
                          </label>
                          <input
                            type="email"
                            className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150"
                            placeholder="Enter Email"
                            name="email"
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* 
                                    <div className="w-full lg:w-6/12 lg:pr-4">
                                        <div className="relative mb-6">
                                            <label className="block mb-2 text-sm font-semibold text-[#414143]">
                                                Gender*
                                            </label>

                                            <select id="gender" name='gender' onChange={(e: any) => handleChange(e)} className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px]  ease-linear transition-all duration-150">
                                                <option selected>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Rather not say">Rather not say</option>
                                            </select>



                                        </div>
                                    </div> */}
                      <div className="w-full lg:w-6/12">
                        <div className="relative mb-6">
                          <label className="block mb-2 text-sm font-semibold text-[#414143]">
                            Phone Number*
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

                      <div className="w-full lg:w-6/12 lg:pr-4">
                        <div className="relative w-full mb-6">
                          <label className="block mb-2 text-sm font-semibold text-[#414143]">
                            Password*
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px] ease-linear transition-all duration-150"
                              placeholder="Enter Password"
                              name="password"
                              required
                              onChange={handleChange}
                            />
                            <span
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 cursor-pointer"
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12">
                        <div className="relative w-full mt-6 md:mt-0">
                          <label className="block mb-2 text-sm font-semibold text-[#414143]">
                            Confirm Password*
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px] ease-linear transition-all duration-150"
                              placeholder="Confirm Password"
                              name="password_confirmation"
                              required
                              onChange={handleChange}
                            />
                            <span
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-2.5 cursor-pointer"
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
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
                  {loading ? <LoadingSpinner /> : "Create Account"}
                  
                </button>
              </div>

              <p className="text-center text-[#0A0A0C] mt-1 text-[15px] font-semibold">
                Already have an account?{" "}
                <NavLink to="/sign-in">
                  <span className="text-[#027DCB] cursor-pointer font-bold">
                    Login
                  </span>
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Register;
