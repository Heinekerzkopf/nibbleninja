import './menuplan.css';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const MenuPlan = () => {
    const [mealType, setMealType] = useState("all");
    const [allergies, setAllergies] = useState([]);
    const [caloriesRange, setCaloriesRange] = useState({ min: '', max: '' });
    const [mealPlan, setMealPlan] = useState(null);
    const [recipeDetails, setRecipeDetails] = useState({});
    const { isAuthenticated, addCalories } = useAuth();
    const [showRecipe, setShowRecipe] = useState({});

    const handleMealTypeChange = (e) => setMealType(e.target.value);
    const handleAllergyChange = (e) => {
        const { value, checked } = e.target;
        setAllergies(checked ? [...allergies, value] : allergies.filter((a) => a !== value));
    };

    const toggleRecipeVisibility = (meal) => {
        setShowRecipe((prevState) => ({
            ...prevState,
            [meal]: !prevState[meal]
        }));
    };

    const handleCaloriesRangeChange = (e) => {
        const { name, value } = e.target;
        if (value >= 0) {
            setCaloriesRange((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const fetchRecipeDetails = async (recipeUri) => {
        const appId = 'bd7023fe';
        const appKey = 'bd6f23f34871c30aa8c8039bef5e6d08';

        const encodedUri = encodeURIComponent(recipeUri);
        const recipeUrl = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodedUri}&app_id=${appId}&app_key=${appKey}`;

        try {
            const response = await axios.get(recipeUrl, {
                headers: {
                    'Accept': 'application/json',
                    'Edamam-Account-User': 'teamawesome',
                    'Accept-Language': 'en'
                }
            });

            const recipe = response.data.hits[0]?.recipe;
            console.log("Full response for recipeUri:", recipeUri, response.data);

            if (recipe) {
                setRecipeDetails((prevState) => ({
                    ...prevState,
                    [recipeUri]: recipe
                }));
            }
        } catch (error) {
            console.error("Error fetching recipe details", error);
        }
    };

    const fetchMealPlan = async () => {
        const appId = 'bd7023fe';
        const appKey = 'bd6f23f34871c30aa8c8039bef5e6d08';
        const username = 'teamawesome';

        const base64Auth = btoa(`${appId}:${appKey}`);
        const endpoint = `https://api.edamam.com/api/meal-planner/v1/${appId}/select`;

        const mealFilter = {
            size: 7,
            plan: {
                accept: {
                    all: [
                        {
                            health: [...allergies]
                        }
                    ]
                },
                fit: {
                    ENERC_KCAL: {
                        min: caloriesRange.min || 1000,
                        max: caloriesRange.max || 2000
                    }
                },
                sections: {
                    Breakfast: {
                        accept: {
                            all: [
                                {
                                    meal: ["breakfast"]
                                }
                            ]
                        },
                        fit: {
                            ENERC_KCAL: {
                                min: 100,
                                max: 600
                            }
                        }
                    },
                    Lunch: {
                        accept: {
                            all: [
                                {
                                    meal: ["lunch"]
                                }
                            ]
                        },
                        fit: {
                            ENERC_KCAL: {
                                min: 300,
                                max: 900
                            }
                        }
                    },
                    Dinner: {
                        accept: {
                            all: [
                                {
                                    meal: ["dinner"]
                                }
                            ]
                        },
                        fit: {
                            ENERC_KCAL: {
                                min: 200,
                                max: 900
                            }
                        }
                    }
                }
            }
        };

        try {
            const response = await axios.post(endpoint, mealFilter, {
                headers: {
                    'Accept': 'application/json',
                    'Edamam-Account-User': username,
                    'Authorization': `Basic ${base64Auth}`,
                    'Content-Type': 'application/json'
                }
            });

            const mealPlanData = response.data.selection;

            if (mealPlanData && Array.isArray(mealPlanData)) {
                setMealPlan(mealPlanData);

                mealPlanData.forEach((day) => {
                    ['Breakfast', 'Lunch', 'Dinner'].forEach((meal) => {
                        const recipeUri = day.sections[meal]?.assigned;
                        if (recipeUri) {
                            fetchRecipeDetails(recipeUri);
                        }
                    });
                });
            } else {
                alert("No meal plan data available for the specified parameters")
            }
        } catch (error) {
            console.error("Error fetching meal plan", error);
        }
    };


    return (

        <>
            {isAuthenticated ? (
                < div className='menuplan' >
                    <div className='menuplan__container'>
                        <h2>Meal Planner</h2>
                        <div>
                            <label>Choose Meal Type:</label>
                            <select value={mealType} onChange={handleMealTypeChange}>
                                <option value="all">All</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>
                        <div>
                            <label>Allergies:</label>
                            <div className='menuplan__allergies'>
                                <label><input type="checkbox" value="DAIRY_FREE" onChange={handleAllergyChange} /> Dairy-Free</label>
                                <label><input type="checkbox" value="GLUTEN_FREE" onChange={handleAllergyChange} /> Gluten-Free</label>
                                <label><input type="checkbox" value="WHEAT_FREE" onChange={handleAllergyChange} /> Wheat-Free</label>
                                <label><input type="checkbox" value="EGG_FREE" onChange={handleAllergyChange} /> Egg-Free</label>
                                <label><input type="checkbox" value="MILK_FREE" onChange={handleAllergyChange} /> Milk-Free</label>
                                <label><input type="checkbox" value="PEANUT_FREE" onChange={handleAllergyChange} /> Peanut-Free</label>
                                <label><input type="checkbox" value="TREE_NUT_FREE" onChange={handleAllergyChange} /> Tree Nut-Free</label>
                                <label><input type="checkbox" value="SOY_FREE" onChange={handleAllergyChange} /> Soy-Free</label>
                                <label><input type="checkbox" value="FISH_FREE" onChange={handleAllergyChange} /> Fish-Free</label>
                                <label><input type="checkbox" value="SHELLFISH_FREE" onChange={handleAllergyChange} /> Shellfish-Free</label>
                                <label><input type="checkbox" value="PORK_FREE" onChange={handleAllergyChange} /> Pork-Free</label>
                                <label><input type="checkbox" value="RED_MEAT_FREE" onChange={handleAllergyChange} /> Red Meat-Free</label>
                                <label><input type="checkbox" value="CRUSTACEAN_FREE" onChange={handleAllergyChange} /> Crustacean-Free</label>
                                <label><input type="checkbox" value="CELERY_FREE" onChange={handleAllergyChange} /> Celery-Free</label>
                                <label><input type="checkbox" value="MUSTARD_FREE" onChange={handleAllergyChange} /> Mustard-Free</label>
                                <label><input type="checkbox" value="SESAME_FREE" onChange={handleAllergyChange} /> Sesame-Free</label>
                                <label><input type="checkbox" value="LUPINE_FREE" onChange={handleAllergyChange} /> Lupine-Free</label>
                                <label><input type="checkbox" value="MOLLUSK_FREE" onChange={handleAllergyChange} /> Mollusk-Free</label>
                                <label><input type="checkbox" value="ALCOHOL_FREE" onChange={handleAllergyChange} /> Alcohol-Free</label>
                                <label><input type="checkbox" value="SULFITE_FREE" onChange={handleAllergyChange} /> Sulfite-Free</label>
                                <label><input type="checkbox" value="FODMAP_FREE" onChange={handleAllergyChange} /> FODMAP-Free</label>
                            </div>
                        </div>

                        <div>
                            <label>Calorie Range:</label>
                            <input type="number" name="min" placeholder="Min Calories" value={caloriesRange.min} onChange={handleCaloriesRangeChange} />
                            <input type="number" name="max" placeholder="Max Calories" value={caloriesRange.max} onChange={handleCaloriesRangeChange} />
                        </div>
                        <button onClick={fetchMealPlan}>Search</button>

                        {mealPlan ? (
                            mealPlan.map((day, index) => (
                                <div className='menuplan__meals' key={index}>
                                    <h4>Day {index + 1}</h4>

                                    {/* Display Breakfast */}
                                    <div className='menuplan__meal'>
                                        <h5>Breakfast</h5>
                                        {day.sections.Breakfast && recipeDetails[day.sections.Breakfast.assigned] ? (
                                            <div className='menuplan__item'>
                                                <h6>{recipeDetails[day.sections.Breakfast.assigned].label}</h6>
                                                <img src={recipeDetails[day.sections.Breakfast.assigned].image} alt="recipe" />
                                                <p><strong>Proteins:</strong> {Math.round(recipeDetails[day.sections.Breakfast.assigned].totalNutrients.PROCNT.quantity)} g</p>
                                                <p><strong>Carbohydrates:</strong> {Math.round(recipeDetails[day.sections.Breakfast.assigned].totalNutrients.CHOCDF.quantity)} g</p>
                                                <p><strong>Sugars:</strong> {Math.round(recipeDetails[day.sections.Breakfast.assigned].totalNutrients.SUGAR.quantity)} g</p>
                                                <p><strong>Kcal:</strong> {Math.round(recipeDetails[day.sections.Breakfast.assigned].calories)} kcal</p>
                                                <p><strong>Kcal/serving:</strong> {Math.round(recipeDetails[day.sections.Breakfast.assigned].calories) / recipeDetails[day.sections.Breakfast.assigned].yield} kcal</p>
                                                <p><strong>Servings:</strong> {recipeDetails[day.sections.Breakfast.assigned].yield}</p>
                                                <button onClick={() => addCalories(Math.round(recipeDetails[day.sections.Breakfast.assigned].calories) / recipeDetails[day.sections.Breakfast.assigned].yield)}>
                                                    Add kcal
                                                </button>

                                                <button onClick={() => toggleRecipeVisibility('Breakfast')}>
                                                    {showRecipe['Breakfast'] ? 'Hide Recipe' : 'Show Recipe'}
                                                </button>

                                                {showRecipe['Breakfast'] && (
                                                    <>
                                                        <p>{recipeDetails[day.sections.Breakfast.assigned].ingredientLines.join(', ')}</p>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <p>No recipe assigned</p>
                                        )}
                                    </div>

                                    {/* Display Lunch */}
                                    <div className='menuplan__meal'>
                                        <h5>Lunch</h5>
                                        {day.sections.Lunch && recipeDetails[day.sections.Lunch.assigned] ? (
                                            <div className='menuplan__item'>
                                                <h6>{recipeDetails[day.sections.Lunch.assigned].label}</h6>
                                                <img src={recipeDetails[day.sections.Lunch.assigned].image} alt="recipe" />
                                                <p><strong>Proteins:</strong> {Math.round(recipeDetails[day.sections.Lunch.assigned].totalNutrients.PROCNT.quantity)} g</p>
                                                <p><strong>Carbohydrates:</strong> {Math.round(recipeDetails[day.sections.Lunch.assigned].totalNutrients.CHOCDF.quantity)} g</p>
                                                <p><strong>Sugars:</strong> {Math.round(recipeDetails[day.sections.Lunch.assigned].totalNutrients.SUGAR.quantity)} g</p>
                                                <p><strong>Kcal:</strong> {Math.round(recipeDetails[day.sections.Lunch.assigned].calories)} kcal</p>
                                                <p><strong>Kcal/serving:</strong> {Math.round(recipeDetails[day.sections.Lunch.assigned].calories) / recipeDetails[day.sections.Lunch.assigned].yield} kcal</p>
                                                <p><strong>Servings:</strong> {recipeDetails[day.sections.Lunch.assigned].yield}</p>
                                                <button onClick={() => addCalories(Math.round(recipeDetails[day.sections.Lunch.assigned].calories) / recipeDetails[day.sections.Lunch.assigned].yield)}>
                                                    Add kcal
                                                </button>

                                                <button onClick={() => toggleRecipeVisibility('Lunch')}>
                                                    {showRecipe['Lunch'] ? 'Hide Recipe' : 'Show Recipe'}
                                                </button>

                                                {showRecipe['Lunch'] && (
                                                    <>
                                                        <p>{recipeDetails[day.sections.Lunch.assigned].ingredientLines.join(', ')}</p>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <p>No recipe assigned</p>
                                        )}
                                    </div>

                                    {/* Display Dinner */}
                                    <div className='menuplan__meal'>
                                        <h5>Dinner</h5>
                                        {day.sections.Dinner && recipeDetails[day.sections.Dinner.assigned] ? (
                                            <div className='menuplan__item'>
                                                <h6>{recipeDetails[day.sections.Dinner.assigned].label}</h6>
                                                <img src={recipeDetails[day.sections.Dinner.assigned].image} alt="recipe" />
                                                <p><strong>Proteins:</strong> {Math.round(recipeDetails[day.sections.Dinner.assigned].totalNutrients.PROCNT.quantity)} g</p>
                                                <p><strong>Carbohydrates:</strong> {Math.round(recipeDetails[day.sections.Dinner.assigned].totalNutrients.CHOCDF.quantity)} g</p>
                                                <p><strong>Sugars:</strong> {Math.round(recipeDetails[day.sections.Dinner.assigned].totalNutrients.SUGAR.quantity)} g</p>
                                                <p><strong>Kcal:</strong> {Math.round(recipeDetails[day.sections.Dinner.assigned].calories)} kcal</p>
                                                <p><strong>Kcal/serving:</strong> {Math.round(recipeDetails[day.sections.Dinner.assigned].calories) / recipeDetails[day.sections.Dinner.assigned].yield} kcal</p>
                                                <p><strong>Servings:</strong> {recipeDetails[day.sections.Dinner.assigned].yield}</p>
                                                <button onClick={() => addCalories(Math.round(recipeDetails[day.sections.Dinner.assigned].calories) / recipeDetails[day.sections.Dinner.assigned].yield)}>
                                                    Add kcal
                                                </button>

                                                <button onClick={() => toggleRecipeVisibility('Dinner')}>
                                                    {showRecipe['Dinner'] ? 'Hide Recipe' : 'Show Recipe'}
                                                </button>

                                                {showRecipe['Dinner'] && (
                                                    <>
                                                        <p>{recipeDetails[day.sections.Dinner.assigned].ingredientLines.join(', ')}</p>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <p>No recipe assigned</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No meal plan available</p>
                        )}
                    </div>
                </ div>
            ) : (
                < div className='menuplan'>
                    <div className='menuplan__container'>
                        <h2>Meal Planner</h2>
                        <div className='menuplan__unautorizhed'>
                            <p>If you want to create your menu plan you need to sign up or log in</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuPlan;
