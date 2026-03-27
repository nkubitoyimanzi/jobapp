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
    <form onSubmit={handleSubmit} className="p-6">
      <input
        className="border p-2 block mb-2"
        placeholder="Enter job title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 block mb-2"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2">
        Create Job
      </button>
    </form>
  );
}