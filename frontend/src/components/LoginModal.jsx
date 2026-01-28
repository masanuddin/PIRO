import { useState } from "react";
import { login } from "../services/auth";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(email, password);
      console.log("LOGIN SUCCESS:", res);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-slate-900">
          Login into PIRO
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Login to book your favourite Pilates VR Experience
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <div className="my-6 text-center text-xs text-slate-400">
          ATAU LANJUTKAN DENGAN
        </div>

        <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 text-sm">
          <span>🔵</span> Lanjutkan dengan Google
        </button>

        <p className="text-xs text-slate-400 mt-4 text-center">
          Dengan melanjutkan, kamu menyetujui Syarat & Ketentuan kami
        </p>
      </div>
    </div>
  );
}