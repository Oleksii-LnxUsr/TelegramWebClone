import { Input } from "@mui/material";
import "./CustomField.css";

const CustomField = ({ placeholder }) => {
    return (
        <Input
            className="custom-field"
            disableUnderline={true}
            placeholder={placeholder}
        />
    );
};

export default CustomField;
