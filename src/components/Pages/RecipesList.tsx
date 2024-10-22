import React, { useState, useEffect } from 'react';
import { getAllRecipes, Recipe } from '../GetAllrecipes';
import { getRecipesByCategory } from '../FilterByCategory';
import { searchRecipes } from '../Search';
import { paginateRecipes } from '../Pagination';
import RecipeCard from '../RecipeCard ';
import { Link } from 'react-router-dom';

const RecipesList: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? Number(savedPage) : 1;
    });
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [category, setCategory] = useState<string>(() => {
        const savedCategory = localStorage.getItem('category');
        return savedCategory ? savedCategory : '';
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        const fetchRecipes = async () => {
            const allRecipes = await getAllRecipes();
            setRecipes(allRecipes);
            setTotalPages(Math.ceil(allRecipes.length / pageSize));
            setFilteredRecipes(allRecipes);
        };

        fetchRecipes();
    }, []);

    useEffect(() => {
        const fetchByCategory = async () => {
            if (category) {
                const recipesByCategory = await getRecipesByCategory(category);
                setFilteredRecipes(recipesByCategory);
                setCurrentPage(1); // Скидаємо на першу сторінку
                setTotalPages(Math.ceil(recipesByCategory.length / pageSize));
            } else {
                setFilteredRecipes(recipes);
                setTotalPages(Math.ceil(recipes.length / pageSize));
            }
        };

        fetchByCategory();
    }, [category, recipes]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm) {
                const searchResults = await searchRecipes(searchTerm);
                setFilteredRecipes(searchResults);
                setCurrentPage(1); // Скидаємо на першу сторінку
                setTotalPages(Math.ceil(searchResults.length / pageSize));
            } else {
                setFilteredRecipes(recipes);
                setTotalPages(Math.ceil(recipes.length / pageSize));
            }
        };
        fetchSearchResults();
    }, [searchTerm, recipes]);

    const paginatedRecipes = paginateRecipes(filteredRecipes, currentPage, pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        localStorage.setItem('currentPage', String(page));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        localStorage.setItem('category', selectedCategory);
    };

    const renderPagination = () => {
        const pages = [];

        if (totalPages <= 10) {
            // Якщо всього сторінок 10 або менше, відображаємо всі
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        className={`px-3 py-1 mx-1 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Відображаємо перші 7 сторінок
            for (let i = 1; i <= 7; i++) {
                pages.push(
                    <button
                        key={i}
                        className={`px-3 py-1 mx-1 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }

            // Додаємо три крапки, якщо поточна сторінка менше 8
            if (currentPage < 8) {
                pages.push(<span key="ellipsis1" className="mx-1">...</span>);
            }

            // Додаємо останню сторінку, якщо вона не є вже показаною
            if (currentPage < totalPages - 1) {
                pages.push(
                    <button
                        key={totalPages}
                        className={`px-3 py-1 mx-1 rounded ${totalPages === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                );
            }

            // Додаємо крапки перед останньою сторінкою, якщо потрібно
            if (currentPage > 7) {
                pages.push(<span key="ellipsis2" className="mx-1">...</span>);
                for (let i = totalPages - 6; i <= totalPages; i++) {
                    if (i > 7) {
                        pages.push(
                            <button
                                key={i}
                                className={`px-3 py-1 mx-1 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                                onClick={() => handlePageChange(i)}
                            >
                                {i}
                            </button>
                        );
                    }
                }
            }
        }

        return pages;
    };

    console.log('www.themealdb.com/api/json/v1/1/categories.php');
    


    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Recipes</h1>

            <div className='flex justify-between'>
                <select
                    onChange={handleCategoryChange}
                    value={category}
                    className="mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">All</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Beef">Beef</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Pork">Pork</option>
                    <option value="Side">Side</option>
                    <option value="Starter">Starter</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Goat">Goat</option>
                </select>

                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button className='bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800'>
                    <Link to='/favorites'>
                        УЛЮБЛЕНІ❤️
                    </Link>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.idMeal}
                        title={recipe.strMeal}
                        imageUrl={recipe.strMealThumb}
                        recipe={recipe}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center mt-8">
                <button
                    className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Prev
                </button>
                {renderPagination()}
                <button
                    className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecipesList;
