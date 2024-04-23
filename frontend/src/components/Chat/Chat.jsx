import { FormControl } from "@mui/material";
import { useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import CustomField from "../CustomField/CustomField";
import { getChatInfo } from "../../api/getChatInfo";
import Message from "../Message/Message";
import "./Chat.css";

const Chat = ({ chat_id }) => {
    const [message, setMessage] = useState("");
    const [recivedMessages, setRecivedMessages] = useState([]);
    const [isWebsocketOpen, setIsWebsocketOpen] = useState(false);
    const [websocket, setWebsocket] = useState(null);
    const [chatInfo, setChatInfo] = useState({});
    const { authTokens } = useContext(AuthContext);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (chat_id) {
            getChatInfo({
                authTokens: authTokens,
                uuid: chat_id,
                setData: setChatInfo,
            });

            const ws = new WebSocket(
                `ws://127.0.0.1:8000/ws/chats/${chat_id}/?token=${authTokens?.access}`,
            );

            ws.onopen = () => {
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
                setIsWebsocketOpen(false);
            };

            return () => {
                ws.close();
            };
        }
        // eslint-disable-next-line
    }, [chat_id, authTokens?.access]);

    const handleMessageInput = (e) => {
        setMessage(e?.target?.value);
    };

    const sendMessage = () => {
        if (websocket && isWebsocketOpen && message.trim()) {
            websocket.send(message);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={`${apiUrl}${chatInfo?.avatar}`}
                        alt="avatar"
                        className="chat-header-avatar"
                    />
                </div>
                <p className="chat-username">{chatInfo?.name}</p>
            </div>
            {/* messages */}

            <div className="chat-messages-container">
                {recivedMessages?.map((recivedMessage, index) => {
                    return (
                        <Message
                            key={index}
                            message={recivedMessage?.message}
                            sender={recivedMessage?.user_id}
                            timestamp={recivedMessage?.time_stamp}
                        />
                    );
                })}
            </div>

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
