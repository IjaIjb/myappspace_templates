import React, { useEffect, useRef } from "react";
// import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { UserApis } from "../../../apis/userApi/userApi";
import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/store";
// import { CartApis } from "../../../apis/userApi/cartApis";
// import { useNavigate } from "react-router-dom";


const FlashSales = () => {
  // const navigate = useNavigate();
   const [filterProducts, setFilteredProducts] = React.useState<any>([]);
   const [loader, setLoader] = React.useState<boolean>(false);
 
  
  // const [categories, setCategories] = React.useState<any>([]);
  const carouselRefTwo = useRef<any>(null);
const storeCode= "31958095"
React.useEffect(() => {
  
  UserApis.getCategory(storeCode)
    .then((response) => {
      if (response?.data) {
        // console?.log(response?.data);
        // setCategories(response?.data);
      } else {
        // dispatch(login([]))
      }
    })
    .catch(function (error) {});
}, [storeCode]);
const selectedCurrency = localStorage.getItem("selectedCurrency") || "USD";

  //     const [selectedCurrency, setSelectedCurrency] = React.useState<any>(null);


  //        React.useEffect(() => {
  //   CartApis.getSelectedCurrency(storeCode).then((response) => {
  //     if (response?.data) {
  //       // console.log(response.data);
  //       setSelectedCurrency(response?.data?.selected_currency);

 
  //     }
  //   });
  // }, [storeCode]);

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
  

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2, // optional, default to 1.
    },
  };

  // console.log(filterProducts)
  // Function to manually trigger left navigation
  // const handlePrevClickOne = () => {
  //   carouselRefTwo.current.previous();
  // };

  // // Function to manually trigger right navigation
  // const handleNextClickOne = () => {
  //   carouselRefTwo.current.next();
  // };

  // const handleProductClick = (product: any) => {
  //   navigate({
  //     pathname: `/product`,
  //     state: { product }
  //   });
 
  //   // navigate(`/product`, { state: { product } }); // Pass product data in state
  // };

  return (
    <div>
      <div className="flex justify-center w-full ">
        <div className="max-w-[1500px] w-full md:px-[40px] px-3">
          <div className="flex items-center justify-between pb-5">
            <div className="lg:flex gap-4">
              <div>
                <h4 className="border-b-[10px] border-b-[#FFC220] leading-[40px] text-[#000000] text-[32px] font-[400]">
                  Flash shales
                </h4>
              </div>
              {/* <div className="flex gap-4 lg:mt-0 mt-2">
                <div className="bg-[#FFC220] rounded-[8px] text-[10px] md:text-[16px] font-[400] py-2 px-3">
                  10Days
                </div>

                <div className="bg-[#FFC220] rounded-[8px] text-[10px] md:text-[16px] font-[400] py-2 px-3">
                  24H
                </div>

                <div className="bg-[#FFC220] rounded-[8px] text-[10px] md:text-[16px] font-[400] py-2 px-3">
                  25 Min
                </div>

                <div className="bg-[#FFC220] rounded-[8px] text-[10px] md:text-[16px] font-[400] py-2 px-3">
                  30Sec
                </div>
              </div> */}
            </div>

            <div className="border h-fit border-[#000000] rounded-[8px] text-[10px] md:text-[16px] whitespace-nowrap font-[400] py-2 px-4 md:px-7">
              View all
            </div>
          </div>
          {!loader ? (
            <div>
      <div className="">
            <Carousel
              ref={carouselRefTwo}
              swipeable={true}
              draggable={true}
              // showDots={true}
              responsive={responsive}
              ssr={true} // render carousel on server-side.
              infinite={true}
              rtl={false}
              autoPlay={true} // Disable autoplay to prevent conflict with manual navigation
              autoPlaySpeed={7000} // Optional: You can remove this if autoplay is disabled
              // keyBoardControl={true}
              transitionDuration={500} // Set transition to 500ms for smoother experience
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              className="rounded-[7px]"
              arrows={false} // Hide default arrows
            >
              {/* {categories?.categories?.data?.length > 0 ? 
              categories?.categories?.data?.map((cat:any) => (
                <div 
                onClick={() => handleProductClick(cat)}
                 key={cat?.id} className="mr-3">
                  <div className="border rounded-lg flex justify-center">
    <img
                  src={cat?.category_image}
                  className="rounded-[8px] w-[180px] h-[180px] object-contain"
                  alt="mart Logo"
                />
                </div>
                <div>
                  <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                  {cat?.category_name}
                  </h4>
                </div>
                </div>
              )) : (
                <div>
                  No category available
                </div>
              )} */}
                {/* <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-10"> */}
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
                          {prod?.product_name}
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
            </Carousel>
          </div> 
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
    
          {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-10">
            <div>
              <img
                src="/images/trouser.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Women Fashion Sneakers - White Canvas Shoe
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9]  text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/trouser.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Women Fashion Sneakers - White Canvas Shoe
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9]  text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/trouser.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Women Fashion Sneakers - White Canvas Shoe
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9]  text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/trouser.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Women Fashion Sneakers - White Canvas Shoe
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9]  text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/trouser.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Women Fashion Sneakers - White Canvas Shoe
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9]  text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-16">
            <div>
              <img
                src="/images/shirt.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Over sized long-sleeved Tshirt
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9] text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/shirt.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Over sized long-sleeved Tshirt
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9] text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/shirt.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Over sized long-sleeved Tshirt
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9] text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/shirt.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Over sized long-sleeved Tshirt
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9] text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/shirt.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
                Over sized long-sleeved Tshirt
              </h4>
              <img
                src="/images/star.svg"
                className="rounded-[8px] my-2 object-contain"
                alt="mart Logo"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <h4 className="text-[#C9C9C9] text-[12px] md:text-[16px] font-[700]">
                    30,300
                  </h4>
                  <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
                    30,000
                  </h4>
                </div>
                <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
                  10% OFF
                </h4>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FlashSales;
