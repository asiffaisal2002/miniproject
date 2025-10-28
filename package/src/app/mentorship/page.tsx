"use client";
import { useEffect, useState } from "react";

interface Mentor {
  _id: string;
  name: string;
  course: string;
  hobbies?: string;
  interests?: string;
  skills?: string;
  contact?: string; // Phone number
}

export default function MentorshipPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("/api/mentorship");
        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error("Error fetching mentors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  // 🟢 Create WhatsApp chat link
  const getWhatsAppLink = (number: string) => {
    const phone = number.replace(/\D/g, ""); // Clean number
    const message = encodeURIComponent("Hi! I saw your mentorship profile and would like to connect.");
    return `https://wa.me/${phone}?text=${message}`;
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading mentors...</p>;

  if (mentors.length === 0)
    return <p className="text-center mt-10 text-lg">No mentorship users found.</p>;

  return (
    <section className="min-h-screen flex flex-col items-center bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 px-6 py-10">
      <h1 className="text-4xl font-semibold text-dark dark:text-white mb-10">
        Select a Mentor
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {mentors.map((mentor) => (
          <div
            key={mentor._id}
            className={`border rounded-2xl p-6 shadow-md transition ${
              selected === mentor._id
                ? "border-blue-600 ring-2 ring-blue-300"
                : "border-gray-300"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{mentor.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Course: {mentor.course}
            </p>
            {mentor.hobbies && <p>Hobbies: {mentor.hobbies}</p>}
            {mentor.interests && <p>Interests: {mentor.interests}</p>}
            {mentor.skills && <p>Skills: {mentor.skills}</p>}
            {mentor.contact && (
              <p className="mt-2">
                <strong>Contact:</strong> {mentor.contact}
              </p>
            )}

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => handleSelect(mentor._id)}
                className={`w-full py-2 rounded-lg text-white ${
                  selected === mentor._id
                    ? "bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition`}
              >
                {selected === mentor._id ? "Selected ✅" : "Select Mentor"}
              </button>

              {mentor.contact && (
                <a
                  href={getWhatsAppLink(mentor.contact)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
                >
                  💬 Message on WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
