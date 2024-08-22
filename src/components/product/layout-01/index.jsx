import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import ClientAvatar from "@ui/client-avatar";
import Button from "@ui/button";
import PlaceBidModal from "@components/modals/placebid-modal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Swal from "sweetalert2";
import NftMarketPlaceDetailModal from "@components/marketplace-nft/NftMarketPlaceDetailModal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "src/features/cartSlice";
import { toast } from "react-toastify";
const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Product = ({ nft }) => {
    const dispatch = useDispatch();
    const [showBidModal, setShowBidModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
    };

    const handleImageClick = () => {
        setShowDetailModal(true);
    };

    const copyTokenId = () => {
        navigator.clipboard.writeText(nft.tokenId);
        Swal.fire({
            icon: "success",
            title: "Token ID copied to clipboard",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const send = (e) => {
        console.log(e);
        dispatch(addToCart(e));
        // toast.success("Item added In Your Cart");
      };

    return (
        <>
            <motion.div
                className={clsx(
                    "product-style-one",
                    nft.onSale && "with-placeBid"
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
            {/* <div className={clsx("product-style-one", nft.onSale && "with-placeBid")}> */}
                <div className="card-thumbnail" onClick={handleImageClick}>
                    {nft.tokenImage && (
                        <Image
                            src={nft.tokenImage}
                            alt={nft.collectionName || "NFT_portfolio"}
                            width={533}
                            height={533}
                            className="nft-image"
                        />
                    )}
                    {nft.duration && <CountdownTimer date={nft.duration} />} 
                 
                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        {nft.properties[0]?.authors?.map((author) => (
                            <ClientAvatar
                                key={author.name}
                                slug={author.name}
                                name={author.name}
                                image={{ src: nft.user.profileImage }}
                            />
                        ))}
                    </div>
                    <ShareDropdown />
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                    }}
                >
                    <span className="product-name">
                        {nft.tokenId.slice(0, 10)}...{nft.tokenId.slice(-10)}{" "}
                    </span>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "5px",
                            marginTop: "10px",
                        }}
                    >
                        <ContentCopyIcon onClick={copyTokenId} />
                    </div>
                </div>
                 <IconButton
                        onClick={() => send(nft)}
                        style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "none",
                        borderRadius: "50%",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        width: "40px",
                        height: "40px",
                    }}
                >
                        <ShoppingCartIcon />
                    </IconButton>
            </motion.div>
            {/* </div> */}

            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
            {showDetailModal && (
                <NftMarketPlaceDetailModal
                    open={showDetailModal}
                    onClose={handleCloseModal}
                    data={nft}
                />
            )}
            <style jsx>{`
                .card-thumbnail {
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                }
                .nft-image {
                    display: block;
                    width: 100%;
                    height: auto;
                }
                .buy-now-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                .buy-now-button {
                    background: linear-gradient(90deg, #ff8a00, #e52e71);
                    border-radius: 5px;
                    padding: 10px 20px;
                    font-size: 14px;
                    color: #fff;
                }
                .product-style-one:hover .buy-now-container {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
                .cart-button {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    background-color: rgba(255, 255, 255, 0.8);
                    border: none;
                    border-radius: 50%;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                .product-style-one:hover .cart-button {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </>
    );
};

Product.propTypes = {
    nft: PropTypes.shape({
        tokenId: PropTypes.string.isRequired,
        tokenImage: PropTypes.string.isRequired,
        collectionName: PropTypes.string.isRequired,
        duration: PropTypes.string,
        onSale: PropTypes.bool.isRequired,
        properties: PropTypes.arrayOf(
            PropTypes.shape({
                collection: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    family: PropTypes.string.isRequired,
                }).isRequired,
                authors: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired
        ).isRequired,
        bidInfo: PropTypes.array.isRequired,
        likes: PropTypes.number.isRequired,
        nftPrice: PropTypes.number.isRequired,
        user: PropTypes.shape({
            profileImage: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default Product;
