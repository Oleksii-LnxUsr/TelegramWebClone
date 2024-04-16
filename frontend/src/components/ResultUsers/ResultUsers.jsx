import { Link } from "react-router-dom";
import "./ResultUsers.css";

const ResultUsers = ({ result }) => {
    return (
        <div className="user-search-container">
            {result?.map((user) => {
                return (
                    <Link
                        to={`/user/${user?.user_uuid}`}
                        key={user?.user_uuid}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div className="user-search-item">
                            <img
                                src={user?.avatar}
                                alt="user avatar"
                                width={50}
                            />
                            <p>{user?.username}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default ResultUsers;
