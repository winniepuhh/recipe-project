// Favorites.tsx
import React from 'react';
import { useFavorites } from '../FavouritesContext';
import RecipeCard from '../RecipeCard ';

const Favorites: React.FC = () => {
    const { favorites } = useFavorites();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Улюблені Рецепти</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.length > 0 ? (
                    favorites.map((recipe) => (
                        <RecipeCard
                            key={recipe.idMeal}
                            title={recipe.strMeal}
                            imageUrl={recipe.strMealThumb}
                            recipe={recipe}
                        />
                    ))
                ) : (
                    <p className='text-black'>У вас немає улюблених рецептів.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
