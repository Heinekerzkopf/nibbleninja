import { useState } from 'react';
import './recipes.css';

const Recipes = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!query.trim()) return; 

        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${query}`, {
                method: 'GET',
                headers: { 'X-Api-Key': 'WCvcmXsZPVJ6cZjUT347ZQ==vvtYOjx41sJqxLTN' }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }

            const data = await response.json();
            setRecipes(data);
            setError('');
        } catch (err) {
            setError('Could not retrieve recipes. Please try again later.');
        }
    };

    return (
        <div className="recipes">
            <div className="recipes__container">
                <h1>Recipes</h1>
                <div className="recipes__search">
                    <input
                        type="text"
                        placeholder="Enter recipe name, e.g., mushroom risotto"
                        value={query}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="recipes__list">
                    {recipes.length > 0 ? (
                        recipes.map((recipe, index) => (
                            <div key={index} className="recipe__card">
                                <h2>{recipe.title}</h2>
                                <p><strong>Servings:</strong> {recipe.servings}</p>
                                <p><strong>Ingredients:</strong> {recipe.ingredients.replace(/\|/g, ', ')}</p>
                                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            </div>
                        ))
                    ) : (
                        <p>No recipes found. Try searching for something else.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recipes;
