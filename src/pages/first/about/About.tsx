import React from 'react'
import Navbar from '../../../components/Navbars/Navbar'
import Footer from '../../../components/footer/Footer'

const About = () => {
  return (
    <div>
        <Navbar />
        <div className=" flex flex-col justify-center items-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
          <div className="space-y-4 text-gray-700">
            <p className="text-2xl ">
        
            Welcome to Mmartplus, an online grocery store operated by Mmartplus Inc. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.
            </p>
    
          </div>
        </div>
      </div>

        <Footer />
    </div>
  )
}

export default About