import { useState, useEffect } from 'react'
import logo from '../../../img/logo_img.svg'
import logoText from '../../../img/logo_text.svg'
import './headercomp.css'
import { NavLink } from 'react-router-dom'

const HeaderComp = () => {

    /* funkcionalita => pri scrollu se nam prida background color a opacity pro header */
    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    return (
        <div className={isFixed ? 'scroll__header header' : 'header'}>
            <div className="header__container">
                <nav className="header__nav">
                    <div className="header__row">
                        <div className="header__column-logo">
                            <div className='header__logo'>
                                <NavLink to="." end><img src={logoText} alt="logo" /></NavLink>
                                <NavLink to="." end><img className='logo' src={logo} alt="logo" /></NavLink>
                            </div>
                            <ul className='header__links'>
                                <li className='header__link'><NavLink to="." end>Home</NavLink></li>
                                <li className='header__link'><NavLink to="menuplan">Menu plan</NavLink></li>
                                <li className='header__link'><NavLink to="recipes">Recipes</NavLink></li>
                                <li className='header__link'><NavLink to="caloriescounter">Calories counter</NavLink></li>
                            </ul>
                        </div>
                        <div className="header__column-login">
                            <div className='header__login-btns'>
                                {/* write LOGIN & ACCOUNT LOGIC function*/}
                                <NavLink to="login" className='header__btn header__btn-login'>Login</NavLink>
                                <NavLink to="signup" className='header__btn header__btn-singup'>Sign up</NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default HeaderComp;