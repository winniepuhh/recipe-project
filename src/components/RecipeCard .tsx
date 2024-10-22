import { useFavorites } from './FavouritesContext'; // Імпортуємо контекст
import { Recipe } from './GetAllrecipes';

interface RecipeCardProps {
    title: string;
    imageUrl: string;
    recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, imageUrl, recipe }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);


    return (
        <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-4 m-4">
            {/* Назва страви */}
            <h2 className="text-xl font-bold mb-2">{title}</h2>

            {/* Категорія */}
            {recipe.strCategory && <p className="text-gray-700 mb-1">Категорія: {recipe.strCategory}</p>}
            {/* Місце походження */}
            {recipe.strArea && <p className="text-gray-700 mb-2">Місце походження: {recipe.strArea}</p>}

            {/* Картинка страви */}
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-2" />

            {/* Кнопка детальніше */}
            <div className="flex justify-between items-center">
                <button
                    className={`py-1 px-2 rounded ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => toggleFavorite(recipe)}
                >
                    {isFavorite ? '❤️' : '♡'}
                </button>
                <button
                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                    onClick={() => window.location.href = `/recipe/${recipe.idMeal}`}
                >
                    Детальніше
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;
