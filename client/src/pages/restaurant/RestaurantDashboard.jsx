import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings/4");
        console.log(response.data); // Debug the response
        setBookings(response.data.bookings || []);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!bookings.length) {
    return <p className="text-center text-gray-500">No bookings available.</p>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Staff Dashboard
      </h2>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.booking_id}
            className="p-6 bg-white rounded-lg shadow-lg flex justify-between items-start"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Booking by: {booking.user_name}
              </h3>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Booking ID:</span> {booking.booking_id}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Guest Count:</span> {booking.guest_count}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Start Time:</span>{" "}
                {formatDateTime(booking.start_time)}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">End Time:</span>{" "}
                {formatDateTime(booking.end_time)}
              </p>
              <p className={`mt-4 text-sm font-medium ${getStatusColor(booking.status)}`}>
                <strong>Status:</strong> {getStatusText(booking.status)}
              </p>
            </div>
            <div className="flex space-x-4">
              {booking.status === 11 && (
                <button
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                  onClick={() => handleCheckIn(booking.booking_id)}
                >
                  Check In
                </button>
              )}
              {booking.status !== 12 && (
                <button
                  className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                  onClick={() => handleCheckOut(booking.booking_id)}
                >
                  Check Out
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function formatDateTime(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} at ${formattedTime}`;
  }

  function getStatusText(status) {
    switch (status) {
      case 11:
        return "Pending";
      case 12:
        return "Checked Out";
      default:
        return "Unknown";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 11:
        return "text-yellow-500";
      case 12:
        return "text-gray-500";
      default:
        return "text-gray-400";
    }
  }

  function handleCheckIn(bookingId) {
    console.log("Check-in for Booking ID:", bookingId);
  }

  function handleCheckOut(bookingId) {
    console.log("Check-out for Booking ID:", bookingId);
  }
};

export default StaffDashboard;
