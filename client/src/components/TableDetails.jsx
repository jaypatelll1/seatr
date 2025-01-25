import React from "react";
import tablelayout from "../assets/tablelayout.png";

const TableDetails = ({ selectedTable }) => {
  return (
    <div className="w-auto p-8">
      {selectedTable ? (
        <>
          <h2 className="text-2xl font-semibold">{selectedTable.name}</h2>
          <p className="text-gray-600 mb-4">
            <span role="img" aria-label="location">📍</span> {selectedTable.location || "Kazi Deiry, Taiger Pass, Chittagong"}
          </p>
          <p className="text-gray-600 mb-8">
            <span role="img" aria-label="clock">⏰</span> {selectedTable.time}
          </p>
          <img
            src={tablelayout}
            alt="Table Layout"
            className="w-auto rounded-lg shadow-lg"
          />
        </>
      ) : (
        <p className="text-gray-500">Please select a table to view details.</p>
      )}
    </div>
  );
};

export default TableDetails;
