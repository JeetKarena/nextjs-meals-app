"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Recipe {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

// Animation variants
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

// Recipe card animations
const recipeCardVariants = {
  initial: { scale: 0.96, y: 20, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  exit: { scale: 0.95, y: 10, opacity: 0 },
  hover: {
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.98 },
};

export default function FeaturedRecipesGrid({ recipes }: { recipes: Recipe[] }) {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

  if (!recipes.length) {
    return (
      <motion.div
        className="text-center py-16 bg-gray-100 dark:bg-gray-800 rounded-xl"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-gray-400 mb-4"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 15h8M9 9h.01M15 9h.01"></path>
        </svg>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No featured recipes available. Add some recipes to see them here!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
      variants={staggerContainer}
      initial="hidden"
      animate={gridInView ? "visible" : "hidden"}
    >
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe.id}
          variants={fadeIn}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          className={`${
            index === 0
              ? "md:col-span-2 md:row-span-2"
              : index === 3
              ? "md:col-span-2"
              : ""
          }`}
        >
          <Link href={`/recipes/${recipe.id}`}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md relative group h-full"
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              variants={recipeCardVariants}
              layoutId={`recipe-card-${recipe.id}`}
            >
              <div className={`relative w-full ${index === 0 ? "h-96" : "h-48"}`}>
                <Image
                  src={
                    recipe.imageUrl ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 0.9 }}
                  transition={{ duration: 0.3 }}
                  layoutId={`recipe-overlay-${recipe.id}`}
                ></motion.div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <motion.span
                    className="inline-block px-2 py-1 bg-emerald-600/80 text-white text-xs rounded-full mb-2"
                    layoutId={`recipe-category-badge-${recipe.id}`}
                  >
                    {recipe.category}
                  </motion.span>
                  <motion.h3
                    className="font-bold text-white text-lg md:text-xl line-clamp-2"
                    layoutId={`recipe-title-${recipe.id}`}
                  >
                    {recipe.title}
                  </motion.h3>
                  <motion.div
                    className="mt-2 flex items-center text-white/80 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>View Recipe</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}