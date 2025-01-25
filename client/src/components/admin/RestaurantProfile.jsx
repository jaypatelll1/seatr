import React from "react";

function RestaurantProfile() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-[90%] md:w-[60%] mx-8 my-8">
      <h1 className="text-2xl font-semibold mb-2">Restaurant Profile</h1>
      <p className="text-gray-600 mb-6">
        Lorem ipsum dolor sit amet. At eveniet eveniet aut mollitia fuga aut
        beatae magnam
      </p>

      <h2 className="text-lg font-semibold mb-4">Basic Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="restaurant-name">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurant-name"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 p-2"
            placeholder="Enter restaurant name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="phone-number">
            Phone no.
          </label>
          <input
            type="text"
            id="phone-number"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 p-2"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 p-2"
          placeholder="Enter description"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1" htmlFor="banner">
          Banner
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <p className="text-gray-500 mb-2">
            Choose a file or drag & drop it here
          </p>
          <p className="text-sm text-gray-400 mb-4">
            JPEG, PNG, PDF, and MP4 formats, up to 50MB
          </p>
          <button className="px-4 py-2 bg-gray-100 rounded-md shadow-sm text-gray-600 hover:bg-gray-200">
            Browse File
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantProfile;
