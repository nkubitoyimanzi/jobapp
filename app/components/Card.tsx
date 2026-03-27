"use client";

import { useRouter } from "next/navigation";

type CardProps = {
  id: number;
  title: string;
  description: string;
};

export function Card({ id, title, description }: CardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/jobs/${id}`, {
      method: "DELETE",
    });

window.location.reload();   };

  return (
    <div className="border p-4 mb-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>

      <div className="mt-2 flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => router.push(`/jobs/${id}`)}
        >
          View Job
        </button>

        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}