"use client";

import Image from "next/image";
import Link from "next/link";

interface Recipe {
  id: string;
  title: string;
  category: string;
  instructions: string;
  ingredients: string[];
  imageUrl: string;
}

export default function RecipeDetails({ recipe }: { recipe: Recipe }) {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96 w-full">
          <Image
            src={recipe.imageUrl || "https://via.placeholder.com/800x400"}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{recipe.title}</h1>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {recipe.category}
          </span>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Instructions</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {recipe.instructions}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="text-blue-500 hover:underline">
              &larr; Back to all recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}