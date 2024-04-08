import { Button, FormControl, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import "../../styles/forms.css";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async () => {
        fetch(`${apiUrl}/auth/users/reset_password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then(() => {
                toast.success("Email sent for password reset!");
                setEmail("");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Forget password</h2>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <Link to="/login">
                    <p>login</p>
                </Link>
                <Link to="/registration">
                    <p>registration</p>
                </Link>
            </div>
        </div>
    );
};

export default ForgetPassword;
