import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import QrCodeIcon from "@mui/icons-material/QrCode";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import ReactCardFlip from "react-card-flip";
import { QRCode } from "react-qrcode-logo";

const ImageSection = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrSize, setQrSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    const updateQRSize = () => {
      const imageContainer = document.getElementById("nft-image-container");
      if (imageContainer) {
        setQrSize({
          width: imageContainer.offsetWidth,
          height: imageContainer.offsetHeight,
        });
      }
    };

    updateQRSize();
    window.addEventListener("resize", updateQRSize);

    return () => window.removeEventListener("resize", updateQRSize);
  }, []);

  return (
    <Box sx={{ flexBasis: { xs: "100%", md: "40%" }, position: "relative", overflow: "hidden" }}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front side - Image */}
        <Box
          id="nft-image-container"
          sx={{ position: "relative", cursor: "pointer" }}
          onClick={() => {}} // Add fullscreen image functionality here
        >
          <Image
            src={data.tokenImage}
            alt={data.collectionName}
            layout="responsive"
            width={500}
            height={500}
            objectFit="contain"
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderBottomLeftRadius: 8,
              transition: "opacity 0.3s",
              opacity: 1,
              "&:hover": { opacity: 1 },
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                // Add fullscreen image functionality here
              }}
              sx={{ color: "white" }}
            >
              <FullscreenIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderTopLeftRadius: 8,
              transition: "opacity 0.3s",
              opacity: 1,
              "&:hover": { opacity: 1 },
            }}
          >
            <IconButton
              sx={{ color: "white" }}
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(!isFlipped);
              }}
            >
              <QrCodeIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Back side - QR Code */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            position: "relative",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
              padding: "10px",
              border: "1px solid #bee32c",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
              position: "relative",
            }}
          >
            <QRCode
              // value={`http://localhost:3000/nft/${data.tokenId}`}
              value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/nft/${data.tokenId}`}
              size={Math.min(qrSize.width, qrSize.height) * 0.7}
              qrStyle="dots"
              eyeRadius={8}
              quietZone={10}
              bgColor="#f5f5f5"
              fgColor="#333333"
              logoImage="/assets-images/prodOwner2.png"
              logoWidth={60}
              logoHeight={60}
              logoPadding={5}
              logoPaddingStyle="circle"
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderTopLeftRadius: 8,
              transition: "opacity 0.3s",
              opacity: 1,
              "&:hover": { opacity: 1 },
            }}
          >
            <IconButton
              sx={{ color: "white" }}
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(!isFlipped);
              }}
            >
              <FlipCameraAndroidIcon />
            </IconButton>
          </Box>
        </Box>
      </ReactCardFlip>
    </Box>
  );
};

export default ImageSection;