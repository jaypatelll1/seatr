import React from "react";
import logo from "../../assets/logo.svg"; // Adjust the path if needed

function AdminNavbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-white p-2 shadow-md">
      <div className="flex items-center ">
        <img src={logo} alt="Logo" className=" h-12" />
      </div>
    </nav>
  );
}

export default AdminNavbar;
