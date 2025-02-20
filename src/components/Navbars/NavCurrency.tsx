import React, { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
// import { useDispatch } from "react-redux";
import { UserApis } from "../../apis/userApi/userApi";
// import { setCurrency } from "../../store/stateSlice";
import { CartApis } from "../../apis/userApi/cartApis";

const NavCurrency = () => {
  // const dispatch = useDispatch();
  const [storeCurrency, setStoreCurrency] = React.useState<any>("");
  // const [selected, setSelected] = React.useState<any>("");

  const selectedCurrency = localStorage.getItem("selectedCurrency"); // Load from localStorage

  const storeCode = "31958095";

  React.useEffect(() => {
    UserApis.fetchStoreData(storeCode).then((response) => {
      if (response?.data) {
          console.log(response.data);
        // setStoreData(response?.data?.store);
        setStoreCurrency(response?.data?.configs?.payment?.settings);
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

  // Function to handle currency change
  const handleCurrencyChange = async (currency: string) => {
    // setSelectedCurrency(currency);
    localStorage.setItem("selectedCurrency", currency); // Save to localStorage

    // Prepare form data
    const formData = { currency };

    try {
      await CartApis.updateCurrency(storeCode, formData);
      //    console.log("Currency updated successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating currency:", error);
    }
  };

  React.useEffect(() => {
    CartApis.getSelectedCurrency(storeCode).then((response) => {
      if (response?.data) {
        // console.log(response.data);
        // setSelected(response?.data);
      }
    });
  }, [storeCode, selectedCurrency]);

  //   console.log(selected)
  return (
    <div>
      {" "}
      <div className="bg-gray-200 py-2">
        <div className="flex justify-center w-full ">
          <div className="max-w-[1500px] w-full px-3">
            <div className="">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="bg-gray-100 flex gap-2 items-center text-black px-3 py-[2px] rounded-md border border-gray-300 hover:bg-gray-200">
                    {selectedCurrency}
                    <IoIosArrowDown />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-5 mt-2 z-50 w-40 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
                    {storeCurrency?.currencies?.map((currency: any) => (
                      <Menu.Item key={currency}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-200" : "bg-white"
                            } w-full px-4 py-2  text-left text-black`}
                            onClick={() => handleCurrencyChange(currency)}
                          >
                            {currency}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCurrency;
