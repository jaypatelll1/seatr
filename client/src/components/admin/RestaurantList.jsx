import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  // Dummy data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Slice of Food",
      image: "https://via.placeholder.com/50",
      time: "10:00 AM - 10:00 PM",
      location: "Mumbai",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Grill Delight",
      image: "https://via.placeholder.com/50",
      time: "11:00 AM - 11:00 PM",
      location: "Mumbai",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Kebab Corner",
      image: "https://via.placeholder.com/50",
      time: "9:00 AM - 9:00 PM",
      location: "Mumbai",
      rating: 4.2,
    },
    {
      id: 4,
      name: "Spicy Bites",
      image: "https://via.placeholder.com/50",
      time: "12:00 PM - 12:00 AM",
      location: "Mumbai",
      rating: 4.8,
    },
    {
      id: 5,
      name: "Sushi World",
      image: "https://via.placeholder.com/50",
      time: "10:00 AM - 11:00 PM",
      location: "Mumbai",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Pasta Paradise",
      image: "https://via.placeholder.com/50",
      time: "8:00 AM - 8:00 PM",
      location: "Mumbai",
      rating: 4.3,
    },
    {
      id: 7,
      name: "Taco Fiesta",
      image: "https://via.placeholder.com/50",
      time: "1:00 PM - 12:00 AM",
      location: "Mumbai",
      rating: 4.1,
    },
    {
      id: 8,
      name: "Burger Bliss",
      image: "https://via.placeholder.com/50",
      time: "10:00 AM - 10:00 PM",
      location: "Mumbai",
      rating: 4.4,
    },
    {
      id: 9,
      name: "Waffle Wonders",
      image: "https://via.placeholder.com/50",
      time: "9:00 AM - 9:00 PM",
      location: "Mumbai",
      rating: 4.9,
    },
    {
      id: 10,
      name: "Pizza Perfection",
      image: "https://via.placeholder.com/50",
      time: "11:00 AM - 11:00 PM",
      location: "Mumbai",
      rating: 4.6,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          onClick={() => navigate("/profile")} // Navigate to the profile page
        >
          Add New Restaurant
        </button>
      </header>

      {/* Restaurants Table */}
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-4">Restaurant</th>
              <th className="p-4">Operating Hours</th>
              <th className="p-4">Location</th>
              <th className="p-4">Rating</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-4">
                  
                  <span>{restaurant.name}</span>
                </td>
                <td className="p-4">{restaurant.time}</td>
                <td className="p-4">{restaurant.location}</td>
                <td className="p-4">{restaurant.rating} ⭐</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
