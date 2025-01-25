import React from "react";
import { Link } from "react-router-dom";

export const TrendingCard = ({ data }) => {
  if (!data) return null; // Handle undefined data gracefully

  return (
    <Link to="#">
      <div className="border border-gray-200 rounded-xl shadow-md w-full sm:w-[90%] lg:w-auto">
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-[4/3]">
          <img
            src={data.image || "/src/assets/placeholder.jpg"} // Placeholder if image not provided
            alt={data.name || "Restaurant"}
            className="w-full h-full object-cover"
          />
          {/* Gradient behind the name and place */}
          <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black via-black to-transparent"></div>
        </div>
        <div className="absolute bottom-0 w-full px-4 py-4 text-white">
          <h2 className="text-sm sm:text-base font-semibold">{data.name}</h2>
          <p className="text-xs sm:text-xs text-gray-300">{data.place}</p>
        </div>
      </div>
    </Link>
  );
};