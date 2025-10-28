"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000"; // 🧩 Flask backend base URL

  // 🧠 Fetch all users from Flask backend
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ➕ Add new user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/add_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers([...users, data]);
        setNewUser({ name: "", email: "" });
      } else {
        alert(data.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Add user error:", error);
    }
    setLoading(false);
  };

  // ❌ Delete a user
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_URL}/delete_user/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-skyblue via-lightskyblue to-white dark:via-[#4298b0] dark:to-black/10 py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-white/80 mt-2">Manage Users</p>
        </div>

        {/* ➕ Add User Form */}
        <form
          onSubmit={handleAddUser}
          className="bg-white/90 dark:bg-gray-900 rounded-2xl shadow p-6 mb-10"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Add New User
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>

        {/* 👥 User List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white/90 dark:bg-gray-900 rounded-2xl shadow p-6 text-center relative"
            >
              <Image
                src="/images/hero/nobg3.png"
                alt="user"
                width={120}
                height={120}
                className="mx-auto mb-4 rounded-full"
                unoptimized
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {user.email}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Role: {user.role || "User"}
              </p>

              <button
                onClick={() => handleDeleteUser(user._id!)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
