import React from "react";
import GoogleMapComponent from "../components/GoogleMapComponent";
import Navbar from "../components/Navbar";

function UserViewRestaurant() {
  const restaurants = [
    {
      id: 1,
      name: "Ambrosia Hotel",
      address: "Kazi Deiry, Taiger Pass, Chittagong",
      cuisine: "Continental",
      latitude: 22.3569,
      longitude: 91.7832,
      image: "https://via.placeholder.com/100?text=Ambrosia",
    },
    {
      id: 2,
      name: "Tava Restaurant",
      address: "Zakir Hossain Rd, Chittagong",
      cuisine: "Indian",
      latitude: 22.3598,
      longitude: 91.7847,
      image: "https://via.placeholder.com/100?text=Tava",
    },
    {
      id: 3,
      name: "Haathkhola",
      address: "6 Surson Road, Chittagong",
      cuisine: "Bangladeshi",
      latitude: 22.3630,
      longitude: 91.7893,
      image: "https://via.placeholder.com/100?text=Haathkhola",
    },
    {
      id: 4,
      name: "Chillox",
      address: "Main Road, Chittagong",
      cuisine: "Fast Food",
      latitude: 22.3701,
      longitude: 91.7925,
      image: "https://via.placeholder.com/100?text=Chillox",
    },
    {
      id: 5,
      name: "Mezetto",
      address: "Agrabad Commercial Area, Chittagong",
      cuisine: "Mediterranean",
      latitude: 22.3724,
      longitude: 91.7956,
      image: "https://via.placeholder.com/100?text=Mezetto",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-grow">
        {/* Left Panel */}
        <div className="w-1/2 p-4 overflow-y-auto bg-gray-50">
          <h1 className="text-2xl font-semibold mb-4">Restaurant Nearby</h1>
          <div className="flex gap-2 mb-6">
            <button className="px-4 py-2 bg-orange-100 rounded-md">
              Free cancellation
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-md">Price</button>
            <button className="px-4 py-2 bg-gray-100 rounded-md">
              Instant Book
            </button>
          </div>

          {/* Restaurant List */}
          {restaurants.map((restaurant) => (
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
        <div className="w-1/2 flex height-auto justify-between items-center rounded-2xl">
          <GoogleMapComponent restaurants={restaurants} />
        </div>
      </div>
    </div>
  );
}

export default UserViewRestaurant;
