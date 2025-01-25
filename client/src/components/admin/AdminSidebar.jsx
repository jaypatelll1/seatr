import React from 'react';

function AdminSidebar() {
  return (
    <div className="w-72 h-[80%] bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-6">Add restaurant</h2>
      <div className="flex flex-col">
        <button className="text-left py-2 px-3 mb-2 rounded-md text-black hover:bg-gray-200">Basic Details</button>
        <button className="text-left py-2 px-3 mb-2 rounded-md bg-orange-100 text-black hover:bg-orange-200">Location &amp; details</button>
        <button className="text-left py-2 px-3 mb-2 rounded-md text-black hover:bg-gray-200">Other</button>
      </div>
    </div>
  );
}

export default AdminSidebar;
