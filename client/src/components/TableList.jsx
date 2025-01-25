import React from "react";

const TableList = ({ tables, onTableSelect }) => {
  return (
    <div className="w-1/3 p-4 ml-5 bg-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
      <div className="space-y-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer"
            onClick={() => onTableSelect(table)}
          >
            <img
              src={table.image}
              alt={table.name}
              className="w-16 h-16 rounded-md object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{table.name}</h3>
              <p className="text-gray-600">Seating - {table.seating}</p>
            </div>
            <button className="ml-auto px-4 py-2 bg-orange-400 text-white rounded-md">
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableList;
