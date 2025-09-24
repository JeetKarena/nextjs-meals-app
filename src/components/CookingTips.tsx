"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function CookingTips() {
  const tipsRef = useRef(null);
  const tipsInView = useInView(tipsRef, { once: true, margin: "-100px" });

  const tips = [
    {
      title: "Prep Ingredients First",
      description:
        "Have all ingredients measured, chopped, and prepared before starting to cook for a smoother cooking experience.",
      icon: (
        <path d="M12 2v8M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M16 6l-4 4-4-4"></path>
      ),
      color: "emerald",
    },
    {
      title: "Taste As You Go",
      description:
        "Season gradually and taste frequently throughout the cooking process to achieve the perfect flavor balance.",
      icon: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
          <path d="M3 9h18M9 21V9"></path>
        </>
      ),
      color: "blue",
    },
    {
      title: "Rest Your Meat",
      description:
        "Allow cooked meat to rest before slicing to retain juices and ensure maximum tenderness and flavor.",
      icon: (
        <>
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </>
      ),
      color: "amber",
    },
  ];

  return (
    <motion.section
      ref={tipsRef}
      className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-8"
      initial="hidden"
      animate={tipsInView ? "visible" : "hidden"}
      variants={fadeIn}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-6">Cooking Tips</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={tipsInView ? "visible" : "hidden"}
      >
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            className={`bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm`}
            variants={fadeIn}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{
              y: -4,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <div
              className={`p-3 rounded-full inline-block mb-4 ${
                tip.color === "emerald"
                  ? "bg-emerald-100 dark:bg-emerald-900/30"
                  : tip.color === "blue"
                  ? "bg-blue-100 dark:bg-blue-900/30"
                  : "bg-amber-100 dark:bg-amber-900/30"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                  tip.color === "emerald"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : tip.color === "blue"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-amber-600 dark:text-amber-400"
                }
              >
                {tip.icon}
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{tip.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}