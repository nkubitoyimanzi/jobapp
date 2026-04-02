"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  // State to store email, password, error messages, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Next.js router to navigate pages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading(true);   // Show loading indicator
    setError("");       // Clear previous error

    try {
      // Call backend login endpoint
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send email + password
      });

      // Parse JSON response
      const data = await res.json();

      if (!res.ok) {
        // If backend returns error, throw it
        throw new Error(data.error || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Navigate to jobs page
      router.push("/jobs");

    } catch (err: any) {
      setError(err.message); // Show error to user
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/80">
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md min-h-[400px] flex flex-col justify-between"
      >
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6 text-center text-white/60">
          Login
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500/70 mb-4 text-center">{error}</p>
        )}

        {/* Input Fields */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/50 text-white/40 placeholder-white/40 border border-white/20 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black/50 text-white/40 placeholder-white/40 border border-white/20 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-white/40"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-white/20 text-white/80 w-full py-3 rounded-xl mt-6 hover:bg-white/30 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;