import React, { useState } from "react";
import Navbar from "../components/Navbar";

function UserRewardsPage() {
  const [user, setUser] = useState({ id: 1, name: "John Doe", points: 70 }); // Mock user data
  const [coupons, setCoupons] = useState([
    { code: "10%OFF", description: "10% off on your next purchase", minimumPoints: 50 },
    { code: "FREESHIP", description: "Free Shipping on all orders", minimumPoints: 30 },
    { code: "BUY1GET1", description: "Buy 1 Get 1 Free", minimumPoints: 80 },
    { code: "20%DISCOUNT", description: "20% off on selected items", minimumPoints: 60 },
    { code: "SAVE100", description: "Save ₹100 on orders above ₹500", minimumPoints: 70 },
    { code: "CASHBACK50", description: "₹50 cashback on prepaid orders", minimumPoints: 40 },
  ]);
  const [generatedCoupon, setGeneratedCoupon] = useState(null);
  const handleGenerateCoupon = () => {
    // Filter eligible coupons based on user points OR if the user has exactly 200 points
    const eligibleCoupons = coupons.filter(
      (coupon) => user.points >= coupon.minimumPoints || user.points === 200
    );
  
    if (eligibleCoupons.length > 0) {
      // Randomly select a coupon
      const randomIndex = Math.floor(Math.random() * eligibleCoupons.length);
      const coupon = eligibleCoupons[randomIndex];
      setGeneratedCoupon(coupon);
      alert(`You received a coupon: ${coupon.code} - ${coupon.description}`);
    } else {
      alert("No coupons available for your points.");
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow p-4 bg-gray-50">
        <h1 className="text-2xl font-semibold mb-4">My Rewards</h1>

        {/* User Info */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Hello, {user.name}</h2>
          <p className="text-gray-600">Points: {user.points}</p>
        </div>

        {/* Coupon Generator */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Generate Coupon</h2>
          <p className="text-gray-600 mb-4">
            Based on your points, you can generate a coupon. Click the button below!
          </p>
          <button
            onClick={handleGenerateCoupon}
            className="px-4 py-2 bg-orange-400 text-white rounded-md"
          >
            Generate Coupon
          </button>
          {generatedCoupon && (
            <div className="mt-4 p-4 bg-green-100 rounded-md">
              <h3 className="text-lg font-semibold text-green-800">
                Congratulations!
              </h3>
              <p className="text-green-700">
                You received a coupon: <strong>{generatedCoupon.code}</strong>
              </p>
              <p className="text-green-700">{generatedCoupon.description}</p>
            </div>
          )}
        </div>

        {/* Available Coupons */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Available Coupons</h2>
          <p className="text-gray-600 mb-4">
            These are the coupons you can unlock based on your points:
          </p>
          <ul className="space-y-2">
            {coupons.map((coupon) => (
              <li
                key={coupon.code}
                className={`p-4 rounded-md ${
                  user.points >= coupon.minimumPoints
                    ? "bg-green-50 border-l-4 border-green-400"
                    : "bg-gray-100 border-l-4 border-gray-300"
                }`}
              >
                <h3 className="text-sm font-medium">
                  {coupon.code} - {coupon.description}
                </h3>
                <p className="text-sm">
                  Minimum Points: {coupon.minimumPoints}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserRewardsPage;
