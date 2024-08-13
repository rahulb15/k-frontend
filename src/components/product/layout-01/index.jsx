import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import Button from "@ui/button";
import PlaceBidModal from "@components/modals/placebid-modal";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Product = ({ nft }) => {
    console.log("nft", nft);
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };

    return (
        <>
            <motion.div
                className={clsx(
                    "product-style-one",
                    nft.onSale && "with-placeBid"
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <div className="card-thumbnail">
                    {nft.tokenImage && (
                        <Anchor path={`/product/${nft.tokenId}`}>
                            <Image
                                src={nft.tokenImage}
                                alt={nft.collectionName || "NFT_portfolio"}
                                width={533}
                                height={533}
                                className="nft-image"
                            />
                        </Anchor>
                    )}
                    {nft.duration && <CountdownTimer date={nft.duration} />}
                    {nft.onSale && (
                        <motion.div
                            className="buy-now-container"
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button size="small" className="buy-now-button">
                                Buy Now
                            </Button>
                        </motion.div>
                    )}
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
                        <Anchor
                            className="more-author-text"
                            path={`/product/${nft.tokenId}`}
                        >
                            {nft.bidInfo.length}+ Place Bit.
                        </Anchor>
                    </div>
                    <ShareDropdown />
                </div>
                <Anchor path={`/product/${nft.tokenId}`}>
                    <span className="product-name">{nft.collectionName}</span>
                </Anchor>
                {/* <span className="latest-bid">Highest bid {nft.nftPrice} KDA</span> */}
                <button className="latest-bid" onClick={handleBidModal}>
                    Buy Now
                </button>
                <div className="product-bid-info">
                    {/* <span>{nft.likes} Likes</span> */}
                </div>
            </motion.div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
            <style jsx>{`
                .card-thumbnail {
                    position: relative;
                    overflow: hidden;
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













// import { useState } from "react";
// import dynamic from "next/dynamic";
// import PropTypes from "prop-types";
// import Image from "next/image";
// import clsx from "clsx";
// import Anchor from "@ui/anchor";
// import ClientAvatar from "@ui/client-avatar";
// import ProductBid from "@components/product-bid";
// import Button from "@ui/button";
// import { ImageType } from "@utils/types";
// import PlaceBidModal from "@components/modals/placebid-modal";


// const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
//     ssr: false,
// });

// const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
//     ssr: false,
// });

// const Product = ({
//     overlay,
//     title,
//     slug,
//     latestBid,
//     price,
//     likeCount,
//     auction_date,
//     image,
//     bitCount,
//     authors,
//     placeBid,
//     disableShareDropdown,
// }) => {
//     const [showBidModal, setShowBidModal] = useState(false);
//     const handleBidModal = () => {
//         setShowBidModal((prev) => !prev);
//     };
//     return (
//         <>
//             <div
//                 className={clsx(
//                     "product-style-one",
//                     !overlay && "no-overlay",
//                     placeBid && "with-placeBid"
//                 )}
//             >
//                 <div className="card-thumbnail">
//                     {image?.src && (
//                         <Anchor path={`/product/${slug}`}>
//                             <Image
//                                 src={image.src}
//                                 alt={image?.alt || "NFT_portfolio"}
//                                 width={533}
//                                 height={533}
//                             />
//                         </Anchor>
//                     )}
//                     {auction_date && <CountdownTimer date={auction_date} />}
//                     {placeBid && (
//                         <Button onClick={handleBidModal} size="small">
//                             Place Bid
//                         </Button>
//                     )}
//                 </div>
//                 <div className="product-share-wrapper">
//                     <div className="profile-share">
//                         {authors?.map((client) => (
//                             <ClientAvatar
//                                 key={client.name}
//                                 slug={client.slug}
//                                 name={client.name}
//                                 image={client.image}
//                             />
//                         ))}
//                         <Anchor
//                             className="more-author-text"
//                             path={`/product/${slug}`}
//                         >
//                             {bitCount}+ Place Bit.
//                         </Anchor>
//                     </div>
//                     {!disableShareDropdown && <ShareDropdown />}
//                 </div>
//                 <Anchor path={`/product/${slug}`}>
//                     <span className="product-name">{title}</span>
//                 </Anchor>
//                 <span className="latest-bid">Highest bid {latestBid}</span>
//                 <ProductBid price={price} likeCount={likeCount} />
//             </div>
//             <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
//         </>
//     );
// };

// Product.propTypes = {
//     overlay: PropTypes.bool,
//     title: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     latestBid: PropTypes.string.isRequired,
//     price: PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         currency: PropTypes.string.isRequired,
//     }).isRequired,
//     likeCount: PropTypes.number.isRequired,
//     auction_date: PropTypes.string,
//     image: ImageType.isRequired,
//     authors: PropTypes.arrayOf(
//         PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             slug: PropTypes.string.isRequired,
//             image: ImageType.isRequired,
//         })
//     ),
//     bitCount: PropTypes.number,
//     placeBid: PropTypes.bool,
//     disableShareDropdown: PropTypes.bool,
// };

// Product.defaultProps = {
//     overlay: false,
// };

// export default Product;

