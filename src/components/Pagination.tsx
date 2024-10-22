import { Recipe } from "./GetAllrecipes";

export const paginateRecipes = (recipes: Recipe[], currentPage: number, pageSize: number): Recipe[] => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return recipes.slice(start, end);
  };