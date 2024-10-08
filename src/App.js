import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/mainpage/MainPage.jsx";
import Login from "./components/login/Login.jsx";
import CaloriesCounter from "./components/caloriescounter/CaloriesCounter.jsx";
import MenuPlan from "./components/menuplan/MenuPlan.jsx";
import Recipes from "./components/recipes/Recipes.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/caloriescounter" element={<CaloriesCounter />} />
                        <Route path="/menuplan" element={<MenuPlan />} />
                        <Route path="/recipes" element={<Recipes />} />
                        <Route path="*" element={<h1>Not found</h1>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
