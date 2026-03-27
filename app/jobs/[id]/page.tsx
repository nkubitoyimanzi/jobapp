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

  if (loading) return <p className="p-6">Loading job...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!job) return <p className="p-6">Job not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-700 mb-2">{job.description}</p>
      <p className="text-sm text-gray-500">Job ID: {job.id}</p>
    </div>
  );
}