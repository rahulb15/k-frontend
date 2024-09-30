// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Modal,
//     Box,
//     Typography,
//     IconButton,
//     // Button,
//     FormControl,
//     RadioGroup,
//     Switch,
//     Tooltip,
//     FormControlLabel,
//     Popover,
//     Paper,
//     TextField,
//     Select,
//     MenuItem,
//     InputLabel,
// } from "@mui/material";
// import {
//     Grid,
//     Message,
//     Form,
//     Table,
//     Popup,
//     Radio,
//     Button,
// } from "semantic-ui-react";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import CloseIcon from "@mui/icons-material/Close";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { TransactionManager } from "@components/Transactions";
// import { MAKE_TRX, useFee } from "./nftUtils";
// import {
//     clear_sales,
//     useTokenBalance,
//     useRoyaltyRate,
// } from "src/hooks/SWR_Hooks";
// import Decimal from "decimal.js";
// import {
//     compute_marketplace_fees,
//     pretty_price,
// } from "@utils/marmalade_common";

// const base_date = () => new Date(Date.now() + 3600 * 1000); // 1 hour from now
// const base_date_2 = () => new Date(Date.now() + 4200 * 1000); // 70 minutes from now
// const warning_date = () => new Date(Date.now() + 30 * 86400 * 1000);

// const DecimalPriceField = ({ name, onChange, disabled, error }) => {
//     const [isError, setIsError] = useState(true);
//     const setValue = (x) => {
//         try {
//             const v = new Decimal(x);
//             if (v.greaterThan(0)) {
//                 setIsError(false);
//                 onChange(v);
//             } else {
//                 setIsError(true);
//                 onChange(null);
//             }
//         } catch (error) {
//             setIsError(true);
//             onChange(null);
//         }
//     };
//     return (
//         <div style={{ marginTop: "15px" }}>
//             <label style={{ fontSize: "16px" }}>{name + " (KDA)"}</label>
//             <input
//                 type="text"
//                 disabled={disabled}
//                 placeholder={name}
//                 onChange={(e) => setValue(e.target.value)}
//                 style={{
//                     border:
//                         isError || error ? "1px solid red" : "1px solid green",
//                     width: "100%",
//                     margin: "5px 0",
//                     borderRadius: "5px",
//                     height: "40px",
//                     padding: "5px",
//                 }}
//             />
//         </div>
//     );
// };

// const NoTimeoutDatePicker = ({ value, onChange, disabled }) => {
//     const [isNoTimeout, setIsNoTimeout] = useState(value == null);
//     const [lastDate, setLastDate] = useState(new Date());

//     const handleNoTimeoutChange = (event) => {
//         setIsNoTimeout(event.target.checked);
//         if (event.target.checked) {
//             setLastDate(value);
//             onChange(null);
//         } else {
//             onChange(lastDate);
//         }
//     };

//     return (
//         <Box sx={{ mt: 2 }}>
//             <FormControlLabel
//                 control={
//                     <Switch
//                         checked={isNoTimeout}
//                         onChange={handleNoTimeoutChange}
//                         disabled={disabled}
//                         color="primary"
//                     />
//                 }
//                 label="Unlimited sale"
//             />
//             <Tooltip
//                 title="When choosing an Unlimited sale, timeout will be disabled. Seller can close the sale at any time."
//                 arrow
//             >
//                 <HelpOutlineIcon
//                     fontSize="small"
//                     sx={{ ml: 1, color: "text.secondary", cursor: "pointer" }}
//                 />
//             </Tooltip>
//             <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom>
//                     End date
//                 </Typography>
//                 <DatePicker
//                     showTimeSelect
//                     selected={value}
//                     onChange={onChange}
//                     disabled={isNoTimeout || disabled}
//                     dateFormat="Pp"
//                 />
//             </Box>
//         </Box>
//     );
// };

// function AuctionSellForm({ disabled, onChange }) {
//     const [startingPrice, setStartingPrice] = useState(null);
//     const [increment, setIncrement] = useState(DEFAULT_OPTION);
//     const [toDate, setToDate] = useState(base_date());

