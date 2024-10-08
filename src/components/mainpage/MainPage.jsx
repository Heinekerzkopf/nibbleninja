import HeaderComp from './header/HeaderComp'
import Healthy from './healthy/Healthy'
import './mainpage.css'

const MainPage = () => {
    return (
        <>
            <section className="introductory__page">
                <HeaderComp />
                <Healthy />
            </section>
            <section className='test'></section>
        </>

    )
}

export default MainPage