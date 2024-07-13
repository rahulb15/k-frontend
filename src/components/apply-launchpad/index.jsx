/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from "@ui/button";
import styles from "./ApplyLaunchpadWrapper.module.css";
import userService from "src/services/user.service";
import collectionService from "src/services/collection.service";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SumsubWebSdk from "@sumsub/websdk-react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useAccountContext } from "src/contexts";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import { MutatingDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useCollectionRequestMutation } from "src/services/launchpad.service";
import {
    setCollectionRequestName,
    setCollectionRequestSymbol,
    setCollectionRequestCreator,
    setLastRequestResult,
    setCollectionRequestDescription,
    setCollectionRequestCategory,
    setCollectionRequestSupply,
    setCollectionRequestUriList,
    setCollectionRequestMintPrice,
    setCollectionRequestRoyalityPerc,
    setCollectionRequestRoyalityAddress,
    setCollectionRequestCoverImgUrl,
    setCollectionRequestBannerImgUrl,
    setCollectionRequestStartDate,
    setCollectionRequesEndDate,
    setCollectionRequestEnableFreeMint,
    setCollectionRequestEnableWl,
    setCollectionRequestEnablePresale,
    setCollectionRequestEnableAirdrop,
    setCollectionRequestPolicy,
    setWalletName,
} from "src/features/launchpadSlice";

import { FaTwitter, FaGlobe, FaDiscord, FaInstagram } from "react-icons/fa";
import Swal from "sweetalert2";
const shakeAnimation = {
    shake: {
        x: [0, -10, 10, -10, 10, 0],
        transition: {
            duration: 0.4,
        },
    },
};

