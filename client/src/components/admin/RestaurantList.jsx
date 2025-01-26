
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  // Dummy data for restaurants

  const [restaurant, setRestaurant] = useState([])
  
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/restaurants")
        console.log("response", response)
        setRestaurant(response.data)
      } catch (error) {
        console.error("error in " + error)
      }


    }
    fetchData()

  }, [])

  // Helper function to format time
  const formatTime = (time) => {
    console.log(time)
    if (!time) return "N/A"; // Handle null or undefined time
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const generateRandomRating = () => {
    // Generate a random number between 1 and 5 with one decimal place
    return (Math.random() * (5 - 1) + 1).toFixed(1);
  };
  

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
            {restaurant.map((restaurant) => (
              <tr
                key={restaurant.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-4">

                  <span>{restaurant.name}</span>
                </td>
                <td className="p-4">{`${formatTime(restaurant.opening_time
                )} - ${formatTime(
                  restaurant.closing_time
                )}`}</td>
                <td className="p-4">{restaurant.location}</td>
                <td className="p-4">{generateRandomRating()} ⭐</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
