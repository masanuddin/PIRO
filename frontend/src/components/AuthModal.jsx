import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function AuthModal() {
  const {
    authTab,
    closeAuth,
    login,
    register,
    loginWithGoogle
  } = useAuth();

  const [tab, setTab] = useState(authTab);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTab(authTab);
  }, [authTab]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (tab === "login") {
        await login(form.email, form.password);
      } else {
        if (form.password !== form.confirmPassword) {
          throw new Error("Password tidak sama");
        }
        await register({
          email: form.email,
          password: form.password,
        });
      }

      closeAuth();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeAuth}
      />

      {/* MODAL */}
      <div
        className="
          relative bg-white w-full max-w-md rounded-2xl shadow-xl z-10
          max-h-[90vh] overflow-y-auto
        "
      >
        <div className="p-6 pb-8">
          <button
            onClick={closeAuth}
            className="absolute top-4 right-4 text-slate-400"
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold">
            {tab === "login" ? "Log into PIRO" : "Register to PIRO"}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {tab === "login"
              ? "Login to book your favourite Pilates VR Experience"
              : "Create account to book your favourite Pilates VR Experience"}
          </p>

          {/* TAB */}
          <div className="flex bg-slate-100 rounded-lg p-1 mt-4">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`flex-1 py-2 rounded-lg text-sm ${
                tab === "login" && "bg-white shadow"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={`flex-1 py-2 rounded-lg text-sm ${
                tab === "register" && "bg-white shadow"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {tab === "register" && (
              <>
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input
                    name="name"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Phone Number</label>
                  <input
                    name="phone"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {tab === "register" && (
              <div>
                <label className="block text-sm mb-1">
                  Password Confirmation
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 rounded-lg"
            >
              {loading
                ? "Loading..."
                : tab === "login"
                ? "Masuk"
                : "Daftar"}
            </button>
          </form>

          <div className="my-6 text-center text-xs text-slate-400">
            OR CONTINUE WITH
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3
                      border border-slate-300 py-2 rounded-lg text-sm
                      hover:bg-slate-50 transition"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <p className="text-xs text-slate-400 mt-4 text-center">
            By clicking continue, you are agreeing to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}