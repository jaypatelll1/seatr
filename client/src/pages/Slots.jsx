import React from "react";
import TimeSlot from "../components/TimeSlot";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";

function Slots() {
  return (
    <div className="bg-gray-100 h-screen">
      <Navbar userName={"Siddhant Thakur"} email={"siddhant@gmail.com"}/>
      <div className="flex flex-col md:flex-row ">
        <RestaurantCard />
        <TimeSlot />
      </div>
    </div>
  );
}

export default Slots;
