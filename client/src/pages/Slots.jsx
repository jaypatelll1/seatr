import React from "react";
import TimeSlot from "../components/TimeSlot";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import LiveAvailability from "../components/LiveAvailability";
import WriteReview from "../components/WriteReview";

function Slots() {
  return (
    <div className="bg-gray-100 h-full">
      <Navbar userName={"Siddhant Thakur"} email={"siddhant@gmail.com"} />
      <div className="flex flex-col md:flex-row p-5 md:p-10">
        {/* Left Section */}
        <RestaurantCard />
        
        
        {/* Right Section */}
        <div className="flex flex-col flex-1">
          <LiveAvailability />
          <TimeSlot />
          <WriteReview />
        </div>
      </div>
    </div>
  );
}

export default Slots;