//     useEffect(() => {
//         if (startingPrice && increment && toDate) {
//             onChange({
//                 start_price: startingPrice,
//                 increment: new Decimal(increment),
//                 tout: toDate,
//             });
//         }
//     }, [startingPrice, increment, toDate, onChange]);

//     return (
//         <Box>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                     <DecimalPriceField
//                         name="Starting price"
//                         disabled={disabled}
//                         onChange={setStartingPrice}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <FormControl fullWidth disabled={disabled}>
//                         <InputLabel>Minimum increment between bids</InputLabel>
//                         <Select
//                             value={increment}
//                             onChange={(e) => setIncrement(e.target.value)}
//                             label="Minimum increment between bids"
//                         >
//                             {INCREMENT_OPTIONS.map((option) => (
//                                 <MenuItem
//                                     key={option.value}
//                                     value={option.value}
//                                 >
//                                     {option.text}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <NoTimeoutDatePicker
//                         value={toDate}
//                         onChange={setToDate}
//                         disabled={disabled}
//                     />
//                 </Grid>
//             </Grid>
//             <DateWarningMessage date={toDate} />
//         </Box>
//     );
// }

// // Update the DutchAuctionSellForm component
// function DutchAuctionSellForm({ disabled, onChange }) {
//     const [startingPrice, setStartingPrice] = useState(null);
//     const [endPrice, setEndPrice] = useState(null);
//     const [endSlopeDate, setEndOfSlopeDate] = useState(base_date());
//     const [toDate, setToDate] = useState(base_date_2());

//     const price_error = endPrice && startingPrice && startingPrice.lt(endPrice);
//     const date_error = toDate != null && toDate < endSlopeDate;

//     useEffect(() => {
//         if (startingPrice && endPrice && endSlopeDate && toDate) {
//             onChange({
//                 start_price: startingPrice,
//                 end_price: endPrice,
//                 end_date: endSlopeDate,
//                 tout: toDate,
//             });
//         }
//     }, [startingPrice, endPrice, endSlopeDate, toDate, onChange]);

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//                 <DecimalPriceField
//                     name="Starting price"
//                     disabled={disabled}
//                     onChange={setStartingPrice}
//                     error={price_error}
//                 />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <DecimalPriceField
//                     name="End of slope price"
//                     disabled={disabled}
//                     onChange={setEndPrice}
//                     error={price_error}
//                 />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle2" gutterBottom>
//                     End of Slope Date
//                 </Typography>
//                 <DatePicker
//                     showTimeSelect
//                     selected={endSlopeDate}
//                     onChange={(date) => setEndOfSlopeDate(date)}
//                     dateFormat="Pp"
//                 />
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <NoTimeoutDatePicker
//                     value={toDate}
//                     onChange={setToDate}
//                     disabled={disabled}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <DateWarningMessage date={toDate} />
//             </Grid>
//         </Grid>
//     );
// }

// const DateWarningMessage = ({ date }) =>
//     date && date > warning_date() ? (
//         <Typography color="warning" sx={{ mt: 2 }}>
//             Warning: The chosen time is far in the future. Your token will be
//             locked until that date.
//         </Typography>
//     ) : null;

// const INCREMENT_OPTIONS = [
//     { text: "10%", value: "1.1" },
//     { text: "20%", value: "1.2" },
//     { text: "50%", value: "1.5" },
//     { text: "100%", value: "2.0" },
// ];

// const DEFAULT_OPTION = INCREMENT_OPTIONS[0].value;

