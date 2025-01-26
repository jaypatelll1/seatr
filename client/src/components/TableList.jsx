import React from "react";

const TableList = ({ tables, onTableSelect }) => {
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Tables</h2>
      <div className="space-y-4 overflow-y-auto max-h-[70vh] scrollbar-hide">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`
              flex items-center justify-between p-5 rounded-lg transition-all duration-300 
              ${table.joinable 
                ? 'bg-blue-50 hover:bg-blue-100 border-2 border-blue-200' 
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'}
              hover:shadow-md cursor-pointer
            `}
            onClick={() => onTableSelect(table)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{table.name}</h3>
              <p className={`
                text-sm 
                ${table.joinable ? 'text-blue-600' : 'text-gray-600'}
              `}>
                {table.joinable ? 'Joinable Seating' : 'Seating'} - {table.seating}
              </p>
            </div>
            <button 
              onClick={() => window.location.href = '/finalbooking'}
              className={`
                px-4 py-2 rounded-md text-white font-medium transition-colors duration-300
                ${table.joinable 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-orange-500 hover:bg-orange-600'}
              `}
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableList;