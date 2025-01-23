import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Hero = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="max-w-[1500px] w-full">
          <div className=" h-full gap-3 md:px-[40px] px-3">
            {/* Left Section */}
            <div className=" w-full h-full">
              <div className="">
                <Carousel
                  // ref={carouselRefTwo}
                  swipeable={true}
                  draggable={true}
                  showDots={true}
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
                  // arrows={false} // Hide default arrows
                >
                  <div className="flex w-full rounded-xl bg-[#BBDEF4] pl-3 md:pl-20 p pr-5 h-full">
                    <div className="flex flex-col py-5 justify-center">
                      <h4 className="text-[#000000] md:text-[48px] text-[20px] font-[600]">
                        Your Fashion Journey Starts Here Effortless Shopping,
                        Endless Style
                      </h4>
                      <h5 className="text-[#474646] md:text-[24px] text-[16px] font-[300] mt-4">
                        These subtitles add an extra layer of allure,
                        encouraging customers to explore and find their unique
                        style on Mmart.
                      </h5>
                      <div className="bg-[#FFC220] w-fit mt-4 rounded-[5px] py-2 px-5">
                        Shop now
                      </div>
                    </div>
                    <div className="flex items-end place-self-end justify-end ">
                      <img
                        src="/images/blacky.svg"
                        className="w-[500px] h-full object-contain"
                        alt="mart Logo"
                      />
                    </div>
                  </div>

                  <div className="flex w-full rounded-xl bg-[#BBDEF4] pl-3 md:pl-20 pr-5 h-full">
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[#000000] md:text-[48px] text-[20px] font-[600]">
                        Your Fashion Journey Starts Here Effortless Shopping,
                        Endless Style
                      </h4>
                      <h5 className="text-[#474646] md:text-[24px] text-[16px] font-[300] mt-4">
                        These subtitles add an extra layer of allure,
                        encouraging customers to explore and find their unique
                        style on Mmart.
                      </h5>
                      <div className="bg-[#FFC220] w-fit mt-4 rounded-[5px] py-2 px-5">
                        Shop now
                      </div>
                    </div>
                    <div className="flex items-end place-self-end justify-end ">
                      <img
                        src="/images/blacky.svg"
                        className="w-[500px] h-full object-contain"
                        alt="mart Logo"
                      />
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
