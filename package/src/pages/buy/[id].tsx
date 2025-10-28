import { GetServerSideProps } from "next";
import { connectToDB } from "@/lib/mongodb";
import Item from "@/models/Item";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

type ItemType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function BuyItemPage({ item }: { item: ItemType }) {
  const router = useRouter();
  const [payment, setPayment] = useState("");

  const handlePayment = () => {
    if (!payment) {
      alert("Please select a payment method");
      return;
    }
    alert(`Proceeding with ${payment} payment`);
    // 🔜 Later integrate Razorpay / Stripe here
  };

  if (!item) return <p className="text-center mt-10">Item not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Buy Item</h2>
      <Image
        src={item.image?.startsWith("http") ? item.image : item.image}
        alt={item.name}
        width={500}
        height={350}
        className="rounded-xl object-cover w-full h-64 mb-4"
        unoptimized
      />
      <h3 className="text-xl font-medium mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <p className="text-lg font-bold mb-4 text-blue-700">${item.price}</p>

      <div className="space-y-2">
        <h4 className="font-semibold mb-2">Select Payment Method:</h4>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setPayment(e.target.value)}
          />
          UPI / Google Pay / PhonePe
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="Card"
            onChange={(e) => setPayment(e.target.value)}
          />
          Credit / Debit Card
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="COD"
            onChange={(e) => setPayment(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </div>
  );
}

// 🔹 Server-side fetch the item
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  await connectToDB();
  const item = await Item.findById(id).lean();

  if (!item) {
    return { notFound: true };
  }

  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
    },
  };
};
