import React from 'react'
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { CartApis } from '../../apis/userApi/cartApis';
import AddressTable from './AddressTable';

const CardAddress = () => {
  const storeCode = localStorage.getItem("storeCode") || "";

    const [address, setAddress] = React.useState<any>([]);
  
  React.useEffect(() => {
    CartApis.getAllAddress(storeCode)
      .then((response) => {
        if (response?.data) {
          console?.log(response?.data);
          setAddress(response?.data);
        } else {
          // dispatch(login([]))
        }
      })
      .catch(function (error) {});
  }, [storeCode]);

  return (
    <div>
        <div className='flex justify-end mt-4'>
        <Link
          to={"/user/add-address"}
          className="rounded-full lg:mt-0 mt-4 h-fit bg-blue-500 flex items-center gap-3 w-fit px-4 py-2"
          // style={{
          //   background: "linear-gradient(to bottom, #382B67, #7056CD)",
          // }}
        >
          <IoAddCircleOutline className="text-white" />
          <h5 className="text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
           Add Address
          </h5>
          {/* <LiaUploadSolid className="text-white" /> */}
        </Link>
        </div>
<AddressTable address={address.data}/>

    </div>
  )
}

export default CardAddress