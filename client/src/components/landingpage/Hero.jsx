import React, { useState } from "react";
import { Utensils } from "lucide-react";
import BrowseRestaurants from "./BrowseRestaurants";
import logo from "../../assets/logo.svg";

function App() {
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");

  return (
    <div className="relative h-full">
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
            <div className="flex  justify-center ">
              <div className="h-28 md:h-44 p-3 rounded-lg">
                <img src={logo} alt="Logo" className="h-full"/>
              </div>
            </div>
            <p className="text-white text-2xl md:text-4xl font-medium">
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
