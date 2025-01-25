import React from 'react';
import { Utensils, MapPin, Search } from 'lucide-react';

function BrowseRestaurants({ location, setLocation, cuisine, setCuisine }) {
  return (
    <div className="w-full max-w-3xl bg-[#F49B33] backdrop-blur-sm p-6 rounded-lg shadow-xl ml-0 sm:ml-10">
      <h2 className="text-xl font-semibold text-white mb-4">
        Browse Restaurants in Mumbai
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Location Input */}
        <div className="flex-1">
          <div className="relative bg-white rounded-lg">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="All Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-black rounded-lg focus:border-white-500 outline-none"
            />
          </div>
        </div>

        {/* Cuisine Input */}
        <div className="flex-1">
          <div className="relative bg-white rounded-lg">
            <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-black rounded-lg focus:border-white-500 outline-none"
            />
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-white border border-black hover:bg-orange-200 text-black px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <Search className="w-5 h-5" />
          <span>Find Restaurants</span>
        </button>
      </div>
    </div>
  );
}

export default BrowseRestaurants;