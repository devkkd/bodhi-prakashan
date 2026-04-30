"use client";

import { createContext, useContext, useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // 🔥 FETCH USER FROM BACKEND
  const fetchUser = async () => {
    try {
      const res = await API.get("/user/me");
      setUser(res.data);
    } catch (err) {
      console.error("Auth fetch failed");

      // ❌ token invalid → logout
      localStorage.removeItem("userToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 AUTO LOGIN
  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // 🔥 LOGIN
  const login = (token) => {
    localStorage.setItem("userToken", token);
    fetchUser();
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    router.push("/user/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};