import React, { useState, useRef } from "react";
import BottomNavbar from "../BottomNavigation/BottomNavigation";
import CustomField from "../CustomField/CustomField";
import Contact from "../Contact/Contact";
import debounce from "lodash/debounce";
import "./ChatSidebar.css";
import ResultUsers from "../ResultUsers/ResultUsers";

const ChatSidebar = () => {
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [searchUsers, setSearchUsers] = useState("");
    const [resultUsers, setResultUsers] = useState([]);
    const sidebarRef = useRef(null);

    const rsMouseDownHandler = (e) => {
        const x = e.clientX;
        const sbWidth = window.getComputedStyle(sidebarRef.current).width;
        const initialWidth = parseInt(sbWidth, 10);

        const mouseMoveHandler = (e) => {
            const dx = e.clientX - x;
            const newWidth = initialWidth + dx;

            if (newWidth >= 250) {
                setSidebarWidth(newWidth);
            }
        };

        const mouseUpHandler = () => {
            document.removeEventListener("mouseup", mouseUpHandler);
            document.removeEventListener("mousemove", mouseMoveHandler);
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    };

    const search = async (term) => {
        if (term) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/users/?search=${encodeURIComponent(term)}`,
                );
                if (response.ok) {
                    const data = await response.json();
                    setResultUsers(data);
                    console.log(data);
                }
            } catch (error) {
                console.error("Error when requesting data");
            }
        } else {
            setResultUsers([]);
        }
    };

    const debouncedSearch = useRef(debounce(search, 500)).current;

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchUsers(value);
        debouncedSearch(value);
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

                {resultUsers.length > 0 && <ResultUsers result={resultUsers} />}

                <div style={{ marginTop: "15px" }}>
                    <Contact name="Username" unreadMessages={4} uuid={14} />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Contact name="Username" unreadMessages={4} uuid={1} />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Contact name="Username" unreadMessages={4} uuid={10} />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Contact name="Username" unreadMessages={4} uuid={44} />
                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 5,
                        width: "100%",
                    }}
                >
                    <BottomNavbar />
                </div>
            </div>
            <div className="resizer" onMouseDown={rsMouseDownHandler}>
                {/* Resizer element */}
            </div>
        </div>
    );
};

export default ChatSidebar;
