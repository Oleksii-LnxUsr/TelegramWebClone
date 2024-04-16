import { Input } from "@mui/material";
import "./CustomField.css";

const CustomField = ({ placeholder, onChange, value }) => {
    return (
        <Input
            className="custom-field"
            disableUnderline={true}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default CustomField;
