import { NavLink } from 'react-router-dom'
import mainpage__image from '../img_mainpage/mainpage_img.svg'
import './healthy.css'

const Healthy = () => {
    return (
        <div className="healthy">
            <div className="healthy__container">
                <div className="healthy__row">
                    <div className="healthy__column-text">
                        <div className="text-column__title">
                            <h1><span>Healthy</span> living made  easy!!</h1>
                        </div>
                        <div className="text-column__text">
                            <p>Get your meal plans, recipes & count your calories</p>
                        </div>
                        <div className="text-column__btn">
                            <NavLink to="login" className="button__text-column">Sign in</NavLink>
                            <span className="text__text-column">Sign in & get started today</span>
                        </div>
                    </div>
                    <div className="healthy__column-img">
                        <img src={mainpage__image} alt="mainpage image" className="img-column__image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Healthy