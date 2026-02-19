"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/app/admin/AdminDashboard";

export default function AdminPage() {
  const { user, loading, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }
    setIsLoggingIn(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-gray flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // If logged in, show dashboard
  if (user) {
    return <AdminDashboard onSignOut={signOut} />;
  }

  // Show login form
  return (
    <div className="min-h-screen bg-neutral-gray flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-primary-orange text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}