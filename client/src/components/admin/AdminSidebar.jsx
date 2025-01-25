import React, { useState } from "react";
import RestaurantProfile from "./RestaurantProfile"; // Import your components
import RestaurantLocation from "./RestaurantLocation";
import RestaurantLayout from "./RestaurantLayout";

function AdminSidebar() {
  const [activeComponent, setActiveComponent] = useState("basicDetails");

  // Function to render the active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "basicDetails":
        return <RestaurantProfile />;
      case "locationDetails":
        return <RestaurantLocation />;
      case "other":
        return <RestaurantLayout />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-80 h-[82vh] bg-white shadow-md p-6 rounded-lg mt-10 ml-32">
        <h2 className="text-lg font-semibold mb-6">Add restaurant</h2>
        <div className="flex flex-col">
          <button
            className={`text-left py-2 px-3 mb-2 rounded-md text-black hover:bg-gray-200 ${
              activeComponent === "basicDetails" ? "bg-orange-100" : ""
            }`}
            onClick={() => setActiveComponent("basicDetails")}
          >
            Basic Details
          </button>
          <button
            className={`text-left py-2 px-3 mb-2 rounded-md text-black hover:bg-gray-200 ${
              activeComponent === "locationDetails" ? "bg-orange-100" : ""
            }`}
            onClick={() => setActiveComponent("locationDetails")}
          >
            Location &amp; Details
          </button>
          <button
            className={`text-left py-2 px-3 mb-2 rounded-md text-black hover:bg-gray-200 ${
              activeComponent === "other" ? "bg-orange-100" : ""
            }`}
            onClick={() => setActiveComponent("other")}
          >
            Other
          </button>
        </div>
      </div>

      {/* Render the selected component */}
      <div className=" p-6">
        {renderActiveComponent()}
      </div>
    </div>
  );
}

export default AdminSidebar;
