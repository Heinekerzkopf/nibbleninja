import Benefits from './benefits/Benefits'
import Healthy from './healthy/Healthy'
import Invest from './invest/Invest'
import LifeStyle from './lifestyle/LifeStyle'
import './mainpage.css'
import Results from './results/Results'

const MainPage = () => {
    return (
        <>
            <section className="introductory__page">
                <Healthy />
            </section>
            <section className="lifestyle_section">
                <LifeStyle />
            </section>
            <section className="benefits_section">
                <Benefits />
            </section>
            <section className="invest__seciton">
                <Invest />
            </section>
            <section className="results__section">
                <Results />
            </section>
        </>

    )
}

export default MainPage