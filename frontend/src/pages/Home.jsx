import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar/ChatSidebar";
import Chat from "../components/Chat/Chat";
import AuthContext from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
    const { chat_id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                userSelect: "none",
            }}
        >
            <ChatSidebar />
            {chat_id ? (
                <Chat chat_id={chat_id} />
            ) : (
                <div
                    style={{
                        minHeight: "100vh",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <p>Select a chat to start messaging</p>
                </div>
            )}
        </div>
    );
};

export default Home;
