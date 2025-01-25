import React from "react";
import { CheckCircle, CreditCard } from "lucide-react";

const FinalBookingComponent = ({ bookingDetails, onProceedToPayment }) => {
  const { tableName, seating, bookingAmount } = bookingDetails;

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white shadow-2xl rounded-2xl border-2 border-gray-100">
      <div className="flex items-center justify-center mb-6">
        <CheckCircle className="text-green-500 mr-3" size={32} />
        <h2 className="text-2xl font-bold text-gray-800">Booking Summary</h2>
      </div>
      
      <div className="space-y-5">
        <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 transition hover:shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-800">Table Details</h3>
            <span className="text-blue-600 font-medium">{tableName}</span>
          </div>
          <p className="text-gray-600">Accommodates {seating} persons comfortably</p>
        </div>
        
        <div className="p-5 bg-orange-50 rounded-xl border border-orange-100 transition hover:shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-orange-800">Booking Amount</h3>
            <span className="text-orange-600 font-bold">₹{bookingAmount}</span>
          </div>
          <p className="text-red-500 text-sm flex items-center">
            <span className="mr-2">⚠️</span>
            Non-refundable amount, adjusted in final bill
          </p>
        </div>
      </div>
      
      <button
        className="mt-6 w-full flex items-center justify-center px-6 py-3 
        bg-gradient-to-r from-orange-500 to-orange-600 
        text-white rounded-xl font-bold 
        hover:from-orange-600 hover:to-orange-700 
        transition-all duration-300 
        transform hover:scale-105 
        shadow-lg hover:shadow-xl"
        onClick={onProceedToPayment}
      >
        <CreditCard className="mr-3" size={20} />
        Proceed to Payment
      </button>
    </div>
  );
};

export default FinalBookingComponent;