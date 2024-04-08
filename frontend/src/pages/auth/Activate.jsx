import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/forms.css";

const Activate = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const activateUser = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/auth/users/activation/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ uid: uid, token: token }),
                    },
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = Object.values(errorData);
                    throw new Error(errorMessage);
                }
                toast.success("Account activated successfully!");
                navigate("/login");
            } catch (error) {
                toast.error(error.message);
            }
        };

        activateUser();
    }, [uid, token, navigate, apiUrl]);
};

export default Activate;
