import React, { useRef } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Categories = () => {
  const carouselRefTwo = useRef<any>(null);

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

  // Function to manually trigger left navigation
  const handlePrevClickOne = () => {
    carouselRefTwo.current.previous();
  };

  // Function to manually trigger right navigation
  const handleNextClickOne = () => {
    carouselRefTwo.current.next();
  };

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="max-w-[1500px] w-full md:px-[40px] px-3">
          <div className="flex justify-center py-7">
            {/* <h4 className="text-center text-[#000000] text-[32px] font-[700]">
              Top Categories
            </h4> */}
          </div>
          {/* Custom Arrow Buttons Positioned in Front of the Heading */}
          <div className="flex justify-between items-center mb-5">
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
          </div>

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
              <div className="mr-2">
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

              <div className="mr-2">
                <img
                  src="/images/womenCat.svg"
                  className="rounded-[8px] object-contain"
                  alt="mart Logo"
                />
                <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                  Women's Clothes
                </h4>
              </div>

              <div className="mr-2">
                <img
                  src="/images/watch.svg"
                  className="rounded-[8px] object-contain"
                  alt="mart Logo"
                />
                <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                  Watches
                </h4>
              </div>

              <div className="mr-2">
                <img
                  src="/images/beltCat.svg"
                  className="rounded-[8px] object-contain"
                  alt="mart Logo"
                />
                <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                  Belts
                </h4>
              </div>

              <div className="mr-2">
                <img
                  src="/images/bagsCat.svg"
                  className="rounded-[8px] object-contain"
                  alt="mart Logo"
                />
                <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                  Belts
                </h4>
              </div>

              <div className="mr-2">
                <img
                  src="/images/sneakers.svg"
                  className="rounded-[8px] object-contain"
                  alt="mart Logo"
                />
                <h4 className="text-center text-[#262626] text-[20px] font-[600] mt-2">
                  Sneakers
                </h4>
              </div>
            </Carousel>
          </div>
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
