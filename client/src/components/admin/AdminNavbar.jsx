import React from "react";
import logo from "../../assets/logo.svg"; // Adjust the path if needed

function AdminNavbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="text-orange-500 font-bold text-lg">SEATR</span>
      </div>
    </nav>
  );
}

export default AdminNavbar;
