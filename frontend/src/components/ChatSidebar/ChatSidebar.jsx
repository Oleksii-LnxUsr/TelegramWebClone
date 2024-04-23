import React, { useState, useRef, useEffect, useContext } from "react";
import debounce from "lodash/debounce";
import BottomNavbar from "../BottomNavigation/BottomNavigation";
import CustomField from "../CustomField/CustomField";
import Contact from "../Contact/Contact";
import ResultUsers from "../ResultUsers/ResultUsers";
import { rsMouseDownHandler } from "../../utils/rsMouseDownHandler";
import { getUserByUsername } from "../../api/getUsersByUsername";
import { getUserChats } from "../../api/getUserChats";
import AuthContext from "../../context/AuthContext";
import "./ChatSidebar.css";

const ChatSidebar = () => {
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [searchUsers, setSearchUsers] = useState("");
    const [resultUsers, setResultUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const { authTokens } = useContext(AuthContext);
    const sidebarRef = useRef(null);

    useEffect(() => {
        getUserChats({ authTokens: authTokens, setData: setChats });
    }, [authTokens]);

    const search = (term) => {
        getUserByUsername({ term: term, setData: setResultUsers });
    };

    const debouncedSearch = useRef(debounce(search, 500)).current;

    const handleChange = (event) => {
        const searchTerm = event.target.value;
        setSearchUsers(searchTerm);
        debouncedSearch(searchTerm);
    };

    return (
        <div className="chatlist-sidebar">
            <div
                className="sidebar-container"
                ref={sidebarRef}
                style={{
                    width: `${sidebarWidth}px`,
                    maxWidth: "30vw",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "95%",
                        margin: "0 auto",
                        marginTop: "5px",
                    }}
                >
                    <CustomField
                        placeholder="Search"
                        onChange={handleChange}
                        value={searchUsers}
                    />
                </div>

                {resultUsers.length > 0 && (
                    <ResultUsers
                        result={resultUsers}
                        setResult={setResultUsers}
                    />
                )}

                <div
                    style={{
                        height: "90vh",
                        overflowY: "auto",
                        paddingBottom: "145px",
                    }}
                >
                    {chats.map((chat) => {
                        return (
                            <div key={chat.uuid} style={{ marginTop: "15px" }}>
                                <Contact
                                    name={chat.name}
                                    unreadMessages={4}
                                    uuid={chat.uuid}
                                    avatar={chat.avatar}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className="resizer"
                onMouseDown={(e) =>
                    rsMouseDownHandler({ e, setSidebarWidth, sidebarRef })
                }
            >
                {/* Resizer element */}
            </div>
        </div>
    );
};

export default ChatSidebar;
