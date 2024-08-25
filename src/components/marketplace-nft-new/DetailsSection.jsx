import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const DetailsSection = ({ data, showSaleOptions, handleSell, handleCancelSale }) => {
  return (
    <Box sx={{
      flexBasis: { xs: "100%", md: "60%" },
      pl: { md: 4 },
      mt: { xs: 2, md: 0 },
  }}>
      {/* Basic Info */}
      <Box sx={{ pr: 2, maxWidth: "70%" }}>
                                    <Typography
                                        variant="body1"
                                        paragraph
                                        sx={{ fontSize: 16,display: "flex", alignItems: "center" }}
                                    >
                                        Creator:{" "}
                                        {/* k:c9078691a009cca61b9ba2f34a4ebff59b166c87a6b638eb9ed514109ecd43c8 */}
                                        <strong style={{ marginLeft: "5px" }}
                                        >{data?.creator.slice(0, 10)}...{data?.creator.slice(-10)}</strong>
                                        <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "5px",
                            marginTop: "10px",
                        }}
                    >
                        <ContentCopyIcon onClick={() => navigator.clipboard.writeText(data?.creator)} />
                    </div>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        paragraph
                                        sx={{ fontSize: 16 }}
                                    >
                                        Collection Type:{" "}
                                        <strong>{data.collectionType}</strong>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        paragraph
                                        sx={{ fontSize: 16 }}
                                    >
                                        Price:{" "}
                                        <strong>
                                            {data.nftPrice > 0
                                                ? `${data.nftPrice} KDA`
                                                : "Not for sale"}
                                        </strong>
                                    </Typography>
                                </Box>


      {/* Attributes Section */}
      {!showSaleOptions && data?.attributes && data?.attributes?.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Attributes
          </Typography>
          <Box  sx={{
                                                            display: "grid",
                                                            gridTemplateColumns:
                                                                "repeat(auto-fill, minmax(150px, 1fr))",
                                                            gap: 2,
                                                            mt: 2,
                                                        }}>
            {data.attributes.map((attr, index) => (
                    <Box
                    key={index}
                    sx={{
                        backgroundColor:
                            "#f0f0f0",
                        borderRadius: 2,
                        padding: 2,
                        textAlign:
                            "center",
                        transition:
                            "transform 0.2s, box-shadow 0.2s",
                        "&:hover":
                            {
                                transform:
                                    "translateY(-5px)",
                                boxShadow:
                                    "0 4px 10px rgba(0, 0, 0, 0.1)",
                            },
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: "#666",
                            textTransform:
                                "uppercase",
                            fontSize:
                                "0.75rem",
                            marginBottom: 1,
                        }}
                    >
                        {
                            attr.trait_type
                        }
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight:
                                "bold",
                            fontSize:
                                "1rem",
                        }}
                    >
                        {
                            attr.value
                        }
                    </Typography>
                </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Properties Section */}
      {!showSaleOptions && data.properties && data.properties.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Properties
          </Typography>
          {data.properties.map((prop, index) => (
            <Box key={index} mt={2}>
    <Box
                                                                key={index}
                                                                mt={2}
                                                            >
                                                                <Typography variant="body1">
                                                                    Collection:{" "}
                                                                    <strong>
                                                                        {
                                                                            prop
                                                                                .collection
                                                                                .name
                                                                        }
                                                                    </strong>{" "}
                                                                    (
                                                                    {
                                                                        prop
                                                                            .collection
                                                                            .family
                                                                    }
                                                                    )
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    Authors:{" "}
                                                                    <strong>
                                                                        {prop.authors
                                                                            .map(
                                                                                (
                                                                                    author
                                                                                ) =>
                                                                                    author.name
                                                                            )
                                                                            .join(
                                                                                ", "
                                                                            )}
                                                                    </strong>
                                                                </Typography>
                                                            </Box>            </Box>
          ))}
        </Box>
      )}

      {/* Sell/Cancel Button */}
      <Box  sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        maxWidth: "50%",
                                        justifyContent: "flex-end",
                                    }}>
        {showSaleOptions ? (
          <Button onClick={handleCancelSale}>Cancel Sale</Button>
        ) : (
          <Button onClick={handleSell}>
            {data?.onMarketplace && data?.onSale ? "Buy Now" : "Sell"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DetailsSection;