"use client";

import { useEffect, useState } from "react";
import ItemCard, { ItemType } from "@/components/Home/Properties/Card/Card";

export default function HomePage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getItems")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-12">
          🛍️ Items Available 
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading items...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
