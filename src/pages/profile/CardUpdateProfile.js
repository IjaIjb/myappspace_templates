import React, { useState, useEffect, useCallback } from "react";
import { UserApis } from "../../apis/userApi/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardUpdateProfile = () => {
  const storeCode = localStorage.getItem("storeCode") || "";


  // State for form fields
  // const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Fetch user profile data
  useEffect(() => {
    UserApis.getProfile(storeCode).then((response) => {
      if (response?.data?.data) {
        const profileData = response.data.data;
        console.log("Fetched Profile Data:", profileData);

        // setEmail(profileData.email || "");
        setPhoneNumber(profileData.phone_number || "");
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setAddress(profileData.address || "");
        setGender(profileData.gender || "");
        setDateOfBirth(profileData.date_of_birth || "");
      }
    });
  }, [storeCode]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      console.log("handleSubmit triggered");

      if (!firstName || !lastName || !phoneNumber || !address) {
        toast.error("Please fill in all required fields");
        return;
      }

      const jsonData = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        address: address,
        gender: gender,
        date_of_birth: dateOfBirth,
      };

      console.log("JSON Payload:", jsonData);

      UserApis.updateProfile(storeCode, jsonData)
        .then((response) => {
          console.log("API Response:", response);
          if (response?.data) {
            toast.success(response?.data?.message);
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          toast.error("Failed to update profile");
        });
    },
    [storeCode, firstName, lastName, phoneNumber, address, gender, dateOfBirth]
  );

  return (
    <>
      <div className="pb-32 mt-10 sm:px-10">
        <div className="container p-6">
          <div className="py-4 text-[30px] font-[700]">
            <span>User Information</span>
          </div>

          <form className="pb-10" onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  // disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">{gender}</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="relative w-full">
              <label className="block mb-2 text-sm font-semibold text-[#414143]">Address</label>
              <textarea
                className="bg-[#FBFBFB] border border-[#00000040] text-[#333333] text-sm rounded-[7px] block w-full p-2 placeholder:text-[#00000040] placeholder:text-[12px] ease-linear transition-all duration-150"
                placeholder="Enter Delivery Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              <label className="block mb-2 text-sm font-semibold text-[#414143]">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="md:flex md:justify-start mt-4 gap-2">
              <button
                type="submit"
                style={{ backgroundColor: "#0071BC", borderRadius: "50px" }}
                className="text-sm w-full sm:w-auto px-10 py-2.5 text-center text-white hover:bg-[#0071BC] focus:ring-4 focus:outline-none focus:ring-[#0071BC] font-medium rounded-lg"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar pauseOnHover />
    </>
  );
};

export default CardUpdateProfile;
