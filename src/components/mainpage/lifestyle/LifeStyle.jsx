import './lifestyle.css'
import logo from './img/LIFESTYLE.png';
import icon from './img/icon.svg';

const LifeStyle = () => {
  return (
    <div className='lifestyle'>
        <div className="lifestyle__container">
            <div className="lifestyle__title-block">
                <h2 className='lifestyle_title'>Why healthy</h2>
                <img src={logo} alt="lifestyle_image" />
            </div>
            <div className="lifestyle__list">
                <div className='lifestyle__list-item'>
                    <img src={icon} alt='list_icon' className="list-item__icon"></img>
                    <div className="list-item__text">Improved physical health</div>
                </div>
                <div className='lifestyle__list-item'>
                    <img src={icon} alt='list_icon' className="list-item__icon"></img>
                    <div className="list-item__text">Better mental health</div>
                </div>
                <div className='lifestyle__list-item'>
                    <img src={icon} alt='list_icon' className="list-item__icon"></img>
                    <div className="list-item__text">Increased longevity</div>
                </div>
                <div className='lifestyle__list-item'>
                    <img src={icon} alt='list_icon' className="list-item__icon"></img>
                    <div className="list-item__text">Weight management</div>
                </div>
                <div className='lifestyle__list-item'>
                    <img src={icon} alt='list_icon' className="list-item__icon"></img>
                    <div className="list-item__text">Improved self-confidence</div>
                </div>
                <div className='lifestyle__list-item'>
                    <img src={icon} alt='list_icon' className="list-item__icon"></img>
                    <div className="list-item__text">Reduced stress</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LifeStyle