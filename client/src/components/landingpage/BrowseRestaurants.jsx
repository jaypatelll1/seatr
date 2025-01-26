import React, { useState, useEffect } from "react";
import axios from "axios";
import { Utensils, MapPin, Search, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import{setRestaurant} from "../../redux/restaurantSlice"

function BrowseRestaurants({ location, setLocation, cuisine, setCuisine }) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

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

  const handleSearch = async () => {
    if (location.length === 0 && cuisine.length === 0) {
      alert("Please select at least one location or cuisine");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/restaurants", {
        params: {
          location: location.join(","),
          cuisine: cuisine.join(","),
        },
      });
      dispatch(setRestaurant(response.data)); // Assuming the API returns a list of restaurants
    } catch (err) {
      setError("An error occurred while fetching restaurants.");
      console.error(err);
    } finally {
      setLoading(false);
      navigate("/viewrestaurant")
    }
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
        <button
          className="bg-white hover:bg-orange-200 px-8 py-3 text-gray-500 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5" />
          <span>Find Restaurants</span>
        </button>
      </div>

      {/* Display Results */}
      {loading && <p className="text-center text-white mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {restaurants.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">Restaurants</h3>
          <ul className="mt-2">
            {restaurants.map((restaurant) => (
              <li key={restaurant.id} className="text-white">
                {restaurant.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [location, setLocation] = useState([]); // Initialize location as an array
  const [cuisine, setCuisine] = useState([]); // Initialize cuisine as an array

  return (
    <div className="flex flex-col items-center justify-center relative">
      <BrowseRestaurants
        location={location}
        setLocation={setLocation}
        cuisine={cuisine}
        setCuisine={setCuisine}
      />
    </div>
  );
}
