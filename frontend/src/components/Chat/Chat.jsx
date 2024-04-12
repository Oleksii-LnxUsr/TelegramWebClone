import CustomField from "../CustomField/CustomField";
import { FormControl } from "@mui/material";
import "./Chat.css";

const Chat = () => {
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
            <div className="chat-field-container">
                <FormControl
                    fullWidth
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            console.log("Enter key pressed");
                        }
                    }}
                >
                    <CustomField placeholder="Message" />
                </FormControl>
            </div>
        </div>
    );
};

export default Chat;
