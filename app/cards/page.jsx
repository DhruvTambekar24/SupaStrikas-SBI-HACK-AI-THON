"use client"; // Required for Next.js with Framer Motion
import policy from "../../components/assets/policy.png";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import comingsoon from "../../components/assets/comingsoon.png";

const features = [
  {
    title: "ChurnShieldAI",
    description: "Predicts customer churn and suggests proactive retention strategies.",
    icon: "🤖",
    route: "/customer-churn",
  },
  {
    title: "InsightAI",
    description: "Provides AI-powered conversation starters and sentiment analysis.",
    icon: "🔍",
    route: "/dashboard",
  },
  {
    title: "PoliSmart",
    description: "Recommends dynamic, personalized insurance policies.",
    icon: "📜",
    route: "/policy-recommender",
  },
  {
    title: "PersonaXAI",
    description: "Builds evolving customer personas for hyper-personalization.",
    icon: "💬",
    route: "/persona-customer",
  },
  {
    title: "PolicySmart",
    description: "Analyzes policy effectiveness and engagement metrics.",
    icon: <Image src={policy} alt="policy" className="w-12 h-12" />,
    route: "/polismart",
  },
  {
    title: "Coming soon",
    description: "Coming soon....",
    icon: <Image src={comingsoon} alt="comingsoon" className="w-12 h-12" />,
    route: "#",
  },
];

const FeaturesPage = () => {
  const router = useRouter();

  return (
    <motion.section
      className="min-h-screen py-12 flex flex-col items-center justify-center bg-gradient-to-br from-[#B5179E]/70 to-[#240046] text-white px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-4xl text-gray-200 font-extrabold mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Our AI-Powered Features
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform text-center cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push(feature.route)} // Dynamic Route Navigation
          >
            <div className="text-4xl mb-4 flex justify-center items-center">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div
        className="goback cursor-pointer text-sm mt-4 text-right"
        onClick={() => router.push("/")}
      >
        Go back
      </div>
    </motion.section>
  );
};

export default FeaturesPage;
