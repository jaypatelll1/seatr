import React from "react";

const LiveAvailability = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg max-w-lg mt-5 md:mt-12">
      <h2 className="text-gray-700 text-lg font-medium mb-4">Live Availability</h2>
      <button className="bg-orange-500 text-white text-2xl font-bold py-3 px-6 rounded-lg hover:bg-green-600">
        20 Tables
      </button>
    </div>
  );
};

export default LiveAvailability;
