"use client";

import { useState, useEffect } from "react";
import { Card } from "../components/Card";

type Job = {
  id: number;
  title: string;
  description: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => setJobs(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black/80 text-white/40">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-white/60">
        Jobs
      </h1>

      {/* Loading */}
      {loading && <p className="mb-4">Loading jobs...</p>}

      
      {error && <p className="mb-4 text-red-500/70">{error}</p>}

      {/* Empty */}
      {!loading && !error && jobs.length === 0 && (
        <p>No jobs found.</p>
      )}

      {/* Jobs Grid */}
      <div className="grid grid-cols-4 gap-6">
        {!loading &&
          !error &&
          jobs.map((job) => (
            <div key={job.id} className="">
              <Card
                id={job.id}
                title={job.title}
                description={job.description}
              />
            </div>
          ))}
      </div>
    </div>
  );
}