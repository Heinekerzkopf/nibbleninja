// src/components/account/Account.js
import React, { useState } from 'react';
import './account.css';
import imgAccount from './img_account.jpg';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Account = () => {
    const { updateUserDetails } = useAuth();
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('');
    const [goal, setGoal] = useState('');
    const [height, setHeight] = useState('');
    const login = localStorage.getItem('userLogin');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { login, age, gender, weight, goal, height };

        if (age <= 1 || age >= 99) {
            alert("I think there is something wrong with your age 🤡")
            return
        }
        if (weight <= 10 || weight >= 250) {
            alert("I think there is something wrong with your weight 🤡")
            return
        }
        if (goal <= 10 || goal >= 250) {
            alert("I think there is something wrong with your goal 🤡")
            return
        }
        if (height <= 80 || weight >= 250) {
            alert("I think there is something wrong with your weight 🤡")
            return
        }

        try {
            await axios.post('http://localhost:3001/account', formData);
            updateUserDetails(formData);
            alert('Details were saved successfully');
            setAge('');
            setWeight('');
            setGoal('');
            setHeight('');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='account'>
            <div className="account__container">
                <div className='account__row'>
                    <form className="account__form" onSubmit={handleSubmit}>
                        <div className="account__title">
                            <p>Fill up your details</p>
                        </div>
                        <div className="account__details account__age">
                            <label htmlFor="age">Your age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                name="age"
                                id="age"
                                placeholder='Enter your age'
                                required
                            />
                        </div>
                        <div className="account__details account__gender">
                            <p>Gender</p>
                            <div className='gender__selection'>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="account__details account__weight">
                            <label htmlFor="weight">Current weight</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                name="weight"
                                id="weight"
                                placeholder='Enter your current weight in kgs'
                                required
                            />
                        </div>
                        <div className="account__details account__goal">
                            <label htmlFor="goal">Your goal</label>
                            <input
                                type="number"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                name="goal"
                                id="goal"
                                placeholder='Enter your desired weight in kgs'
                                required
                            />
                        </div>
                        <div className="account__details account__height">
                            <label htmlFor="height">Height</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                name="height"
                                id="height"
                                placeholder='Enter your height in cms'
                                required
                            />
                        </div>
                        <button type='submit' className='account__button'>Submit details</button>
                    </form>
                    <div className="account__image">
                        <img src={imgAccount} alt="Healthy picture" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
