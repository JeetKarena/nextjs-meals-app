"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

interface Recipe {
  id: string;
  title: string;
  category: string;
  instructions: string;
  ingredients: string[];
  imageUrl: string;
}

// Correct the type for the params prop
export default function RecipePage({ params }: { params: { id: string } }) {
  // Directly access the id from params
  const { id: recipeId } = params;
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const docRef = doc(db, "recipes", recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe({
            id: docSnap.id,
            ...docSnap.data(),
          } as Recipe);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">
            {error || "Recipe not found"}
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
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
            >
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64 md:h-80">
          <Image
            src={
              recipe.imageUrl ||
              "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={recipe.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-3 py-1 bg-amber-950/80 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-amber-500 transition-colors"
            >
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
              >
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
              Back
            </Link>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
              {recipe.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            {recipe.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-3">Instructions</h2>
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                {recipe.instructions}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-baseline gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
