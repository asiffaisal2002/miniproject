import { GetServerSideProps } from "next";
import { connectToDB } from "@/lib/mongodb";
import Item from "@/models/Item";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type ItemType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function BuyItemPage({ item }: { item: ItemType }) {
  const [payment, setPayment] = useState("");
  const router = useRouter();

  const handlePayment = () => {
    if (!payment) {
      alert("Please select a payment method.");
      return;
    }
    alert(`Proceeding with ${payment} payment...`);
    // 🔜 Later integrate Razorpay / Stripe here
  };

  if (!item)
    return (
      <p className="text-center mt-20 text-gray-600 text-lg">Item not found.</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Confirm Your Purchase
        </h2>

        <div className="relative mb-6 rounded-xl overflow-hidden border border-gray-200">
          <Image
            src={item.image?.startsWith("http") ? item.image : item.image}
            alt={item.name}
            width={600}
            height={400}
            className="w-full h-64 object-cover"
            unoptimized
          />
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">
            {item.name}
          </h3>
          <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
          <p className="text-2xl font-bold text-blue-600">${item.price}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            Choose Payment Method
          </h4>

          <div className="space-y-3">
            {["UPI / Google Pay / PhonePe", "Credit / Debit Card", "Cash on Delivery"].map(
              (method, i) => (
                <label
                  key={i}
                  className={`flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition-all ${
                    payment === method
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span className="text-gray-700">{method}</span>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={payment === method}
                    onChange={(e) => setPayment(e.target.value)}
                    className="accent-blue-600"
                  />
                </label>
              )
            )}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          Continue to Pay
        </motion.button>
      </motion.div>
    </div>
  );
}

// 🔹 Server-side fetch the item
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  await connectToDB();
  const item = await Item.findById(id).lean();

  if (!item) return { notFound: true };

  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
    },
  };
};
