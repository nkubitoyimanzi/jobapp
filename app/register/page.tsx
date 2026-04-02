"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; 

function RegisterPage() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const router = useRouter(); 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError("");
    setLoading(true); // start loading

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message); 
    } finally {
      setLoading(false); 
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
          Register
        </h1>

        {/* Error message */}
        {error && (
          <p className="text-red-500/70 mb-4 text-center">{error}</p>
        )}

        {/* Inputs */}
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

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-white/20 text-white/80 w-full py-3 rounded-xl mt-6 hover:bg-white/30 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;