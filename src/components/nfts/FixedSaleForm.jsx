// FixedSaleForm.js
import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import DecimalPriceField from "./DecimalPriceField";
import NoTimeoutDatePicker from "./NoTimeoutDatePicker";

const FixedSaleForm = ({ onChange }) => {
    const [price, setPrice] = useState(null);
    const [tout, setTout] = useState(null);

    const handleChange = (newData) => {
        onChange({ ...newData, price, tout });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <DecimalPriceField
                    name="Sell price"
                    disabled={false}
                    onChange={(newPrice) => {
                        setPrice(newPrice);
                        handleChange({ price: newPrice });
                    }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <NoTimeoutDatePicker
                    value={tout}
                    onChange={(newTout) => {
                        setTout(newTout);
                        handleChange({ tout: newTout });
                    }}
                    disabled={false}
                />
            </Grid>
        </Grid>
    );
};

export default FixedSaleForm;