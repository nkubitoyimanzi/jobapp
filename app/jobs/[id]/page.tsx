"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Job = {
  id: number;
  title: string;
  description: string;
};

export default function JobDetails() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Job not found");
        return res.json();
      })
      .then((data) => setJob(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Loading state
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/80 text-white/40">
        Loading job...
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/80 text-red-500/70">
        {error}
      </div>
    );

  // No job found
  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/80 text-white/40">
        Job not found
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/80 p-6">
      <div className="bg-black/70 backdrop-blur-md rounded-3xl p-8 w-full max-w-xl shadow-lg">
        
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-4 text-white/60">
          {job.title}
        </h1>

        {/* Description */}
        <p className="text-white/40 mb-6 leading-relaxed">
          {job.description}
        </p>

        {/* ID */}
        <p className="text-sm text-white/30">
          Job ID: {job.id}
        </p>
      </div>
    </div>
  );
}