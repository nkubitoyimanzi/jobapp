"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to create job");
      }

      router.push("/jobs");
    } catch (error) {
      console.error(error);
      alert("Error creating job");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/80">
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md min-h-[450px] flex flex-col justify-between"
      >
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6 text-white/60 text-center">
          Create Job
        </h2>

        {/* Inputs container */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="bg-black/50 text-white/40 placeholder-white/40 border border-white/20 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="bg-black/50 text-white/40 placeholder-white/40 border border-white/20 p-4 rounded-xl w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Button */}
        <button className="bg-white/20 text-white/80 w-full py-3 rounded-xl mt-6 hover:bg-white/30 transition">
          Create Job
        </button>
      </form>
    </div>
  );
}