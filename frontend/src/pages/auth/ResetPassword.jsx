import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/forms.css";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;
    const { uid, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch(
                `${apiUrl}/auth/users/reset_password_confirm/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        uid: uid,
                        token: token,
                        new_password: password,
                    }),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = Object.values(errorData);
                throw new Error(errorMessage);
            }
            toast.success("Password changed successfully!");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Reset password</h2>
            <FormControl className="form-control">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <TextField
                        fullWidth
                        label="New password"
                        type="password"
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
        </div>
    );
};

export default ResetPassword;
