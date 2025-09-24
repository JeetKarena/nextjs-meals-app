"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Recipe {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  instructions: string;
  ingredients: string[];
}

export default function RecipeDisplaySection({
  recipe,
}: {
  recipe: Recipe | null;
}) {
  if (!recipe) {
    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Image
          src="/cooking.svg"
          alt="No recipes"
          width={150}
          height={150}
          className="mx-auto mb-6 opacity-70"
        />
        <h3 className="text-2xl font-semibold mb-3">No Recipes Found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Start building your collection by adding your first recipe!
        </p>
        <Link href="/recipes/add">
          <motion.div
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-full shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            Add Your First Recipe
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-16"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.99 }}
      layoutId={`recipe-container-${recipe.id}`}
    >
      <div className="relative h-80 w-full">
        <Image
          src={
            recipe.imageUrl || "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8"
          layoutId={`recipe-gradient-${recipe.id}`}
        >
          <motion.h2
            className="text-3xl font-bold text-white"
            layoutId={`recipe-title-${recipe.id}`}
          >
            {recipe.title}
          </motion.h2>
          <motion.div
            className="inline-block px-3 py-1 bg-emerald-600/90 text-white text-sm rounded-full mt-2"
            layoutId={`recipe-category-${recipe.id}`}
          >
            {recipe.category}
          </motion.div>
        </motion.div>
      </div>
      <div className="p-8">
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
          {recipe.instructions}
        </p>
        <Link href={`/recipes/${recipe.id}`}>
          <motion.div
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-full shadow-md cursor-pointer"
            whileHover={{
              y: -2,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            View Recipe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}