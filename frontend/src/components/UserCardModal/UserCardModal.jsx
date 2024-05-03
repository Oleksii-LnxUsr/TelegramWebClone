import { useContext, useEffect, useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";
import "./UserCardModal.css";

const UserCardModal = ({ open, handleClose, userUuid, setIsOpen }) => {
    const [userData, setUserData] = useState({});
    const { authTokens } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/users/detail/${userUuid}`,
                );
                if (!response.ok) {
                    toast.error("Failed to retrieve user");
                }
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                toast.error("Error fetching user data");
            }
        };

        if (userUuid) {
            fetchUserData();
        }
    }, [userUuid, apiUrl]);

    const handleStartChat = async () => {
        const data = { participant: userData };
        const headers = {
            Authorization: `Bearer ${authTokens?.access}`,
            "Content-Type": "application/json",
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/chats/create/",
                { method: "POST", headers, body: JSON.stringify(data) },
            );
            if (!response.ok) toast.error("Failed to start chat");
            const responseData = await response.json();
            setIsOpen(false);
            navigate(`/${responseData?.chat_id}`);
        } catch (error) {
            toast.error("Failed to start chat");
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box className="user-modal-container">
                    <Typography variant="h6" component="h2">
                        <img
                            src={userData?.avatar}
                            alt="avatar"
                            draggable={false}
                            style={{
                                width: "50%",
                                marginTop: "15px",
                                borderRadius: "50%",
                            }}
                        />
                        <p>{userData?.username}</p>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleStartChat()}
                            sx={{
                                marginTop: "15px",
                                marginBottom: "15px",
                                width: "80%",
                            }}
                        >
                            Start chat
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default UserCardModal;
