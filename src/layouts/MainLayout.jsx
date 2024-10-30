import { Outlet } from "react-router-dom"
import HeaderComp from "../components/mainpage/header/HeaderComp"
import Footer from "../components/mainpage/footer/Footer"

const MainLayout = () => {
    return (
        <>
            <HeaderComp />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout