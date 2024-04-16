import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ChatIcon from "@mui/icons-material/Chat";
import ContactsIcon from "@mui/icons-material/Contacts";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect } from "react";

const BottomNavbar = () => {
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <Box>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    width: "95%",
                    margin: "0 auto",
                    background: "#D9D9D9",
                    borderRadius: "10px",
                }}
            >
                <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
                <BottomNavigationAction
                    label="Contacts"
                    icon={<ContactsIcon />}
                />
                <BottomNavigationAction
                    label="Settings"
                    icon={<SettingsIcon />}
                />
            </BottomNavigation>
        </Box>
    );
};

export default BottomNavbar;
