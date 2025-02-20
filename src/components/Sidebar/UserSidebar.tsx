import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";

const UserSidebar = (title: any) => {

  const [collapseShow, setCollapseShow] = React.useState("hidden");

  return (
    <>
    <nav className=" md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl md:bg-[white]  md:w-full z-2 px-1">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}


        <button
          className="cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <b className="fas fa-bars text-3xl"> ≡ </b><span className="text-black ">
            {title?.title}
            </span>
        </button>
        <Link
          className="hidden text-left  mt-10 text-blueGray-600 mr-0 md:inline-block whitespace-nowrap text-sm uppercase font-bold px-0 pl-4"
          to="/"
        >
          <span className=" text-[#0071BC] flex justify-center text-[20px]">M-Mart+</span>
        </Link>
        {/* User */}

        {/* Collapse */}
        <div
          className={
            "md:flex md:flex-col items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow  absolute top-4 left-0 right-1  h-auto flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className="md:min-w-full md:hidden block pb-1 mb-4  ">
            <div className="flex justify-between ">

              <span className="flex justify-start gap-1" onClick={() => setCollapseShow("hidden")}><IoArrowBack style={{ color: '#333333' }} className="bg-gray-200 text-xs text-gray-500 rounded-full p-1 h-6 w-6" /> <span className="text-white ml-2">Back</span></span>

              <span
                className="cursor-pointer opacity-50 md:hidden  py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                onClick={() => setCollapseShow("hidden")}
              >
                <NavLink to='/editprofile'>
                  <b className="fas fa-times text-white"> <AiOutlineSetting /> </b>
                </NavLink>
              </span>


            </div>

          </div>
          {/* Form */}


          {/* Divider */}
          {/* <hr className="md:min-w-full" /> */}

          <ul className="flex-col list-none flex bg-[white]  md:mt-1 mt-2">


          <li className="items-center mx-3 mb-3">
              <NavLink
                onClick={() => setCollapseShow("hidden")}
                style={{
                  backgroundColor: (window.location.href.indexOf("/user/profile") !== -1
                    ? "#0071BC"
                    : "text-black hover:text-blueGray-500")
                }}
                className={
                  "text-xs cursor-pointer pl-3 block " +
                  (window.location.href.indexOf("/user/profile") !== -1
                    ? "text-[white] rounded-[8px]"
                    : "text-[#0071BC] border border-[#0071BC]/[0.1] rounded-[8px] hover:bg-[#0071BC]/[0.1]")
                }
                to="/user/profile"
              >
                <span className="flex py-2.5 px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3 " viewBox="0 0 20 20"><path fill="white" d="M11.67 8.537a.3.3 0 0 0-.302.296v2.212a.3.3 0 0 0 .303.296h6.663a.3.3 0 0 0 .303-.296V8.833a.3.3 0 0 0-.303-.296zm4.086-7.036c.922.044 1.585.226 2.005.612c.415.382.628.935.67 1.667v2.097a.674.674 0 0 1-.681.666a.674.674 0 0 1-.682-.666l.001-2.059c-.022-.38-.113-.616-.243-.736c-.126-.116-.51-.22-1.103-.25H2.647c-.537.02-.886.122-1.055.267c-.13.111-.228.417-.229.946l-.003 11.77c.05.514.163.857.308 1.028c.11.13.451.26.953.324h13.116c.614.012.976-.08 1.098-.203c.135-.137.233-.497.233-1.086v-2.045c0-.367.305-.666.682-.666c.376 0 .681.299.681.666v2.045c0 .9-.184 1.573-.615 2.01c-.444.45-1.15.63-2.093.61L2.54 18.495c-.897-.104-1.54-.35-1.923-.803c-.347-.41-.54-.995-.617-1.813V4.044c.002-.876.212-1.535.694-1.947c.442-.38 1.08-.565 1.927-.597zm2.578 5.704c.92 0 1.666.729 1.666 1.628v2.212c0 .899-.746 1.628-1.666 1.628h-6.663c-.92 0-1.666-.73-1.666-1.628V8.833c0-.899.746-1.628 1.666-1.628zm-4.997 1.94c-.46 0-.833.36-.833.803c0 .444.373.803.833.803c.46 0 .833-.36.833-.803c0-.444-.373-.804-.833-.804" /></svg>
                  <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Profile</span>
                  {/* <span> {(window.location.href.indexOf("/mylinks") !== -1
                    ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                    : <SvgElement type={icontypesEnum.ARROW} /> )} </span> */}
                </span>

              </NavLink>
            </li>
          

          <li className="items-center mx-3 mb-3">
              <NavLink
                onClick={() => setCollapseShow("hidden")}
                style={{
                  backgroundColor: (window.location.href.indexOf("/user/orders") !== -1
                    ? "#0071BC"
                    : "text-black hover:text-blueGray-500")
                }}
                className={
                  "text-xs cursor-pointer pl-3 block " +
                  (window.location.href.indexOf("/user/orders") !== -1
                    ? "text-[white] rounded-[8px]"
                    : "text-[#0071BC] border border-[#0071BC]/[0.1] rounded-[8px] hover:bg-[#0071BC]/[0.1]")
                }
                to="/user/orders"
              >
                <span className="flex py-2.5 px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3 " viewBox="0 0 20 20"><path fill="white" d="M11.67 8.537a.3.3 0 0 0-.302.296v2.212a.3.3 0 0 0 .303.296h6.663a.3.3 0 0 0 .303-.296V8.833a.3.3 0 0 0-.303-.296zm4.086-7.036c.922.044 1.585.226 2.005.612c.415.382.628.935.67 1.667v2.097a.674.674 0 0 1-.681.666a.674.674 0 0 1-.682-.666l.001-2.059c-.022-.38-.113-.616-.243-.736c-.126-.116-.51-.22-1.103-.25H2.647c-.537.02-.886.122-1.055.267c-.13.111-.228.417-.229.946l-.003 11.77c.05.514.163.857.308 1.028c.11.13.451.26.953.324h13.116c.614.012.976-.08 1.098-.203c.135-.137.233-.497.233-1.086v-2.045c0-.367.305-.666.682-.666c.376 0 .681.299.681.666v2.045c0 .9-.184 1.573-.615 2.01c-.444.45-1.15.63-2.093.61L2.54 18.495c-.897-.104-1.54-.35-1.923-.803c-.347-.41-.54-.995-.617-1.813V4.044c.002-.876.212-1.535.694-1.947c.442-.38 1.08-.565 1.927-.597zm2.578 5.704c.92 0 1.666.729 1.666 1.628v2.212c0 .899-.746 1.628-1.666 1.628h-6.663c-.92 0-1.666-.73-1.666-1.628V8.833c0-.899.746-1.628 1.666-1.628zm-4.997 1.94c-.46 0-.833.36-.833.803c0 .444.373.803.833.803c.46 0 .833-.36.833-.803c0-.444-.373-.804-.833-.804" /></svg>
                  <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Orders</span>
                  {/* <span> {(window.location.href.indexOf("/mylinks") !== -1
                    ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                    : <SvgElement type={icontypesEnum.ARROW} /> )} </span> */}
                </span>

              </NavLink>
            </li>

            <li className="items-center mx-3 mb-3">
              <NavLink
                onClick={() => setCollapseShow("hidden")}
                style={{
                  backgroundColor: (window.location.href.indexOf("/user/transaction") !== -1
                    ? "#0071BC"
                    : "text-black hover:text-blueGray-500")
                }}
                className={
                  "text-xs cursor-pointer pl-3 block " +
                  (window.location.href.indexOf("/user/transaction") !== -1
                    ? "text-[white] rounded-[8px]"
                    : "text-[#0071BC] border border-[#0071BC]/[0.1] rounded-[8px] hover:bg-[#0071BC]/[0.1]")
                }
                to="/user/transaction"
              >
                <span className="flex py-2.5 px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3 " viewBox="0 0 20 20"><path fill="white" d="M11.67 8.537a.3.3 0 0 0-.302.296v2.212a.3.3 0 0 0 .303.296h6.663a.3.3 0 0 0 .303-.296V8.833a.3.3 0 0 0-.303-.296zm4.086-7.036c.922.044 1.585.226 2.005.612c.415.382.628.935.67 1.667v2.097a.674.674 0 0 1-.681.666a.674.674 0 0 1-.682-.666l.001-2.059c-.022-.38-.113-.616-.243-.736c-.126-.116-.51-.22-1.103-.25H2.647c-.537.02-.886.122-1.055.267c-.13.111-.228.417-.229.946l-.003 11.77c.05.514.163.857.308 1.028c.11.13.451.26.953.324h13.116c.614.012.976-.08 1.098-.203c.135-.137.233-.497.233-1.086v-2.045c0-.367.305-.666.682-.666c.376 0 .681.299.681.666v2.045c0 .9-.184 1.573-.615 2.01c-.444.45-1.15.63-2.093.61L2.54 18.495c-.897-.104-1.54-.35-1.923-.803c-.347-.41-.54-.995-.617-1.813V4.044c.002-.876.212-1.535.694-1.947c.442-.38 1.08-.565 1.927-.597zm2.578 5.704c.92 0 1.666.729 1.666 1.628v2.212c0 .899-.746 1.628-1.666 1.628h-6.663c-.92 0-1.666-.73-1.666-1.628V8.833c0-.899.746-1.628 1.666-1.628zm-4.997 1.94c-.46 0-.833.36-.833.803c0 .444.373.803.833.803c.46 0 .833-.36.833-.803c0-.444-.373-.804-.833-.804" /></svg>
                  <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Transaction</span>
                  {/* <span> {(window.location.href.indexOf("/mylinks") !== -1
                    ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                    : <SvgElement type={icontypesEnum.ARROW} /> )} </span> */}
                </span>

              </NavLink>
            </li>
            {/* <li className="items-center mx-3 mb-3">
              <NavLink
                onClick={() => setCollapseShow("hidden")}
                style={{
                  backgroundColor: (window.location.href.indexOf("/user/wallet") !== -1
                    ? "#0071BC"
                    : "text-black hover:text-blueGray-500")
                }}
                className={
                  "text-xs cursor-pointer pl-3 block " +
                  (window.location.href.indexOf("/user/wallet") !== -1
                    ? "text-[white] rounded-[8px]"
                    : "text-[#0071BC] border border-[#0071BC]/[0.1] rounded-[8px] hover:bg-[#0071BC]/[0.1]")
                }
                to="/user/wallet"
              >
                <span className="flex py-2.5 px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3 " viewBox="0 0 20 20"><path fill="white" d="M11.67 8.537a.3.3 0 0 0-.302.296v2.212a.3.3 0 0 0 .303.296h6.663a.3.3 0 0 0 .303-.296V8.833a.3.3 0 0 0-.303-.296zm4.086-7.036c.922.044 1.585.226 2.005.612c.415.382.628.935.67 1.667v2.097a.674.674 0 0 1-.681.666a.674.674 0 0 1-.682-.666l.001-2.059c-.022-.38-.113-.616-.243-.736c-.126-.116-.51-.22-1.103-.25H2.647c-.537.02-.886.122-1.055.267c-.13.111-.228.417-.229.946l-.003 11.77c.05.514.163.857.308 1.028c.11.13.451.26.953.324h13.116c.614.012.976-.08 1.098-.203c.135-.137.233-.497.233-1.086v-2.045c0-.367.305-.666.682-.666c.376 0 .681.299.681.666v2.045c0 .9-.184 1.573-.615 2.01c-.444.45-1.15.63-2.093.61L2.54 18.495c-.897-.104-1.54-.35-1.923-.803c-.347-.41-.54-.995-.617-1.813V4.044c.002-.876.212-1.535.694-1.947c.442-.38 1.08-.565 1.927-.597zm2.578 5.704c.92 0 1.666.729 1.666 1.628v2.212c0 .899-.746 1.628-1.666 1.628h-6.663c-.92 0-1.666-.73-1.666-1.628V8.833c0-.899.746-1.628 1.666-1.628zm-4.997 1.94c-.46 0-.833.36-.833.803c0 .444.373.803.833.803c.46 0 .833-.36.833-.803c0-.444-.373-.804-.833-.804" /></svg>
                  <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Wallet</span>
                </span>

              </NavLink>
            </li> */}


            <li className="items-center mx-3 mb-3">
              <NavLink
                onClick={() => setCollapseShow("hidden")}
                style={{
                  backgroundColor: (window.location.href.indexOf("/user/wishlist") !== -1
                    ? "#0071BC"
                    : "text-black hover:text-blueGray-500")
                }}
                className={
                  "text-xs cursor-pointer pl-3 block " +
                  (window.location.href.indexOf("/user/wishlist") !== -1
                    ? "text-[white] rounded-[8px]"
                    : "text-[#0071BC] border border-[#0071BC]/[0.1] rounded-[8px] hover:bg-[#0071BC]/[0.1]")
                }
                to="/user/wishlist"
              >
                <span className="flex py-2.5 px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3 " viewBox="0 0 20 20"><path fill="white" d="M11.67 8.537a.3.3 0 0 0-.302.296v2.212a.3.3 0 0 0 .303.296h6.663a.3.3 0 0 0 .303-.296V8.833a.3.3 0 0 0-.303-.296zm4.086-7.036c.922.044 1.585.226 2.005.612c.415.382.628.935.67 1.667v2.097a.674.674 0 0 1-.681.666a.674.674 0 0 1-.682-.666l.001-2.059c-.022-.38-.113-.616-.243-.736c-.126-.116-.51-.22-1.103-.25H2.647c-.537.02-.886.122-1.055.267c-.13.111-.228.417-.229.946l-.003 11.77c.05.514.163.857.308 1.028c.11.13.451.26.953.324h13.116c.614.012.976-.08 1.098-.203c.135-.137.233-.497.233-1.086v-2.045c0-.367.305-.666.682-.666c.376 0 .681.299.681.666v2.045c0 .9-.184 1.573-.615 2.01c-.444.45-1.15.63-2.093.61L2.54 18.495c-.897-.104-1.54-.35-1.923-.803c-.347-.41-.54-.995-.617-1.813V4.044c.002-.876.212-1.535.694-1.947c.442-.38 1.08-.565 1.927-.597zm2.578 5.704c.92 0 1.666.729 1.666 1.628v2.212c0 .899-.746 1.628-1.666 1.628h-6.663c-.92 0-1.666-.73-1.666-1.628V8.833c0-.899.746-1.628 1.666-1.628zm-4.997 1.94c-.46 0-.833.36-.833.803c0 .444.373.803.833.803c.46 0 .833-.36.833-.803c0-.444-.373-.804-.833-.804" /></svg>
                  <span style={{ fontSize: '15px' }} className=" font-normal mt-1"> Wishlist</span>
                  {/* <span> {(window.location.href.indexOf("/mylinks") !== -1
                    ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                    : <SvgElement type={icontypesEnum.ARROW} /> )} </span> */}
                </span>

              </NavLink>
            </li>


            <li className="items-center mx-3 mb-3">
              <NavLink
                onClick={() => setCollapseShow("hidden")}
                style={{
                  backgroundColor: (window.location.href.indexOf("/user/address") !== -1
                    ? "#0071BC"
                    : "text-black hover:text-blueGray-500")
                }}
                className={
                  "text-xs cursor-pointer pl-3 block " +
                  (window.location.href.indexOf("/user/address") !== -1
                    ? "text-[white] rounded-[8px]"
                    : "text-[#0071BC] border border-[#0071BC]/[0.1] rounded-[8px] hover:bg-[#0071BC]/[0.1]")
                }
                to="/user/address"
              >
                <span className="flex py-2.5 px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mr-3 " viewBox="0 0 20 20"><path fill="white" d="M11.67 8.537a.3.3 0 0 0-.302.296v2.212a.3.3 0 0 0 .303.296h6.663a.3.3 0 0 0 .303-.296V8.833a.3.3 0 0 0-.303-.296zm4.086-7.036c.922.044 1.585.226 2.005.612c.415.382.628.935.67 1.667v2.097a.674.674 0 0 1-.681.666a.674.674 0 0 1-.682-.666l.001-2.059c-.022-.38-.113-.616-.243-.736c-.126-.116-.51-.22-1.103-.25H2.647c-.537.02-.886.122-1.055.267c-.13.111-.228.417-.229.946l-.003 11.77c.05.514.163.857.308 1.028c.11.13.451.26.953.324h13.116c.614.012.976-.08 1.098-.203c.135-.137.233-.497.233-1.086v-2.045c0-.367.305-.666.682-.666c.376 0 .681.299.681.666v2.045c0 .9-.184 1.573-.615 2.01c-.444.45-1.15.63-2.093.61L2.54 18.495c-.897-.104-1.54-.35-1.923-.803c-.347-.41-.54-.995-.617-1.813V4.044c.002-.876.212-1.535.694-1.947c.442-.38 1.08-.565 1.927-.597zm2.578 5.704c.92 0 1.666.729 1.666 1.628v2.212c0 .899-.746 1.628-1.666 1.628h-6.663c-.92 0-1.666-.73-1.666-1.628V8.833c0-.899.746-1.628 1.666-1.628zm-4.997 1.94c-.46 0-.833.36-.833.803c0 .444.373.803.833.803c.46 0 .833-.36.833-.803c0-.444-.373-.804-.833-.804" /></svg>
                  <span style={{ fontSize: '15px' }} className=" font-normal mt-1">Address</span>
                  {/* <span> {(window.location.href.indexOf("/mylinks") !== -1
                    ? <SvgElement type={icontypesEnum.ARROWWHITE} /> 
                    : <SvgElement type={icontypesEnum.ARROW} /> )} </span> */}
                </span>

              </NavLink>
            </li>


            <li className="items-center pt-36 mx-3 pl-3 mb-2">
              <span
                onClick={() => setCollapseShow("hidden")}
                style={{
                  backgroundColor: (window.location.href.indexOf("/dashboard2") !== -1
                    ? "text-white"
                    : "text-white")
                }}
                className={
                  "text-xs cursor-pointer block " +
                  (window.location.href.indexOf("/dashboard2") !== -1
                    ? "text-white"
                    : "text-white hover:bg-white/[0.1] hover:rounded-[5px]")
                }

              >

                {/* <span className="flex justify-between py-2 px-2">
                  <span style={{ fontSize: '16px' }}> <a href="https://www.uforo.co/help"> Help</a></span>
                </span> */}

              </span>
            </li>


            <li className="items-center mx-3 pl-3 pb-6">
              <span
                //  style={{backgroundColor:'#61A24F'}}
                className={
                  "text-xs cursor-pointer block "
                }

                // onClick={logOut}
              >

                <span className="flex py-2  cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="mr-3 " viewBox="0 0 24 24"><path fill="red" d="M16 13v-2H7V8l-5 4l5 4v-3z" /><path fill="red" d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" /></svg>
                  <span className=" text-[15px] mt-1 font-normal text-[#FF0000]">Log out</span>
                  {/* <span style={{ color: 'red' }}>  <SvgElement type={icontypesEnum.REDARROW} /> </span> */}
                </span>

              </span>
            </li>

          </ul>


        </div>
      </div>
    </nav>
  </>
  )
}

export default UserSidebar