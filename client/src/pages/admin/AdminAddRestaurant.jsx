import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RestaurantProfile from "../../components/admin/RestaurantProfile";
import AdminNavbar from "../../components/admin/AdminNavbar";
import RestaurantLocation from "../../components/admin/RestaurantLocation";

function AdminAddRestaurant() {
  return (
    <div className="bg-gray-100 h-screen">
      <AdminNavbar />
      <div className="flex ">
        <AdminSidebar />
        {/* <RestaurantProfile /> */}
        <RestaurantLocation />
      </div>
    </div>
  );
}

export default AdminAddRestaurant;
