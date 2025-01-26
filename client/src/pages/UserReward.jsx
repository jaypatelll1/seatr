import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

function UserCoupons() {
  // Dummy coupons data
  const couponsData = [
    { id: 1, code: "SAVE10", description: "10% off on your next purchase", minimumPoints: 100 },
    { id: 2, code: "SAVE20", description: "20% off on orders above ₹500", minimumPoints: 150 },
    { id: 3, code: "FREESHIP", description: "Free Shipping on orders above ₹200", minimumPoints: 200 },
    { id: 4, code: "SAVE30", description: "30% off on your next purchase", minimumPoints: 250 },
  ];

  const [coupons, setCoupons] = useState(couponsData);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const userName = useSelector((state) => state.user.name) || "Guest";
  const user = { name: userName, points: 200 };

  const handleSelectCoupon = (coupon) => {
    if (user.points >= coupon.minimumPoints) {
      setSelectedCoupon(coupon);
      // Remove the selected coupon from the list
      const updatedCoupons = coupons.filter((c) => c.id !== coupon.id);
      setCoupons(updatedCoupons);
      alert(`You selected the coupon: ${coupon.code} - ${coupon.description}`);
    } else {
      alert("You don't have enough points for this coupon.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-grow flex-col md:flex-row p-6 bg-gray-50">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Welcome, {userName}!</h1>
          <p className="text-lg mb-4">
            You have <span className="font-bold">{user.points}</span> points.
          </p>

          {selectedCoupon && (
            <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Congratulations!
              </h2>
              <p className="text-gray-700">
                You selected the coupon:{" "}
                <span className="font-bold text-green-700">
                  {selectedCoupon.code}
                </span>{" "}
                - {selectedCoupon.description}
              </p>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Available Coupons</h2>
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`p-4 mb-3 rounded-md shadow-md border ${
                user.points >= coupon.minimumPoints
                  ? "bg-green-50 border-green-400"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <h3 className="font-bold text-gray-800">{coupon.code}</h3>
              <p className="text-gray-600">{coupon.description}</p>
              <p className="text-sm text-gray-500">
                Minimum Points: {coupon.minimumPoints}
              </p>
              <button
                onClick={() => handleSelectCoupon(coupon)}
                disabled={user.points < coupon.minimumPoints}
                className={`mt-4 px-4 py-2 text-white rounded-md shadow-md ${
                  user.points >= coupon.minimumPoints
                    ? "bg-orange-400 hover:bg-orange-500"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Select Coupon
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserCoupons;
