import React, { useState } from "react";
import TableList from "../components/TableList";
import TableDetails from "../components/TableDetails";
const TableBooking = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  const tables = [
    { id: 1, name: "Table 1", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM" },
    { id: 2, name: "Table 2", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM" },
    { id: 3, name: "Table 3", seating: 6, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM" },
    { id: 4, name: "Table 4", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM" },
    { id: 5, name: "Table 5", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM" },
    { id: 6, name: "Table 6", seating: 4, image: "https://via.placeholder.com/100", time: "10:00 AM - 12:00 PM" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <TableList tables={tables} onTableSelect={setSelectedTable} />
      <div className="w-1/2">
      <TableDetails selectedTable={selectedTable} />
      </div>
    </div>
  );
};

export default TableBooking;
