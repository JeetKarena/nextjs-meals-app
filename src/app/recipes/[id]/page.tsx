import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import RecipeDetails from "@/components/RecipeDetails";
import { notFound } from "next/navigation";

interface Recipe {
  id: string;
  title: string;
  category: string;
  instructions: string;
  ingredients: string[];
  imageUrl: string;
}

// Fix the params type to match Next.js 15 expectations
interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RecipePage({ params }: PageProps) {
  // Await params as required in Next.js 15
  const { id: recipeId } = await params;

  try {
    const docRef = doc(db, "recipes", recipeId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      notFound();
    }

    const data = docSnap.data();

    // Serialize the recipe data to avoid Firestore timestamp issues
    // Convert Firestore Timestamp to plain string
    const recipe: Recipe = {
      id: docSnap.id,
      title: data?.title || "",
      category: data?.category || "",
      instructions: data?.instructions || "",
      ingredients: Array.isArray(data?.ingredients) ? data.ingredients : [],
      imageUrl: data?.imageUrl || "",
    };

    return <RecipeDetails recipe={recipe} />;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    notFound();
  }
}
