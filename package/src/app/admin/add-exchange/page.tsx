"use client";
import { useState } from "react";

export default function AddExchangeItemPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    contact: "",
    image: null as File | null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("contact", formData.contact);
    if (formData.image) form.append("image", formData.image);

    try {
      const res = await fetch("/api/exchange-items", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Item added successfully!");
        setFormData({
          name: "",
          category: "",
          description: "",
          price: "",
          contact: "",
          image: null,
        });
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to connect to database.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 px-6">
      <div className="bg-white dark:bg-dark shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-dark dark:text-white">
          Add Exchange Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Notes, Books, Electronics)"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows={3}
          />

          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="WhatsApp Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-dark dark:text-white">{message}</p>
        )}
      </div>
    </section>
  );
}
