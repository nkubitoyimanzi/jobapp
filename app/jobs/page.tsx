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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && jobs.length === 0 && <p>No jobs found.</p>}

      {!loading &&
        !error &&
        jobs.map((job) => (
          <Card
            key={job.id}
            id={job.id}
            title={job.title}
            description={job.description}
          />
        ))}
    </div>
  );
}