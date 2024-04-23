import { useState } from "react";
import UserCardModal from "../UserCardModal/UserCardModal";
import "./ResultUsers.css";

const ResultUsers = ({ result, setResult }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");

    const userCardModal = (user_id) => {
        setSelectedUser(user_id);
        setIsModalOpen(!isModalOpen);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="user-search-container">
            <UserCardModal
                open={isModalOpen}
                handleClose={handleClose}
                userUuid={selectedUser}
                setIsOpen={setIsModalOpen}
            />
            {!isModalOpen &&
                result?.map((user) => {
                    return (
                        <div
                            className="user-search-item"
                            onClick={() => userCardModal(user.user_uuid)}
                            key={user.user_uuid}
                        >
                            <img
                                src={user?.avatar}
                                alt="user avatar"
                                width={50}
                            />
                            <p>{user?.username}</p>
                        </div>
                    );
                })}
        </div>
    );
};

export default ResultUsers;
