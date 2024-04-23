import "./Contact.css";
import { Link, useParams } from "react-router-dom";

const Contact = ({ avatar, name, unreadMessages, uuid }) => {
    const { chat_id } = useParams();

    return (
        <Link
            to={`/${uuid}`}
            style={{ textDecoration: "none", color: "black" }}
        >
            <div
                className="contact-container"
                style={{ background: chat_id === uuid ? "#d9d9d9" : "#e7e7e7" }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                    }}
                >
                    <img src={avatar} alt="Avatar" className="contact-avatar" />
                </div>
                <p className="contact-name">{name}</p>
            </div>
        </Link>
    );
};

export default Contact;
