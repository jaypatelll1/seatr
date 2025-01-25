import React from 'react';

function AdminSidebar() {
  return (
    <div className="w-80 h-[80vh] bg-white shadow-md p-6 rounded-lg mt-10 ml-32">
      <h2 className="text-lg font-semibold mb-6">Add restaurant</h2>
      <div className="flex flex-col">
        <button className="text-left py-2 px-3 mb-2 rounded-md text-black hover:bg-gray-200 focus:bg-orange-100 focus:outline-none">Basic Details</button>
        <button className="text-left py-2 px-3 mb-2 rounded-md text-black hover:bg-gray-200 focus:bg-orange-100 focus:outline-none">Location &amp; details</button>
        <button className="text-left py-2 px-3 mb-2 rounded-md text-black hover:bg-gray-200 focus:bg-orange-100 focus:outline-none">Other</button>
      </div>
    </div>
  );
}

export default AdminSidebar;