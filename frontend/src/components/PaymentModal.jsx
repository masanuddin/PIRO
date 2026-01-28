import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PaymentModal() {
  const { booking, closePayment, goBackToTimeslot, openSuccess } = useAuth();
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
    const handleConfirm = () => {
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
        closePayment();
        openSuccess();
    }, 1500);
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closePayment}
      />

      {/* CARD */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl z-10 overflow-hidden">

        {/* HEADER */}
        <div className="relative border-b px-6 py-4 flex items-center">
          <span className="font-semibold text-blue-600">PIRO</span>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-slate-700">
            Booking Confirmation & Payment
          </span>

          <button
            onClick={closePayment}
            className="ml-auto text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
        {/* BACK */}
        <button
            onClick={goBackToTimeslot}
            className="text-sm text-slate-500 hover:text-blue-600"
            >
            ← Back
        </button>
        <div className="mx-auto w-[260px] space-y-6">

            {/* SUMMARY */}
            <div>
            <h3 className="font-medium mb-3 text-center">
                Booking Summary
            </h3>

            <div className="text-sm text-slate-700 grid grid-cols-2 gap-x-8 gap-y-1">
                <span>Date:</span>
                <span className="text-right font-medium">
                {formattedDate}
                </span>

                <span>Time:</span>
                <span className="text-right font-medium">
                {booking.time}
                </span>

                <span>Court:</span>
                <span className="text-right font-medium">
                {booking.court}
                </span>
            </div>
            </div>

            {/* PAYMENT DETAILS */}
            <div>
            <h3 className="font-medium mb-2 text-center">
                Payment Details
            </h3>

            <div className="grid grid-cols-2 gap-x-8 text-sm">
                <span>Total Cost:</span>
                <span className="text-right font-semibold">
                IDR 250.000
                </span>
            </div>
            </div>

            {/* METHOD */}
            <div className="text-center">
            <h3 className="font-medium mb-3">
                Select Payment Method
            </h3>

            <div className="flex gap-4 justify-center">
                <button
                onClick={() => setMethod("card")}
                className={`px-4 py-2 rounded-lg border text-sm ${
                    method === "card"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-slate-300"
                }`}
                >
                💳 Credit Card
                </button>

                <button
                onClick={() => setMethod("ewallet")}
                className={`px-4 py-2 rounded-lg border text-sm ${
                    method === "ewallet"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-slate-300"
                }`}
                >
                📱 E-Wallet
                </button>
            </div>
            </div>

            {/* CARD FORM */}
            {method === "card" && (
            <div className="space-y-3">
                <input
                placeholder="Card Number"
                className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="flex gap-3">
                <input
                    placeholder="Expiry"
                    className="w-1/2 px-4 py-2 border rounded-lg"
                />
                <input
                    placeholder="CVV"
                    className="w-1/2 px-4 py-2 border rounded-lg"
                />
                </div>
            </div>
            )}

        </div>

        {/* CTA FULL WIDTH */}
        <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-60"
        >
        {loading ? "Processing..." : "Confirm & Pay Now"}
        </button>

        </div>

      </div>
    </div>
  );
}