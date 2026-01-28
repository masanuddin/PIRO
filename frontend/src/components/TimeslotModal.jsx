import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const TIMESLOTS = [
  "08:00 AM",
  "10:00 AM",
  "01:00 PM",
  "02:00 PM",
  "04:00 PM",
];

const COURTS = [
  { id: "A", label: "Court A (Reformer)" },
  { id: "B", label: "Court B (Mat)" },
];

export default function TimeslotModal() {
  const { closeTimeslot, selectedDate, goBackToSchedule,  openPayment, } = useAuth();
  const [time, setTime] = useState(null);
  const [court, setCourt] = useState(null);

    const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        }).replace(/^./, (c) => c.toUpperCase())
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeTimeslot}
      />

      {/* CARD */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl z-10 overflow-hidden">    

        {/* HEADER */}
        <div className="relative border-b px-6 py-4 flex items-center">
        {/* LEFT */}
        <span className="font-semibold text-blue-600">PIRO</span>

        {/* CENTER */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm text-slate-600">
            Booking for: <b>{formattedDate}</b>
        </span>

        {/* RIGHT */}
        <button
            onClick={closeTimeslot}
            className="ml-auto text-slate-400 hover:text-slate-600 text-xl"
        >
            ✕
        </button>
        </div>


        {/* CONTENT */}
        <div className="p-6 text-center">
        
        <div className="text-left mb-4">
        <button
            onClick={goBackToSchedule}
            className="text-sm text-slate-500 hover:text-blue-600"
        >
            ← Back
        </button>
        </div>


          {/* TIMESLOT */}
          <h3 className="font-medium mb-4">
            Select an Available Timeslot
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {TIMESLOTS.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`
                  border rounded-lg py-2 text-sm
                  ${
                    time === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-slate-300"
                  }
                `}
              >
                {t}
              </button>
            ))}
          </div>

          {/* COURT */}
          <h3 className="font-medium mt-8 mb-4">
            Select a Court
          </h3>

          <div className="flex gap-4 justify-center">
            {COURTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCourt(c.id)}
                className={`
                  px-4 py-2 rounded-lg border text-sm
                  ${
                    court === c.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-slate-300"
                  }
                `}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* CTA */}
            <button
            disabled={!time || !court}
            onClick={() =>
                openPayment({
                date: selectedDate,
                time,
                court:
                    court === "A"
                    ? "Court A (Reformer)"
                    : "Court B (Mat)",
                })
            }
            className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
            >
            Continue to Payment
            </button>
        </div>
      </div>
    </div>
  );
}
