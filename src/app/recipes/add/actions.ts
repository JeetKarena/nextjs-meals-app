"use server";

import { invalidateCache } from "@/lib/redis";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { redirect } from "next/navigation";


export async function addRecipe(formData: FormData) {
  try {
    // Extract values from form data
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const instructions = formData.get('instructions') as string;
    const imageUrl = formData.get('imageUrl') as string;
    
    // Get all ingredient values (multiple inputs with the same name)
    const ingredientValues = formData.getAll('ingredient') as string[];
    
    // Filter out empty ingredients
    const filteredIngredients = ingredientValues.filter(ing => ing.trim() !== '');
    
    if (!title || !category || !instructions || !imageUrl || filteredIngredients.length === 0) {
      return { error: 'All fields are required' };
    }
    
    // Add document to Firestore
    await addDoc(collection(db, "recipes"), {
      title,
      category,
      instructions,
      ingredients: filteredIngredients,
      imageUrl,
      createdAt: new Date(),
    });
    
    // Invalidate the cache for the home page recipes
    await invalidateCache("home:randomRecipe");
    await invalidateCache("home:featuredRecipes");
    
    // Redirect back to home after successful submission
    redirect('/');
    
  } catch (error) {
    console.error("Error adding recipe:", error);
    return { error: 'Failed to add recipe. Please try again.' };
  }
}