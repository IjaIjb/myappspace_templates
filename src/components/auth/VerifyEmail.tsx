import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
// import { NavLink } from 'react-router-dom'
import { UserApis } from '../../apis/userApi/userApi';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from "redux";
import { login } from '../../reducer/loginSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from '../UI/LoadingSpinner';

const VerifyEmail = () => {
  const storeCode = "31958095";
  const location = useLocation();
  const email = location.state?.email || ""; // ✅ Retrieve email from state
     const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch: Dispatch = useDispatch();
  
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      // const formData = new FormData();
      // formData.append("login", email);
      // formData.append("password", password);
  
      let data = JSON.stringify({
        email: email,
        code,
      });
  
      UserApis.verifyMail(storeCode, data)
        .then((response: AxiosResponse<any>) => {
          if (response?.data) {
            if (response?.data) {
              dispatch(
                login({
                  login: email,
                  token: response.data.data.token.access_token,
                  id: response.data.data.id,
                  name: response.data.data.customer.first_name,
                  data: response?.data?.data.customer,
                })
              );
              console.log(response);
              setLoading(false);
              navigate("/");
  
              toast.success(response?.data?.message);
            }
          } else {
            setLoading(false);
  
            toast.warn(response?.data?.message);
          }
        })
        .catch(function (error) {
          setLoading(false);
          // handle error
          // console.log(error.response.data);
          toast.error("Offline");
        });
    };
  
  return (
    <>
    <div className=" bg-[#FBFBFB] pt-16 pb-32">
    <div className="container flex flex-col md:justify-center mx-auto items-center rounded-lg p-6 md:max-w-3xl">
      <div>
      <div className='flex justify-center'>
                        <img src="./images/logo.png" className="" alt="mart Logo" />
                    </div>
        {/* <h1 className="mt-6 text-[#000] lg:text-[32px] text-[28px] font-semibold text-center">Verify Your Email Address</h1>
        <p className='mt-4 text-center text-[#00000080] text-[14px] font-normal'>To start using M Mart we need to verify your email address:</p> */}
      </div>

      <div className='pt-10'>
        {/* <div className='flex justify-center'>
          <NavLink to={'/sign-in'}>
            <button className='text-white bg-[#027DCB] px-[44px] py-[15px] text-[14px] rounded-[5px]'>Verify Email</button>
            </NavLink>
        </div> */}
        <h1 className="mt-6 text-[#000] lg:text-[32px] text-[28px] font-semibold text-center">Verify Your Email Address</h1>
      <p className='mt-5 text-center text-[#00000080] text-[14px] font-normal'>An email has been sent with a link to verify your account. If you have not received anything after a few minutes , Kindly check your spam folder </p>
     
      <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row lg:justify-between max-w-screen-xl mx-auto mt-5">
                  <div className="relative flex flex-col min-w-0 break-words w-full">
                    <div className="flex-auto py-10 pt-0">
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12">
                          <div className="relative w-full mb-6">
                            <label className="block mb-2 text-sm font-semibold text-[#414143]">
                             Code
                            </label>
                            <input
                              type="email"
                              className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px] ease-linear transition-all duration-150"
                              placeholder="Enter Email"
                              name="email"
                              required
                              onChange={(e: any) => setCode(e.target.value)}
                            />
                          </div>
                        </div>

                   
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="w-full text-white bg-[#027DCB] font-medium rounded-[5px] text-sm px-5 py-3 mr-2 mt-2 mb-2"
                  >
                    {loading ? <LoadingSpinner /> : "Verify"}
                  </button>
                </div>

             
              </form>
     
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
    </div>
</>
  )
}

export default VerifyEmail