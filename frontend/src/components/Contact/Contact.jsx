import "./Contact.css";
import { Link } from "react-router-dom";

const Contact = ({ avatar, name, unreadMessages, uuid }) => {
    return (
        <Link
            to={`/${uuid}`}
            style={{ textDecoration: "none", color: "black" }}
        >
            <div className="contact-container">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                    }}
                >
                    <img
                        src="https://rick-i-morty.online/wp-content/uploads/2021/06/5-sezon-185x278.jpg"
                        alt="Avatar"
                        className="contact-avatar"
                    />
                </div>
                <p className="contact-name">{name}</p>
                {unreadMessages && (
                    <div className="contact-badge">{unreadMessages}</div>
                )}
            </div>
        </Link>
    );
};

export default Contact;
