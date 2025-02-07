import React, { useEffect } from "react";
import { UserApis } from "../../../apis/userApi/userApi";

const NewArrival = () => {
  
    const [filterProducts, setFilteredProducts] = React.useState<any>([]);
const storeCode= "31958095"
  
     useEffect(() => {
   
      // setLoader(true);
   
      // const trimmedSearch = search.trim(); // Ensure search doesn't send unnecessary spaces
      const query = {
        search: "",
        category_id: "",
      };
  
      UserApis.getProduct(storeCode, query)
        .then((response) => {
          // setLoader(false);
          if (response?.data?.products) {
            console.log(response.data.products)
            setFilteredProducts(response.data.products); // ✅ Set products correctly
            console.log("Fetched Products:", response.data.products);
          } else {
            setFilteredProducts([]); // ✅ Prevent undefined issues
            console.log("No products found");
          }
        })
        .catch((error) => {
          // setLoader(false);
          console.error("Error fetching products:", error);
        });
    }, [storeCode, ]);

    // console.log(filterProducts)
  return (
    <div>
      <div className="flex justify-center w-full mt-20">
        <div className="max-w-[1500px] w-full md:px-[40px] px-3">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <h4 className="border-b-[10px] border-b-[#FFC220] leading-[40px] text-[#000000] text-[32px] font-[400]">
                New Arrival
              </h4>
            </div>

            <div className="border border-[#000000] rounded-[8px] text-[10px] md:text-[16px] h-fit font-[400] py-2 px-7">
              View all
            </div>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-10">
          {filterProducts?.data?.map((prod:any) => (
  <div>
  <img
    src={prod.product_images[0]}
    className="rounded-[8px] w-full h-[250px] object-contain"
    alt="mart Logo"
  />
  <h4 className="pt-2 text-[#787878] text-[16px] md:text-[20px] font-[600] mt-2">
    {prod?.product_name}
  </h4>
  <img
    src="/images/star.svg"
    className="rounded-[8px] my-2 object-contain"
    alt="mart Logo"
  />
  <div className="flex justify-between">
    {/* <div className="flex gap-2">
      <h4 className="text-[#C9C9C9] text-[12px] md:text-[16px]  font-[700]">
        30,300
      </h4>
      <h4 className="text-[#424242] text-[18px] md:text-[24px] font-[700]">
        30,000
      </h4>
    </div> */}
    <h4 className="text-[#787878] text-[10px] md:text-[14px] font-[500]">
      10% OFF
    </h4>
  </div>
</div>
          ))}
          

            {/* <div>
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
                  <h4 className="text-[#C9C9C9] text-[12px] md:text-[16px]  font-[700]">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
