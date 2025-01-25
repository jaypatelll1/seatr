import React from 'react';

function RestaurantLocation() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-[60%] ml-12 mt-10 ">
      <h2 className="text-xl font-semibold mb-2">Restaurant Profile</h2>
      <p className="text-gray-500 mb-6">
        Lorem ipsum dolor sit amet. At eveniet eveniet aut mollitia fuga aut beatae magnam
      </p>
      
      <h3 className="text-lg font-medium mb-4">Location</h3>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter address"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
            Pin code
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter pin code"
          />
        </div>
        <div>
          <label htmlFor="seating" className="block text-sm font-medium text-gray-700 mb-1">
            Total seating's
          </label>
          <input
            type="text"
            id="seating"
            name="seating"
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter total seating capacity"
          />
        </div>
      </div>
    </div>
  );
}

export default RestaurantLocation;
