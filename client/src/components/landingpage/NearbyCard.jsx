import React from "react";
import { Link } from "react-router-dom";

export const NearbyCard = ({ data }) => {
  if (!data) return null; 

  return (
    <Link to="#">
      <div className="border border-gray-200 rounded-xl shadow-md w-full sm:w-[90%] lg:w-auto">
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-[4/3]">
          <img
            src={data.image || "/src/assets/placeholder.jpg"} 
            alt={data.name || "Restaurant"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pl-4 text-left my-2 flex justify-between items-center">
          <div>
            <h2 className="text-xs sm:text-base font-semibold">{data.name}</h2>
            <p className="text-xs sm:text-sm text-gray-500">{data.place}</p>
          </div>
          {/* Rating Section */}
          <div className="flex items-center  bg-[#0E7F3D] mr-2 -mt-4 rounded-lg p-1">
            <span className="text-white text-xs sm:text-xs">
              {data.rating || "N/A"}
            </span>
            <span className="text-white text-xs sm:text-xs">★</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
