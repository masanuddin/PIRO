import { createContext, useContext, useState } from "react";
import { login as loginApi, register as registerApi } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  function openLogin() {
    setAuthTab("login");
    setAuthOpen(true);
  }

  function openRegister() {
    setAuthTab("register");
    setAuthOpen(true);
  }

  function closeAuth() {
    setAuthOpen(false);
  }

  // 🔐 auth logic
  async function login(email, password) {
    const res = await loginApi(email, password);
    setUser({ name: email.split("@")[0], email });
    closeAuth();
    return res;
  }

  async function register(data) {
    const res = await registerApi(data);
    setUser({ name: data.name, email: data.email });
    closeAuth();
    return res;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        authOpen,
        authTab,
        openLogin,
        openRegister,
        closeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}