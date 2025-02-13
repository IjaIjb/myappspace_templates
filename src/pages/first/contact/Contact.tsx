import React, { useState } from "react";
import Navbar from "../../../components/Navbars/Navbar";
import { Oval } from "react-loader-spinner";
import Footer from "../../../components/footer/Footer";
import { ToastContainer } from "react-toastify";

const Contact = () => {
  const [name2, setName2] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");

  let [visible, setVisible] = React.useState(false);

  return (
    <div className="">
      <Navbar />

      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Contact Form</h2>
          <form
            //   onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="1">1 - Very Poor</option>
                <option value="2">2 - Poor</option>
                <option value="3">3 - Average</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Comments</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center gap-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              <span> Submit Feedback</span>
              <span className="mt-1">
                <Oval
                  visible={visible}
                  height="20"
                  width="20"
                  color="#0071DC"
                  secondaryColor="#E6F1FC"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </span>
            </button>
          </form>
        </div>
      </div>

      <Footer />

      <ToastContainer
        position="top-right"
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
  );
};

export default Contact;
