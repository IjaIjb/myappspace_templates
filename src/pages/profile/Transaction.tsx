import React from "react";
import { UserApis } from "../../apis/userApi/userApi";
import Navbar from "../../components/Navbars/Navbar";
import UserSidebar from "../../components/Sidebar/UserSidebar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Transaction = () => {
  // const [loader, setLoader] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState<any>([]);
  const storeCode = localStorage.getItem("storeCode") || "";

  const selectedCurrency = localStorage.getItem("selectedCurrency") || "USD";

  React.useEffect(() => {
    // setLoader(true);
    const query = {
      payment_status: "",
      currency: selectedCurrency,
      transaction_reference: "",
      per_page: "",
    };
    UserApis.getTransaction(storeCode, query)
      .then((response) => {
        if (response?.data) {
          console?.log(response?.data);
          setCategories(response?.data);
          // setLoader(false);
        } else {
          // dispatch(login([]))
          // setLoader(false);
        }
      })
      .catch(function (error) {});
    // setLoader(false)
  }, [storeCode, selectedCurrency]);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="hidden md:flex md:w-1/5">
          <UserSidebar title="Purchase List" />
        </div>
        <div className="bg-white w-full">
        <div className="py-4 lg:px-10 px-6 ">
        <button
            type="button"
            onClick={handleBackClick}
            className="flex items-center text-gray-600 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back</span>
          </button>
          <h1 className="text-[30px] font-semibold">Transaction</h1>
          
        <table className="text-sm overflow-auto text-gray-500">
                        <thead className="text-xs text-gray-700 bg-gray-50">
                          <tr>
                            <th className="md:px-4 px-3 py-3">S/N</th>
                            <th className="md:px-4 py-3">Transaction ref</th>
                            <th className="md:px-4 py-3">Date/Time</th>
                            <th className="md:px-4 py-3">Amount</th>
                            <th className="md:px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories?.transactions?.data?.map((product:any, productIndex:any) => (
                            <tr key={productIndex} className="py-1">
                              <td className="md:px-4 text-center px-3 py-4">
                                {productIndex + 1}
                              </td>

                              <td className="md:px-4 text-center py-4">
                                {product?.transaction_reference}
                              </td>
                              <td className="md:px-4 text-center py-4">
                              {new Date(product?.created_at).toLocaleDateString()}
                              {new Date(product?.created_at).toLocaleTimeString()}

                              </td>
                              <td className="md:px-4 text-center py-4">
                                {product?.currency}
                                {product?.amount}
                              </td>
                              <td
  className={`md:px-4 text-center py-4 ${
    product?.payment_status === "completed"
      ? "text-green-400"
      : product?.payment_status === "pending"
      ? "text-yellow-400"
      : "text-red-400"
  }`}
>
  {product?.payment_status}
</td>

                              {/* <td className="md:px-4 text-center py-4">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "NGN",
                                }).format(product?.price || 0.0)}
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
        {/* <div className="md:w-4/5 w-full md:px-10 ">
<CardUpdateProfile />
</div> */}
</div>
</div>
      </div>
      <Footer />
    </div>
  );
};

export default Transaction;
