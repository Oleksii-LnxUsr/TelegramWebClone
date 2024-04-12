import { Button, FormControl, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../styles/forms.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useContext(AuthContext);

    const handleSubmit = () => {
        loginUser({ email: email, password: password });
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Sign in</h2>
            <FormControl className="form-control">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-field"
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-field"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                    >
                        Submit
                    </Button>
                </form>
            </FormControl>
            <div className="form-links">
                <Link to="/registration">
                    <p>registration</p>
                </Link>
                <Link to="/forget-password">
                    <p>forget password</p>
                    </Link>
            </div>
        </div>
    );
};

export default Login;
