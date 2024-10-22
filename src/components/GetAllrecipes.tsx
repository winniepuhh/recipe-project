export const API_URL = 'https://www.themealdb.com/api/json/v1/1';

// Тип для рецепта
export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strMealThumb: string;
    strArea: string;
  }
  
// Отримати всі рецепти
export const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${API_URL}/search.php?s=`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    return [];
  }
};