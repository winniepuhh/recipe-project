import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe } from './GetAllrecipes';

interface FavoritesContextType {
    favorites: Recipe[];
    toggleFavorite: (recipe: Recipe) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Recipe[]>(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    const toggleFavorite = (recipe: Recipe) => {
        const updatedFavorites = favorites.some(fav => fav.idMeal === recipe.idMeal)
            ? favorites.filter(fav => fav.idMeal !== recipe.idMeal)
            : [...favorites, recipe];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
