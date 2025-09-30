import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { getCache, setCache } from "@/lib/redis";

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

// Helper function to safely serialize Firebase data to plain objects
function serializeRecipe(recipeData: { id: string; [key: string]: unknown }): Recipe {
  return {
    id: recipeData.id,
    title: (recipeData.title as string) || "",
    category: (recipeData.category as string) || "",
    imageUrl: (recipeData.imageUrl as string) || "",
    instructions: (recipeData.instructions as string) || "",
    ingredients: Array.isArray(recipeData.ingredients) ? recipeData.ingredients as string[] : [],
  };
}

export async function fetchRecipes() {
  // First, try to get from cache
  const cachedRandomRecipe = await getCache<Recipe>(RANDOM_RECIPE_CACHE_KEY);
  const cachedFeaturedRecipes = await getCache<Recipe[]>(
    FEATURED_RECIPES_CACHE_KEY
  );

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

    const recipesData = recipesSnapshot.docs.map((doc) =>
      serializeRecipe({
        id: doc.id,
        ...doc.data(),
      })
    );

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
