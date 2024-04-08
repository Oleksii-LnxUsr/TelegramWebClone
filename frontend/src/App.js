import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Activate from "./pages/auth/Activate";
import ResetPassword from "./pages/auth/ResetPassword";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster toastOptions={{ duration: 5000 }} />
            <Routes>
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
