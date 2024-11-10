import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/mainpage/MainPage.jsx";
import Login from "./components/login/Login.jsx";
import CaloriesCounter from "./components/caloriescounter/CaloriesCounter.jsx";
import MenuPlan from "./components/menuplan/MenuPlan.jsx";
import Recipes from "./components/recipes/Recipes.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Signup from "./components/signup/Signup.jsx";
import Account from "./components/account/Account.jsx";
import { AuthProvider } from './components/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<MainPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/caloriescounter" element={<CaloriesCounter />} />
                            <Route path="/menuplan" element={<MenuPlan />} />
                            <Route path="/recipes" element={<Recipes />} />
                            <Route path="*" element={<h1>Not found</h1>} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
