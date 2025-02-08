import React from "react";
import Navbar from "../../../components/Navbars/Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import FlashSales from "./FlashSales";
import Footer from "../../../components/footer/Footer";
// import NewArrival from "./NewArrival";
import Latest from "./Latest";
import NewArrival from "./NewArrival";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <FlashSales />
      <Latest />
      <NewArrival />
      <Footer />
    </div>
  );
};

export default Home;
