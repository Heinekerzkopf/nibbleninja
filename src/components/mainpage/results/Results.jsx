import './results.css'
import img_fp from './img_fp.svg'

const Results = () => {
    return (
        <div className='results'>
            <div className="results__container">
                <div className="results__title">
                    <h2 className="results__title-text">results</h2>
                </div>
                <div className="results__row">
                    <div className="results__column-text">
                        <div className="column-text__title">+10 kgs in 3 minutes (bulking)</div>
                        <div className="column-text__text">
                            This platform is like the best thing that has happened to my health. Gaining 10 kg in only 3 minutes is fantastic, but the best part is the health improvement.
                        </div>
                        <div className="column-text__name">FATTY PILLOW</div>
                    </div>
                    <div className="results__column">
                        <img src={img_fp} alt="fatty pillow" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results