import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import CollectionDetailTab from "@components/product-details/collection-detail-tab";
import ProductTitle from "@components/product-details/title";
import { Range } from "react-range";
import { Rings } from "react-loader-spinner";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useAccountContext } from "src/contexts";
import collectionService from "src/services/collection.service";
import {
    useCheckPublicMutation,
    useCheckPublicPriceMutation,
    useCheckWlMutation,
    useCheckWlPriceMutation,
    useCheckPresaleMutation,
    useCheckPresalePriceMutation,
    useReserveTokensMutation,
} from "src/services/launchpad.service";
import axios from "axios";
import Loader from "@components/loader";
import { useCreateNFTMutation } from "src/services/nft.service";

const CollectionDetailsArea = ({ space, className, product }) => {
    console.log("Product:", product);
    const [isLoading, setIsLoading] = useState(false);

    // {
    //     _id: '66a0dfd4e6d44576141be399',
    //     collectionName: 'monkeyaz7',
    //     creatorName: 'Rahul',
    //     creatorWallet:
    //       'k:d1d47937b0ec42efa859048d0fb5f51707639ddad991e58ae9efcff5f4ff9dbe',
    //     creatorEmail: 'rahulb@yopmail.com',
    //     projectDescription: 'Hello',
    //     projectCategory: 'ART',
    //     expectedLaunchDate: '2024-07-31',
    //     twitter: '',
    //     discord: '',
    //     instagram: '',
    //     website: '',
    //     totalSupply: '4',
    //     contractType: 'ng',
    //     royaltyPercentage: '0.5',
    //     mintPrice: '1.0',
    //     mintPriceCurrency: 'kda',
    //     tokenList: [
    //       'ipfs://QmVdXq6EjDEQq6U5cDqab2xvaMzHLgpQKjW56iVJYbji7a', 'ipfs://QmRPqajKGNCtKyA7oE5Lx3H8YijyfopS8oaVcdZCSUDyEP',
    //       'ipfs://QmPJAuW9MpZwcdzw86ECFyBqVb9HvTfHsaqAQiKCvPmSPD', 'ipfs://QmXHR1BFLd8MYMEYbrhMkboLc1oEG2tbygomaxCknosQNN'
    //     ],
    //     policy: [ 'INSTANT-MINT MARKETPLACE FIXED-SALE COLLECTION' ],
    //     collectionCoverImage:
    //       'https://res.cloudinary.com/dh187xay8/image/upload/v1721817315/collectionCoverImage/file.jpg',
    //     collectionBannerImage:
    //       'https://res.cloudinary.com/dh187xay8/image/upload/v1721817316/collectionBannerImage/file.jpg',
    //     mintStartDate: '2024-07-31T11:03:00.000Z',
    //     mintStartTime: 'time "2024-07-31T11:03:00Z"',
    //     mintEndDate: '2025-07-31T11:03:00.000Z',
    //     mintEndTime: 'time "2025-07-31T11:03:00Z"',
    //     allowFreeMints: false,
    //     enableWhitelist: true,
    //     whitelistAddresses: [],
    //     reservePrice: 0,
    //     enablePresale: true,
    //     presaleAddressess: [],
    //     enableAirdrop: false,
    //     createdAt: '2024-07-24T11:04:52.182Z',
    //     updatedAt: '2024-07-24T11:04:52.182Z'
    //   }
    const [checkPublic] = useCheckPublicMutation();
    const [checkPublicPrice] = useCheckPublicPriceMutation();
    const [checkWl] = useCheckWlMutation();
    const [checkWlPrice] = useCheckWlPriceMutation();
    const [checkPresale] = useCheckPresaleMutation();
    const [checkPresalePrice] = useCheckPresalePriceMutation();
    const [reserveTokens] = useReserveTokensMutation();
    const [createNFT, { isError, data, error }] = useCreateNFTMutation();
    const account = useAccountContext();

    const [stageInfo, setStageInfo] = useState({
        currentStage: null,
        isLive: false,
        price: 0,
    });
    const [kdatoUsd, setKdatoUsd] = useState(0);
    const [iagree, setIagree] = useState(false);
    const [swap, setSwap] = useState(false);
    const [reservePrice, setReservePrice] = useState(0);

    useEffect(() => {
        const checkStages = async () => {
            setIsLoading(true);
            try {
                if (product.enablePresale) {
                    const presaleResponse = await checkPresale({
                        colName: product.collectionName,
                    });
                    console.log("Presale Response:", presaleResponse);
                    if (presaleResponse.data) {
                        const priceResponse = await checkPresalePrice({
                            colName: product.collectionName,
                        });
                        setStageInfo({
                            currentStage: "Presale",
                            isLive: true,
                            price: priceResponse.data,
                        });
                        return;
                    }
                }
                if (product.enableWhitelist) {
                    const wlResponse = await checkWl({
                        colName: product.collectionName,
                    });
                    console.log("Whitelist Response:", wlResponse);
                    if (wlResponse.data) {
                        const priceResponse = await checkWlPrice({
                            colName: product.collectionName,
                        });
                        setStageInfo({
                            currentStage: "Whitelist",
                            isLive: true,
                            price: priceResponse.data,
                        });
                        return;
                    }
                }
                const publicResponse = await checkPublic({
                    colName: product.collectionName,
                });
                console.log("Public Response:", publicResponse);
                if (publicResponse.data) {
                    const priceResponse = await checkPublicPrice({
                        colName: product.collectionName,
                    });
                    setStageInfo({
                        currentStage: "Public",
                        isLive: true,
                        price: priceResponse.data,
                    });
                } else {
                    setStageInfo({
                        currentStage: "Not Started",
                        isLive: false,
                        price: 0,
                    });
                }
            } catch (error) {
                console.error("Error checking stages:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "There was an error loading the mint stages. Please try again later.",
                });
            } finally {
                setIsLoading(false);
            }
        };

        checkStages();
    }, [
        product,
        checkPresale,
        checkWl,
        checkPublic,
        checkPresalePrice,
        checkWlPrice,
        checkPublicPrice,
    ]);

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/simple/price?ids=kadena&vs_currencies=usd"
            )
            .then((response) => setKdatoUsd(response.data.kadena.usd))
            .catch((error) => console.log(error));
    }, []);

    const handleMint = () => {
        if (!stageInfo.isLive) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No sale is currently live. Minting is not available at this time.",
            });
            return;
        }

        if (iagree) {
            setSwap(true);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please agree to the terms!",
            });
        }
    };

    const confirmMint = async () => {
        setIsLoading(true);
        try {
            if (
                parseInt(reservePrice) <= 0 ||
                parseInt(reservePrice) >
                    parseInt(product.totalSupply) - product.reservePrice
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid number of mints!",
                });
                return;
            }

            if (!iagree) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please agree to the terms!",
                });
                return;
            }

            const response = await reserveTokens({
                reseveTknColName: product.collectionName,
                reserverAcc: account?.user?.walletAddress,
                reserveTknAmount: parseInt(reservePrice),
                walletName: account?.user?.walletName,
            });
            console.log("Reserve Tokens Response:", response);

            // {
            //     data: {
            //       gas: 42251,
            //       result: { status: 'success', data: true },
            //       reqKey: 'KCXU3jTWmmQmIc4xQa-_w1TFWlz-LADjTTRDW85sxHY',
            //       logs: 'L1lnmLd3bzQ_fU0RSm9ZpEVYZbJuZuHVi4A5TkUEnvg',
            //       events: [
            //         {
            //           params: [
            //             'k:a2ff4689f89f0f3bb6a32fa35b8547c0cb4070f6b4af76fb53892f44fe1f9069', 'k:db776793be0fcf8e76c75bdb35a36e67f298111dc6145c66693b0133192e2616',
            //             0.00042251
            //           ],
            //           name: 'TRANSFER',
            //           module: { namespace: null, name: 'coin' },
            //           moduleHash: 'klFkrLfpyLW-M3xjVPSdqXEMgxPPJibRt_D6qiBws6s'
            //         },
            //         {
            //           params: [ 'k:a2ff4689f89f0f3bb6a32fa35b8547c0cb4070f6b4af76fb53892f44fe1f9069' ],
            //           name: 'MINT-NFT',
            //           module: { namespace: 'free', name: 'lptest001' },
            //           moduleHash: 'z4eKB4zFUKbHMt4msXtEfw6wPFEPqHMJz02ULTGy0qM'
            //         },
            //         {
            //           params: [
            //             'k:a2ff4689f89f0f3bb6a32fa35b8547c0cb4070f6b4af76fb53892f44fe1f9069', 'k:d1d47937b0ec42efa859048d0fb5f51707639ddad991e58ae9efcff5f4ff9dbe',
            //             1
            //           ],
            //           name: 'TRANSFER',
            //           module: { namespace: null, name: 'coin' },
            //           moduleHash: 'klFkrLfpyLW-M3xjVPSdqXEMgxPPJibRt_D6qiBws6s'
            //         },
            //         {
            //           params: [
            //             'monkeyaz8', 'k:a2ff4689f89f0f3bb6a32fa35b8547c0cb4070f6b4af76fb53892f44fe1f9069',
            //             { int: 1 }
            //           ],
            //           name: 'MINT_EVENT',
            //           module: { namespace: 'free', name: 'lptest001' },
            //           moduleHash: 'z4eKB4zFUKbHMt4msXtEfw6wPFEPqHMJz02ULTGy0qM'
            //         }
            //       ],
            //       metaData: {
            //         blockTime: 1721893894985698,
            //         prevBlockHash: '4U4C1zmeS_UDVYbvyvn_oAD3CotALQwmA_rl9Jkd7Ts',
            //         blockHash: 'IORjaxIdnFmCLkQSstT4tAZILZUWmVRsphGa8ZcOL3w',
            //         blockHeight: 4496846
            //       },
            //       continuation: null,
            //       txId: 6296780
            //     }
            //   }

            if (response.data.result.status === "success") {
                const updateResponse = await collectionService.updateCollection(
                    {
                        reservePrice:
                            product.reservePrice + parseInt(reservePrice),
                    },
                    product.collectionName
                );

                const data = {
                    collectionName: product.collectionName,
                    reserveTknAmount: parseInt(reservePrice),
                };
                const responsenft = await createNFT(data);
                console.log("Create NyncColName,FT Response:", responsenft);

                if (updateResponse?.data?.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Minted successfully!",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Minting failed!",
                });
            }
        } catch (error) {
            console.error("Error during minting:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "There was an error during the minting process. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
            style={{ position: "relative", overflow: "hidden" }}
        >
            {isLoading && <Loader />}

            {/* Background image container */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // backgroundImage: `linear-gradient(rgba(70, 70, 70, 0.7), rgba(70, 70, 70, 0.7)), url(${imageUrl})`,
                    backgroundImage: `url(${product?.collectionBannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    filter: "blur(5px)",
                    transform: "scale(1.1)", // Prevents blur from showing edges
                    zIndex: -2,
                }}
            />
            {/* Dark overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(70, 70, 70, 0.5)", // Adjust opacity as needed
                    zIndex: -1,
                }}
            />
            {/* Background and overlay code remains the same */}
            <div className="container">
                <div className="row g-2 mb--30">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <Sticky>
                            <CollectionDetailTab
                                image={product?.collectionCoverImage}
                            />
                        </Sticky>
                    </div>
                    <motion.div
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60"
                    >
                        <div className="rn-pd-content-area">
                            <ProductTitle title="Mint Stages" />
                            <div className="mint-stages">
                                {["Presale", "Whitelist", "Public"].map(
                                    (stage, index) => (
                                        <div className="mint-stage" key={index}>
                                            <h3>
                                                {stage}
                                                {stageInfo.currentStage ===
                                                stage ? (
                                                    <span className="live">
                                                        <div className="d-flex justify-content-start">
                                                            <Rings
                                                                color="green"
                                                                height={20}
                                                                width={20}
                                                            />
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    color: "green",
                                                                }}
                                                            >
                                                                Live
                                                            </span>
                                                        </div>
                                                    </span>
                                                ) : (
                                                    <span className="ended">
                                                        ENDED
                                                    </span>
                                                )}
                                            </h3>
                                            <p>
                                                Price{" "}
                                                {stageInfo.currentStage ===
                                                stage
                                                    ? parseFloat(
                                                          stageInfo.price
                                                      ).toFixed(2)
                                                    : "0"}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="mint-info">
                                <div className="total-minted">
                                    <div
                                        className="range-slider"
                                        style={{ width: "100%" }}
                                    >
                                        <div className="d-flex justify-content-start">
                                            <Rings
                                                color="green"
                                                height={20}
                                                width={20}
                                            />
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "green",
                                                }}
                                            >
                                                Live
                                            </span>
                                        </div>
                                        <p>
                                            Total Minted{" "}
                                            {product?.reservePrice || 0} /{" "}
                                            {parseInt(product.totalSupply)}
                                        </p>
                                        <Range
                                            values={[
                                                product
                                                    ? product.reservePrice
                                                    : 0,
                                            ]}
                                            step={1}
                                            min={0}
                                            max={
                                                product
                                                    ? parseInt(
                                                          product.totalSupply
                                                      )
                                                    : 100
                                            }
                                            onChange={() => {}}
                                            renderTrack={({
                                                props,
                                                children,
                                            }) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: "36px",
                                                        display: "flex",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <div
                                                        ref={props.ref}
                                                        style={{
                                                            height: "5px",
                                                            width: "100%",
                                                            borderRadius: "4px",
                                                            background: `linear-gradient(to right,
                                                            #FF0000 0%,     
                                                            #FFFF00 ${
                                                                product
                                                                    ? (product.reservePrice /
                                                                          (parseInt(
                                                                              product.totalSupply
                                                                          ) ||
                                                                              1)) *
                                                                      100
                                                                    : 0
                                                            }%,
                                                            #00FF00 ${
                                                                product
                                                                    ? (product.reservePrice /
                                                                          (parseInt(
                                                                              product.totalSupply
                                                                          ) ||
                                                                              1)) *
                                                                      100
                                                                    : 0
                                                            }%, 
                                                            #0000FF ${
                                                                product
                                                                    ? (product.reservePrice /
                                                                          (parseInt(
                                                                              product.totalSupply
                                                                          ) ||
                                                                              1)) *
                                                                      100
                                                                    : 0
                                                            }%, 
                                                            rgb(204, 204, 204) ${
                                                                product
                                                                    ? (product.reservePrice /
                                                                          (parseInt(
                                                                              product.totalSupply
                                                                          ) ||
                                                                              1)) *
                                                                      100
                                                                    : 100
                                                            }%)`,
                                                            alignSelf: "center",
                                                        }}
                                                    >
                                                        {children}
                                                    </div>
                                                </div>
                                            )}
                                            renderThumb={({ props }) => (
                                                <div {...props} />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="price">
                                    <h2>
                                        {parseFloat(stageInfo.price).toFixed(2)}{" "}
                                        KDA
                                    </h2>
                                    <p>
                                        (${" "}
                                        {parseFloat(
                                            stageInfo.price * kdatoUsd
                                        ).toFixed(2)}
                                        )
                                    </p>
                                </div>
                            </div>
                            <div className="mint-form">
                                <div className="terms">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        onChange={(e) =>
                                            setIagree(e.target.checked)
                                        }
                                    />
                                    <label htmlFor="terms">
                                        I agree to the General Terms of Service
                                    </label>
                                </div>
                                {!swap ? (
                                    <button
                                        className="buttonlaunchpad"
                                        onClick={handleMint}
                                    >
                                        {stageInfo.isLive
                                            ? "Mint Here!"
                                            : "Minting Not Available"}
                                    </button>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="number-input-container"
                                    >
                                        <input
                                            type="number"
                                            placeholder="Number of Mints"
                                            value={reservePrice}
                                            onChange={(e) => {
                                                const value = parseInt(
                                                    e.target.value
                                                );
                                                if (
                                                    value > 0 &&
                                                    value <=
                                                        parseInt(
                                                            product.totalSupply
                                                        ) -
                                                            product.reservePrice
                                                ) {
                                                    setReservePrice(value);
                                                }
                                            }}
                                            className="number-input"
                                        />
                                        <button
                                            className="buttonlaunchpad"
                                            onClick={confirmMint}
                                        >
                                            Confirm
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                            <p className="disclaimer">
                                Please note this Collection is not a Launchpad
                                project. The Creator has chosen to mint the
                                Collection on its own website and have it as a
                                Featured Mint on Kryptomerch. Any decision by
                                you to mint the Collection is at your own
                                discretion and subject to any terms that are
                                directly between you and the Creator on the mint
                                website.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

CollectionDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        collectionCoverImage: PropTypes.string.isRequired,
        collectionName: PropTypes.string.isRequired,
        totalSupply: PropTypes.string.isRequired,
        reservePrice: PropTypes.number.isRequired,
        enablePresale: PropTypes.bool.isRequired,
        enableWhitelist: PropTypes.bool.isRequired,
    }).isRequired,
};

CollectionDetailsArea.defaultProps = {
    space: 1,
};

export default CollectionDetailsArea;