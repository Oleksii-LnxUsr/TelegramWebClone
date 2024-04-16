import { useParams } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar/ChatSidebar";
import Chat from "../components/Chat/Chat";

const Home = () => {
    const { chat_id } = useParams();

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
