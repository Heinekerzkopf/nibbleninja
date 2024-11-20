import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [currentCalories, setCurrentCalories] = useState(0);
    const [dailyGoal, setDailyGoal] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const initialize = () => {
            const userStatus = localStorage.getItem('isAuthenticated');
            const savedUserLogin = localStorage.getItem('userLogin');

            if (userStatus === 'true' && savedUserLogin) {
                setIsAuthenticated(true);

                const savedDetails = JSON.parse(localStorage.getItem(`userDetails_${savedUserLogin}`));
                const savedCalories = parseInt(localStorage.getItem(`currentCalories_${savedUserLogin}`), 10) || 0;
                const lastResetDate = localStorage.getItem(`lastResetDate_${savedUserLogin}`);
                const today = new Date().toDateString();

                if (savedDetails) {
                    setUserDetails(savedDetails);
                    const calculatedGoal = calculateDailyCalorieGoal(savedDetails);
                    setDailyGoal(calculatedGoal);
                }

                if (lastResetDate !== today) {
                    setCurrentCalories(0);
                    localStorage.setItem(`currentCalories_${savedUserLogin}`, '0');
                    localStorage.setItem(`lastResetDate_${savedUserLogin}`, today);
                } else {
                    setCurrentCalories(savedCalories);
                }
            }
            setLoading(false);
        };

        initialize();
    }, []);


    const addCalories = (calories) => {
        if (!userDetails) return;

        const userLogin = localStorage.getItem('userLogin');
        setCurrentCalories((prevCalories) => {
            const newCalories = prevCalories + calories;
            localStorage.setItem(`currentCalories_${userLogin}`, newCalories);
            return newCalories;
        });
    };

    const login = (userLogin) => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userLogin', userLogin);

        const savedDetails = JSON.parse(localStorage.getItem(`userDetails_${userLogin}`));
        const savedCalories = parseInt(localStorage.getItem(`currentCalories_${userLogin}`), 10) || 0;

        if (savedDetails) {
            const calculatedGoal = calculateDailyCalorieGoal(savedDetails);

            setUserDetails(savedDetails);
            setDailyGoal(calculatedGoal);
        } else {
            setDailyGoal(0);
        }

        setCurrentCalories(savedCalories);
        setTimeout(() => {
            window.location.reload();
        }, 0)
    };



    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails(null);
        setCurrentCalories(0);
        setDailyGoal(0);

        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userLogin');
    };

    const updateUserDetails = (details) => {
        const userLogin = localStorage.getItem('userLogin');
        if (!userLogin) return;

        setUserDetails(details);
        const newDailyGoal = calculateDailyCalorieGoal(details);
        setDailyGoal(newDailyGoal);
        localStorage.setItem(`userDetails_${userLogin}`, JSON.stringify(details));
    };

    const calculateDailyCalorieGoal = (details) => {
        if (!details) return 0;

        const { weight, height, age, gender } = details;
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
            dailyGoal,
            currentCalories,
            addCalories,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
