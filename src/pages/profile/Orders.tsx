import React from "react";
import Navbar from "../../components/Navbars/Navbar";
import UserSidebar from "../../components/Sidebar/UserSidebar";
import Footer from "../../components/footer/Footer";
import { UserApis } from "../../apis/userApi/userApi";

const Orders = () => {
  // const [loader, setLoader] = React.useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null); // State to track selected order

  const [categories, setCategories] = React.useState<any>([]);
  const storeCode = "31958095";
  const selectedCurrency = localStorage.getItem("selectedCurrency") || "USD";

  React.useEffect(() => {
    // setLoader(true);
    const query = {
      order_code: "",
      status: "",
      payment_method: "",
      date_from: "",
      date_to: "",
      per_page: "",
    };

    UserApis.getOrder(storeCode, query)
      .then((response) => {
        if (response?.data) {
          console.log(response?.data);

          const updatedProducts = response.data.orders?.data?.map(
            (order: any) => {
              return {
                ...order,
                order_items: order.order_items.map((item: any) => {
                  const parsedSellingPrice = JSON.parse(
                    item?.product?.selling_price || "{}"
                  );
                  return {
                    ...item,
                    display_price: parsedSellingPrice[selectedCurrency] || "0", // Fallback if currency doesn't exist
                  };
                }),
              };
            }
          );

          setCategories(updatedProducts);
          // setLoader(false);
        } else {
          // setLoader(false);
        }
      })
      .catch(function (error) {
        console.error("Error fetching orders:", error);
        // setLoader(false);
      });
  }, [storeCode, selectedCurrency]); // Depend on selectedCurrency so it updates when changed

  console.log(categories);
  const handleShowProducts = (orderId: any) => {
    // Toggle visibility of the selected order's products
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="hidden md:flex md:w-1/5">
          <UserSidebar title="Purchase List" />
        </div>

        {/* <div className="md:w-4/5 w-full md:px-10 ">
       <CardUpdateProfile />
       </div> */}

        <div className="bg-white w-full">
          <div className="py-4 lg:px-10 px-6 ">
            <h1 className="text-[30px] font-semibold">Orders</h1>

            {categories?.map((datas: any, index: any) => {
              const totalPrice = datas?.order_items?.reduce(
                (sum: any, product: any) =>
                  sum +
                  parseFloat(product?.price || 0) *
                    parseFloat(product?.quantity || 1),
                0
              );
              return (
                <div key={index} className=" shadow-lg  my-3 border rounded-lg">
                  <div
                    onClick={() => handleShowProducts(datas?.id)}
                    className="cursor-pointer px-3 py-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-[14px] font-[500]">
                          Order Code: {datas?.order_code}
                        </p>
                        {/* <p className="text-[14px] font-bold"> */}
                        {/* Name: {datas?.customer?.last_name}{" "}
                          {datas?.customer?.first_name}
                        </p>
                        <p className="text-[14px] font-[500]">
                          Phone Number: {datas?.customer?.phone_number}
                        </p>
                        <p className="text-[14px]">
                          Email: {datas?.customer_email}
                        </p> */}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {/* Order Status */}
                          {datas?.status && (
                            <p>
                              <b
                                style={{
                                  fontWeight: "400",
                                  fontSize: "15px",
                                  backgroundColor:
                                    datas?.status === "pending"
                                      ? "#FFDDBD"
                                      : datas?.status === "paid"
                                      ? "#C9F0D0"
                                      : datas?.status === "delivered"
                                      ? "#FFDDBD"
                                      : datas?.status === "rejected"
                                      ? "#F5BFBF"
                                      : datas?.status === "InStore"
                                      ? "#E6BDFF"
                                      : datas?.status === "Breakdown"
                                      ? "#FEF1E8"
                                      : "#CAD8FA",
                                  color:
                                    datas?.status === "pending"
                                      ? "#FF922B"
                                      : datas?.status === "paid"
                                      ? "#51CF66"
                                      : datas?.status === "delivered"
                                      ? "#FF922B"
                                      : datas?.status === "rejected"
                                      ? "#E03130"
                                      : datas?.status === "InStore"
                                      ? "#B24BF1"
                                      : datas?.status === "Breakdown"
                                      ? "#F97316"
                                      : "#4979ED",
                                  borderRadius: "10px",
                                  padding: "2px 10px",
                                }}
                              >
                                {datas?.status}
                              </b>
                            </p>
                          )}
                          {/* See All Products Button */}
                          {/* <button
                onClick={() => handleShowProducts(datas?.order_id)}
                style={{
                
                  color: '#4979ED',
                }}
              >
                See Products
              </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Show Products if selected */}
                  {selectedOrder === datas?.id && (
                    <div className=" md:mx-7 mt-3">
                      <div className="flex justify-between mb-2">
                        <h3 className="px-3">
                          <b>Delivery method:</b> {datas?.delivery_method}
                        </h3>

                        <div className="">
                          <b>Date: </b>
                          {new Date(datas?.created_at).toLocaleDateString()}
                          {new Date(datas?.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                      <h3 className="px-3">Products:</h3>

                      <table className=" text-sm overflow-auto text-gray-500 ">
                        <div className="w-full overflow-auto">
                          <thead className="text-xs  text-gray-700 bg-gray-50 ">
                            <tr className="">
                              <th scope="col" className="md:px-4 px-3 py-3">
                                S/N
                              </th>
                              {/* <th scope="col" className="px-6 py-3">
                      Order Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Customer
                    </th> */}
                              <th scope="col" className="md:px-4 py-3">
                                Product
                              </th>
                              <th scope="col" className="md:px-4 py-3">
                                Product Status
                              </th>

                              <th scope="col" className="md:px-4 py-3">
                                Price
                              </th>
                              {/* <th scope="col" className="px-6 py-3">
                      Status
                    </th> */}
                            </tr>
                          </thead>
                          <tbody className="">
                            {datas?.order_items?.map(
                              (item: any, index: any) => (
                                <tr key={index} className="py-1">
                                  <td className="md:px-4 px-3 text-center  py-4">
                                    {index + 1}
                                  </td>
                                  <td className="md:px-4 text-center py-4">
                                  {item?.product?.product_name
                           ? item?.product?.product_name.charAt(0).toUpperCase() +
                           item?.product?.product_name.slice(1) : ""}
      
                                    {/* {item?.product?.product_name} */}
                                  </td>
                                  <td className="md:px-4 text-center py-4">
                                    {item?.product?.product_status}
                                  </td>
                                  <td className="md:px-4 text-center py-4">
                                    {datas.currency}
                                    {item?.display_price}
                                  </td>
                                  {/* <b>{product?.product_name}</b> - {product?.quantity} x{' '}
                        {product?.price} */}
                                </tr>
                              )
                            )}
                          </tbody>
                        </div>
                      </table>
                      <div className="md:flex justify-between px-3 mt-6 mb-2">
                        <div className="">
                          <b>Address: </b>
                          {datas?.customer_address?.address_line_1}
                        </div>

                        <div className="md:mt-0 mt-2">
                          <b>Total Price: </b>
                          {datas.currency}
                          {totalPrice}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
