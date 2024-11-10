import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import imgsignup from './img_signup.jpg';
import './signup.css';
import axios from 'axios';

const Signup = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { login, password })
            .then(res => {
                console.log(res.data);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='signup'>
            <div className="signup__container">
                <div className='signup__row'>
                    <form onSubmit={handleSubmit} className="signup__form">
                        <div className="signup__title">
                            <p>Sign up</p>
                        </div>
                        <div className="signup__auth signup__login">
                            <label htmlFor="signupLogin">Email</label>
                            <input type="text" name="signupLogin" id="signupLogin" value={login} onChange={(e) => setLogin(e.target.value)} required />
                        </div>
                        <div className="signup__auth signup__password">
                            <label htmlFor="signupPassword">Password</label>
                            <input type="password" name="signupPassword" id="signupPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type='submit' className='signup__button'>Get started</button>
                        <div className='signup__tosignup'>
                            <p>Already have an account? <NavLink to="/login" style={{ color: "#32794F" }}>Sign in</NavLink></p>
                        </div>
                    </form>
                    <div className="signup__image">
                        <img src={imgsignup} alt="Healthy picture" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
