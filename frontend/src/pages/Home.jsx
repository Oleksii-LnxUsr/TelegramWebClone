import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ChatList from "../components/ChatList/ChatList";
import Chat from "../components/Chat/Chat";

const Home = () => {
    const [message, setMessage] = useState([]);
    const { chat_id } = useParams();
    const { authTokens } = useContext(AuthContext);
    const [isWebsocketOpen, setIsWebsocketOpen] = useState(false);
    const [websocket, setWebsocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(
            `ws://127.0.0.1:8000/ws/chats/${chat_id}/?token=${authTokens?.access}`,
        );

        ws.onopen = () => {
            console.log("WebSocket connected");
            setIsWebsocketOpen(true);
            setWebsocket(ws);
        };

        ws.onmessage = (event) => {
            console.log("message from websocket");
            const message = JSON.parse(event.data);
            console.log(message);
            // setMessage((prevMessages) => [...prevMessages, message]);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            setIsWebsocketOpen(false);
        };

        return () => {
            ws.close();
        };
    }, [chat_id, authTokens?.access]);

    const sendMessage = (message) => {
        if (websocket && isWebsocketOpen) {
            websocket.send(message);
            console.log("Sending message:", message);
        } else {
            console.log("WebSocket is not open");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <ChatList />
            <Chat />
        </div>
    );
};

export default Home;
