import React from "react";
import { useNavigate } from "react-router-dom";

export function Offers() {
  const navigate = useNavigate();
  const handleSellTickets = () => {
    navigate("/sell/search");
  };

  return (
    <div className="flex items-center justify-center py-4 sm:py-6">
      <div className="relative flex flex-col items-center justify-center w-full max-w-screen-xl">
        <div
          className="relative w-[90vw] max-w-7xl mx-auto bg-cover bg-center rounded-3xl flex items-center"
          style={{
            backgroundImage: `url('/src/assets/butter-chicken-traditionally-known-as-murgh-makhani-is-indian-dish 1.png')`,
            minHeight: "19vh",
            height: "auto",
          }}
        >
          {/* Content */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 px-2 sm:px-6 py-6">
            {/* Left section with text */}
            <div className="text-left sm:text-left mb-4 sm:mb-0 text-white relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent opacity-70 z-0"></div>
              <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold relative z-10">
                Get up to{" "}
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl">
                  50% off
                </span>
                <br />
                on your dining bills from Seatr
              </h2>
              <button
                onClick={handleSellTickets}
                className="mt-4 w-auto sm:w-auto flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg bg-orange-400 rounded-lg text-white hover:scale-105 transform transition-transform duration-200 relative z-10"
              >
                Browse Restaurants
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
