import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [timeslotOpen, setTimeslotOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [booking, setBooking] = useState({
    user_id: null,
    date: null,
    time: null,
    court: null,
    court_id: null,
    timeslot_id: null,
    price: null,
  });
  const [successOpen, setSuccessOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyParams, setHistoryParams] = useState(null);


  useEffect(() => {
    // get session on refresh
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);


  const openProfile = () => setProfileOpen(true);
  const closeProfile = () => setProfileOpen(false);

  const openSchedule = () => setScheduleOpen(true);
  const closeSchedule = () => setScheduleOpen(false);

  const openTimeslot = (date) => {
    setSelectedDate(date);
    setTimeslotOpen(true);
  };

  const closeTimeslot = () => setTimeslotOpen(false);

  const openPayment = (data) => {
    setBooking((prev) => ({
      ...prev,
      ...data, // ⬅️ SIMPAN SEMUA DATA
    }));
    setPaymentOpen(true);
    setTimeslotOpen(false);
  };

  const closePayment = () => setPaymentOpen(false);

  const goBackToSchedule = () => {
  setTimeslotOpen(false);
  setScheduleOpen(true);
  };

    const goBackToTimeslot = () => {
    setPaymentOpen(false);
    setTimeslotOpen(true);
  };

  const openLogin = () => {
    setAuthTab("login");
    setAuthOpen(true);
  };

  const openRegister = () => {
    setAuthTab("register");
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  const openSuccess = () => setSuccessOpen(true);
  const closeSuccess = () => setSuccessOpen(false);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const register = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false); //hide
  };
  
  const openHistory = (params = {}) => {
    setHistoryParams(params);
    setHistoryOpen(true);
  };

  const closeHistory = () => {
    setHistoryOpen(false);
    setHistoryParams(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authOpen,
        authTab,
        profileOpen,
        scheduleOpen,
        timeslotOpen,
        selectedDate,
        paymentOpen,
        booking,
        successOpen,
        historyOpen,
        showSuccess,
        openProfile,
        closeProfile,
        openSchedule,
        closeSchedule,
        openTimeslot,
        closeTimeslot,
        openPayment,
        closePayment,
        goBackToSchedule,
        goBackToTimeslot,
        openSuccess,
        closeSuccess,
        openHistory,
        closeHistory,
        openLogin,
        openRegister,
        closeAuth,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 