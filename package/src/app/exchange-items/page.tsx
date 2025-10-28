"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ExchangeItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/exchange-items");
        if (!res.ok) throw new Error("Failed to fetch exchange items");
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []); // ✅ ensure array
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading items...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <section className="min-h-screen bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 py-10 px-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-dark dark:text-white">
        📚 Exchange Study Materials
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-dark rounded-2xl shadow hover:shadow-xl transition group"
            >
              {/* 🖼 Image */}
              <div className="overflow-hidden rounded-t-2xl">
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.name || "Item"}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
              </div>

              {/* 📝 Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
                <p className="mt-2 text-blue-600 font-medium">
                  📖 {item.category}
                </p>

                {/* 📞 WhatsApp Contact */}
                {item.contact && (
                  <a
                    href={`https://wa.me/${item.contact.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-center"
                  >
                    💬 Contact on WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No items available for exchange yet.
          </p>
        )}
      </div>
    </section>
  );
}
