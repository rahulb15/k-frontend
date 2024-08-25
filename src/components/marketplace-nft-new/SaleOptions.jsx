import React from "react";
import { Box, Typography } from "@mui/material";
import FixedPriceSale from "./FixedPriceSale";
import AuctionSale from "./AuctionSale";
import DutchAuctionSale from "./DutchAuctionSale";

const SaleOptions = ({ saleType, handleSaleTypeChange, data, balance, supply, precision, onClose }) => {
    console.log("SaleOptions: ", saleType, data);
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Choose Sale Type
      </Typography>
      <Box sx={{ display: "flex", gap: "20px", mt: 2 }} 
        >
      
        <Box
          onClick={() => handleSaleTypeChange({ target: { value: "Fixed-Sale" } })}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Fixed Price
          </Typography>
        </Box>
        <Box
          onClick={() => handleSaleTypeChange({ target: { value: "Auction-Sale" } })}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Auction
          </Typography>
        </Box>
        <Box
          onClick={() => handleSaleTypeChange({ target: { value: "Dutch-Auction-Sale" } })}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
            Dutch Auction
          </Typography>
        </Box>
      </Box>

      {saleType === "Fixed-Sale" && (
        <FixedPriceSale data={data} balance={balance} supply={supply} precision={precision} onClose={onClose} />
      )}
      {saleType === "Auction-Sale" && (
        <AuctionSale data={data} balance={balance} supply={supply} precision={precision} onClose={onClose} />
      )}
      {saleType === "Dutch-Auction-Sale" && (
        <DutchAuctionSale data={data} balance={balance} supply={supply} precision={precision} onClose={onClose} />
      )}
    </Box>
  );
};

export default SaleOptions;