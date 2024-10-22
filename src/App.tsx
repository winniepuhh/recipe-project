// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipesList from './components/Pages/RecipesList';
import  Favorites  from './components/Pages/Favourites';
import  RecipeDetails  from './components/Pages/RecipeDetail ';
import { FavoritesProvider } from './components/FavouritesContext';

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<RecipesList />} /> {/* Головна сторінка */}
            <Route path="/favorites" element={<Favorites />} /> {/* Сторінка доданих рецептів */}
            <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* Сторінка деталей */}
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
