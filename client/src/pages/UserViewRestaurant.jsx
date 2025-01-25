import React, { useEffect, useState } from "react";
import GoogleMapComponent from "../components/GoogleMapComponent";
import Navbar from "../components/Navbar";
import axios from "axios";

function UserViewRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [isCuisineDropdownOpen, setIsCuisineDropdownOpen] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(10); // Distance in kilometers

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://vision-n5ju.onrender.com/api/restaurants");
        setRestaurants(response.data);
        setFilteredRestaurants(response.data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };

    fetchData();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching user location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    if (cuisineFilter.length > 0) {
      filtered = filtered.filter((restaurant) =>
        cuisineFilter.some((filter) =>
          restaurant.cuisine.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    if (ratingFilter.length > 0) {
      filtered = filtered.filter((restaurant) =>
        ratingFilter.includes(String(parseInt(restaurant.rating)))
      );
    }

    if (userLocation) {
      filtered = filtered.filter((restaurant) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.latitude,
          restaurant.longitude
        );
        return distance <= distanceFilter;
      });
    }

    setFilteredRestaurants(filtered);
  }, [cuisineFilter, ratingFilter, distanceFilter, restaurants, userLocation]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  };

  const toggleFilter = (filterType, value) => {
    const setFilter =
      filterType === "cuisine"
        ? setCuisineFilter
        : setRatingFilter;

    const currentFilter =
      filterType === "cuisine"
        ? cuisineFilter
        : ratingFilter;

    if (currentFilter.includes(value)) {
      setFilter(currentFilter.filter((filter) => filter !== value));
    } else {
      setFilter([...currentFilter, value]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-grow flex-col md:flex-row">
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
                    <label
                      key={cuisine}
                      className="flex items-center px-3 py-2"
                    >
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
                    <label
                      key={rating}
                      className="flex items-center px-3 py-2"
                    >
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

            {/* Location Filter */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="px-4 py-2 bg-gray-100 rounded-md"
              >
                Location
              </button>
              {isLocationDropdownOpen && (
                <div className="absolute mt-1 bg-white border rounded-md shadow-md w-64 p-3">
                  <label htmlFor="distance" className="block text-gray-700 mb-2">
                    Distance: {distanceFilter} km
                  </label>
                  <input
                    id="distance"
                    type="range"
                    min="1"
                    max="50"
                    value={distanceFilter}
                    onChange={(e) => setDistanceFilter(parseInt(e.target.value))}
                    className="w-full"
                  />
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
          <GoogleMapComponent
            restaurants={filteredRestaurants}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default UserViewRestaurant;