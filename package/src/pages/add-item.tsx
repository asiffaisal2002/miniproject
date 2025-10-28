"use client";
import { useState } from "react";

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, image: e.target.files?.[0] || null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    const res = await fetch("/api/addItem", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    console.log(result);
    alert("Item added successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" className="w-full border p-2 rounded" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="price" placeholder="Price" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="category" placeholder="Category" className="w-full border p-2 rounded" onChange={handleChange} />
        <input type="file" name="image" className="w-full" onChange={handleFileChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Item</button>
      </form>
    </div>
  );
}
