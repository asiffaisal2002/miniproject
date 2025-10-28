"use client";
import { useState } from "react";

export default function AdminMentorshipPage() {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    hobbies: "",
    interests: "",
    skills: "",
    contact: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/mentorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Mentorship user added successfully!");
        setFormData({
          name: "",
          course: "",
          hobbies: "",
          interests: "",
          skills: "",
          contact: "",
        });
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setMessage("❌ Failed to connect to database.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 px-6">
      <div className="bg-white dark:bg-dark shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-dark dark:text-white">
          Admin — Add Mentorship User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
          <input
            type="text"
            name="hobbies"
            placeholder="Hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            name="interests"
            placeholder="Interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Mentorship User
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-dark dark:text-white">{message}</p>
        )}
      </div>
    </section>
  );
}
