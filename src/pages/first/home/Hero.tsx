import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { UserApis } from "../../../apis/userApi/userApi";

const Hero = () => {
  const storeCode = localStorage.getItem("storeCode") || "";

     const [banner, setBanner] = React.useState<any>([]);
  
    React.useEffect(() => {
      UserApis.fetchStoreData(storeCode).then((response) => {
        if (response?.data) {
            // console.log(response.data);
          // setStoreData(response?.data?.store);
          setBanner(response?.data?.configs?.banner?.settings);
          //   setSelectedCurrency(response?.data?.configs.settings?.default_currency || "");
          const defaultCurrency = "NGN";
  
          // Set in localStorage only if it's not already set
          if (!localStorage.getItem("selectedCurrency")) {
            localStorage.setItem("selectedCurrency", defaultCurrency);
            // setSelectedCurrency(defaultCurrency);
          }
        }
      });
    }, [storeCode]);
  
    
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
    swipeable={true}
    draggable={true}
    showDots={true}
    responsive={responsive}
    ssr={true} // Server-side rendering
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={7000}
    transitionDuration={500}
    containerClass="carousel-container"
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    className="rounded-[7px]"
  >
    {banner?.banners?.length > 0 ? (
      banner?.banners?.map((ban: any, index: number) => {
        if (!ban) return null; // Ensure ban is defined

        const isExternal = ban?.cta_link && !ban?.cta_link.startsWith("/");
        const formattedLink = isExternal
          ? ban?.cta_link.startsWith("http")
            ? ban?.cta_link
            : `https://${ban?.cta_link}`
          : ban?.cta_link;

        return (
          <div
            key={index}
            className="flex w-full justify-between rounded-xl pl-3 md:pl-20 pr-5 h-full"
            style={{ backgroundColor: banner?.theme_color || "#BBDEF4" }}
            aria-label={ban?.title || `Banner ${index + 1}`} // Add fallback aria-label
          >
            <div className="flex flex-col py-5 justify-center">
              <h4 className="text-white md:text-[48px] text-[20px] font-[600]">
                {ban?.title}
              </h4>
              <h5 className="text-white md:text-[24px] text-[16px] font-[300] mt-4">
                {ban?.description}
              </h5>
              {formattedLink && (
                <a
                  href={formattedLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="bg-[#FFC220] w-fit mt-4 rounded-[5px] py-2 px-5"
                >
                  {ban?.cta_text}
                </a>
              )}
            </div>
            <div className="flex items-end place-self-end justify-end">
              <img
                src="/images/blacky.svg"
                className="w-full h-full object-contain"
                alt="mart Logo"
              />
            </div>
          </div>
        );
      })
    ) : (
      <p className="text-white text-center">No banners available</p>
    )}
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
