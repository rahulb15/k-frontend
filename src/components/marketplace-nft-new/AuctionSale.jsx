import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
// import { AuctionSellForm, AuctionPriceNet } from "./AuctionComponents";
import { TransactionManager } from "@components/Transactions";
import { useFee } from "src/hooks/SWR_Hooks";
import { MAKE_TRX } from "../../utils/makeTrx";

const AuctionSale = ({ data, balance, supply, precision, onClose }) => {
  const [saleData, setSaleData] = useState(null);
  const fee = useFee(data.tokenId);

  const trx = useMemo(
    () =>
      saleData
        ? MAKE_TRX["AUCTION-SALE"](
            data.tokenId,
            balance,
            data.creator,
            { keys: [data.creator] },
            fee,
            saleData
          )
        : null,
    [saleData, data.tokenId, balance, data.creator, fee]
  );

  return (
    <Box>
      {/* <AuctionSellForm onChange={setSaleData} /> */}
      {/* <AuctionPriceNet sale_data={saleData} token_id={data.tokenId} fee={fee} /> */}
      <TransactionManager
        trx={trx}
        wallet={data.creator}
        onConfirm={() => {}}
        data={data}
        onClose={onClose}
      />
    </Box>
  );
};

export default AuctionSale;