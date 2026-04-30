"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post("/admin/login", {
        username,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      router.push("/admin");
    } catch (err) {
      console.error("Admin login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 border rounded-xl w-[300px]">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}