const ApplyLaunchpadWrapper = ({ className, space }) => {
    const dispatch = useDispatch();
    const [collectionRequest, { isLoading, isError, error }] =
        useCollectionRequestMutation();
    const account = useAccountContext();
    console.log(account);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [accessToken, setAccessToken] = useState("");
    const [selectedBannerImage, setSelectedBannerImage] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [shake, setShake] = useState(false);
    const [kycStatus, setKycStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [imageCoverLoading, setImageCoverLoading] = useState(false);
    const [imageBannerLoading, setImageBannerLoading] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const {
        collectionRequestName,
        collectionRequestSymbol,
        collectionRequestCreator,
        collectionRequestDescription,
        collectionRequestCategory,
        collectionRequestSupply,
        collectionRequestUriList,
        collectionRequestMintPrice,
        collectionRequestRoyalityPerc,
        collectionRequestRoyalityAddress,
        collectionRequestCoverImgUrl,
        collectionRequestBannerImgUrl,
        collectionRequestStartDate,
        collectionRequesEndDate,
        collectionRequestEnableFreeMint,
        collectionRequestEnableWl,
        collectionRequestEnablePresale,
        collectionRequestEnableAirdrop,
        collectionRequestPolicy,
        walletName,
    } = useSelector((state) => state.launchpad);

    console.log(
        "🚀 ~ file: ApplyLaunchpadWrapper.js ~ line 86 ~ ApplyLaunchpadWrapper ~ selectedWallet",
        selectedWallet
    );

    const wallets = [
        { name: "Stripe", src: "/wallet/Stripe.svg", width: 200, height: 200 },
        {
            name: "EckoWallet",
            src: "/wallet/eckowallet.png",
            width: 100,
            height: 100,
        },
        {
            name: "Chainweaver",
            src: "/wallet/chainweaver.png",
            width: 100,
            height: 100,
        },
    ];
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const imageChange = (e) => {
        console.log("🚀 ~ imageChange ~ e", e);
        if (e.target.files && e.target.files.length > 0) {
            // setSelectedImage(e.target.files[0]);
            uploadImage("coverImage", e.target.files[0]);
        }
    };
    const imageBannerChange = (e) => {
        console.log("🚀 ~ imageBannerChange ~ e", e);
        if (e.target.files && e.target.files.length > 0) {
            // setSelectedBannerImage(e.target.files[0]);
            uploadImage("profileImage", e.target.files[0]);
        }
    };

    useEffect(() => {
        if (formData && step === 2) {
            dispatch(setCollectionRequestName(formData.collectionName));
            dispatch(setCollectionRequestCreator(formData.creatorWallet));
            dispatch(setCollectionRequestSymbol(""));
            dispatch(
                setCollectionRequestDescription(formData.projectDescription)
            );
            dispatch(
                setCollectionRequestCategory(
                    formData.projectCategory?.toUpperCase()
                )
            );
            dispatch(
                setCollectionRequestStartDate(formData.expectedLaunchDate)
            );
            dispatch(
                setCollectionRequestUriList([
                    "ipfs://bafkreifabzsykcr23o2xyzovys6olid63oaxrb3i3byzz32caklymlvm5u",
                    "ipfs://bafkreic5iyftd6mus6o7llctwpgxyarkcxzz55jiptayot3rya6y3y5teu",
                    "ipfs://bafkreid3gpivbqhqcjvpcol5l7zpn4oj2na5dthygsrlkdxyjmnm4qaqta",
                    "ipfs://bafkreicm7uen4kb3y7nwoexrsx7sre6ckfmtbfufslidbesfsbzfi2lguy",
                ])
            );
            dispatch(setCollectionRequestMintPrice(formData.mintPrice));
            dispatch(
                setCollectionRequestRoyalityPerc(formData.royaltyPercentage)
            );
            dispatch(setCollectionRequestStartDate(formData.mintStartDate));
            dispatch(setCollectionRequesEndDate(""));
            dispatch(setCollectionRequestSupply(4));
            dispatch(setCollectionRequestCoverImgUrl(formData.coverImage));
            dispatch(setCollectionRequestBannerImgUrl(formData.profileImage));
            dispatch(
                setCollectionRequestRoyalityAddress(
                    "k:a2ff4689f89f0f3bb6a32fa35b8547c0cb4070f6b4af76fb53892f44fe1f9069"
                )
            );

            dispatch(
                setCollectionRequestEnableFreeMint(formData.allowFreeMints)
            );
            dispatch(setCollectionRequestEnableWl(formData.enableWhitelist));
            dispatch(setCollectionRequestEnablePresale(formData.enablePresale));
            dispatch(setCollectionRequestEnableAirdrop(formData.enableAirdrop));
            dispatch(
                setCollectionRequestPolicy(
                    "COLLECTION INSTANT-MINT MARKETPLACE FIXED-SALE"
                )
            );
        }
        console.log("selectedWallet", selectedWallet);

        if (selectedWallet !== "Stripe") {
            dispatch(setWalletName(selectedWallet));
        }
    }, [formData]);

    const handleWalletSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await collectionRequest({
                collectionRequestName,
                collectionRequestSymbol,
                collectionRequestCreator,
                collectionRequestDescription,
                collectionRequestCategory,
                collectionRequestSupply,
                collectionRequestUriList,
                collectionRequestMintPrice,
                collectionRequestRoyalityPerc,
                collectionRequestRoyalityAddress,
                collectionRequestCoverImgUrl,
                collectionRequestBannerImgUrl,
                collectionRequestStartDate,
                collectionRequesEndDate,
                collectionRequestEnableFreeMint,
                collectionRequestEnableWl,
                collectionRequestEnablePresale,
                collectionRequestEnableAirdrop,
                collectionRequestPolicy,
                walletName,
            }).unwrap();
            dispatch(setLastRequestResult(result));
            // Handle success (e.g., show a success message)

            // {
            //     "gas": 1575,
            //     "result": {
            //         "status": "success",
            //         "data": true
            //     },
            //     "reqKey": "MHsV1sNWTwE2rEVjvS3W5coWYZ89arO0xLt2BnQFzHQ",
            //     "logs": "wsATyGqckuIvlm89hhd2j4t6RMkCrcwJe_oeCYr7Th8",
            //     "events": [
            //         {
            //             "params": [
            //                 "k:23aeee7b47d93716ebd03da536b319ae8114ba17c784d75681a4eb4731f970d3",
            //                 "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf",
            //                 1
            //             ],
            //             "name": "TRANSFER",
            //             "module": {
            //                 "namespace": null,
            //                 "name": "coin"
            //             },
            //             "moduleHash": "klFkrLfpyLW-M3xjVPSdqXEMgxPPJibRt_D6qiBws6s"
            //         },
            //         {
            //             "params": [
            //                 "n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db",
            //                 "k:23aeee7b47d93716ebd03da536b319ae8114ba17c784d75681a4eb4731f970d3"
            //             ],
            //             "name": "CREATE-COLLECTION",
            //             "module": {
            //                 "namespace": "free",
            //                 "name": "lptest001"
            //             },
            //             "moduleHash": "6xil_OFd2dN9I_EcdULZS-2s4CUwFT8noxHO9Vc5dMI"
            //         }
            //     ],
            //     "metaData": {
            //         "publicMeta": {
            //             "creationTime": 1720774992,
            //             "ttl": 28800,
            //             "gasLimit": 150000,
            //             "chainId": "1",
            //             "gasPrice": 1e-8,
            //             "sender": "k:23aeee7b47d93716ebd03da536b319ae8114ba17c784d75681a4eb4731f970d3"
            //         },
            //         "blockTime": 1720775000079985,
            //         "prevBlockHash": "8FcTHQ7PhXfSHwd_7ad_vLtBud7OWny3rijOUI8ZLVw",
            //         "blockHeight": 4459606
            //     },
            //     "continuation": null,
            //     "txId": null
            // }




            if(result.result.status === "success") {
                Swal.fire({
                    title: "Success",
                    text: "Collection Created Successfully",
                    icon: "success",
                    confirmButtonText: "Cool",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/apply-launchpad";
                    }
                }
                );




            }




        } catch (err) {
            dispatch(setLastRequestResult(err));
            // Handle error
        }
    };

    const onSubmit = async (data, e) => {
        const { target } = e;
        const submitBtn =
            target.localName === "span" ? target.parentElement : target;
        console.log("🚀 ~ onSubmit ~ data", data);

        if (kycStatus) {
            if (step === 1) {
                const body = {
                    collectionName: data.collectionName,
                    creatorName: data.creatorName,
                    creatorEmail: data.creatorEmail,
                    creatorWallet: data.creatorWallet,
                    projectDescription: data.projectDescription,
                    projectCategory: data.projectCategory,
                    expectedLaunchDate: data.expectedLaunchDate,
                    twitter: data.twitter,
                    discord: data.discord,
                    instagram: data.instagram,
                    website: data.website,
                };

                const response = await collectionService.launchCollection(body);
                if (response?.data?.status === "success") {
                    console.log(
                        "🚀 ~ handleSubmit ~ response.data",
                        response.data
                    );
                    toast.success("Collection launched successfully");
                    setCollectionName(data.collectionName);
                    setFormData(data);
                    setStep(2);
                } else {
                    if (response?.data?.message === "Conflict") {
                        toast.error("Collection with this name already exists");
                    }
                }
            }

            if (step === 2) {
                if (!selectedImage || !selectedBannerImage) {
                    setHasImageError(true);
                    return;
                }

                if (selectedWallet === null) {
                    setShake(true);
                    toast.error("Please select payment option");
                    return;
                }

                const body = {
                    contractType: data.contractType,
                    totalSupply: data.totalSupply,
                    mintPrice: data.mintPrice,
                    mintPriceCurrency: data.mintPriceCurrency,
                    royaltyPercentage: data.royaltyPercentage,
                    mintStartDate: data.mintStartDate,
                    mintStartTime: data.mintStartTime,
                    allowFreeMints: data.allowFreeMints,
                    enableWhitelist: data.enableWhitelist,
                    enablePresale: data.enablePresale,
                    enableAirdrop: data.enableAirdrop,
                };

                const response = await collectionService.updateCollection(
                    body,
                    data.collectionName
                );
                console.log("🚀 ~ handleSubmit ~ response", response);
                if (response?.data?.status === "success") {
                    toast.success("Collection updated successfully");
                    // setFormData((prev) => ({ ...prev, ...data }));

                    // data and images
                    setFormData((prev) => ({
                        ...prev,
                        ...data,
                        profileImage: response.data.data.collectionBannerImage,
                        coverImage: response.data.data.collectionCoverImage,
                    }));

                    if (selectedWallet === "Stripe") {
                        const stripe = await loadStripe(
                            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                        );
                        const body = {
                            collectionName: formData.collectionName,
                            mintPrice: formData.mintPrice,
                            mintPriceCurrency: formData.mintPriceCurrency,
                            type: "apply-launchpad",
                        };
                        const response =
                            await collectionService.createCheckoutSession(body);
                        const session = response.data.data;
                        const result = await stripe.redirectToCheckout({
                            sessionId: session.id,
                        });
                    }
                    if (selectedWallet === "EckoWallet" || selectedWallet === "Chainweaver") {
                        console.log("EckoWallet");
                        handleWalletSubmit(e);
                    }
                } else {
                    console.log("failed");
                }
            }
        } else {
            setShake(true);
        }
    };

    const uploadImage = async (name, file) => {
        console.log("🚀 ~ uploadImage ~ name:", name);
        console.log("🚀 ~ uploadImage ~ file:", file);
        if (name === "coverImage") {
            setImageCoverLoading(true);
        }
        if (name === "profileImage") {
            setImageBannerLoading(true);
        }

        try {
            const formData = new FormData();
            formData.append(name, file);
            const response = await collectionService.uploadImage(
                formData,
                collectionName
            );
            console.log("🚀 ~ uploadImage ~ response", response);
            if (response?.data?.status === "success") {
                toast.success("Image Uploaded Successfully");
                if (name === "coverImage") {
                    setSelectedImage(file);
                    setImageCoverLoading(false);
                }
                if (name === "profileImage") {
                    setSelectedBannerImage(file);
                    setImageBannerLoading(false);
                }
            } else {
                toast.error("Image Upload Failed");
                if (name === "coverImage") {
                    setImageCoverLoading(false);
                }
                if (name === "profileImage") {
                    setImageBannerLoading(false);
                }
            }
        } catch (error) {
            console.log("🚀 ~ uploadImage ~ error", error);
            setImageCoverLoading(false);
            setImageBannerLoading(false);
        }
    };

    useEffect(() => {
        console.log("account", account);
        if (account?.user?.verified) {
            setKycStatus(true);
        }
    }, [account]);

    const handleKyc = async (e) => {
        e.preventDefault();
        console.log(account?.user?.verified);
        if (account?.user?.verified === false) {
            const response = await userService.getAccessToken();
            console.log("🚀 ~ handleSubmit ~ response", response);
            if (response?.data?.status === "success") {
                const accessToken = response.data.data.token;
                console.log("🚀 ~ handleSubmit ~ accessToken", accessToken);
                setAccessToken(accessToken);
                setOpen(true);
            } else {
                toast.error(
                    "Oops! Something went wrong. Please try again later."
                );
            }
        } else {
            console.log("🚀 ~ handleKyc ~ kycStatus", kycStatus);
        }
    };

    const verificationComplete = async (payload) => {
        const data = {
            applicantData: payload,
        };
        // createVerification
        const response = await userService.createVerification(data);
        if (response?.status === 200 || response?.status === 201) {
            setKycStatus(true);
        } else {
            toast.error("Oops! Something went wrong. Please try again later.");
        }
    };

    const renderStage1Form = () => (
        <>
            <div
                className={clsx(
                    "create-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                                <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block text-jusify">
                                    <Image
                                        src="/assets-images/LogoIcon.png"
                                        alt="Launchpad"
                                        width={100}
                                        height={100}
                                        style={{ marginBottom: "20px" }}
                                    />
                                    <h5>
                                        {" "}
                                        Launchpad - Expression of Interest{" "}
                                    </h5>
                                    <span style={{ fontSize: "16px" }}>
                                        Kryptomerch is looking to onboard
                                        unique, quality projects to drop their
                                        collections via Magic Eden Launchpad.
                                    </span>{" "}
                                    <br />
                                    <br />
                                    <span style={{ fontSize: "16px" }}>
                                        We will consider applications on a
                                        rolling basis. Due to the high volume of
                                        applications, we are not able to respond
                                        to all applications. You will hear from
                                        us if we are interested in moving
                                        forward with your project.
                                    </span>{" "}
                                    <br />
                                    <br />
                                    <span style={{ fontSize: "16px" }}>
                                        Re-applying: Should you wish to
                                        strengthen your application with
                                        supplementary materials (project
                                        updates, more details on your collection
                                        and community, etc), we welcome you to
                                        re-apply. For creators who are
                                        re-applying for Launchpad, please fill
                                        in the first field “Project Name” as
                                        [RE-APPLY] and the name of your project
                                        (for example: “[RE-APPLY] Bananas”].
                                    </span>{" "}
                                    <br />
                                    <br />
                                    <span style={{ fontSize: "16px" }}>
                                        {" "}
                                        Please note that the information you
                                        provide in this form is subject to our
                                        Privacy Policy.
                                    </span>{" "}
                                    <br />
                                    <br />
                                    <span style={{ fontSize: "16px" }}>
                                        By submitting your Expression of
                                        Interest, you agree to kryptomerch's
                                        Terms of Service available here:
                                        <a
                                            href="https://kryptomerch.com/terms-of-service"
                                            target="_blank"
                                        >
                                            {" "}
                                            Kryptomerch Terms of Service
                                        </a>
                                    </span>{" "}
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="collectionName"
                                                    className="form-label"
                                                >
                                                    Collection Name
                                                </label>
                                                <input
                                                    id="collectionName"
                                                    placeholder="e. g. `Digital Awesome Game`"
                                                    {...register(
                                                        "collectionName",
                                                        {
                                                            required:
                                                                "Collection Name is required",
                                                        }
                                                    )}
                                                />
                                                {errors.collectionName && (
                                                    <ErrorText>
                                                        {
                                                            errors
                                                                .collectionName
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="creatorName"
                                                    className="form-label"
                                                >
                                                    Creator Name
                                                </label>
                                                <input
                                                    id="creatorName"
                                                    placeholder="e. g. `John Doe`"
                                                    {...register(
                                                        "creatorName",
                                                        {
                                                            required:
                                                                "Creator Name is required",
                                                        }
                                                    )}
                                                />
                                                {errors.creatorName && (
                                                    <ErrorText>
                                                        {
                                                            errors.creatorName
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="creatorEmail"
                                                    className="form-label"
                                                >
                                                    Creator Email
                                                </label>
                                                <input
                                                    id="creatorEmail"
                                                    placeholder="e. g. `abc@example.com`"
                                                    {...register(
                                                        "creatorEmail",
                                                        {
                                                            required:
                                                                "Creator Email is required",
                                                        }
                                                    )}
                                                />
                                                {errors.creatorEmail && (
                                                    <ErrorText>
                                                        {
                                                            errors.creatorEmail
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="creatorWallet"
                                                    className="form-label"
                                                >
                                                    Creator Wallet Address
                                                </label>
                                                <input
                                                    id="creatorWallet"
                                                    placeholder="e. g. `k:0x1234567890`"
                                                    {...register(
                                                        "creatorWallet",
                                                        {
                                                            pattern: {
                                                                // wallet address start with k
                                                                value: /^k:/,
                                                                message:
                                                                    "Please enter a valid wallet address",
                                                            },

                                                            required:
                                                                "Wallet Address is required",
                                                        }
                                                    )}
                                                />
                                                {errors.creatorWallet && (
                                                    <ErrorText>
                                                        {
                                                            errors.creatorWallet
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="projectDescription"
                                                    className="form-label"
                                                >
                                                    Discription
                                                </label>
                                                <textarea
                                                    id="projectDescription"
                                                    rows="3"
                                                    placeholder="e. g. “This is a digital art collection”"
                                                    {...register(
                                                        "projectDescription",
                                                        {
                                                            required:
                                                                "Discription is required",
                                                        }
                                                    )}
                                                />
                                                {errors.projectDescription && (
                                                    <ErrorText>
                                                        {
                                                            errors
                                                                .projectDescription
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        {/* project category */}
                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="projectCategory"
                                                    className="form-label"
                                                >
                                                    Project Category
                                                </label>
                                                <select
                                                    style={{
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #363545",
                                                        marginBottom: "10px",
                                                        height: "50px",
                                                        backgroundColor:
                                                            "#242435",
                                                    }}
                                                    id="projectCategory"
                                                    {...register(
                                                        "projectCategory",
                                                        {
                                                            required:
                                                                "Project Category is required",
                                                        }
                                                    )}
                                                >
                                                    <option value="">
                                                        Select a category
                                                    </option>
                                                    <option value="art">
                                                        Art
                                                    </option>
                                                    <option value="photography">
                                                        Photography
                                                    </option>
                                                    <option value="gaming">
                                                        Gaming
                                                    </option>
                                                </select>
                                                {errors.projectCategory && (
                                                    <ErrorText>
                                                        {
                                                            errors
                                                                .projectCategory
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="expectedLaunchDate"
                                                    className="form-label"
                                                >
                                                    Expected Launch Date
                                                </label>
                                                <input
                                                    id="expectedLaunchDate"
                                                    type="date"
                                                    {...register(
                                                        "expectedLaunchDate",
                                                        {
                                                            required:
                                                                "Expected Launch Date is required",
                                                        }
                                                    )}
                                                />
                                                {errors.expectedLaunchDate && (
                                                    <ErrorText>
                                                        {
                                                            errors
                                                                .expectedLaunchDate
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="twitter"
                                                    className="form-label"
                                                >
                                                    <span>Twitter</span>{" "}
                                                    <FaTwitter />
                                                </label>
                                                <input
                                                    id="twitter"
                                                    placeholder="e. g. `https://twitter.com/username`"
                                                    {...register("twitter")}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="discord"
                                                    className="form-label"
                                                >
                                                    Discord <FaDiscord />
                                                </label>
                                                <input
                                                    id="discord"
                                                    placeholder="e. g. `https://discord.com/username`"
                                                    {...register("discord")}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="instagram"
                                                    className="form-label"
                                                >
                                                    Instagram <FaInstagram />
                                                </label>
                                                <input
                                                    id="instagram"
                                                    placeholder="e. g. `https://instagram.com/username`"
                                                    {...register("instagram")}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="website"
                                                    className="form-label"
                                                >
                                                    Website <FaGlobe />
                                                </label>
                                                <input
                                                    id="website"
                                                    placeholder="e. g. `https://example.com`"
                                                    {...register("website")}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20 rn-check-box">
                                                <p
                                                    style={{
                                                        fontSize: "16px",
                                                        color: "#fff",
                                                        marginBottom: "10px",
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    Before submitting the form,
                                                    please ensure that the
                                                    information provided is
                                                    accurate and true. If you
                                                    have not completed KYC,
                                                    please initiate KYC. If you
                                                    have completed KYC, then you
                                                    are good to go.
                                                </p>

                                                {shake && (
                                                    <p
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#ff4f4f",
                                                            marginBottom:
                                                                "10px",
                                                            marginTop: "20px",
                                                        }}
                                                    >
                                                        Please click on KYC
                                                        Verification to proceed.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-xl-4">
                                            <div className="input-box">
                                                <Button
                                                    color="primary-alta"
                                                    fullwidth
                                                    type="submit"
                                                    data-btn="preview"
                                                    onClick={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                                            {kycStatus === false ? (
                                                <motion.div
                                                    className="input-box"
                                                    whileHover={{
                                                        scale: 1.03,
                                                        transition: {
                                                            duration: 0.3,
                                                        },
                                                    }}
                                                    animate={
                                                        shake ? "shake" : ""
                                                    }
                                                    variants={shakeAnimation}
                                                >
                                                    <Button
                                                        type="submit"
                                                        fullwidth
                                                        onClick={handleKyc}
                                                    >
                                                        KYC Verification
                                                    </Button>
                                                </motion.div>
                                            ) : (
                                                <div className="input-box">
                                                    <Button
                                                        type="submit"
                                                        fullwidth
                                                        onClick={handleSubmit(
                                                            onSubmit
                                                        )}
                                                        disabled={kycStatus}
                                                        style={{
                                                            backgroundColor:
                                                                "#4d3f17",
                                                        }}
                                                    >
                                                        KYC Verified
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );

    const renderStage2Form = () => (
        <div
            className={clsx(
                "create-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                            <div className="upload-area">
                                <div className="upload-formate mb--30">
                                    <h6 className="title">
                                        Upload Collection Cover Image
                                    </h6>
                                    <p className="formate">
                                        Drag or choose your image to upload
                                    </p>
                                </div>

                                <div className="brows-file-wrapper">
                                    <input
                                        name="coverFile"
                                        id="coverFile"
                                        type="file"
                                        className="inputfile"
                                        onChange={imageChange}
                                    />
                                    {selectedImage && (
                                        <img
                                            id="createCoverImage"
                                            src={URL.createObjectURL(
                                                selectedImage
                                            )}
                                            alt=""
                                            data-black-overlay="6"
                                        />
                                    )}
                                    <label
                                        htmlFor="coverFile"
                                        title="No File Chosen"
                                    >
                                        {imageCoverLoading ? (
                                            <MutatingDots
                                                color="#fff"
                                                size={30}
                                                speed={1}
                                            />
                                        ) : (
                                            <i className="feather-upload" />
                                        )}

                                        <span className="text-center">
                                            Choose a Cover Image
                                        </span>
                                        <p className="text-center mt--10">
                                            PNG, GIF, JPEG, JPG. <br /> Max 1Gb.
                                        </p>
                                    </label>
                                </div>
                                {hasImageError && !selectedImage && (
                                    <ErrorText>Image is required</ErrorText>
                                )}
                            </div>

                            <div className="upload-area mt--50 mt_sm--30 mt_md--30 d-none d-lg-block">
                                <div className="upload-formate mb--30">
                                    <h6 className="title">
                                        Upload Collection Banner Image
                                    </h6>
                                    <p className="formate">
                                        Drag or choose your image to upload
                                    </p>
                                </div>

                                <div className="brows-file-wrapper">
                                    <input
                                        name="bannerFile"
                                        id="bannerFile"
                                        type="file"
                                        className="inputfile"
                                        onChange={imageBannerChange}
                                    />
                                    {selectedBannerImage && (
                                        <img
                                            id="createBannerImage"
                                            src={URL.createObjectURL(
                                                selectedBannerImage
                                            )}
                                            alt=""
                                            data-black-overlay="6"
                                        />
                                    )}
                                    <label
                                        htmlFor="bannerFile"
                                        title="No File Chosen"
                                    >
                                        {imageBannerLoading ? (
                                            <MutatingDots
                                                color="#fff"
                                                size={30}
                                                speed={1}
                                            />
                                        ) : (
                                            <i className="feather-upload" />
                                        )}

                                        <span className="text-center">
                                            Choose a Banner Image
                                        </span>
                                        <p className="text-center mt--10">
                                            PNG, GIF, JPEG, JPG. <br /> Max 1Gb.
                                        </p>
                                    </label>
                                </div>

                                {hasImageError && !selectedBannerImage && (
                                    <ErrorText>Image is required</ErrorText>
                                )}
                            </div>

                            <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                                <h5> Note: </h5>
                                <span>
                                    {" "}
                                    Service fee : <strong>2.5%</strong>{" "}
                                </span>{" "}
                                <br />
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="form-wrapper-one">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="contractType"
                                                className="form-label"
                                            >
                                                Contract Type
                                            </label>
                                            <select
                                                id="contractType"
                                                name="contractType"
                                                style={{
                                                    padding: "10px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #363545",
                                                    marginBottom: "10px",
                                                    height: "50px",
                                                    backgroundColor: "#242435",
                                                }}
                                                {...register("contractType")}
                                            >
                                                <option value="ng">NG</option>
                                                <option value="v2">V2</option>
                                            </select>

                                            {errors.contractType && (
                                                <ErrorText>
                                                    {
                                                        errors.contractType
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="totalSupply"
                                                className="form-label"
                                            >
                                                Total Supply
                                            </label>
                                            <input
                                                id="totalSupply"
                                                type="number"
                                                {...register("totalSupply", {
                                                    pattern: {
                                                        value: /^[0-9]+(\.[0-9]{1,18})?$/,
                                                        message:
                                                            "Please enter a valid number",
                                                    },

                                                    required:
                                                        "Total Supply is required",
                                                })}
                                            />

                                            {errors.totalSupply && (
                                                <ErrorText>
                                                    {
                                                        errors.totalSupply
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintPrice"
                                                className="form-label"
                                            >
                                                Mint Price
                                            </label>
                                            <input
                                                id="mintPrice"
                                                type="number"
                                                {...register("mintPrice", {
                                                    pattern: {
                                                        value: /^[0-9]+(\.[0-9]{1,18})?$/,
                                                        message:
                                                            "Please enter a valid number",
                                                    },
                                                    required:
                                                        "Mint Price is required",
                                                })}
                                            />
                                            <select
                                                id="mintPriceCurrency"
                                                name="mintPriceCurrency"
                                                style={{
                                                    padding: "10px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #363545",
                                                    marginTop: "10px",
                                                    marginBottom: "10px",
                                                    height: "50px",
                                                    backgroundColor: "#242435",
                                                }}
                                                {...register(
                                                    "mintPriceCurrency"
                                                )}
                                            >
                                                <option value="kda">
                                                    {" "}
                                                    KDA{" "}
                                                </option>
                                                <option value="matic">
                                                    MATIC
                                                </option>
                                            </select>

                                            {errors.mintPrice && (
                                                <ErrorText>
                                                    {errors.mintPrice?.message}
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="royaltyPercentage"
                                                className="form-label"
                                            >
                                                Royalty Percentage
                                            </label>
                                            <input
                                                id="royaltyPercentage"
                                                type="number"
                                                {...register(
                                                    "royaltyPercentage",
                                                    {
                                                        pattern: {
                                                            // only number with deciimal is allowed
                                                            value: /^[0-9]+(\.[0-9]{1,18})?$/,
                                                            message:
                                                                "Please enter a valid number",
                                                        },
                                                        required:
                                                            "Royalty Percentage is required",
                                                    }
                                                )}
                                            />

                                            {errors.royaltyPercentage && (
                                                <ErrorText>
                                                    {
                                                        errors.royaltyPercentage
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintStartDate"
                                                className="form-label"
                                            >
                                                Mint Start Date
                                            </label>
                                            <input
                                                id="mintStartDate"
                                                type="date"
                                                {...register("mintStartDate", {
                                                    required:
                                                        "Mint Start Date is required",
                                                })}
                                            />

                                            {errors.mintStartDate && (
                                                <ErrorText>
                                                    {
                                                        errors.mintStartDate
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="mintStartTime"
                                                className="form-label"
                                            >
                                                Mint Start Time
                                            </label>
                                            <input
                                                id="mintStartTime"
                                                type="time"
                                                {...register("mintStartTime", {
                                                    required:
                                                        "Mint Start Time is required",
                                                })}
                                            />
                                            {errors.mintStartTime && (
                                                <ErrorText>
                                                    {
                                                        errors.mintStartTime
                                                            ?.message
                                                    }
                                                </ErrorText>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="allowFreeMints"
                                                name="allowFreeMints"
                                                {...register("allowFreeMints")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="allowFreeMints"
                                            >
                                                Allow Free Mints
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enableWhitelist"
                                                name="enableWhitelist"
                                                {...register("enableWhitelist")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="enableWhitelist"
                                            >
                                                Enable Whitelist
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enablePresale"
                                                name="enablePresale"
                                                {...register("enablePresale")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="enablePresale"
                                            >
                                                Enable Presale
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-3 col-sm-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enableAirdrop"
                                                name="enableAirdrop"
                                                {...register("enableAirdrop")}
                                            />
                                            <label
                                                className="rn-check-box-label"
                                                htmlFor="enableAirdrop"
                                            >
                                                Enable Airdrop
                                            </label>
                                        </div>
                                    </div>

                                    {/* <div className="col-md-12 mt--20">
                                        <div className="input-box pb--20">
                                            <label
                                                htmlFor="paymentsOptions"
                                                className="form-label mb--20"
                                            >
                                                Payment Options
                                            </label>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "start",
                                                    gap: "20px",
                                                }}
                                            >
                                                <motion.div
                                                    className="rn-check-box"
                                                    whileHover={{
                                                        scale: 1.03,
                                                        transition: {
                                                            duration: 0.3,
                                                        },
                                                    }}
                                                    style={{
                                                        border: "1px solid #363545",
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#31311B",
                                                        },
                                                    }}
                                                >
                                                    <Image
                                                        src="/wallet/Stripe.svg"
                                                        alt="Stripe"
                                                        width={200}
                                                        height={200}
                                                    />
                                                </motion.div>

                                                <motion.div
                                                    className="rn-check-box"
                                                    whileHover={{
                                                        scale: 1.03,
                                                        transition: {
                                                            duration: 0.3,
                                                        },
                                                    }}
                                                    style={{
                                                        border: "1px solid #363545",
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#31311B",
                                                        },
                                                    }}
                                                >
                                                    <Image
                                                        src="/wallet/eckowallet.png"
                                                        alt="KDA"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="col-md-12 col-xl-4 mt--20 mb--20">
                                        <label
                                            className="rn-check-box-label"
                                            htmlFor="enablePresale"
                                        >
                                            Payment Options
                                        </label>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "start",
                                            gap: "20px",
                                            marginBottom: "30px",
                                        }}
                                    >
                                        {wallets.map((wallet) => (
                                            <motion.div
                                                key={wallet.name}
                                                className="rn-check-box"
                                                whileHover={{
                                                    scale: 1.03,
                                                    transition: {
                                                        duration: 0.3,
                                                    },
                                                }}
                                                onClick={() =>
                                                    setSelectedWallet(
                                                        wallet.name
                                                    )
                                                }
                                                style={{
                                                    border: `2px solid ${
                                                        selectedWallet ===
                                                        wallet.name
                                                            ? "#00ff00"
                                                            : selectedWallet ===
                                                              null
                                                            ? // ? '#ff0000'
                                                              // : '#363545'
                                                              ""
                                                            : "#363545"
                                                    }`,
                                                    padding: "10px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Image
                                                    src={wallet.src}
                                                    alt={wallet.name}
                                                    width={wallet.width}
                                                    height={wallet.height}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="col-md-12 col-xl-4">
                                        <div className="input-box">
                                            <Button
                                                color="primary-alta"
                                                fullwidth
                                                type="submit"
                                                data-btn="preview"
                                                onClick={handleSubmit(onSubmit)}
                                            >
                                                Submit and Pay Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

    return (
        <>
            <div className={styles.inner} style={{ marginBottom: "50px" }}>
                {step === 1
                    ? renderStage1Form()
                    : step === 2
                    ? renderStage2Form()
                    : null}
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <div className="App">
                        <SumsubWebSdk
                            accessToken={accessToken}
                            updateAccessToken={() =>
                                console.log("updateAccessToken")
                            }
                            expirationHandler={() =>
                                Promise.resolve(accessToken)
                            }
                            config={{
                                lang: "en",
                                email: account?.user?.email,
                                i18n: {
                                    document: {
                                        subTitles: {
                                            IDENTITY:
                                                "Upload a document that proves your identity",
                                        },
                                    },
                                },
                                onMessage: (type, payload) => {
                                    console.log(
                                        "WebSDK onMessage",
                                        type,
                                        payload
                                    );
                                },

                                onError: (error) => {
                                    console.error("WebSDK onError", error);
                                },
                            }}
                            options={{
                                addViewportTag: false,
                                adaptIframeHeight: true,
                            }}
                            onMessage={(type, payload) => {
                                console.log("onMessage", type, payload);
                                if (payload.reviewStatus === "completed") {
                                    console.log("payload", payload);
                                    setOpen(false);
                                    verificationComplete(payload);
                                    // setStep(2);
                                }
                            }}
                            onError={(data) => console.log("onError", data)}
                        />

                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                backgroundColor: "#1a202c",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                marginTop: "20px",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ApplyLaunchpadWrapper;
