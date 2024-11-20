// src/components/header/HeaderComp.js
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import logo from '../../../img/logo_img.svg';
import logoText from '../../../img/logo_text.svg';
import './headercomp.css';

const HeaderComp = () => {
    const { isAuthenticated, logout, dailyGoal, currentCalories, loading } = useAuth();
    const navigate = useNavigate();
    const [isFixed, setIsFixed] = useState(false);


    useEffect(() => {
        const handleScroll = () => setIsFixed(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={isFixed ? 'scroll__header header' : 'header'}>
            <div className="header__container">
                <div className="header__row">
                    <div className='header__logo'>
                        <NavLink to="." end><img className='logo__txt' src={logoText} alt="logo" /></NavLink>
                        <NavLink to="." end><img className='logo' src={logo} alt="logo" /></NavLink>
                    </div>
                    <nav className="header__column-logo">
                        <ul className='header__links'>
                            <li className='header__link'><NavLink to="." end>Home</NavLink></li>
                            <li className='header__link'><NavLink to="menuplan">Menu Planner</NavLink></li>
                            <li className='header__link'><NavLink to="recipes">Recipes</NavLink></li>
                            <li className='header__link'><NavLink to="caloriescounter">Get Nutrition</NavLink></li>
                        </ul>
                    </nav>
                    <div className="header__column-login">
                        <div className='header__login-btns'>
                            {isAuthenticated && !loading && (
                                <>
                                    {dailyGoal > 0 ? (
                                        <div className="header__calorie-bar">
                                            <div className="header__calorie-bar-label">
                                                {Math.round(currentCalories)} / {Math.round(dailyGoal)} kcal
                                            </div>
                                            <div className="header__calorie-bar-track">
                                                <div
                                                    className="header__calorie-bar-fill"
                                                    style={{ width: `${(currentCalories / dailyGoal) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="header__calorie-bar">
                                            <div className="header__calorie-bar-label">0 / 0 kcal</div>
                                        </div>
                                    )}
                                    <NavLink to="/account" className='header__btn header__btn-account'>Account</NavLink>
                                    <button onClick={handleLogout} className='header__btn header__btn-logout'>Logout</button>
                                </>
                            )}
                            {!isAuthenticated && (
                                <>
                                    <NavLink to="/login" className='header__btn header__btn-login'>Login</NavLink>
                                    <NavLink to="/signup" className='header__btn header__btn-signup'>Sign up</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderComp;
