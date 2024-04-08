import { Button, FormControl, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../styles/forms.css";

const Registration = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${apiUrl}/auth/users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = Object.values(errorData)[0][0];
                throw new Error(errorMessage);
            }
            toast.success("User created!");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Registration</h2>
            <FormControl className="form-control">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <TextField
                        fullWidth
                        label="Username"
                        onChange={(e) =>
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                username: e.target.value,
                            }))
                        }
                        required
                        className="form-field"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        onChange={(e) =>
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                email: e.target.value,
                            }))
                        }
                        required
                        className="form-field"
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        onChange={(e) =>
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                password: e.target.value,
                            }))
                        }
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
                <Link to="/forget-password">
                    <p>forget password</p>
                </Link>
            </div>
        </div>
    );
};

export default Registration;
