import React from "react";
import FinalBookingComponent from "../components/FinalbookingComponent";

const FinalBooking = () => {
  const bookingDetails = {
    tableName: "Table 1",
    seating: 4,
    bookingAmount: 500,
  };

  const handleProceedToPayment = () => {
    alert("Proceeding to payment...");
    // Add payment logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <FinalBookingComponent
        bookingDetails={bookingDetails}
        onProceedToPayment={handleProceedToPayment}
      />
    </div>
  );
};

export default FinalBooking;
