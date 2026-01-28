import { useAuth } from "../context/AuthContext";
import { getDisplayName } from "../utils/user";

export default function ProfileModal() {
  const { user, closeProfile, logout, openHistory } = useAuth();
  const handleLogout = async () => {
    await logout();
    closeProfile();
  };
  const avatar =
  user?.user_metadata?.avatar_url ||
  user?.user_metadata?.picture ||
  null;

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeProfile}
      />

      {/* card */}
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl z-10 p-6">
        {/* header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button
            onClick={closeProfile}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* avatar logo */}
        <div className="flex flex-col items-center mt-6">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
            {avatar ? (
                <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                />
            ) : (
                <span className="text-white text-3xl">👤</span>
            )}
            </div>
            <p className="mt-4 font-medium text-slate-800">
            {getDisplayName(user)}
            </p>
        </div>

        {/* menu */}
        <div className="mt-8 space-y-4">
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border hover:bg-slate-50">
            <div className="flex items-center gap-3">
              ⚙️ <span>Settings</span>
            </div>
            ➜
          </button>

            <button
            onClick={() => {
                closeProfile();
                openHistory();
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border hover:bg-slate-50"
            >
            <div className="flex items-center gap-3">
                📅 <span>Booking History</span>
            </div>
            ➜
            </button>
        </div>

        {/* logout */}
        <button
        onClick={handleLogout}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
        Log Out
        </button>
      </div>
    </div>
  );
}