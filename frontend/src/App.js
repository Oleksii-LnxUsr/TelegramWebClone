import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Activate from "./pages/Auth/Activate";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import BottomNavbar from "./components/BottomNavigation/BottomNavigation";

function App() {
    return (
        <>
            <Toaster toastOptions={{ duration: 5000 }} />
            <Routes>
                <Route path="/:chat_id" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/activate/:uid/:token" element={<Activate />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route
                    path="/reset-password/:uid/:token"
                    element={<ResetPassword />}
                />
            </Routes>
        </>
    );
}

export default App;
