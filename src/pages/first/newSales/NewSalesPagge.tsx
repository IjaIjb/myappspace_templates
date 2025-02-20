import React, { useEffect } from 'react'
import { UserApis } from '../../../apis/userApi/userApi';
import { NavLink } from 'react-router-dom';
import Navbar from '../../../components/Navbars/Navbar';
import Footer from '../../../components/footer/Footer';

const NewSalesPagge = () => {
      const selectedCurrency = localStorage.getItem("selectedCurrency") || "USD";
           const [filterProducts, setFilteredProducts] = React.useState<any>([]);
           const [loader, setLoader] = React.useState<boolean>(false);
         
          
        const storeCode= "31958095"
        
          console.log(selectedCurrency)
        
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
                    const parsedSellingPrice = JSON.parse(product.selling_price || "{}");
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
             New Arrival
              </h4>
    {!loader ? (
   <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-10">
        {filterProducts?.length > 0 ? 
       filterProducts?.filter((prod: any) => prod.sale_type === "flash") // ✅ Only include products with sale_type
       .map((prod: any) => (
                   <div key={prod?.id} className="border rounded-lg mr-3">
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
                           prod?.product_name.slice(1) : ""}
      
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
       )) : (
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
                  </div>
    )}
<Footer />
  </div>
  )
}

export default NewSalesPagge