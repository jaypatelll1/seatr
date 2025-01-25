import React, { useState } from "react";
import { Utensils } from "lucide-react";
import BrowseRestaurants from "./BrowseRestaurants";
import logo from "../../assets/logo.svg";

function App() {
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");

  return (
    <div className="relative min-h-screen">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Half with Logo and Title */}
        <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-0">
          {/* Logo and Title */}
          <div className="text-center mb-0">
            <div className="flex items-center justify-center mb-4">
              <div className=" h-24  md:h-40 p-3  rounded-lg">
                <img src={logo} alt="Logo" />
              </div>
            </div>
            <p className="text-white text-xl md:text-2xl">
              Browse and search for nearby restaurants.
            </p>
          </div>
        </div>

        {/* BrowseRestaurants positioned on the white background */}
        <div className="relative z-20 -mb-20 flex justify-center">
          <div className="p-6 rounded-lg w-full max-w-4xl">
            <BrowseRestaurants
              location={location}
              setLocation={setLocation}
              cuisine={cuisine}
              setCuisine={setCuisine}
            />
          </div>
        </div>

        {/* Bottom Half */}
        <div className="flex-grow bg-white pt-20 z-10">
          {/* Additional content can go here if needed */}
        </div>
      </div>
    </div>
  );
}

export default App;
