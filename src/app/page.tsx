import Link from "next/link";
// import Image from "next/image";
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { getCache, setCache } from "@/lib/redis";
import RecipeDisplaySection from "../components/RecipeDisplaySection";
import FeaturedRecipesGrid from "../components/FeaturedRecipesGrid";
import CookingTips from "../components/CookingTips";

// Cache keys
const RANDOM_RECIPE_CACHE_KEY = "home:randomRecipe";
const FEATURED_RECIPES_CACHE_KEY = "home:featuredRecipes";
const CACHE_EXPIRY = 60 * 60; // 1 hour in seconds

interface Recipe {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  instructions: string;
  ingredients: string[];
}

export async function fetchRecipes() {
  // First, try to get from cache
  const cachedRandomRecipe = await getCache<Recipe>(RANDOM_RECIPE_CACHE_KEY);
  const cachedFeaturedRecipes = await getCache<Recipe[]>(FEATURED_RECIPES_CACHE_KEY);
  
  if (cachedRandomRecipe && cachedFeaturedRecipes) {
    console.log("Serving from cache");
    return {
      randomRecipe: cachedRandomRecipe,
      featuredRecipes: cachedFeaturedRecipes,
      fromCache: true,
    };
  }
  
  // If not in cache, fetch from Firestore
  try {
    const recipesRef = collection(db, "recipes");
    const recipesSnapshot = await getDocs(
      query(recipesRef, orderBy("title"), limit(12))
    );

    if (recipesSnapshot.empty) {
      return { randomRecipe: null, featuredRecipes: [], fromCache: false };
    }

    const recipesData = recipesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];

    // Select a random recipe for the hero section
    const randomIndex = Math.floor(Math.random() * recipesData.length);
    const randomRecipe = recipesData[randomIndex];

    // Select up to 9 recipes for the bento grid (excluding the random one)
    const featuredRecipes = recipesData
      .filter((_, index) => index !== randomIndex)
      .slice(0, 9);
    
    // Store in cache
    await setCache(RANDOM_RECIPE_CACHE_KEY, randomRecipe, CACHE_EXPIRY);
    await setCache(FEATURED_RECIPES_CACHE_KEY, featuredRecipes, CACHE_EXPIRY);
    
    return { randomRecipe, featuredRecipes, fromCache: false };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { randomRecipe: null, featuredRecipes: [], fromCache: false };
  }
}

export default async function Home() {
  const { randomRecipe, featuredRecipes } = await fetchRecipes();

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section with Random Recipe */}
      <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
        Recipe of the Day
      </h1>

      <RecipeDisplaySection recipe={randomRecipe} />

      {/* Add Recipe Button */}
      <div className="text-center mb-16">
        <Link
          href="/recipes/add"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all"
        >
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
            <path d="M12 5v14M5 12h14"></path>
          </svg>
          Add New Recipe
        </Link>
      </div>

      {/* Bento Grid Featured Recipes */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
          Featured Recipes
        </h2>

        <FeaturedRecipesGrid recipes={featuredRecipes} />
      </div>

      {/* Quick Tips Section */}
      <CookingTips />
    </div>
  );
}
