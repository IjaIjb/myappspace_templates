import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserApis } from '../../apis/userApi/userApi';
import { login } from '../../reducer/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardWishlist = () => {
  const [wishlist, setWishlist] = React.useState([]);
  const dispatch = useDispatch();
  const storeCode = localStorage.getItem("storeCode") || "";

  const selectedCurrency = localStorage.getItem("selectedCurrency") || "";

  // const [searchText, setSearchText] = React.useState('');
  React.useEffect(() => {
    UserApis.getAllWishlist(storeCode)
      .then((response) => {
        if (response?.data) {
          // console.log(response.data.wishlist);
          const updatedProducts = response?.data?.wishlist.map((product) => {
            const parsedSellingPrice = JSON.parse(
              product?.product?.selling_price || "{}"
            );
            return {
              ...product,
              display_price: parsedSellingPrice[selectedCurrency] || "0", // Fallback in case currency doesn't exist
            };
          });
          setWishlist(updatedProducts);
        } else {
          dispatch(login([]));
        }
      })
      .catch(function (error) {
        console.error("Error fetching wishlist:", error);
      });
  }, [storeCode, dispatch, selectedCurrency]);
console.log(wishlist)

const deleteList = React.useCallback(
  (id) => {
    UserApis.removeWishlist(storeCode, id).then(
      (response) => {
        if (response?.data) {
          console.log(response)
          toast.success('Deleted Successfully');
          UserApis.getAllWishlist(storeCode).then(
            (response) => {
              if (response?.data) {
                setWishlist(response?.data?.wishlist)
              } else {
                dispatch(login([]))
              }
            }
          )
        } else {
          toast.error(response?.response?.data?.message);
        }
      }
    ).catch(function (error) {
      toast.error(error.response.data.message);
    })
  }
  ,
  [storeCode, dispatch]
);

  return (
    <>


      <div className="bg-white">
        <div className='py-4 lg:px-10 px-6 '>
          <h1 className='text-[30px] font-semibold'>WishLists</h1>
          <div className='flex justify-end'>
            <div className=" mr-3 flex justify-end">
              <div className="relative flex w-full flex-wrap items-stretch">
                <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#9da4aa" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z" /></svg>
                </div>
                <input type="text" 
                // onClick={() => paginator('')} 
                // onChange={e => setSearchText(e.target.value)}
                 placeholder='search...' id="simple-search" className=" border border-gray-300 text-gray-500 text-sm rounded-md block w-full pl-4 p-1  " required />
              </div>

              <div className='mt-0.5 ml-2'><button type='button'
            //    onClick={(e) => paginator('')} 
               className={"font-normal text-white bg-[#0071BC] px-3 py-0.5 rounded-md"}>Search</button> </div>
              {/* <div className='mt-0.5 ml-2'><button type='button' onClick={(e) => setVisible(true)} className={"font-normal text-white bg-[#0071BC] px-3 py-0.5 rounded-md"}>Update</button> </div> */}



            </div>

            {/* <div className='mt-1'>Filter </div> */}
          </div>




          <div >


            {wishlist?.map(
                (wish, index) => (
                  <div className="border-[2px] rounded-lg px-4 py-2 my-3 border-[#E3E4E5]">
                    <div className="flex justify-between">
                      <div className="flex justify-start gap-2">
                        <span className="border-[2px] rounded-lg px-5 py-4 border-[#E3E4E5] w-3" 
                        style={{ backgroundImage: `url(${wish?.product?.product_images[0]})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', backgroundPosition: 'center center' }}
                        >
                          <img src={wish?.product?.product_images[0]} className=" w-fit" alt="" />
                        </span>

                        <span className="mt-1">
                        {/* <NavLink to={`/view-product/:cart`} >drink</NavLink> </span> */}
                        <NavLink to={`/view-product/${(wish?.product_id)}`} >
                        {wish?.product?.product_name
                           ? wish?.product?.product_name.charAt(0).toUpperCase() +
                           wish?.product?.product_name.slice(1) : ""}
      
                        {/* {wish?.product?.product_name} */}
                        </NavLink> </span>
                      </div>

                      <div className='flex justify-between gap-4'>
                        <span className="mt-3">
                            {/* {userLoginData?.data ? (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format((cart?.item_price) ? (cart?.item_price) : 0.0)) : '0.0'} */}
                            {/* NGN 500.00 */}
                            {selectedCurrency}
                            {wish?.display_price}
                            </span>
                        <span className="mt-3  cursor-pointer" 
                        onClick={() => deleteList(wish?.product_id)}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.615 20C7.155 20 6.771 19.846 6.463 19.538C6.15433 19.2293 6 18.845 6 18.385V5.99998H5V4.99998H9V4.22998H15V4.99998H19V5.99998H18V18.385C18 18.845 17.846 19.229 17.538 19.537C17.2293 19.8456 16.845 20 16.385 20H7.615ZM9.808 17H10.808V7.99998H9.808V17ZM13.192 17H14.192V7.99998H13.192V17Z" fill="#E53945" />
                          </svg>
                        </span>
                      </div>

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
        pauseOnHover />
                  </div>
                 )
              )
            } 



          </div>
          {/* <div className='m-4 flex justify-end'>
            {
              userLists?.links?.filter(((item, idx) => idx < 1000)).map(
                (datas, index) => (
                  <button onClick={() => paginator(datas?.label == 'Next &raquo;' ? datas?.url.charAt(datas?.url.length - 1) : (datas?.label === '&laquo; Previous') ? datas?.url.charAt(datas?.url.length - 1) : datas?.label)} disabled={datas?.active} className={'mx-1 py-1 px-2 ' + (datas?.active == false ? 'bg-gray-300 text-black ' : 'bg-[#0071BC] text-white')}>
                    {datas?.label == '&laquo; Previous' ? '< Previous' : (datas?.label === 'Next &raquo;') ? 'Next  >' : datas?.label}
                  </button>
                )
              )
            }

          </div> */}




        </div>

      </div>

      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover /> */}
    </>
  )
}

export default CardWishlist