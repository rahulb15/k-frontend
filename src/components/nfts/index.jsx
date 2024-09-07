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
import { useSyncSingleNftMutation } from "src/services/marketplace.service";
import { useAccountContext } from "src/contexts";
import { toast } from "react-toastify";
import nftServices from "src/services/nftServices";
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
    refetchOwnedNfts,
}) => {
    console.log("🚀 ~ file: index.jsx ~ line 13 ~ Nft ~ data", data);
    const [showBidModal, setShowBidModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [syncSingleNft, { isLoading }] = useSyncSingleNftMutation();
    const account = useAccountContext();

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

    const handleReveal = async () => {
        try {
            // const { singleNftName, account, walletName } = args;
            // my collection name is Bharat Mata_1725723298350 get only Bharat Mata
            const nftName = data?.collectionName.split("_")[0];
            console.log(
                "🚀 ~ file: index.jsx ~ line 64 ~ handleReveal ~ nftName",
                nftName
            );
            const nftData = {
                account: account?.user?.walletAddress,
                singleNftName: nftName,
                walletName: account?.user?.walletName,
            };

            const resultData = await syncSingleNft(nftData).unwrap();
            console.log( "🚀 ~ file: index.jsx ~ line 72 ~ handleReveal ~ resultData", resultData);
        //    const resultData = {
        //         "gas": 2578,
        //         "result": {
        //             "status": "success",
        //             "data": "t:rLw65JwrHtR1oDJm-uTcEuVbceuc3Dsdb97DLC3wABI"
        //         },
        //         "reqKey": "dGMyWysowRW7L2WMkf0mZYap4QhdM4yFbi-M434IIfw",
        //         "logs": "jJT_gLWTdeKzequV1pOiM1RPYFViAFeAyeULKyrXIis",
        //         "events": [
        //             {
        //                 "params": [
        //                     "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf",
        //                     "k:db776793be0fcf8e76c75bdb35a36e67f298111dc6145c66693b0133192e2616",
        //                     0.00002578
        //                 ],
        //                 "name": "TRANSFER",
        //                 "module": {
        //                     "namespace": null,
        //                     "name": "coin"
        //                 },
        //                 "moduleHash": "klFkrLfpyLW-M3xjVPSdqXEMgxPPJibRt_D6qiBws6s"
        //             },
        //             {
        //                 "params": [
        //                     "t:rLw65JwrHtR1oDJm-uTcEuVbceuc3Dsdb97DLC3wABI",
        //                     "https://arkade-prod.s3.amazonaws.com/looney-bulls-airdrop-NG-metadata/70.json",
        //                     {
        //                         "int": 0
        //                     },
        //                     [
        //                         "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-instant-mint",
        //                         "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-marketplace",
        //                         "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-fixed-sale",
        //                         "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.policy-auction-sale"
        //                     ]
        //                 ],
        //                 "name": "TOKEN-CREATE",
        //                 "module": {
        //                     "namespace": "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db",
        //                     "name": "ledger"
        //                 },
        //                 "moduleHash": "u3XErq-f8U12FRw8T_MdEZo7kOVzoWsowH89HgLzTFU"
        //             },
        //             {
        //                 "params": [
        //                     "t:rLw65JwrHtR1oDJm-uTcEuVbceuc3Dsdb97DLC3wABI",
        //                     "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf",
        //                     1
        //                 ],
        //                 "name": "MINT",
        //                 "module": {
        //                     "namespace": "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db",
        //                     "name": "ledger"
        //                 },
        //                 "moduleHash": "u3XErq-f8U12FRw8T_MdEZo7kOVzoWsowH89HgLzTFU"
        //             },
        //             {
        //                 "params": [
        //                     "t:rLw65JwrHtR1oDJm-uTcEuVbceuc3Dsdb97DLC3wABI",
        //                     1
        //                 ],
        //                 "name": "SUPPLY",
        //                 "module": {
        //                     "namespace": "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db",
        //                     "name": "ledger"
        //                 },
        //                 "moduleHash": "u3XErq-f8U12FRw8T_MdEZo7kOVzoWsowH89HgLzTFU"
        //             },
        //             {
        //                 "params": [
        //                     "t:rLw65JwrHtR1oDJm-uTcEuVbceuc3Dsdb97DLC3wABI",
        //                     1,
        //                     {
        //                         "account": "",
        //                         "current": 0,
        //                         "previous": 0
        //                     },
        //                     {
        //                         "account": "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf",
        //                         "current": 1,
        //                         "previous": 0
        //                     }
        //                 ],
        //                 "name": "RECONCILE",
        //                 "module": {
        //                     "namespace": "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db",
        //                     "name": "ledger"
        //                 },
        //                 "moduleHash": "u3XErq-f8U12FRw8T_MdEZo7kOVzoWsowH89HgLzTFU"
        //             }
        //         ],
        //         "metaData": {
        //             "blockTime": 1725726198583748,
        //             "prevBlockHash": "VFQxbpdN0THSp8qjPXw7GCs1VkOJtbDzjh4HHY0v9qk",
        //             "blockHash": "oNsS1tN_XhCjpiCARYNqwSHuTyfjhCsoie5A5c6nEaE",
        //             "blockHeight": 4624531
        //         },
        //         "continuation": null,
        //         "txId": 6445446
        //     }
            if (resultData.result.status === "success") {
                console.log("success");
                console.log("resultData", account?.user?.walletAddress);
                console.log("make strin to array", new Array(resultData.result.data));
                console.log("resultData", data?.collectionName);
                const databody = {
                    collectionName: data?.collectionName,
                    tokenId: new Array(resultData.result.data),
                    wallet: account?.user?.walletAddress,
                };
                console.log("databody", databody);
                const result = await nftServices.updateMyNFT(databody);
                console.log("result", result);
                if (result.status === "success") {
                    toast.success("NFT revealed successfully");
                    refetchOwnedNfts();
                }else{
                    toast.error("NFT reveal failed");
                }


            } else {
                toast.error("NFT reveal failed");
            }

        } catch (error) {
            console.log("error", error);
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
                    onClick={
                        data?.isRevealed === false ? () => {} : handleOpenModal
                    }
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
                    {data?.isRevealed === false &&
                        data?.collectionType === "SingleNFT" && (
                            <Button onClick={handleReveal} size="small">
                                Reveal Now
                            </Button>
                        )}

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
                        {data?.isRevealed === false ? (
                            <span className="latest-bid">Not Revealed</span>
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
                    refetchOwnedNfts={refetchOwnedNfts}
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
