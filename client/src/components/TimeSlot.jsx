import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function TimeSlot() {

  const navigate = useNavigate();
  const startTime = 7; // Starting hour (7 AM)
  const endTime = 22; // Ending hour (10 PM)
  const handlenavigate = () => {
    navigate("/tablebooking");
  };
 
  // Generate time slots with fixed 1.5-hour intervals
  const generateTimeSlots = () => {
    const slots = [];
    let currentTime = startTime;
    while (currentTime + 1.5 <= endTime) {
      const startHour = Math.floor(currentTime);
      const startMinutes = (currentTime % 1) * 60;
      const endHour = Math.floor(currentTime + 1.5);
      const endMinutes = ((currentTime + 1.5) % 1) * 60;

      const startString = `${startHour < 10 ? "0" : ""}${startHour}:${
        startMinutes === 0 ? "00" : startMinutes
      }`;
      const endString = `${endHour < 10 ? "0" : ""}${endHour}:${
        endMinutes === 0 ? "00" : endMinutes
      }`;

      slots.push(`${startString} - ${endString}`);
      currentTime += 2; // Increment by 2 hours for the next time slot
    }
    return slots;
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalSeating, setTotalSeating] = useState(1);

  const timeSlots = generateTimeSlots();

  // Toggle time slot selection
  const selectSlot = (slot) => {
    setSelectedSlot(selectedSlot === slot ? null : slot);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg max-w-lg mt-5 md:mt-12">
      <h2 className="text-lg font-semibold mb-4">Available Time Slots</h2>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => selectSlot(slot)}
            className={`px-2 py-1 text-sm font-medium rounded-md border focus:outline-none ${
              selectedSlot === slot
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2">Total Seating</h2>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setTotalSeating((prev) => Math.max(1, prev - 1))}
          className="p-2 bg-gray-200 rounded-md text-lg font-semibold"
        >
          -
        </button>
        <span className="text-lg font-semibold">{totalSeating}</span>
        <button
          onClick={() => setTotalSeating((prev) => prev + 1)}
          className="p-2 bg-gray-200 rounded-md text-lg font-semibold"
        >
          +
        </button>
      </div>

      <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600" onClick={handlenavigate}>
        Select Slot
      </button>
    </div>
  );
}

export default TimeSlot;
