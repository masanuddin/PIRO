import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function HistoryModal() {
  const { user, closeHistory, openProfile } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          booking_date,
          timeslots(start_time),
          courts(name, type),
          created_at
        `)
        .eq("user_id", user.id)
        .order("booking_date", { ascending: false });

      if (error) {
        console.error(error);
        setBookings([]);
      } else {
        setBookings(data || []);
      }

      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const isUpcoming = (date) =>
    new Date(date) >= new Date(new Date().toDateString());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeHistory}
      />

      {/* CARD */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="relative border-b px-6 py-4 flex items-center shrink-0">
          <span className="font-semibold text-blue-600">PIRO</span>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-slate-700">
            Booking History
          </span>

          <button
            onClick={closeHistory}
            className="ml-auto text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading && (
            <p className="text-center text-sm text-slate-500">
              Loading history...
            </p>
          )}

          {!loading && bookings.length === 0 && (
            <p className="text-center text-sm text-slate-500">
              Belum ada booking
            </p>
          )}

          {!loading &&
            bookings.map((b) => {
              const upcoming = isUpcoming(b.booking_date);

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-xl shadow p-4 border"
                >
                  <div className="text-sm space-y-1">
                    <div>
                      <b>Date:</b> {formatDate(b.booking_date)}
                    </div>
                    <div>
                      <b>Time:</b> {b.timeslots?.start_time}
                    </div>
                    <div>
                      <b>Court:</b>{" "}
                      {b.courts?.name} ({b.courts?.type})
                    </div>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-3 py-1 text-xs rounded-full font-medium
                          ${
                            upcoming
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                      >
                        {upcoming ? "Upcoming" : "Completed"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t shrink-0">
          <button
            onClick={() => {
              closeHistory();
              openProfile();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}