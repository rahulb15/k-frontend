import React, { useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ImageSection from "./ImageSection";
import DetailsSection from "./DetailsSection";
import SaleOptions from "./SaleOptions";
import { useAccountContext } from "src/contexts";
import { useTokenPolicies, useTokenBalance, useTokenSupply, usePrecision } from "src/hooks/SWR_Hooks";

const NftMarketPlaceDetailModal = ({ open, onClose, data }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSaleOptions, setShowSaleOptions] = useState(true);
  const [saleType, setSaleType] = useState(null);
  const accountuser = useAccountContext();
  const { policies } = useTokenPolicies(data.tokenId);
  const { balance } = useTokenBalance(data.tokenId, accountuser?.user?.walletAddress);
  const { supply } = useTokenSupply(data.tokenId);
  const { precision } = usePrecision(data.tokenId);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const handleSell = () => setShowSaleOptions(true);
  const handleCancelSale = () => {
    setShowSaleOptions(false);
    setSaleType(null);
  };

  const handleSaleTypeChange = (event) => setSaleType(event.target.value);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: isFullScreen ? 0 : "50%",
          left: isFullScreen ? 0 : "50%",
          transform: isFullScreen ? "none" : "translate(-50%, -50%)",
          width: isFullScreen ? "100%" : "95%",
          height: isFullScreen ? "100%" : "auto",
          maxWidth: isFullScreen ? "none" : 1200,
          bgcolor: "#ffffff",
          boxShadow: 24,
          borderRadius: isFullScreen ? 0 : 2,
          maxHeight: isFullScreen ? "100vh" : "90vh",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#f5f5f5",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography variant="h4">{data.collectionName}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Token ID: {data.tokenId}
              </Typography>
            </div>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 8 }}>
              <IconButton onClick={toggleFullScreen}>
                {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </div>
        </Box>

        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flex: 1,
            p: 2,
            overflowY: "auto",
          }}
        >
          <ImageSection data={data} />
          <DetailsSection 
            data={data} 
            showSaleOptions={showSaleOptions}
            handleSell={handleSell}
            handleCancelSale={handleCancelSale}
          />
        </Box>

        {showSaleOptions && (
          <SaleOptions
            saleType={saleType}
            handleSaleTypeChange={handleSaleTypeChange}
            data={data}
            balance={balance}
            supply={supply}
            precision={precision}
            onClose={onClose}
          />
        )}

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#f5f5f5",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body1">Listed: <strong>{321}</strong></Typography>
          <Typography variant="body1">Supply: <strong>{5}</strong></Typography>
          <Typography variant="body1">24H Floor: <strong>{5}</strong></Typography>
          <Typography variant="body1">24H Volume: <strong>{6}</strong></Typography>
          <Typography variant="body1">
            Social Media Links: <strong><a href={"https://google.com"}>Twitter</a></strong>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default NftMarketPlaceDetailModal;