import { Outlet } from "react-router-dom"
import HeaderComp from "../components/mainpage/header/HeaderComp"

const MainLayout = () => {
    return (
        <>
            <HeaderComp />
            <Outlet />
        </>
    )
}

export default MainLayout