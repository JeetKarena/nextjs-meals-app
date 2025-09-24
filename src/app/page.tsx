import Link from "next/link";
import { fetchRecipes } from "@/lib/fetchRecipes";
import RecipeDisplaySection from "../components/RecipeDisplaySection";
import FeaturedRecipesGrid from "../components/FeaturedRecipesGrid";
import CookingTips from "../components/CookingTips";

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
