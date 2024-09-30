// DateWarningMessage.js
import React from "react";
import { Typography } from "@mui/material";

const warning_date = () => new Date(Date.now() + 30 * 86400 * 1000);

const DateWarningMessage = ({ date }) => {
    if (!date || date <= warning_date()) {
        return null;
    }

    return (
        <Typography color="warning" sx={{ mt: 2 }}>
            Warning: The chosen time is far in the future. Your token will be locked until that date.
        </Typography>
    );
};

export default DateWarningMessage;