"use client";

import { useState } from "react";

export default function IngredientFormClient() {
  const [ingredients, setIngredients] = useState(['']);
  
  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  
  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={addIngredient}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          + Add Ingredient
        </button>
      </div>
      
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder={`Ingredient ${index + 1}`}
          />
          {ingredients.length > 1 && (
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-600 hover:text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}