import React from 'react'
import Navbar from '../../../components/Navbars/Navbar'
import { useParams } from 'react-router-dom';
import { UserApis } from '../../../apis/userApi/userApi';
import Carousel from 'react-multi-carousel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartApis } from '../../../apis/userApi/cartApis';
import Footer from '../../../components/footer/Footer';

const ViewProduct = () => {
  const params = useParams();

const storeCode = "31958095"
  const [singleProduct, setGetSingleProduct] = React.useState<any>([]);

  React.useEffect(() => {
    UserApis.getSingleProduct(storeCode, params?.id).then((response) => {
      if (response?.data) {
        console.log(response.data);
        setGetSingleProduct(response?.data?.product);

 
      }
    });
  }, [storeCode, params?.id]);
// console.log(singleProduct)
const addToCart = React.useCallback(
  (productInfo: any) => {
    const quantity = parseInt(productInfo?.stock_quantity); // Ensure it's an integer

    if (isNaN(quantity)) {
      console.error("Invalid quantity:", productInfo?.stock_quantity);
      toast.error("Invalid quantity value.");
      return; // Prevent API call if quantity is not a valid number
    }

    let datas = {
      product_id: productInfo?.id,
      quantity: 1, // Pass only a number
    };

    console.log("Payload being sent:", datas);

    CartApis.createCart(storeCode, datas)
      .then((response) => {
        console.log(response)
        if (response?.data) {
          console.log(response?.data);
          toast.success("cart added successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("API Error:", error.response?.data);
        toast.error("Offline");
      });
  },
  [params]
);

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

  const parsedCostPrice =  singleProduct?.selling_price 
  ? JSON.parse(singleProduct.selling_price) 
  : {}; // Default to an empty object if undefined

  return (
    <div>
                       <Navbar />
                       <div className="flex justify-center w-full">
                       <div className="max-w-[1500px] w-full md:px-[40px] px-3">
                        <div className='md:flex w-full gap-6 py-10'>
<div className='flex gap-3 w-full'>
<div className='flex flex-col gap-2'>
    {singleProduct?.product_images?.map((image: string, index: number) => (
  <img key={index} src={image} alt={`Product Image ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
))}
</div>
<div className="">
            <Carousel
            //   ref={carouselRefTwo}
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
            //   arrows={false} // Hide default arrows
            >
              {singleProduct?.product_images?.length > 0 ? 
              singleProduct?.product_images?.map((image:any, index:any) => (
                <div key={index} className="p-2 flex justify-center">
                <img src={image} alt={`Product ${index + 1}`} className="w-[600px] h-40 object-cover rounded-lg" />
              </div>
              )) : (
                <div>
                  No category available
                </div>
              )}
            
            </Carousel>
          </div>
<img src={singleProduct?.product_images && singleProduct?.product_images[0]} alt="/" className="w-[80%] h-full object-cover rounded-lg" />

</div> 

<div className='flex flex-col gap-6 w-full'>
    <div>
<h3 className='text-[25px] font-[800]'>{singleProduct?.product_name}</h3>
<div className="grid grid-cols-2 gap-3">
      {Object.entries(parsedCostPrice).map(([currency, price]) => (
        <div
          key={currency}
          className="flex justify-between p-2 border border-gray-300 rounded-md bg-white shadow-sm"
        >
          <span className="font-medium text-gray-700">{currency}:</span>
          <span className="font-bold text-black">{String(price)}</span>
        </div>
      ))}
    </div>
</div>

<div className=''>
<h5 className='pb-1 text-[16x] font-[600]'>Product Description</h5>
<h3 className='text-[16px] font-[400]'>{singleProduct?.product_description}</h3>
<h3 className='text-[16px] font-[400]'>{singleProduct?.product_short_description}</h3>
</div>
 
<button
                    type="button"
                    onClick={() => addToCart(singleProduct)}
                    style={{ backgroundColor: '#0071BC', borderRadius: '50px' }}
                    className=" mt-10 w-full text-white hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Add to cart
                  </button>
</div>
                        </div>
   <ToastContainer
        position="bottom-left"
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
        </div>

        <Footer />
    </div>
  )
}

export default ViewProduct