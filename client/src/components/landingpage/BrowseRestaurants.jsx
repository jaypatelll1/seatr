import React, { useState } from "react";
import { Utensils, MapPin, Search, ChevronDown } from "lucide-react";

function BrowseRestaurants({ location, setLocation, cuisine, setCuisine }) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);

  const locations = ["Mumbai", "Pune", "Delhi"];
  const cuisines = ["Indian", "Chinese", "Italian", "Mexican", "Thai"];

  // Toggle selections for location
  const toggleLocation = (loc) => {
    const updatedLocation = location.includes(loc)
      ? location.filter((item) => item !== loc)
      : [...location, loc];
    setLocation(updatedLocation);
  };

  // Toggle selections for cuisine
  const toggleCuisine = (cui) => {
    const updatedCuisine = cuisine.includes(cui)
      ? cuisine.filter((item) => item !== cui)
      : [...cuisine, cui];
    setCuisine(updatedCuisine);
  };

  return (
    <div className="w-full max-w-3xl bg-[#F49B33] backdrop-blur-sm p-6 rounded-lg shadow-xl relative z-30">
      <h2 className="text-xl font-semibold text-white mb-4">
        Browse Restaurants in Selected Locations
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Location Dropdown */}
        <div className="relative flex-1">
          <div
            className="relative bg-white rounded-lg cursor-pointer"
            onClick={() => {
              setShowLocationDropdown(!showLocationDropdown);
              setShowCuisineDropdown(false); // Close other dropdown
            }}
          >
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              readOnly
              placeholder="All Location"
              value={location.length > 0 ? location.join(", ") : "All Location"}
              className="w-full pl-10 pr-4 py-3 rounded-lg cursor-pointer outline-none"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
          </div>

          {showLocationDropdown && (
            <div
              className="absolute z-50 bg-white mt-1 p-3 shadow-md rounded-lg w-full"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {locations.map((loc) => (
                <label key={loc} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={location.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                  />
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Cuisine Dropdown */}
        <div className="relative flex-1">
          <div
            className="relative bg-white rounded-lg cursor-pointer"
            onClick={() => {
              setShowCuisineDropdown(!showCuisineDropdown);
              setShowLocationDropdown(false); // Close other dropdown
            }}
          >
            <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              readOnly
              placeholder="Cuisine"
              value={cuisine.length > 0 ? cuisine.join(", ") : "Cuisine"}
              className="w-full pl-10 pr-4 py-3 rounded-lg cursor-pointer outline-none"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
          </div>

          {showCuisineDropdown && (
            <div
              className="absolute z-50 bg-white mt-1 p-3 shadow-md rounded-lg w-full"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {cuisines.map((cui) => (
                <label key={cui} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={cuisine.includes(cui)}
                    onChange={() => toggleCuisine(cui)}
                  />
                  <span>{cui}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="bg-white hover:bg-orange-200 px-8 py-3 text-gray-500 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <Search className="w-5 h-5" />
          <span>Find Restaurants</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [location, setLocation] = useState([]); // Initialize location as an array
  const [cuisine, setCuisine] = useState([]); // Initialize cuisine as an array

  return (
    <div className="flex flex-col items-center justify-center  relative">
      {/* Ensure z-index for dropdown visibility */}
      <div className="absolute  z-10"></div>

      <BrowseRestaurants
        location={location}
        setLocation={setLocation}
        cuisine={cuisine}
        setCuisine={setCuisine}
      />
    </div>
  );
}
