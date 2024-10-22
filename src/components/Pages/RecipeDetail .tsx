import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strMealThumb: string;
    strInstructions: string;
    strYoutube: string;
    [key: string]: string | undefined; // Дозволяємо використовувати будь-який ключ-рядок для інгредієнтів і мір
}


const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            setRecipe(data.meals[0]);
        };

        fetchRecipeDetails();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-60 h-60 object-cover mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            <ul>
                {Array.from({ length: 20 }, (_, index) => {
                    const ingredient = recipe[`strIngredient${index + 1}`];
                    const measure = recipe[`strMeasure${index + 1}`];
                    if (ingredient) {
                        return (
                            <li key={index}>
                                {measure} {ingredient}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <h2 className="text-xl font-semibold mt-4">Instructions:</h2>
            <p>{recipe.strInstructions}</p>
            <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-4 block">
                Watch the video
            </a>
        </div>
    );
};

export default RecipeDetail;
