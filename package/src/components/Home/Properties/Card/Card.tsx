"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Card({ item }: { item: any }) {
  const router = useRouter();

  // 🧠 Fix the image path handling logic
  const imageSrc =
    item.image?.startsWith("http")
      ? item.image
      : item.image
      ? `/uploads/${item.image}`
      : "/images/placeholder.jpg"; // fallback image inside /public/images

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition group">
      {/* 🖼 Item Image */}
      <div className="overflow-hidden rounded-t-2xl">
        <Image
          src={item.image || "/placeholder.jpg"}
          alt={item.name || "Item"}
          width={400}
          height={300}
          className="w-full h-60 object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />

      </div>

      {/* 📝 Item Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        <p className="mt-2 text-blue-600 font-bold">₹{item.price}</p>

        {/* 🛒 Buy Now Button */}
        <button
          onClick={() => router.push(`/buy/${item._id}`)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
