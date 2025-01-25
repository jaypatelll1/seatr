import React, { useState } from "react";

function RestaurantLayout() {
  const [restaurantAreaFile, setRestaurantAreaFile] = useState(null);
  const [menuCardFile, setMenuCardFile] = useState(null);

  const handleFileDrop = (e, setFile) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const preventDefault = (e) => e.preventDefault();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-[65vw] mx-auto mt-5 h-full">
      <h1 className="text-2xl font-bold mb-4">Restaurant Profile</h1>
      <p className="text-gray-500 mb-6">
        Lorem ipsum dolor sit amet. At eveniet eveniet aut mollitia fuga aut
        beatae magnam
      </p>

      {/* Upload Restaurant Area */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Upload Restaurant area</h2>
        <div
          className="border-dashed border-2 border-gray-300 rounded-md p-3 text-center cursor-pointer hover:border-gray-400 w-96 "
          onDrop={(e) => handleFileDrop(e, setRestaurantAreaFile)}
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
          onDragLeave={preventDefault}
        >
          {restaurantAreaFile ? (
            <p className="text-green-600 text-sm">{restaurantAreaFile.name}</p>
          ) : (
            <>
              <div className="mb-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 100 8h18a4 4 0 100-8M16 10l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <p className="text-sm">Drag & drop or click to upload</p>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                JPEG, PNG, PDF, and MP4 formats, up to 50MB
              </p>
              <input
                type="file"
                className="hidden"
                id="restaurantAreaInput"
                onChange={(e) => handleFileChange(e, setRestaurantAreaFile)}
              />
              <label
                htmlFor="restaurantAreaInput"
                className="inline-block px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-gray-300"
              >
                Browse File
              </label>
            </>
          )}
        </div>
      </div>

      {/* Upload Menu Card */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Upload menu card</h2>
        <div
          className="border-dashed border-2 border-gray-300 rounded-md p-3 text-center cursor-pointer hover:border-gray-400 w-96 "
          onDrop={(e) => handleFileDrop(e, setMenuCardFile)}
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
          onDragLeave={preventDefault}
        >
          {menuCardFile ? (
            <p className="text-green-600 text-sm">{menuCardFile.name}</p>
          ) : (
            <>
              <div className="mb-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 100 8h18a4 4 0 100-8M16 10l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <p className="text-sm">Drag & drop or click to upload</p>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                JPEG, PNG, PDF, and MP4 formats, up to 50MB
              </p>
              <input
                type="file"
                className="hidden"
                id="menuCardInput"
                onChange={(e) => handleFileChange(e, setMenuCardFile)}
              />
              <label
                htmlFor="menuCardInput"
                className="inline-block px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-gray-300"
              >
                Browse File
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantLayout;
