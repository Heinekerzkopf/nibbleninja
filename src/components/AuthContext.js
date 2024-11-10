import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [currentCalories, setCurrentCalories] = useState(0);

    useEffect(() => {
        const userStatus = localStorage.getItem('isAuthenticated');
        if (userStatus) {
            setIsAuthenticated(true);
            const savedDetails = JSON.parse(localStorage.getItem('userDetails'));
            if (savedDetails) {
                setUserDetails(savedDetails);
            }
        }
    
        const savedCalories = localStorage.getItem('currentCalories');
        const lastResetDate = localStorage.getItem('lastResetDate');
        const today = new Date().toDateString();
    
        // Check if the calories should be reset for a new day
        if (lastResetDate !== today) {
            setCurrentCalories(0);
            localStorage.setItem('currentCalories', '0');
            localStorage.setItem('lastResetDate', today);
        } else if (savedCalories) {
            setCurrentCalories(parseInt(savedCalories, 10));
        }
    }, []);
    

    const addCalories = (calories) => {
        setCurrentCalories((prevCalories) => {
            const newCalories = prevCalories + calories;
            // Save the updated currentCalories to localStorage
            localStorage.setItem('currentCalories', newCalories);
            return newCalories;
        });
    };

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        const savedDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (savedDetails) {
            setUserDetails(savedDetails);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentCalories'); // Clear calories on logout
    };

    const updateUserDetails = (details) => {
        setUserDetails(details);
        localStorage.setItem('userDetails', JSON.stringify(details));
    };

    const calculateDailyCalorieGoal = () => {
        if (!userDetails) return 0;
        const { weight, height, age, gender } = userDetails;
        const BMR = gender === 'male'
            ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
            : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        return Math.round(BMR * 1.2);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login,
            logout,
            userDetails,
            updateUserDetails,
            dailyGoal: calculateDailyCalorieGoal(),
            currentCalories,
            addCalories, // Function to add calories and save to localStorage
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
