import { API_URL, Recipe } from "./GetAllrecipes";

export const getRecipesByCategory = async (category: string): Promise<Recipe[]> => {
    try {
      const response = await fetch(`${API_URL}/filter.php?c=${category}`);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      return [];
    }
  };