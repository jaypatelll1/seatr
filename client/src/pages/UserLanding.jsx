import React from "react";
import Navbar from "../components/Navbar";
import NearbySlider from "../components/landingpage/NearbySlider";
import TrendingSlider from "../components/landingpage/TrendingSlider";
import Hero from "../components/landingpage/Hero";
import Footer from "../components/landingpage/Footer";
import { Offers } from "../components/landingpage/Offers";

function UserLanding() {
  return (
    <div>
       <Navbar userName="Siddhant Thakur" email="siddhant@gmail.com" /> 
      <Hero />
      <NearbySlider />
      <Offers />
      <TrendingSlider />
      <Footer />
    </div>
  );
}

export default UserLanding;
