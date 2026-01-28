import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function TimeslotModal() {
  const {
    user,
    closeTimeslot,
    selectedDate,
    goBackToSchedule,
    openPayment,
  } = useAuth();

  const [time, setTime] = useState(null);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [loading, setLoading] = useState(false);

  const formattedDate = selectedDate
    ? new Date(selectedDate)
        .toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .replace(/^./, (c) => c.toUpperCase())
    : "";

  const TIMESLOTS = [
    "08:00",
    "09:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "19:00",
    "20:00",
  ];

  // FETCH COURTS WHEN TIME SELECTED
  useEffect(() => {
    if (!time || !selectedDate) return;

    setLoading(true);
    setSelectedCourt(null);

    supabase
      .rpc("get_available_courts", {
        p_date: selectedDate,
        p_start_time: time,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          setCourts([]);
        } else {
          setCourts(data || []);
        }
      })
      .finally(() => setLoading(false));
  }, [time, selectedDate]);

  // REALTIME UPDATE (BOOKINGS)
  useEffect(() => {
    if (!time || !selectedDate) return;

    const channel = supabase
      .channel("realtime-bookings")
        .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "bookings",
            filter: `booking_date=eq.${selectedDate}`,
        },
        () => {
            supabase.rpc("get_available_courts", {
            p_date: selectedDate,
            p_start_time: time,
            }).then(({ data }) => setCourts(data || []));
        }
        )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [time, selectedDate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeTimeslot}
      />

      {/* CARD */}
      <div className="
        relative bg-white w-full max-w-md
        max-h-[90vh]
        rounded-2xl shadow-xl
        z-10 overflow-hidden
        flex flex-col
      ">
        {/* HEADER */}
        <div className="relative border-b px-6 py-4 flex items-center shrink-0">
          <span className="font-semibold text-blue-600">PIRO</span>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm text-slate-600">
            Booking for: <b>{formattedDate}</b>
          </span>

          <button
            onClick={closeTimeslot}
            className="ml-auto text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* BACK */}
          <button
            onClick={goBackToSchedule}
            className="text-sm text-slate-500 hover:text-blue-600 mb-4"
          >
            ← Back
          </button>

          {/* TIMESLOT */}
          <h3 className="font-medium mb-4 text-center">
            Select an Available Timeslot
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {TIMESLOTS.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`border rounded-lg py-2 text-sm transition
                  ${
                    time === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-slate-300 hover:border-blue-500"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* COURTS */}
          {time && (
            <>
              <h3 className="font-medium mt-8 mb-4 text-center">
                Select a Court
              </h3>

              {loading && (
                <p className="text-sm text-slate-500 text-center">
                  Loading available courts...
                </p>
              )}

              {!loading && courts.length === 0 && (
                <p className="text-sm text-red-500 text-center">
                  Semua court penuh di jam ini
                </p>
              )}

              <div className="space-y-3">
                {courts.map((court) => (
                  <button
                    key={court.court_id}
                    disabled={court.remaining_slots === 0}
                    onClick={() => setSelectedCourt(court)}
                    className={`w-full p-4 rounded-xl border text-left transition
                      ${
                        court.remaining_slots === 0
                          ? "opacity-50 cursor-not-allowed bg-slate-100"
                          : selectedCourt?.court_id === court.court_id
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-300 hover:border-blue-500"
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{court.name}</p>
                        <p className="text-sm text-slate-500">
                          {court.type} • Rp{" "}
                          {court.price.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <span
                        className={`text-sm font-semibold ${
                          court.remaining_slots === 0
                            ? "text-red-500"
                            : court.remaining_slots <= 2
                            ? "text-orange-500"
                            : "text-green-600"
                        }`}
                      >
                        {court.remaining_slots === 0
                          ? "Full"
                          : `${court.remaining_slots} slot`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* CTA */}
                <button
                disabled={!time || !selectedCourt}
                onClick={() =>
                    openPayment({
                    user_id: user.id,
                    date: selectedDate,
                    time,
                    court: selectedCourt.name,
                    court_id: selectedCourt.court_id,
                    timeslot_id: selectedCourt.timeslot_id, // ⬅️ DI SINI
                    price: selectedCourt.price,
                    })
                }
                className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
                >
                Continue to Payment
                </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}