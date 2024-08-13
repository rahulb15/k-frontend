import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";
import NftDetailModal from "./NftDetailModal";


const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Nft = ({
    overlay,
    title,
    slug,
    latestBid,
    price,
    likeCount,
    auction_date,
    image,
    bitCount,
    authors,
    placeBid,
    data,
    disableShareDropdown,
    sellable,
}) => {
    console.log("🚀 ~ file: index.jsx ~ line 13 ~ Nft ~ data", data);
    const [showBidModal, setShowBidModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleOpenModal = () => {
        setShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
    };
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    console.log("imge", image);
    return (
        <>
              <div
                className={clsx(
                    "product-style-one",
                    !overlay && "no-overlay",
                    placeBid && "with-placeBid"
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="card-thumbnail" onClick={handleOpenModal}>
                {/* {image?.src && (
                        <Anchor path={`/product/${slug}`}>
                            <Image
                                src={image.src}
                                alt={image?.alt || "NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )} */}
{console.log("🚀 ~ file: index.jsx ~ line 41 ~ Nft ~ data?.isRevealed", data?.isRevealed)}
                    {data?.isRevealed === false ? (
                        <Image
                            src="/assets-images/nft/nft2.jpeg"
                            alt="NFT_portfolio"
                            width={533}
                            height={533}
                        />
                    ) : (
                        // <Image
                        //     src={data?.image}
                        //     alt={data?.title}
                        //     width={533}
                        //     height={533}
                        // />

                        // 'blob:nodedata:9588165b-ce9f-4483-8001-5747671a925c'
                        <Image
                            src={image}
                            alt={data?.title}
                            width={533}
                            height={533}
                        />
                        



                        
                    )}
                    





                    {auction_date && <CountdownTimer date={auction_date} />}
                    {/* {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )} */}
                    {/* {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )} */}

                   
{data?.isRevealed && isHovered && (
                        <div className="sell-button-overlay">
                            <Button onClick={() => console.log("Sell clicked")} size="small">
                                Sell
                            </Button>
                        </div>
                    )}

                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        {/* {authors?.map((client) => (
                            <ClientAvatar
                                key={client.name}
                                slug={client.slug}
                                name={client.name}
                                image={client.image}
                            />
                        ))} */}
                        {data?.isRevealed === false ? (
                                       <span className="latest-bid">
                                        Not Revealed
                                       </span>
                        ) : (
                            <></>
                        )}

                    </div>
                    {!disableShareDropdown && <ShareDropdown />}
                </div>
                <Anchor path={`/product/${slug}`}>
                    <span className="product-name">{title}</span>
                </Anchor>
                {/* <span className="latest-bid">Highest bid {latestBid}</span> */}
                {/* <ProductBid price={price} likeCount={likeCount} /> */}
            </div>
            {/* <NftDetailModal
                open={showDetailModal}
                onClose={handleCloseModal}
                data={data}
            /> */}
            {showDetailModal && (
                <NftDetailModal
                    open={showDetailModal}
                    onClose={handleCloseModal}
                    data={data}
                />
            )}
        </>
    );
};

Nft.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    latestBid: PropTypes.string.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    likeCount: PropTypes.number.isRequired,
    auction_date: PropTypes.string,
    image: ImageType.isRequired,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            image: ImageType.isRequired,
        })
    ),
    bitCount: PropTypes.number,
    placeBid: PropTypes.bool,
    disableShareDropdown: PropTypes.bool,
};

Nft.defaultProps = {
    overlay: false,
};

export default Nft;
