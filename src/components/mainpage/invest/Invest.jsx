import './invest.css'

const Invest = () => {
    return (
        <div className='invest'>
            <div className="invest__container">
                <div className="invest__title-block">
                    <p>Invest in yourself and</p>
                    <p> boost your <span className='invest__title-text-big'>health, body</span> and <span className='invest__title-text-big'>confidence</span></p>
                </div>
                <button type="submit" className="invest__button">Start today</button>
            </div>
        </div>
    )
}

export default Invest