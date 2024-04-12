import React, { useState, useRef } from "react";
import "./ChatList.css";
import BottomNavbar from "../BottomNavigation/BottomNavigation";
import CustomField from "../CustomField/CustomField";
import Contact from "../Contact/Contact";

const ResizableSidebar = () => {
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const sidebarRef = useRef(null);

    const rsMouseDownHandler = (e) => {
        const x = e.clientX;
        const sbWidth = window.getComputedStyle(sidebarRef.current).width;
        const initialWidth = parseInt(sbWidth, 10);

        const mouseMoveHandler = (e) => {
            // const dx = x - e.clientX; // Resize from left to right
            const dx = e.clientX - x; // Resix=ze from right to left
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
                    <CustomField placeholder="Search" />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Contact />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Contact />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Contact />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Contact />
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

export default ResizableSidebar;
