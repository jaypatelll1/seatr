import React from "react";
import { MapPin, Clock } from "lucide-react";
import tablelayout from "../assets/layout.png";

const TableDetails = () => {
  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Title Section */}
      <h1 className="text-2xl font-bold mb-2">Milagro</h1>

      {/* Location Section */}
      <div className="flex items-center text-gray-600 mb-4">
        <MapPin className="w-5 h-5 text-orange-500 mr-2" />
        <p>kazi Deiry, Taiger Pass, Chittagong</p>
      </div>

      {/* Time Section */}
      <div className="flex items-center text-gray-600 mb-6">
        <Clock className="w-5 h-5 text-orange-500 mr-2" />
        <p>10:00 AM - 12:00 PM</p>
      </div>

      {/* Image Section */}
      <div className="w-full">
        <img
          src={tablelayout}
          alt="Table Layout"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default TableDetails;