// const FeeDetailsModal = ({ headers, gross, fees, total }) => (
//     <Paper elevation={3} sx={{ p: 2, mt: 2, backgroundColor: "#f0f0f0" }}>
//         <Typography variant="h6" gutterBottom>
//             Fee Details
//         </Typography>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//                 <tr>
//                     <th style={{ textAlign: "left", padding: "8px" }}></th>
//                     {headers.map((header, index) => (
//                         <th
//                             key={index}
//                             style={{ padding: "8px", textAlign: "right" }}
//                         >
//                             {header}
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td style={{ padding: "8px" }}>Gross price</td>
//                     {gross.map((price, index) => (
//                         <td
//                             key={index}
//                             style={{ padding: "8px", textAlign: "right" }}
//                         >
//                             {price}
//                         </td>
//                     ))}
//                 </tr>
//                 {fees.map((fee, index) => (
//                     <tr key={index}>
//                         {fee.map((item, itemIndex) => (
//                             <td
//                                 key={itemIndex}
//                                 style={{
//                                     padding: "8px",
//                                     textAlign:
//                                         itemIndex === 0 ? "left" : "right",
//                                 }}
//                             >
//                                 {item}
//                             </td>
//                         ))}
//                     </tr>
//                 ))}
//             </tbody>
//             <tfoot>
//                 <tr style={{ borderTop: "1px solid #ddd" }}>
//                     <td style={{ padding: "8px", fontWeight: "bold" }}>
//                         Total
//                     </td>
//                     {total.map((t, index) => (
//                         <td
//                             key={index}
//                             style={{
//                                 padding: "8px",
//                                 textAlign: "right",
//                                 fontWeight: "bold",
//                             }}
//                         >
//                             {t}
//                         </td>
//                     ))}
//                 </tr>
//             </tfoot>
//         </table>
//     </Paper>
// );

// const NftSaleOptions = ({ type, data, userData, onCancel }) => {
//     const [saleType, setSaleType] = useState(type || "FIXED-SALE");
//     const [saleData, setSaleData] = useState(null);
//     const [trx, setTrx] = useState(null);
//     const { balance } = useTokenBalance(data.tokenId, userData?.account);
//     const fee = useFee(data.tokenId);
//     const royaltyRate = useRoyaltyRate(data.tokenId);

//     const handleSaleDataChange = useCallback((newSaleData) => {
//         setSaleData(newSaleData);
//     }, []);

//     useEffect(() => {
//         if (userData && saleData && saleType && balance && balance.gt(0)) {
//             try {
//                 const newTrx = MAKE_TRX[saleType](
//                     data.tokenId,
//                     balance,
//                     userData.account,
//                     userData.guard,
//                     fee,
//                     saleData
//                 );
//                 setTrx(newTrx);
//             } catch (error) {
//                 console.error("Error creating transaction:", error);
//                 // You might want to show an error message to the user here
//             }
//         }
//     }, [userData, saleData, saleType, data.tokenId, fee, balance]);

//     const handleSaleTypeChange = (event) => {
//         setSaleType(event.target.value);
//         setSaleData(null); // Reset sale data when changing sale type
//     };

//     const renderPriceNet = () => {
//         if (!saleData || !saleData.price) return null;

//         const gross = saleData.price;
//         const mplace_fee = compute_marketplace_fees(gross, fee);
//         const gross_after_mplace = gross.sub(mplace_fee);
//         const royalty = royaltyRate.mul(gross);
//         const total = gross_after_mplace.sub(royalty);

//         return (
//             <FeeDetailsModal
//                 headers={["Amount"]}
//                 gross={[pretty_price(gross, "KDA")]}
//                 fees={[
//                     ["Marketplace", "- " + pretty_price(mplace_fee, "KDA")],
//                     ["Royalty", "- " + pretty_price(royalty, "KDA")],
//                 ]}
//                 total={[pretty_price(total, "KDA")]}
//             />
//         );
//     };

//     const renderSaleForm = () => {
//         switch (saleType) {
//             case "FIXED-SALE":
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} md={6}>
//                             <DecimalPriceField
//                                 name="Sell price"
//                                 disabled={false}
//                                 onChange={(price) =>
//                                     handleSaleDataChange({ ...saleData, price })
//                                 }
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <NoTimeoutDatePicker
//                                 value={saleData?.tout || base_date()}
//                                 onChange={(tout) =>
//                                     handleSaleDataChange({ ...saleData, tout })
//                                 }
//                                 disabled={false}
//                             />
//                         </Grid>
//                     </Grid>
//                 );
//             case "DUTCH-AUCTION-SALE":
//                 return (
//                     <DutchAuctionSellForm
//                         disabled={false}
//                         onChange={handleSaleDataChange}
//                     />
//                 );
//             case "AUCTION-SALE":
//                 return (
//                     <AuctionSellForm
//                         disabled={false}
//                         onChange={handleSaleDataChange}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };


//     function DutchAuctionPriceNet({ sale_data, token_id, fee }) {
//         const [anchorEl, setAnchorEl] = useState(null);
//         const royalty_rate = useRoyaltyRate(token_id);
    
