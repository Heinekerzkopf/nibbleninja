// src/components/login/Login.jsx
import './login.css';
import imgLogin from './img_login.jpg';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { login: loginInput, password })
            .then(res => {
                if (res.data === "Login Successfully") {
                    login();
                    localStorage.setItem('userLogin', loginInput); // Store the login
                    navigate('/account');
                } else {
                    alert("Check your email or password...")
                    console.log(res.data);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='login'>
            <div className="login__container">
                <div className='login__row'>
                    <form onSubmit={handleSubmit} className="login__form">
                        <div className="login__title">
                            <p>Login</p>
                        </div>
                        <div className="login__auth login__email">
                            <label htmlFor="login">Email</label>
                            <input
                                type="email"
                                value={loginInput}
                                name="login"
                                id="login"
                                onChange={(e) => setLoginInput(e.target.value)}
                            />
                        </div>
                        <div className="login__auth login__password">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                value={password}
                                name="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <NavLink to="/reset" className='login__forget-password'>Forget password?</NavLink>
                        </div>
                        <button type='submit' className='login__button'>Login</button>
                        <div className='login__tosignup'>
                            <p>Don't have an account? <NavLink to="/signup" style={{ color: "#32794F" }}>Sign up</NavLink></p>
                        </div>
                    </form>
                    <div className="login__image">
                        <img src={imgLogin} alt="Healthy picture" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
