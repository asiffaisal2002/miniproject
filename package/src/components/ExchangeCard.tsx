'use client';
import { useEffect, useState } from 'react';

export default function ExchangeItemsPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/getItems')
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center"
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
          )}
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.category}</p>
          <p className="text-gray-700 text-sm mb-4">{item.description}</p>

          <a
            href={`https://wa.me/${item.contact.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Message on WhatsApp
          </a>
        </div>
      ))}
    </div>
  );
}
