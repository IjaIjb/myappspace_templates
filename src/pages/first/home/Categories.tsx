import React, { Fragment } from "react";
// import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { UserApis } from "../../../apis/userApi/userApi";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { IoMdMore } from "react-icons/io";

const Categories = () => {
  const navigate = useNavigate();
  // const [filterProducts, setFilteredProducts] = React.useState<any>([]);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [categories, setCategories] = React.useState<any>([]);
  // const carouselRefTwo = useRef<any>(null);
  const storeCode = localStorage.getItem("storeCode") || "";

  React.useEffect(() => {
    setLoader(true);
    UserApis.getCategory(storeCode)
      .then((response) => {
        if (response?.data) {
          // console?.log(response?.data);
          setCategories(response?.data);
          setLoader(false);
        } else {
          // dispatch(login([]))
          setLoader(false);
        }
      })
      .catch(function (error) {});
    // setLoader(false)
  }, [storeCode]);

  // console.log(categories)

  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 6,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 6, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 3, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 2, // optional, default to 1.
  //   },
  // };

  //  useEffect(() => {

  //   setLoader(true);

  //   // const trimmedSearch = search.trim(); // Ensure search doesn't send unnecessary spaces
  //   const query = {
  //     search: "",
  //     category_id: "",
  //   };

  //   UserApis.getProduct(storeCode, query)
  //     .then((response) => {
  //       setLoader(false);
  //       if (response?.data?.products) {
  //         console.log(response.data.products)
  //         setFilteredProducts(response.data.products); // ✅ Set products correctly
  //         console.log("Fetched Products:", response.data.products);
  //       } else {
  //         setFilteredProducts([]); // ✅ Prevent undefined issues
  //         console.log("No products found");
  //       }
  //     })
  //     .catch((error) => {
  //       setLoader(false);
  //       console.error("Error fetching products:", error);
  //     });
  // }, [storeCode, ]);

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

  const handleProductClick = (product: any) => {
    navigate("/product", { state: { category_name: product } });
  };

  const hasMore = categories?.categories?.data?.length > 6;
  // const hasMoreMedium = categories?.categories?.data?.length > 4;
  const hasMoreMobile = categories?.categories?.data?.length > 3;

  return (
    <div className="pt-4">
      {loader ? (
        <div className=" shadow animate-pulse ">
          <div className="flex justify-center items-center mb-4 h-16 bg-gray-300 rounded dark:bg-gray-400"></div>

          {/* <span className="sr-only">Loading...</span> */}
        </div>
      ) : (
        <div className="bg-gray-200 w-full py-3">
          <div className="max-w-[1500px] w-full md:px-[40px] px-3">
            <div className="lg:hidden block">
              <div className="flex justify-between items-center gap-3 md:gap-8 w-full">
                {categories?.categories?.data?.length > 0 ? (
                  categories?.categories?.data?.slice(0, 3).map((cat: any) => (
                    <div
                      onClick={() => handleProductClick(cat)}
                      key={cat?.id}
                      className="cursor-pointer"
                    >
                      <div className="border rounded-lg flex justify-center">
                        {/* <img
                  src={cat?.category_image}
                  className="rounded-[8px] w-[180px] h-[180px] object-contain"
                  alt="mart Logo"
                /> */}
                      </div>
                      <div>
                        <h4 className="text-center text-[#262626] text-[16px] md:text-[20px] font-[700]">
                          {cat?.category_name}
                        </h4>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No category available</div>
                )}
                <div className="">
                  {hasMoreMobile && (
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex  items-center px-4 py-2 rounded-lg font-semibold">
                        More
                        <IoMdMore className="w-6 h-6" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
                          {categories?.categories?.data
                            ?.slice(3)
                            .map((cat: any) => (
                              <Menu.Item key={cat.id}>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleProductClick(cat)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } block w-full text-left px-4 py-2 text-[#262626] font-medium`}
                                  >
                                    {cat.category_name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="flex justify-between items-center gap-3 md:gap-8 w-full">
                {categories?.categories?.data?.length > 0 ? (
                  categories?.categories?.data?.slice(0, 6).map((cat: any) => (
                    <div
                      onClick={() => handleProductClick(cat)}
                      key={cat?.id}
                      className="cursor-pointer"
                    >
                      <div className="border rounded-lg flex justify-center">
                        {/* <img
                  src={cat?.category_image}
                  className="rounded-[8px] w-[180px] h-[180px] object-contain"
                  alt="mart Logo"
                /> */}
                      </div>
                      <div>
                        <h4 className="text-center text-[#262626] text-[16px] md:text-[20px] font-[700]">
                          {cat?.category_name}
                        </h4>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No category available</div>
                )}

                {hasMore && (
                  <Menu as="div" className="relative">
                    <Menu.Button className="bg-gray-300 px-4  rounded-lg font-semibold">
                      More
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
                        {categories?.categories?.data
                          ?.slice(3)
                          .map((cat: any) => (
                            <Menu.Item key={cat.id}>
                              {({ active }) => (
                                <button
                                  onClick={() => handleProductClick(cat)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block w-full text-left px-4 py-2 text-[#262626] font-medium`}
                                >
                                  {cat.category_name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center w-full">
        <div className="max-w-[1500px] w-full md:px-[40px] px-3">
          <div className="flex justify-center py-7">
            {/* <h4 className="text-center text-[#000000] text-[32px] font-[700]">
              Top Categories
            </h4> */}
          </div>

          {/* Custom Arrow Buttons Positioned in Front of the Heading */}
          {/* <div className="flex justify-between items-center mb-5">
            <div className="">
              <h4 className="text-[25px] font">Featured Categories</h4>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-[#F2F3F4] text-white p-2 rounded-full"
                onClick={handlePrevClickOne}
              >
                <FaArrowLeftLong className="text-[#7E7E7E]" />
              </button>

              <button
                className="bg-[#F2F3F4] text-white p-2 rounded-full"
                onClick={handleNextClickOne}
              >
                <FaArrowRightLong className="text-[#7E7E7E]" />
              </button>
            </div>
          </div> */}

          {/* <div className="">
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
              {categories?.categories?.data?.length > 0 ? 
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
              )}
            
            </Carousel>
          </div> */}
          {/* <section className=" px-2 pt-[180px] py-3 ">
        
      </section> */}
          {/* <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4">
            <div>
              <img
                src="/images/menCat.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <div>
              <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                Men's Clothes
              </h4>
              </div>
            </div>

            <div>
              <img
                src="/images/womenCat.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                Women's Clothes
              </h4>
            </div>

            <div>
              <img
                src="/images/watch.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                Watches
              </h4>
            </div>

            <div>
              <img
                src="/images/beltCat.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                Belts
              </h4>
            </div>

            <div>
              <img
                src="/images/bagsCat.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                Belts
              </h4>
            </div>

            <div>
              <img
                src="/images/sneakers.svg"
                className="rounded-[8px] object-contain"
                alt="mart Logo"
              />
              <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                Sneakers
              </h4>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Categories;
