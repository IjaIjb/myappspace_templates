import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Dispatch } from "redux";
import { useDispatch } from 'react-redux';
import { login } from '../../reducer/loginSlice'
import { AxiosResponse } from "axios";
// import axios from "axios";
// import { store } from "../../store/store";
// import { History } from "history";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Navbar from "../Navbars/Navbar";
import { UserApis } from "../../apis/userApi/userApi";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  // How to access the redux store
  // const userLoginData = useSelector((state: any) => state.data.login.value);
  const storeCode = "31958095";

  // This is used to update the store
  const dispatch: Dispatch = useDispatch();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('login', email)
    formData.append('password', password)

 

    let data = JSON.stringify({
      login: email,
      password: password
    });

    UserApis.loginCustomer(storeCode,data).then(
      (response: AxiosResponse<any>) => {
        if (response?.data) {
          if (response?.data?.status === true) {
            dispatch(login({ 
                login: email, 
                token: response.data.data.token.access_token, 
                id: response.data.data.id, 
                name: response.data.data.customer.first_name, 
                data: response?.data?.data.customer }))
console.log(response)
navigate('/');

toast.success(response?.data?.message);
          }
        } else {
          toast.warn('Invalid Login Credentials');
        }
      
      }
    ).catch(function (error) {
      // handle error
      // console.log(error.response.data);
      toast.error("Offline");
    })
  }

  return (
    <>
      {/* <Navbar/> */}
      <div className=" bg-[#FBFBFB] pt-16 pb-32 h-full">
        <div className="container flex flex-col md:justify-center mx-auto items-center rounded-lg p-6 md:max-w-3xl">
          <div>
            <NavLink to={'/'}>
              <img src="./images/logo.png" className="" alt="mart Logo" />
            </NavLink>
            <h1 className="mt-6 text-[#027DCB] lg:text-[32px] text-[28px] font-semibold">Welcome Back</h1>
            <p className='text-center text-[#00000080] text-[14px] font-normal'>Enter the fields below to get started</p>
          </div>
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row lg:justify-between max-w-screen-xl mx-auto mt-5">
                  <div className="relative flex flex-col min-w-0 break-words w-full">
                    <div className="flex-auto py-10 pt-0">
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12">
                          <div className="relative w-full mb-6">
                            <label className="block mb-2 text-sm font-semibold text-[#414143]">
                              Email Address*
                            </label>
                            <input
                              type="email"
                              className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px] ease-linear transition-all duration-150"
                              placeholder="Enter Email"
                              name="email"
                              required
                              onChange={(e: any) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="w-full lg:w-12/12">
                          <div className="relative w-full">
                            <label className="block mb-2 text-sm font-semibold text-[#414143]">
                              Password*
                            </label>
                            <div className="relative">
                              <input
                                type={show ? "text" : "password"}
                                className="bg-[#FBFBFB] outline-none border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px] ease-linear transition-all duration-150"
                                placeholder="Enter password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                name="password"
                                required
                              />
                              <span
                                className="absolute right-3 top-2.5 cursor-pointer text-[#333333]"
                                onClick={() => setShow(!show)}
                              >
                                {show ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=''>
                  <div>
                    <h3 className="text-center text-[12px] cursor-pointer">
                      By continuing you agree to M-Mart +'s <br />
                      <Link to="/terms-and-condition" target='_blank'>
                        <span className="underline underline-offset-1 text-[#027DCB]"> Terms and Conditions</span>
                      </Link>
                    </h3>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#027DCB] font-medium rounded-[5px] text-sm px-5 py-3 mr-2 mt-2 mb-2"
                  >
                    Login
                  </button>
                  <NavLink to={"/forgot-password"} className="mt-1 text-right">
                    <p className="text-[#000] text-sm font-semibold">Forgot Password?</p>
                  </NavLink>
                </div>

                <p className="text-center text-[#0A0A0C] mt-2 text-[14px] font-semibold">
                  Don't have an account?{" "}
                  <NavLink to="/sign-up">
                    <span className="text-[#027DCB] cursor-pointer font-bold">Sign Up</span>
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
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
    </>
  );
}

export default Login;
