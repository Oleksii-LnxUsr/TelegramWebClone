import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext";
import "./App.css";
import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Activate from "./pages/Auth/Activate";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <Toaster toastOptions={{ duration: 5000 }} />
            <Routes>
                <Route path="/:chat_id?" element={<Home />} />
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
