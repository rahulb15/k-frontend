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
import { useReserveSingleNftMutation } from "src/services/marketplace.service";
import { useAccountContext } from "src/contexts";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useCreateNFTMutation } from "src/services/nft.service";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const SingleNft = ({
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
    const [reserveSingleNft, { isLoading }] = useReserveSingleNftMutation();
    const account = useAccountContext();
    const [createNFT] = useCreateNFTMutation();

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
    const handleReserveNft = async () => {
        try {
            const nftData = {
                reserverAcc: account?.user?.walletAddress,
                nftName: data.nftName,
                walletName: account?.user?.walletName,
            };
            console.log(
                "🚀 ~ file: index.jsx ~ line 39 ~ handleReserveNft ~ nftData",
                nftData
            );

            const resultData = await reserveSingleNft(nftData).unwrap();
            console.log(
                "🚀 ~ file: index.jsx ~ line 39 ~ handleReserveNft ~ resultData",
                resultData
            );

            // {
            //     gas: 1097,
            //     result: { status: 'success', data: 'Write succeeded' },
            //     reqKey: 'SJtZXxtuug7dnloX5TkN9fzdS5-BI9XL5OI-zYKl4DU',
            //     logs: 'TodNkD-rXQBptEfWl_XvuVQeqA5SG7EZ8u7wkhZAd2I',
            //     events: [
            //       {
            //         params: [
            //           'k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf', 'k:db776793be0fcf8e76c75bdb35a36e67f298111dc6145c66693b0133192e2616',
            //           0.00001097
            //         ],
            //         name: 'TRANSFER',
            //         module: { namespace: null, name: 'coin' },
            //         moduleHash: 'klFkrLfpyLW-M3xjVPSdqXEMgxPPJibRt_D6qiBws6s'
            //       },
            //       {
            //         params: [
            //           'k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf', 'k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf',
            //           0.003
            //         ],
            //         name: 'TRANSFER',
            //         module: { namespace: null, name: 'coin' },
            //         moduleHash: 'klFkrLfpyLW-M3xjVPSdqXEMgxPPJibRt_D6qiBws6s'
            //       }
            //     ],
            //     metaData: {
            //       blockTime: 1725534781873617,
            //       prevBlockHash: 'fcmPyJhEy34ci80pILwrg_IlyjAo9P--uFptenDP4FM',
            //       blockHash: 'qHB6m90DB5j9xFB5a9k5sHc0dJkDX8umwp6TrDxbFos',
            //       blockHeight: 4618152
            //     },
            //     continuation: null,
            //     txId: 6438101
            //   }
            if (resultData.result.status === "success") {
                toast.success("NFT reserved successfully");
                const random = Math.floor(Math.random() * 1000000);
                console.log("Random Number:", random);

                // const data = {
                //     collectionName: "SingleNFT",
                //     reserveTknAmount: random,
                // };
                // const responsenft = await createNFT(data);
                // console.log("Create NFT Response:", responsenft);

                // if (updateResponse?.data?.status === "success") {
                //     Swal.fire({
                //         icon: "success",
                //         title: "Success!",
                //         text: "Minted successfully!",
                //     });
                // } else {
                //     Swal.fire({
                //         icon: "error",
                //         title: "Oops...",
                //         text: "Failed to mint!",
                //     });
                // }
            } else {
                toast.error("Failed to reserve NFT");
            }
        } catch (error) {
            console.log(
                "🚀 ~ file: index.jsx ~ line 39 ~ handleReserveNft ~ error",
                error
            );
        }
    };

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
                <div
                    className="card-thumbnail"
                    onClick={(e) => {
                        e.preventDefault();
                        if (data?.isRevealed) {
                            handleOpenModal();
                        }
                    }}
                >
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
                    {console.log(
                        "🚀 ~ file: index.jsx ~ line 41 ~ Nft ~ data?.isRevealed",
                        data?.isRevealed
                    )}
                  
                       
                        <Image
                            src={image}
                            alt={data?.title}
                            width={533}
                            height={533}
                        />
                    

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
                            <Button
                                onClick={() => console.log("Sell clicked")}
                                size="small"
                            >
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
                      
                                <span className="latest-bid">{data?.nftName}</span>
                           
                       
                    </div>
                    {data?.isRevealed === false && data?.isMinted === false && (
                        
                        <Button onClick={handleReserveNft} size="small">
                            {isLoading ? "Reserving..." : "Mint"}
                        </Button>
                    )}
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

SingleNft.propTypes = {
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

SingleNft.defaultProps = {
    overlay: false,
};

export default SingleNft;
