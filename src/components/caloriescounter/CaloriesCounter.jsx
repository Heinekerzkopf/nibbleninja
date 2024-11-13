import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './caloriescounter.css';

const CaloriesCounter = () => {
    const { isAuthenticated, addCalories } = useAuth();
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [error, setError] = useState(null);


    const fetchNutritionData = async () => {
        const APP_ID = 'e6c9ee31'
        const APP_KEY = '057997d7deb63d7d6edfe49c46c36721'

        try {
            const response = await fetch(
                `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=cooking&ingr=${encodeURIComponent(query)}`
            );
            if (!response.ok) throw new Error('Failed to fetch nutrition data');
            const data = await response.json();

            // Check if data has valid calories information
            if (data.calories) {
                setNutritionData({
                    name: query,
                    calories: data.calories,
                    protein: data.totalNutrients.PROCNT?.quantity || 0,
                    carbs: data.totalNutrients.CHOCDF?.quantity || 0,
                    fat: data.totalNutrients.FAT?.quantity || 0,
                    servingSize: data.totalWeight || 0,
                });
                setError(null);
            } else {
                throw new Error('Nutrition data unavailable for this item');
            }
        } catch (err) {
            setError(err.message);
            setNutritionData(null);
        }
    };

    const handleAddCalories = (calories) => {
        addCalories(calories);
    };

    return (

        <>
            {isAuthenticated ? (
                <div className="caloriescounter">
                    <div className="caloriescounter__container">
                        <h1>Nutrition Info</h1>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter food item"
                        />
                        <button onClick={fetchNutritionData}>Get Nutrition Info</button>

                        {error && <p className="error-message">{error}</p>}

                        {nutritionData && (
                            <div className="nutrition-card">
                                <h2>{nutritionData.name}</h2>
                                <p>Calories: <span>{nutritionData.calories} kcal</span></p>
                                <p>Protein: <span>{nutritionData.protein.toFixed(1)} g</span></p>
                                <p>Carbohydrates: <span>{nutritionData.carbs.toFixed(1)} g</span></p>
                                <p>Fat: <span>{nutritionData.fat.toFixed(1)} g</span></p>
                                <p>Serving Size: <span>{nutritionData.servingSize.toFixed(1)} g</span></p>
                                <button onClick={() => handleAddCalories(nutritionData.calories)}>
                                    Add Kcal
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='caloriescounter'>
                    <div className='caloriescounter__container'>
                        <h1>Nutrition Info</h1>
                        <div>
                            <p>If  you want to get nutrition info you need to sign up or log in</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CaloriesCounter;
