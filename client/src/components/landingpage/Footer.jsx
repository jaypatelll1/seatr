import React from 'react';
import { Utensils } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-orange-400">
                <Utensils className="w-8 h-8" />
              </div>
              <span className="text-orange-400 text-2xl font-bold">SEATR</span>
            </div>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet. At eveniet eveniet aut mollitia fuga aut beatae magnam eos ipsa veritatis. Ad ipsa expedita et mollitia illo et dolor inventore quo expedita vol
            </p>
          </div>

          {/* Restaurants Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Restaurants</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Nearby</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Trending</a></li>
            </ul>
          </div>

          {/* Profile Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Profile</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Login</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">History</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Saved Restuarents</a></li>
            </ul>
          </div>

          {/* Have Questions? */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Have Questions?</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Contact us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Utensils Pattern */}
      {/* <div className="mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-2 pt-8">
            {[...Array(19)].map((_, index) => (
              <React.Fragment key={index}>
                <Utensils className="w-4 h-4 text-gray-700" />
                {index % 2 === 0 && index < 18 && (
                  <div className="w-1 h-4 bg-gray-700 rounded-full" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div> */}
    </footer>
  );
}

export default Footer;