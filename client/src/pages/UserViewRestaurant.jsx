import React , {useEffect, useState}from "react";
import GoogleMapComponent from "../components/GoogleMapComponent";
import Navbar from "../components/Navbar";
import axios from "axios"

function UserViewRestaurant() {
  const [restaurants,setRestaurant]= useState([])

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("/api/restaurants")
        // console.log("response",response)
        setRestaurant(response.data)
      } catch (error) {
        console.error("error"+error)
      }
    }
    fetchdata()
   
   
  }, [])
  
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
