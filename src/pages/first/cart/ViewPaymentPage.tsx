import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CartApis } from '../../../apis/userApi/cartApis';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../../../components/footer/Footer';
// import { NavLink } from 'react-router-dom';
import Navbar from '../../../components/Navbars/Navbar';

const ViewPaymentPage = () => {
    const navigate = useNavigate();
    const storeCode = "31958095";

  const [searchParams] = useSearchParams();
  const [transactionData, setTransactionData] = useState<any>(null); // State to store transaction data
  // const [loading, setLoading] = useState(true); // Loading indicator


    useEffect(() => {
        const order_id = searchParams.get("order_id");
        const transaction_id = searchParams.get("transaction_id");
        // const order_id = searchParams.get("order_id");
        const payment_method = searchParams.get("payment_method");
        const status = searchParams.get("status");
        const transaction_ref = searchParams.get("tx_ref");
        // const transaction_id = searchParams.get("transactionId");
    
        // Redirect to cart if payment was cancelled or missing parameters
        // if (status === "cancelled" || !txRef || !transactionId) {
        //   navigate("/view-cart");
        //   return;
        // }
    
        // Fetch the transaction details
        CartApis.getCallback(storeCode, order_id, payment_method , status, transaction_ref, transaction_id)
          .then((response: any) => {
            console.log(response)

            if (response?.data?.status === "200") {
              console.log(response?.data?.data)
              setTransactionData(response?.data?.data); // Save transaction data
            } else {
              // toast.warn("Payment verification failed.");
              // navigate("/view-cart");
            }
          })
          .catch((error: any) => {
            toast.error("An error occurred while verifying payment.");
            // navigate("/view-cart");
          })
          .finally(() => {
            // setLoading(false);
          });
      }, [searchParams, storeCode, navigate]);
    
      // if (loading) {
      //   return (
      //     <div className="flex justify-center items-center min-h-screen">
      //       <h3>Loading transaction details...</h3>
      //     </div>
      //   );
      // }
    
      // if (!transactionData) {
      //   return null; // Prevent rendering if no data is available
      // }
    
      console.log(transactionData?.transaction)
      // const {
      //   transaction_reference,
      //   created_at,
      //   amount,
      //   user_email,
      //   user_phone_number,
      //   shipping_fee,
      //   currency,
      //   payment_status,
      //   // otherData,
      // } = transactionData?.transaction;
    
      // const handlePrint = () => {
      //   window.print(); // Trigger print dialog
      // };

  return (
    <>
    <Navbar />

  

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