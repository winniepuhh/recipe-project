import { API_URL, Recipe } from "./GetAllrecipes";

export const searchRecipes = async (searchQuery: string): Promise<Recipe[]> => {
    try {
      const response = await fetch(`${API_URL}/search.php?s=${searchQuery}`);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Error searching recipes:', error);
      return [];
    }
  };
