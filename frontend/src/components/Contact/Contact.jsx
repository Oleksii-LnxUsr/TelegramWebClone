import "./Contact.css";

const Contact = ({ avatar, name, unread_messages }) => {
    return (
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
            <p className="contact-name">Username</p>
            {unread_messages && (
                <div className="contact-badge">{unread_messages}</div>
            )}
        </div>
    );
};

export default Contact;
