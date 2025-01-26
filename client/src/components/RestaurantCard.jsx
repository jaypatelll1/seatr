import React from "react";
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";

const restaurants = [
  {
    name: "Marine Drive",
    image: "/src/assets/tava.svg",
    address: "Mumbai",
    menu: "Check Menu",
    description:
      "Villagio restaurant and bar has one mission: Villagio restaurant and bar has one mission. Featuring seasonal and to provide guests with a fine and fresh Featuring seasonal...",
    openStatus: "Open today",
    timing: "10:00 AM - 12:00 PM",
    subName: "Villagio Restaurant & Bar",
  },
];

const RestaurantCard = () => {
  return (
    <div className="flex flex-col items-center h-[100%]">
      {restaurants.map((restaurant, index) => (
        <div
          key={index}
          className="w-full md:w-10/12 h-[70%] rounded-2xl shadow-lg  mb-4 overflow-hidden mt-5 md:mt-12 p-5 bg-white"
        >
          <div className="relative">
            <button className="absolute top-4 right-4 bg-orange-500 text-white px-2 md:px-4 md:py-3 rounded-lg shadow-md hover:bg-orange-600">
              {restaurant.menu}
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-600 mr-2" />{" "}
              {restaurant.name}
            </h2>

            <p className="text-sm text-gray-600 ml-7">{restaurant.address}</p>
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-60 object-cover rounded-lg mt-5"
            />
            <div className="mt-4">
              <h3 className="text-orange-500 text-lg font-semibold">
                {restaurant.subName}
              </h3>
              <div className="flex items-center text-green-600 mt-2">
                <FaCheckCircle className="w-5 h-5 mr-2" />
                {restaurant.openStatus}
              </div>
              <p className="text-gray-700 mt-2 flex items-center">
                <FaClock className="w-5 h-5 text-gray-600 mr-2" />{" "}
                {restaurant.timing}
              </p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {restaurant.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCard;
