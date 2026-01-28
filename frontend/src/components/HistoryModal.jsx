import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function HistoryModal() {
  const {
    user,
    closeHistory,
    historyParams, // ⬅️ AMBIL PARAM DARI CONTEXT
  } = useAuth();

  const refresh = historyParams?.refresh; // ⬅️ AMAN
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        booking_date,
        timeslots(start_time),
        courts(name, type)
      `)
      .eq("user_id", user.id)
      .order("booking_date", { ascending: false });

    if (!error) setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [refresh]); // ⬅️ INI SEKARANG VALID

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeHistory}
      />

      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl z-10 overflow-hidden">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-blue-600">PIRO</span>
          <span className="text-sm font-medium">Booking History</span>
          <button onClick={closeHistory}>✕</button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {loading && <p className="text-center text-sm">Loading...</p>}

          {!loading && bookings.length === 0 && (
            <p className="text-center text-sm text-slate-500">
              Belum ada booking
            </p>
          )}

          {bookings.map((b, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 shadow-sm space-y-1"
            >
              <p><b>Date:</b> {b.booking_date}</p>
              <p><b>Time:</b> {b.timeslots?.start_time}</p>
              <p>
                <b>Court:</b>{" "}
                {b.courts?.name} ({b.courts?.type})
              </p>
              <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full mt-2">
                Upcoming
              </span>
            </div>
          ))}
        </div>

        <div className="p-4">
          <button
            onClick={closeHistory}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}