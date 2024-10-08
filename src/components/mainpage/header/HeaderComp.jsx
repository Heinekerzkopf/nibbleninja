import './headercomp.css'
import logo from '../../../img/logo_img.svg'
import logoText from '../../../img/logo_text.svg'

const header = () => {
    return (
        <div className="header">
            <div className="header__container">
                <nav className="header__nav">
                    <div className="header__row">
                        <div className="header__column-logo">
                            <div className='header__logo'>
                                <a href="#"><img src={logoText} alt="logo" /></a>
                                <a href="#"><img className='logo' src={logo} alt="logo" /></a>
                            </div>
                            <ul className='header__links'>
                                <li className='header__link'><a href="#">Features</a></li>
                                <li className='header__link'><a href="#">Menu plan</a></li>
                                <li className='header__link'><a href="#">Recipes</a></li>
                                <li className='header__link'><a href="#">Calories counter</a></li>
                            </ul>
                        </div>
                        <div className="header__column-login">
                            <div className='header__login-btns'>
                                {/* write LOGIN & ACCOUNT LOGIC function*/}
                                <button className='header__btn header__btn-login'>Login</button>
                                <button className='header__btn header__btn-singup'>Sign up</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default header;