//         if (!sale_data) return null;
    
//         const gross = [sale_data.start_price, sale_data.end_price];
//         const mplace_fee = gross.map(price => compute_marketplace_fees(price, fee));
//         const gross_after_mplace = gross.map((price, i) => price.sub(mplace_fee[i]));
//         const royalty = gross_after_mplace.map(price => royalty_rate.mul(price));
//         const total = gross_after_mplace.map((price, i) => price.sub(royalty[i]));
    
//         const handleInfoClick = (event) => {
//             setAnchorEl(event.currentTarget);
//         };
    
//         const handleClose = () => {
//             setAnchorEl(null);
//         };
    
//         const open = Boolean(anchorEl);
    
//         const details = (
//             <FeeDetailsModal
//                 headers={["Starting Price", "Ending Price"]}
//                 gross={gross.map(price => pretty_price(price, "KDA"))}
//                 fees={[
//                     ["Marketplace"].concat(mplace_fee.map(fee => "- " + pretty_price(fee, "KDA"))),
//                     ["Royalty"].concat(royalty.map(fee => "- " + pretty_price(fee, "KDA"))),
//                 ]}
//                 total={total.map(price => pretty_price(price, "KDA"))}
//             />
//         );
    
//         return (
//             <Box sx={{ mt: 2, position: "relative" }}>
//                 <Paper elevation={1} sx={{ p: 2, display: "flex", flexDirection: "row", alignItems: "center" }}>
//                     <Typography variant="body1">
//                         You will receive between {pretty_price(total[1], "KDA")} and {pretty_price(total[0], "KDA")}
//                     </Typography>
//                     <IconButton size="small" onClick={handleInfoClick} sx={{ ml: 1 }}>
//                         <InfoOutlinedIcon fontSize="small" />
//                     </IconButton>
//                 </Paper>
//                 <Popover
//                     open={open}
//                     anchorEl={anchorEl}
//                     onClose={handleClose}
//                     anchorOrigin={{
//                         vertical: "bottom",
//                         horizontal: "right",
//                     }}
//                     transformOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                     }}
//                 >
//                     <Box sx={{ p: 2 }}>{details}</Box>
//                 </Popover>
//             </Box>
//         );
//     }
    
//     function AuctionPriceNet({ sale_data, token_id, fee }) {
//         const [anchorEl, setAnchorEl] = useState(null);
//         const royalty_rate = useRoyaltyRate(token_id);
    
//         if (!sale_data) return null;
    
//         const start_price = sale_data.start_price;
//         const mplace_fee = compute_marketplace_fees(start_price, fee);
//         const gross_after_mplace = start_price.sub(mplace_fee);
//         const royalty = royalty_rate.mul(start_price);
//         const total = gross_after_mplace.sub(royalty);
    
//         const handleInfoClick = (event) => {
//             setAnchorEl(event.currentTarget);
//         };
    
//         const handleClose = () => {
//             setAnchorEl(null);
//         };
    
//         const open = Boolean(anchorEl);
    
//         const details = (
//             <FeeDetailsModal
//                 headers={["Starting Price", "Final Price"]}
//                 gross={[pretty_price(start_price, "KDA"), "X"]}
//                 fees={[
//                     ["Marketplace", "- " + pretty_price(mplace_fee, "KDA"), `- ${fee ? fee["fee-rate"] * 100 : 0}% of X`],
//                     ["Royalty", "- " + pretty_price(royalty, "KDA"), `- ${royalty_rate.mul(100).toFixed(2)}% of X`],
//                 ]}
//                 total={[pretty_price(total, "KDA"), `X - fees`]}
//             />
//         );
    
//         return (
//             <Box sx={{ mt: 2, position: "relative" }}>
//                 <Paper elevation={1} sx={{ p: 2, display: "flex", flexDirection: "row", alignItems: "center" }}>
//                     <Typography variant="body1">
//                         You will receive at least {pretty_price(total, "KDA")}
//                     </Typography>
//                     <IconButton size="small" onClick={handleInfoClick} sx={{ ml: 1 }}>
//                         <InfoOutlinedIcon fontSize="small" />
//                     </IconButton>
//                 </Paper>
//                 <Popover
//                     open={open}
//                     anchorEl={anchorEl}
//                     onClose={handleClose}
//                     anchorOrigin={{
//                         vertical: "bottom",
//                         horizontal: "right",
//                     }}
//                     transformOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                     }}
//                 >
//                     <Box sx={{ p: 2 }}>{details}</Box>
//                 </Popover>
//             </Box>
//         );
//     }

