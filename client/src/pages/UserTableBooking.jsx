import React, { useState, useMemo } from "react";
import TableList from "../components/TableList";
import TableDetails from "../components/TableDetails";
import Navbar from "../components/Navbar";

const TableBooking = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [userCount, setUserCount] = useState(0);

  // Dummy Data
  const tables = [
    { id: 1, name: "Table 1", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 2, name: "Table 2", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 3, name: "Table 3", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 4, name: "Table 4", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 5, name: "Table 5", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 6, name: "Table 6", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 7, name: "Table 7", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 8, name: "Table 8", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 9, name: "Table 9", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 10, name: "Table 10", seating: 2, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 11, name: "Table 11", seating: 8, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 12, name: "Table 12", seating: 2, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    { id: 13, name: "Table 13", seating: 2, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM", joinable: false },
    {
      id: 14,
      name: "Joinable Table (Table 1 + Table 2)",
      seating: 8,
      image: "https://via.placeholder.com/100",
      time: "10:00 AM - 12:00 PM",
      joinable: true,
      tables: [
        { id: 1, name: "Table 1", seating: 4 },
        { id: 2, name: "Table 2", seating: 4 },
      ],
    },
    {
      id: 15,
      name: "Joinable Table (Table 2 + Table 3)",
      seating: 8,
      image: "https://via.placeholder.com/100",
      time: "10:00 AM - 12:00 PM",
      joinable: true,
      tables: [
        { id: 2, name: "Table 2", seating: 4 },
        { id: 3, name: "Table 3", seating: 4 },
      ],
    },
    {
      id: 16,
      name: "Joinable Table (Table 4 + Table 5)",
      seating: 8,
      image: "https://via.placeholder.com/100",
      time: "10:00 AM - 12:00 PM",
      joinable: true,
      tables: [
        { id: 4, name: "Table 4", seating: 4 },
        { id: 5, name: "Table 5", seating: 4 },
      ],
    },
    {
      id: 17,
      name: "Joinable Table (Table 5 + Table 6)",
      seating: 8,
      image: "https://via.placeholder.com/100",
      time: "10:00 AM - 12:00 PM",
      joinable: true,
      tables: [
        { id: 5, name: "Table 5", seating: 4 },
        { id: 6, name: "Table 6", seating: 4 },
      ],
    },
    {
      id: 18,
      name: "Joinable Table (Table 7 + Table 8)",
      seating: 8,
      image: "https://via.placeholder.com/100",
      time: "10:00 AM - 12:00 PM",
      joinable: true,
      tables: [
        { id: 7, name: "Table 7", seating: 4 },
        { id: 8, name: "Table 8", seating: 4 },
      ],
    },
    {
      id: 19,
      name: "Joinable Table (Table 8 + Table 9)",
      seating: 8,
      image: "https://via.placeholder.com/100",
      time: "10:00 AM - 12:00 PM",
      joinable: true,
      tables: [
        { id: 8, name: "Table 8", seating: 4 },
        { id: 9, name: "Table 9", seating: 4 },
      ],
    },
  ];

  // Memoized filtering of tables
  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      // If table is not joinable, check if it can accommodate user count
      if (!table.joinable) {
        return table.seating >= userCount;
      }
      
      // For joinable tables, check if total seating meets user count
      return table.seating >= userCount;
    });
  }, [tables, userCount]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        {/* User Count Input */}
        <div className="flex items-center my-6">
          <label className="mr-4 text-lg font-semibold">Number of Users:</label>
          <input
            type="number"
            min="0"
            value={userCount}
            onChange={(e) => setUserCount(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter user count"
          />
        </div>

        {/* Table List and Details */}
        <div className="flex w-full max-w-6xl">
          <div className="w-1/2 pr-4">
            <TableList 
              tables={filteredTables} 
              onTableSelect={setSelectedTable} 
            />
          </div>
          <div className="w-1/2 pl-4">
            <TableDetails table={selectedTable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;