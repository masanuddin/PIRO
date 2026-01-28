import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ScheduleModal() {
  const { openTimeslot, closeSchedule } = useAuth();

  const [date, setDate] = useState("");

  // 🔥 INI YANG KURANG
  const handleContinue = () => {
    openTimeslot(date);
    closeSchedule();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeSchedule}
      />

      {/* CARD */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl z-10 overflow-hidden">

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={closeSchedule}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-xl z-20"
        >
          ✕
        </button>

        {/* HEADER IMAGE */}
        <div className="relative h-40">
          <img
            src="/schedule-header.jpg"
            alt="Pilates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* CONTENT */}
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold">
            Welcome to PIRO Pilates.
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Book your session.
          </p>

          {/* DATE PICKER */}
          <div className="mt-6">
            <label className="block text-sm mb-2">
              Select a Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)} // 🔥 PENTING
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={handleContinue}
            disabled={!date}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}