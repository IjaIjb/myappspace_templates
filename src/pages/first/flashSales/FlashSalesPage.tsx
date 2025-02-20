import React, { useCallback, useEffect } from "react";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/Navbars/Navbar";
import { UserApis } from "../../../apis/userApi/userApi";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../reducer/loginSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FlashSalesPage = () => {
  const selectedCurrency = localStorage.getItem("selectedCurrency") || "USD";
  const [filterProducts, setFilteredProducts] = React.useState<any>([]);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [wishlist, setWishlist] = React.useState(new Set());

  const dispatch: Dispatch = useDispatch();

  const storeCode = "31958095";

  console.log(selectedCurrency);

  const toggleWishlist = useCallback(
    async (productInfo: any) => {
      const productId = productInfo?.id;
      const isWished = wishlist.has(productId);

      try {
        if (isWished) {
          // Remove from wishlist
          const response = await UserApis.removeWishlist(storeCode, productId);
          console.log(response);
          if (response?.data) {
            setWishlist((prev: any) => {
              const updatedSet = new Set([...prev]); // Ensure a new reference
              updatedSet.delete(productId);
              return updatedSet;
            });
            toast.success(response.data.message);
          }
        } else {
          // Add to wishlist
          const response = await UserApis.addToWishlist(storeCode, {
            product_id: productId,
          });
          console.log(response);
          if (response?.data) {
            setWishlist((prev: any) => {
              const updatedSet = new Set([...prev]); // Ensure a new reference
              updatedSet.add(productId);
              return updatedSet;
            });
            toast.success(response.data.message);
          }
        }
      } catch (error) {
        console.error("Wishlist error:", error);
        toast.error("Something went wrong.");
      }
    },
    [wishlist, storeCode]
  );

  React.useEffect(() => {
    UserApis.getAllWishlist(storeCode)
      .then((response) => {
        if (response?.data) {
          // console.log(response.data.wishlist);
          const wishListIds = new Set(
            response?.data?.wishlist.map((item: any) => item.product_id)
          );
          setWishlist(wishListIds);
        } else {
          dispatch(login([]));
        }
      })
      .catch(function (error) {
        console.error("Error fetching wishlist:", error);
      });
  }, [storeCode, dispatch]);

  useEffect(() => {
    setLoader(true);

    const query = {
      search: "",
      category_id: "",
    };

    UserApis.getProduct(storeCode, query)
      .then((response) => {
        setLoader(false);
        if (response?.data?.products) {
          // console.log(response.data.products);

          // Map products to parse and extract price based on selectedCurrency
          const updatedProducts = response.data.products.map((product: any) => {
            const parsedSellingPrice = JSON.parse(
              product.selling_price || "{}"
            );
            return {
              ...product,
              display_price: parsedSellingPrice[selectedCurrency] || "0", // Fallback in case currency doesn't exist
            };
          });

          setFilteredProducts(updatedProducts); // ✅ Update state with modified prices
        } else {
          setFilteredProducts([]); // ✅ Prevent undefined issues
          console.log("No products found");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [storeCode, selectedCurrency]); // ✅ Depend on selectedCurrency

  return (
    <div>
      <Navbar />
      <h4 className="border-b-[10px] leading-[40px] text-[#000000] text-[32px] font-[400]">
        Flash shales
      </h4>
      {!loader ? (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-10">
          {filterProducts?.length > 0 ? (
            filterProducts
              ?.filter((prod: any) => prod.sale_type === "flash") // ✅ Only include products with sale_type
              .map((prod: any) => (
                <div key={prod?.id} className="border rounded-lg mr-3">
                  <span
                    className="flex justify-end cursor-pointer"
                    onClick={() => toggleWishlist(prod)}
                  >
                    {wishlist.has(prod.id) ? (
                      <FaHeart className="text-blue-700" />
                    ) : (
                      <FaRegHeart className="text-blue-700" />
                    )}
                  </span>
                  <NavLink
                    to={`/view-product/${prod?.id}`}
                    className="mr-3  p-3 rounded-xl"
                  >
                    <img
                      src={prod.product_images[0]}
                      className="rounded-[8px] mb-1 w-full h-[150px] object-contain"
                      alt="mart Logo"
                    />

                    <div className="border-t px-2">
                      <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                        {prod?.product_name
                          ? prod?.product_name.charAt(0).toUpperCase() +
                            prod?.product_name.slice(1)
                          : ""}
                      </h4>
                      <img
                        src="/images/star.svg"
                        className="rounded-[8px] my-2 object-contain"
                        alt="mart Logo"
                      />
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          {/* <h4 className="text-[#C9C9C9] text-[12px] md:text-[16px]  font-[700]">
                  30,300
                </h4> */}
                          <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                            {selectedCurrency} {prod?.display_price}
                          </h4>
                        </div>
                        {/* <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                            10% OFF
                          </h4> */}
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))
          ) : (
            <div>No product yest</div>
          )}
        </div>
      ) : (
        <div>
          <div className="md:px-8 px-4 w-full animate-pulse pt-[20px] md:pt-[20px] ">
            <section className=" p-3">
              <div className=" mx-auto grid md:gap-6 gap-8 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:space-y-0">
                <div>
                  <div className="border  w-full p-2 rounded-lg border-gray-300">
                    <div className="h-[200px] bg-gray-300 dark:bg-gray-400 border border-gray-300 rounded-lg w-full"></div>
                    <div className="flex justify-center text-center">
                      <div className="h-2.5   mt-3 bg-gray-300 rounded-full dark:bg-gray-400 w-20"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border  w-full p-2 rounded-lg border-gray-300">
                    <div className="h-[200px] bg-gray-300 dark:bg-gray-400 border border-gray-300 rounded-lg w-full"></div>
                    <div className="flex justify-center text-center">
                      <div className="h-2.5   mt-3 bg-gray-300 rounded-full dark:bg-gray-400 w-20"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border  w-full p-2 rounded-lg border-gray-300">
                    <div className="h-[200px] bg-gray-300 dark:bg-gray-400 border border-gray-300 rounded-lg w-full"></div>
                    <div className="flex justify-center text-center">
                      <div className="h-2.5   mt-3 bg-gray-300 rounded-full dark:bg-gray-400 w-20"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border  w-full p-2 rounded-lg border-gray-300">
                    <div className="h-[200px] bg-gray-300 dark:bg-gray-400 border border-gray-300 rounded-lg w-full"></div>
                    <div className="flex justify-center text-center">
                      <div className="h-2.5   mt-3 bg-gray-300 rounded-full dark:bg-gray-400 w-20"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border  w-full p-2 rounded-lg border-gray-300">
                    <div className="h-[200px] bg-gray-300 dark:bg-gray-400 border border-gray-300 rounded-lg w-full"></div>
                    <div className="flex justify-center text-center">
                      <div className="h-2.5   mt-3 bg-gray-300 rounded-full dark:bg-gray-400 w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <span className="sr-only">Loading...</span>
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
      )}
      <Footer />
    </div>
  );
};

export default FlashSalesPage;
