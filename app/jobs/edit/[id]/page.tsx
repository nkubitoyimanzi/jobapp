"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function EditJobPage(){
    const { id } = useParams();
    const router  = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');

    useEffect(()=>{
        fetch(`http://localhost:8080/jobs/${id}`)
        .then(res => res.json())
        .then(data =>{
            setTitle(data.title);
            setDescription(data.description);
        })
    },[id])
    const handleUpdate = async (e:React.FormEvent) =>{
        e.preventDefault();
        await fetch(`http://localhost:8080/jobs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({title,description}),
        })
        router.push("/jobs");
    };

    return (
    <form onSubmit={handleUpdate} className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Job</h1>

      <input
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        className="border p-2 mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}