//     function FixedPriceNet({ sale_data, token_id, fee }) {
//         const [anchorEl, setAnchorEl] = useState(null);
//         const royalty_rate = useRoyaltyRate(token_id);
    
//         if (!sale_data || !sale_data.price) return null;
    
//         const gross = sale_data.price;
//         const mplace_fee = compute_marketplace_fees(gross, fee);
//         const gross_after_mplace = gross.sub(mplace_fee);
//         const royalty = royalty_rate.mul(gross);
//         const total = gross_after_mplace.sub(royalty);
    
//         const handleInfoClick = (event) => {
//             setAnchorEl(event.currentTarget);
//         };
    
//         const handleClose = () => {
//             setAnchorEl(null);
//         };
    
//         const open = Boolean(anchorEl);
    
//         const details = (
//             <FeeDetailsModal
//                 headers={["Amount"]}
//                 gross={[pretty_price(gross, "KDA")]}
//                 fees={[
//                     ["Marketplace", "- " + pretty_price(mplace_fee, "KDA")],
//                     ["Royalty", "- " + pretty_price(royalty, "KDA")],
//                 ]}
//                 total={[pretty_price(total, "KDA")]}
//             />
//         );
    
//         return (
//             <Box sx={{ mt: 2, position: "relative" }}>
//                 <Paper elevation={1} sx={{ p: 2, display: "flex", flexDirection: "row", alignItems: "center" }}>
//                     <Typography variant="body1">
//                         You will receive {pretty_price(total, "KDA")}
//                     </Typography>
//                     <IconButton size="small" onClick={handleInfoClick} sx={{ ml: 1 }}>
//                         <InfoOutlinedIcon fontSize="small" />
//                     </IconButton>
//                 </Paper>
//                 <Popover
//                     open={open}
//                     anchorEl={anchorEl}
//                     onClose={handleClose}
//                     anchorOrigin={{
//                         vertical: "bottom",
//                         horizontal: "right",
//                     }}
//                     transformOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                     }}
//                 >
//                     <Box sx={{ p: 2 }}>{details}</Box>
//                 </Popover>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
//             <Typography variant="h5" gutterBottom>
//                 Create NFT Sale
//             </Typography>

//             <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Sale Type</InputLabel>
//                 <Select
//                     value={saleType}
//                     onChange={handleSaleTypeChange}
//                     label="Sale Type"
//                 >
//                     <MenuItem value="FIXED-SALE">Fixed Price Sale</MenuItem>
//                     <MenuItem value="DUTCH-AUCTION-SALE">
//                         Dutch Auction Sale
//                     </MenuItem>
//                     <MenuItem value="AUCTION-SALE">Auction Sale</MenuItem>
//                 </Select>
//             </FormControl>

//             {renderSaleForm()}
//             {saleData && (
//                     <>
//                         {saleType === "FIXED-SALE" && (
//                             <FixedPriceNet
//                                 sale_data={saleData}
//                                 token_id={data?.tokenId}
//                                 fee={fee}
//                             />
//                         )}
//                         {saleType === "DUTCH-AUCTION-SALE" && (
//                             <DutchAuctionPriceNet
//                                 sale_data={saleData}
//                                 token_id={data?.tokenId}
//                                 fee={fee}
//                             />
//                         )}
//                         {saleType === "AUCTION-SALE" && (
//                             <AuctionPriceNet
//                                 sale_data={saleData}
//                                 token_id={data?.tokenId}
//                                 fee={fee}
//                             />
//                         )}
//                     </>
//                 )}
//             <DateWarningMessage date={saleData?.tout} />

