import { useAuth } from "../context/AuthContext";

export default function SuccessModal() {
  const { booking, closeSuccess } = useAuth();

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
    const handleBackHome = () => {
    closeSuccess();
    };

    const handleGoHistory = () => {
    closeSuccess();
    openProfile();
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeSuccess}
      />

      {/* CARD */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl z-10 overflow-hidden">

        {/* HEADER */}
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-blue-600">PIRO</span>
          <span className="text-sm font-medium text-slate-700">
            Booking Successful
          </span>
          <div className="w-6" />
        </div>

        {/* CONTENT */}
        <div className="p-8 text-center space-y-4">
          {/* CHECK ICON */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-4xl">✓</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-blue-600">
            Booking Successful!
          </h2>

          <p className="text-sm text-slate-500">
            Thank you for booking with PIRO Pilates.
            <br />
            Your session is confirmed.
          </p>

          {/* SUMMARY */}
          <div className="mx-auto w-[260px] text-sm text-left space-y-1 mt-4">
            <div className="flex justify-between">
              <span>Booking ID:</span>
              <b>PIRO-{Math.floor(Math.random() * 90000 + 10000)}</b>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <b>{formattedDate}</b>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <b>{booking.time}</b>
            </div>
            <div className="flex justify-between">
              <span>Court:</span>
              <b>{booking.court}</b>
            </div>
          </div>

            <div className="mt-6 space-y-3">
            <button
                onClick={handleBackHome}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
                Back to Home
            </button>

            <button
                onClick={handleGoHistory}
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-medium"
            >
                Booking History
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}