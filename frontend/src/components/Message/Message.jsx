import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Message.css";

const Message = ({ sender, message, timestamp }) => {
    const { user } = useContext(AuthContext);

    const formattedTime = timestamp
        ? new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    return (
        <div
            className={sender === user.user_id ? "own-message" : "user-message"}
            style={{ borderRadius: "10px", marginTop: "5px" }}
        >
            <p className="message-text">{message}</p>
            <p style={{ fontSize: "10px" }}>{formattedTime}</p>
        </div>
    );
};

export default Message;