//             <Box sx={{ mt: 2 }}>
//                 <TransactionManager
//                     trx={trx}
//                     wallet={userData?.wallet}
//                     type="sell"
//                     onConfirm={clear_sales}
//                     data={data}
//                     onClose={onCancel}
//                 />
//                 <Button
//                     variant="outlined"
//                     onClick={onCancel}
//                     sx={{ mt: 2, mr: 2 }}
//                 >
//                     Cancel
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export default NftSaleOptions;


// NftSaleOptions.js
import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, FormControl, Select, MenuItem, InputLabel, Button } from "@mui/material";
import { Grid } from "semantic-ui-react";
import { TransactionManager } from "@components/Transactions";
import { MAKE_TRX, useFee } from "./nftUtils";
import { clear_sales, useTokenBalance, useRoyaltyRate } from "src/hooks/SWR_Hooks";
import FixedSaleForm from "./FixedSaleForm";
import DutchAuctionSaleForm from "./DutchAuctionSaleForm";
import AuctionSaleForm from "./AuctionSaleForm";
import FixedPriceNet from "./FixedPriceNet";
import DutchAuctionPriceNet from "./DutchAuctionPriceNet";
import AuctionPriceNet from "./AuctionPriceNet";
import DateWarningMessage from "./DateWarningMessage";

const NftSaleOptions = ({ type, data, userData, onCancel }) => {
    const [saleType, setSaleType] = useState(type || "FIXED-SALE");
    const [saleData, setSaleData] = useState(null);
    const [trx, setTrx] = useState(null);
    const { balance } = useTokenBalance(data.tokenId, userData?.account);
    const fee = useFee(data.tokenId);
    const royaltyRate = useRoyaltyRate(data.tokenId);

    const handleSaleDataChange = useCallback((newSaleData) => {
        setSaleData(newSaleData);
    }, []);

    useEffect(() => {
        if (userData && saleData && saleType && balance && balance.gt(0)) {
            try {
                const newTrx = MAKE_TRX[saleType](
                    data.tokenId,
                    balance,
                    userData.account,
                    userData.guard,
                    fee,
                    saleData
                );
                setTrx(newTrx);
            } catch (error) {
                console.error("Error creating transaction:", error);
            }
        }
    }, [userData, saleData, saleType, data.tokenId, fee, balance]);

    const handleSaleTypeChange = (event) => {
        setSaleType(event.target.value);
        setSaleData(null);
    };

    const renderSaleForm = () => {
        switch (saleType) {
            case "FIXED-SALE":
                return <FixedSaleForm onChange={handleSaleDataChange} />;
            case "DUTCH-AUCTION-SALE":
                return <DutchAuctionSaleForm onChange={handleSaleDataChange} />;
            case "AUCTION-SALE":
                return <AuctionSaleForm onChange={handleSaleDataChange} />;
            default:
                return null;
        }
    };

    const renderPriceNet = () => {
        if (!saleData) return null;

        switch (saleType) {
            case "FIXED-SALE":
                return <FixedPriceNet sale_data={saleData} token_id={data.tokenId} fee={fee} />;
            case "DUTCH-AUCTION-SALE":
                return <DutchAuctionPriceNet sale_data={saleData} token_id={data.tokenId} fee={fee} />;
            case "AUCTION-SALE":
                return <AuctionPriceNet sale_data={saleData} token_id={data.tokenId} fee={fee} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                Create NFT Sale
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Sale Type</InputLabel>
                <Select
                    value={saleType}
                    onChange={handleSaleTypeChange}
                    label="Sale Type"
                >
                    <MenuItem value="FIXED-SALE">Fixed Price Sale</MenuItem>
                    <MenuItem value="DUTCH-AUCTION-SALE">Dutch Auction Sale</MenuItem>
                    <MenuItem value="AUCTION-SALE">Auction Sale</MenuItem>
                </Select>
            </FormControl>

            {renderSaleForm()}
            {renderPriceNet()}
            <DateWarningMessage date={saleData?.tout} />

            <Box sx={{ mt: 2 }}>
                <TransactionManager
                    trx={trx}
                    wallet={userData?.wallet}
                    type="sell"
                    onConfirm={clear_sales}
                    data={data}
                    onClose={onCancel}
                />
                <Button variant="outlined" onClick={onCancel} sx={{ mt: 2, mr: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default NftSaleOptions;
