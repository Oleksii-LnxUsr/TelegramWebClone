import { FormControl } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import CustomField from "../CustomField/CustomField";
import "./Chat.css";

const Chat = ({ chat_id }) => {
    const [message, setMessage] = useState("");
    const [recivedMessages, setRecivedMessages] = useState([]);
    const [isWebsocketOpen, setIsWebsocketOpen] = useState(false);
    const [websocket, setWebsocket] = useState(null);
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        if (chat_id) {
            const ws = new WebSocket(
                `ws://127.0.0.1:8000/ws/chats/${chat_id}/?token=${authTokens?.access}`,
            );

            ws.onopen = () => {
                console.log("WebSocket connected");
                setIsWebsocketOpen(true);
                setWebsocket(ws);
            };

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                setRecivedMessages((prevMessages) => [
                    ...prevMessages,
                    message,
                ]);
            };

            ws.onclose = () => {
                console.log("WebSocket disconnected");
                setIsWebsocketOpen(false);
            };

            return () => {
                ws.close();
            };
        }
        // eslint-disable-next-line
    }, [chat_id, authTokens?.access]);

    const handleMessageInput = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (websocket && isWebsocketOpen) {
            websocket.send(message);
            setMessage("");
            console.log("Sending message:", message);
        }
    };

    useEffect(() => {
        console.log(recivedMessages);
    }, [recivedMessages]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="https://rick-i-morty.online/wp-content/uploads/2021/06/5-sezon-185x278.jpg"
                        alt="avatar"
                        className="chat-header-avatar"
                    />
                </div>
                <p className="chat-username">Username</p>
            </div>
            {/* messages */}
            {recivedMessages?.map((recivedMessage) => {
                return (
                    <div key={recivedMessage?.time_stamp}>
                        <p>{recivedMessage?.message}</p>
                    </div>
                );
            })}
            <div className="chat-field-container">
                <FormControl
                    fullWidth
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                >
                    <CustomField
                        placeholder="Message"
                        value={message}
                        onChange={handleMessageInput}
                    />
                </FormControl>
            </div>
        </div>
    );
};

export default Chat;
