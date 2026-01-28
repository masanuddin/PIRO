import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    // const [scrolled, setScrolled] = useState(false);

    // useEffect(() => {
    // const onScroll = () => {
    //     setScrolled(window.scrollY > 10);
    // };

    // window.addEventListener("scroll", onScroll);
    // return () => window.removeEventListener("scroll", onScroll);
    // }, []);

    const { user, openLogin, openRegister, openProfile, logout } = useAuth();

    return (
        <nav className="
        fixed top-0 left-0 w-full
        h-16
        bg-white
        border-b border-slate-200
        z-50
        ">
        {/* // <nav
        // className={`fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300
        // ${
        // scrolled
        // ? "bg-white/80 backdrop-blur border-b border-slate-200"
        // : "bg-transparent"
        // }`}
        // > */}
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
            <div className="text-xl font-semibold text-blue-600">
            PIRO
            </div>

            {!user ? (
            <div className="flex items-center gap-4">
                <button
                onClick={openLogin}
                className="text-sm text-slate-600"
                >
                Masuk
                </button>
                <button
                onClick={openRegister}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg"
                >
                Daftar
                </button>
            </div>
            ) : (
            <div className="flex items-center gap-4">
                <button
                onClick={openProfile}
                className="text-sm text-slate-700 hover:underline"
                >
                Hai, <b>{user.email}</b>
                </button>
                <button
                onClick={logout}
                className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-lg"
                >
                Log Out
                </button>
            </div>
            )}
        </div>
        </nav>
    );
    }