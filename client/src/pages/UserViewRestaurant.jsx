import React, { useEffect, useState } from "react";
import GoogleMapComponent from "../components/GoogleMapComponent";
import Navbar from "../components/Navbar";
import axios from "axios";

function UserViewRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [isCuisineDropdownOpen, setIsCuisineDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("/api/restaurants");
        setRestaurants(response.data);
        setFilteredRestaurants(response.data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchdata();
  }, []);

  // Filter restaurants based on selected filters
  useEffect(() => {
    let filtered = restaurants;

    if (cuisineFilter.length > 0) {
      filtered = filtered.filter((restaurant) =>
        cuisineFilter.some((filter) =>
          restaurant.cuisine.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    if (locationFilter.length > 0) {
      filtered = filtered.filter((restaurant) =>
        locationFilter.some((filter) =>
          restaurant.location.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    if (ratingFilter.length > 0) {
      filtered = filtered.filter((restaurant) =>
        ratingFilter.includes(String(parseInt(restaurant.rating)))
      );
    }

    setFilteredRestaurants(filtered);
  }, [cuisineFilter, locationFilter, ratingFilter, restaurants]);

  const toggleFilter = (filterType, value) => {
    const setFilter =
      filterType === "cuisine"
        ? setCuisineFilter
        : filterType === "location"
        ? setLocationFilter
        : setRatingFilter;

    const currentFilter =
      filterType === "cuisine"
        ? cuisineFilter
        : filterType === "location"
        ? locationFilter
        : ratingFilter;

    if (currentFilter.includes(value)) {
      setFilter(currentFilter.filter((filter) => filter !== value));
    } else {
      setFilter([...currentFilter, value]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-grow flex-col md:flex-row ">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-4 overflow-y-auto bg-gray-50">
          <h1 className="text-2xl font-semibold mb-4">Restaurants Nearby</h1>
          <div className="flex gap-2 mb-6">
            {/* Cuisine Filter */}
            <div className="relative">
              <button
                onClick={() => setIsCuisineDropdownOpen(!isCuisineDropdownOpen)}
                className="px-4 py-2 bg-gray-100 rounded-md"
              >
                Cuisine
              </button>
              {isCuisineDropdownOpen && (
                <div className="absolute mt-1 bg-white border rounded-md shadow-md w-48">
                  {[
                    "Indian",
                    "Chinese",
                    "Italian",
                    "Mexican",
                  ].map((cuisine) => (
                    <label key={cuisine} className="flex items-center px-3 py-2">
                      <input
                        type="checkbox"
                        checked={cuisineFilter.includes(cuisine.toLowerCase())}
                        onChange={() =>
                          toggleFilter("cuisine", cuisine.toLowerCase())
                        }
                        className="mr-2"
                      />
                      {cuisine}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Location Filter */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="px-4 py-2 bg-gray-100 rounded-md"
              >
                Location
              </button>
              {isLocationDropdownOpen && (
                <div className="absolute mt-1 bg-white border rounded-md shadow-md w-48">
                  {["Pune", "Delhi", "Mumbai"].map((location) => (
                    <label key={location} className="flex items-center px-3 py-2">
                      <input
                        type="checkbox"
                        checked={locationFilter.includes(location.toLowerCase())}
                        onChange={() =>
                          toggleFilter("location", location.toLowerCase())
                        }
                        className="mr-2"
                      />
                      {location}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <button
                onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                className="px-4 py-2 bg-gray-100 rounded-md"
              >
                Rating
              </button>
              {isRatingDropdownOpen && (
                <div className="absolute mt-1 bg-white border rounded-md shadow-md w-48">
                  {["3", "4", "5"].map((rating) => (
                    <label key={rating} className="flex items-center px-3 py-2">
                      <input
                        type="checkbox"
                        checked={ratingFilter.includes(rating)}
                        onChange={() => toggleFilter("rating", rating)}
                        className="mr-2"
                      />
                      {rating} Star
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Restaurant List */}
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="flex items-center mb-4 p-4 bg-white rounded-lg shadow"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-16 h-16 rounded-md object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                <p className="text-gray-600">{restaurant.address}</p>
                <p className="text-gray-500">{restaurant.cuisine}</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-orange-400 text-white rounded-md">
                Check
              </button>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex height-auto justify-between items-center rounded-2xl">
          <GoogleMapComponent restaurants={filteredRestaurants} />
        </div>
      </div>
    </div>
  );
}

export default UserViewRestaurant;
