import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CartApis } from '../../../apis/userApi/cartApis';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../../../components/footer/Footer';
import { NavLink } from 'react-router-dom';
import Navbar from '../../../components/Navbars/Navbar';

const ViewPaymentPage = () => {
    const navigate = useNavigate();
    const storeCode = "31958095";

  const [searchParams] = useSearchParams();
  const [transactionData, setTransactionData] = useState<any>(null); // State to store transaction data
  const [loading, setLoading] = useState(true); // Loading indicator


    useEffect(() => {
        const order_id = searchParams.get("order_id");
        const transactionId = searchParams.get("transaction_id");
        // const order_id = searchParams.get("order_id");
        // const order_id = searchParams.get("order_id");
        const status = searchParams.get("status");
        const txRef = searchParams.get("tx_ref");
        // const transaction_id = searchParams.get("transactionId");
    
        // Redirect to cart if payment was cancelled or missing parameters
        if (status === "cancelled" || !txRef || !transactionId) {
          navigate("/view-cart");
          return;
        }
    
        // Fetch the transaction details
        CartApis.getCallback(storeCode, order_id,  transactionId, status, txRef)
          .then((response: any) => {
            if (response?.data?.success) {
              setTransactionData(response?.data?.data); // Save transaction data
            } else {
              toast.warn("Payment verification failed.");
              navigate("/view-cart");
            }
          })
          .catch((error: any) => {
            toast.error("An error occurred while verifying payment.");
            navigate("/view-cart");
          })
          .finally(() => {
            setLoading(false);
          });
      }, [searchParams, storeCode, navigate]);
    
      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <h3>Loading transaction details...</h3>
          </div>
        );
      }
    
      if (!transactionData) {
        return null; // Prevent rendering if no data is available
      }
    
      const {
        tnx_ref,
        created_at,
        amount_paid,
        user_email,
        user_phone_number,
        shipping_fee,
        currency,
        status,
        // otherData,
      } = transactionData?.transaction;
    
      const handlePrint = () => {
        window.print(); // Trigger print dialog
      };

  return (
    <>
    <Navbar />

    <div className="min-h-screen flex flex-col justify-center items-center md:-mt-1 -mt-4 -mb-9 bg-gray-100">
      <div className="bg-white min-w-[300px] md:min-w-[500px] p-6 md:my-4 rounded-lg shadow-lg">
        <h4 className="text-[#004F9A] text-[20px] font-[800] text-center">
          Order Confirmation
        </h4>
        <h4 className="text-[13px] md:text-[17px]  text-center pt-1">
          Thank you for your purchase
        </h4>

        <div className="flex flex-col gap-2 mt-6 mb-3">
          <div className="flex gap-2 items-center">
            <h4 className="text-[14px] md:text-[18px] font-bold">
              Transaction ID:
            </h4>
            <h4 className="text-[14px] md:text-[18px] text-[#FFC220]">
              #{tnx_ref}
            </h4>
          </div>

          <div className="flex gap-2 items-center">
            <h4 className="text-[14px] md:text-[18px] font-bold">Date:</h4>
            <h4 className="text-[14px] md:text-[18px]">
              {new Date(created_at).toLocaleDateString()}
            </h4>
          </div>

          <div className="flex gap-2 items-center">
            <h4 className="text-[14px] md:text-[18px] font-bold">Time:</h4>
            <h4 className="text-[14px] md:text-[18px]">
              {new Date(created_at).toLocaleTimeString()}
            </h4>
          </div>
        </div>

        <div className="bg-gray-100 px-1 py-3 mb-3">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <h4 className="text-[14px] md:text-[18px] font-bold">
                Product Amount:
              </h4>
              <h4 className="text-[14px] md:text-[18px] text-[#FFC220]">
                {currency?.toUpperCase()} {amount_paid}
              </h4>
            </div>

            <div className="flex gap-2 items-center">
              <h4 className="text-[14px] md:text-[18px] font-bold">
                Shipping Fee:
              </h4>
              <h4 className="text-[14px] md:text-[18px]">
                {currency?.toUpperCase()} {shipping_fee}
              </h4>
            </div>

            <div className="flex gap-2 items-center">
              <h4 className="text-[14px] md:text-[18px] font-bold">
                Total Amount Paid:
              </h4>
              <h4 className="text-[14px] md:text-[18px]">
              {currency?.toUpperCase()} {Number(amount_paid) + Number(shipping_fee)}
              </h4>
            </div>

            <div className="flex gap-2 items-center">
              <h4 className="text-[14px] md:text-[18px] font-bold">
                Payment Status:
              </h4>
              <h4 className="text-[14px] md:text-[18px]">{status}</h4>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
        <h4 className="text-[#004F9A] text-[14px] md:text-[18px] font-[800]">
            Products
          </h4>
          <h4 className="text-[#004F9A] text-[14px] md:text-[18px] font-[800]">
           Amount
          </h4>
        </div>
        {transactionData?.purchased_products?.map((product:any,index:any) => {
          return (
            <div key={index} className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1">
            <h4 className="text-[14px] md:text-[18px] font-bold">{product?.product_name}</h4>
            <h4 className="text-[16px] ">({product?.quantity})</h4>
</div>
<h4 className="text-[14px] md:text-[18px] font-bold">{currency?.toUpperCase()} {product?.price}</h4>

              </div>
          )
        })}

        <div className="flex flex-col gap-1">
          <h4 className="text-[#004F9A] text-[14px] md:text-[18px] font-[800]">
            Contact Information
          </h4>
          <h4 className="text-[18px]">Email: {user_email}</h4>
          <h4 className="text-[18px]">Phone: {user_phone_number}</h4>
        </div>

        <div className="flex gap-4 mt-4 text-center justify-center">
          <NavLink
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Home
          </NavLink>

          <button
            onClick={handlePrint}
            className="bg-gray-500 text-white px-9 py-2 rounded hover:bg-blue-600"
          >
            Print
          </button>
        </div>
      </div>
    </div>

    <Footer />

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
  )
}

export default ViewPaymentPage