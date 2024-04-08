import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    ); // if we have authTokens inside our local storage variable authTokens parse it else set null
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null,
    ); // if we have authTokens inside our local storage variable user decode it and save else set null
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); // need for redirect user

    const loginUser = async (e) => {
        // send user data on server and generate new jwt tokens
        const response = await fetch(`${apiUrl}/auth/jwt/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email: e.email,
                password: e.password,
            }),
        });

        const data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access)); // decode access token in which the user information was encoded and save
            localStorage.setItem("authTokens", JSON.stringify(data)); // set auth tokens to local storage for use in any part of our app
            navigate("/");
        } else {
            toast.error("Login failed");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    const updateToken = async () => {
        // send on refresh path our token if all right we write new tokens to variables else logout user
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/auth/jwt/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        });

        const data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access)); // decode access token and write
            localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    useEffect(() => {
        // useEffect call our updateToken method every four minutes if user is authenticated
        const fourMinutes = 1000 * 60 * 4;

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
