import React, { useState, useEffect } from "react";
import Button from "@ui/button";
import styles from "./ApplyLaunchpadWrapper.module.css";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ErrorText from "@ui/error-text";
import Loader from "@components/loader";
import { useDispatch } from "react-redux";
import { useLaunchCollectionMutation } from "src/services/marketplace.service";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { MutatingDots } from "react-loader-spinner";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { useRouter } from "next/router";
import { FaTwitter, FaGlobe, FaDiscord, FaInstagram } from "react-icons/fa";
import Swal from "sweetalert2";
import { Box } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            backgroundColor: "#242435",
            color: "#fff",
        },
    },
};

const policies = [
    "COLLECTION", "INSTANT-MINT", "MARKETPLACE", "FIXED-SALE", "AUCTION-SALE",
    "BLACKLIST", "DISABLE-BURN", "DISABLE-TRANSFER", "DISABLE-SALE",
    "DUTCH-AUCTION-SALE", "EXTRA-POLICIES", "FIXED-ISSUANCE", "GUARDS",
    "NON-FUNGIBLE", "ROYALTY", "TRUSTED-CUSTODY",
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MarketplaceCreateCollectionWrapper = ({ className, space }) => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const [launchCollection, { isLoading, isError, error }] = useLaunchCollectionMutation();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedBannerImage, setSelectedBannerImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [imageCoverLoading, setImageCoverLoading] = useState(false);
    const [imageBannerLoading, setImageBannerLoading] = useState(false);
    const [policy, setPolicy] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        mode: "onChange",
    });

    const handlePolicyChange = (event) => {
        const {
            target: { value },
        } = event;
        setPolicy(typeof value === "string" ? value.split(",") : value);
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const imageBannerChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedBannerImage(e.target.files[0]);
        }
    };

    const onSubmit = async (data) => {
        if (!selectedImage || !selectedBannerImage) {
            setHasImageError(true);
            return;
        }

        const mintStartDate = moment(`${data.mintStartDate} ${data.mintStartTime}`).utc().format("YYYY-MM-DDTHH:mm:ss");
        const formattedStartDate = `time "${mintStartDate}Z"`;

        const mintEndDate = moment(`${data.mintEndDate} ${data.mintEndTime}`).utc().format("YYYY-MM-DDTHH:mm:ss");
        const formattedEndDate = `time "${mintEndDate}Z"`;

        const collectionData = {
            collectionRequestName: data.collectionName,
            collectionRequestSymbol: "",
            collectionRequestCreator: data.creatorWallet,
            collectionRequestDescription: data.projectDescription,
            collectionRequestCategory: data.projectCategory.toUpperCase(),
            collectionRequestSupply: data.totalSupply,
            collectionRequestUriList: data.tokenList.split(',').map(token => token.replace(/"/g, '').trim()),
            collectionRequestMintPrice: data.mintPrice,
            collectionRequestRoyalityPerc: data.royaltyPercentage,
            collectionRequestRoyalityAddress: data.royaltyAddress,
            collectionRequestCoverImgUrl: URL.createObjectURL(selectedImage),
            collectionRequestBannerImgUrl: URL.createObjectURL(selectedBannerImage),
            collectionRequestStartDate: formattedStartDate,
            collectionRequesEndDate: formattedEndDate,
            collectionRequestEnableFreeMint: data.allowFreeMints,
            collectionRequestEnableWl: data.enableWhitelist,
            collectionRequestEnablePresale: data.enablePresale,
            collectionRequestEnableAirdrop: data.enableAirdrop,
            collectionRequestPolicy: policy.join(" "),
            walletName: "CW",
        };
        console.log("Collection Data:", collectionData);

        try {
            const result = await launchCollection(collectionData).unwrap();
            if (result.result.status === "success") {
                Swal.fire({
                    title: "Success",
                    text: "Collection Created Successfully",
                    icon: "success",
                    confirmButtonText: "Cool",
                }).then((result) => {
                    if (result.isConfirmed) {
                        reset();
                        router.push("/");
                    }
                });
            }
        } catch (err) {
            console.log("Launch Collection Error:", err);
            Swal.fire({
                title: "Error",
                text: err.message || "An error occurred while creating the collection",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

    return (
        <div className={`create-area ${space === 1 && "rn-section-gapTop"} ${className}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                            <div className="upload-area">
                                <div className="upload-formate mb--30">
                                    <h6 className="title">Upload Collection Cover Image</h6>
                                    <p className="formate">Drag or choose your image to upload</p>
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
                                            src={URL.createObjectURL(selectedImage)}
                                            alt=""
                                            data-black-overlay="6"
                                        />
                                    )}
                                    <label htmlFor="coverFile" title="No File Chosen">
                                        {imageCoverLoading ? (
                                            <MutatingDots color="#fff" size={30} speed={1} />
                                        ) : (
                                            <i className="feather-upload" />
                                        )}
                                        <span className="text-center">Choose a Cover Image</span>
                                        <p className="text-center mt--10">PNG, GIF, JPEG, JPG. Max 1Gb.</p>
                                    </label>
                                </div>
                                {hasImageError && !selectedImage && <ErrorText>Cover Image is required</ErrorText>}
                            </div>

                            <div className="upload-area mt--50">
                                <div className="upload-formate mb--30">
                                    <h6 className="title">Upload Collection Banner Image</h6>
                                    <p className="formate">Drag or choose your image to upload</p>
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
                                            src={URL.createObjectURL(selectedBannerImage)}
                                            alt=""
                                            data-black-overlay="6"
                                        />
                                    )}
                                    <label htmlFor="bannerFile" title="No File Chosen">
                                        {imageBannerLoading ? (
                                            <MutatingDots color="#fff" size={30} speed={1} />
                                        ) : (
                                            <i className="feather-upload" />
                                        )}
                                        <span className="text-center">Choose a Banner Image</span>
                                        <p className="text-center mt--10">PNG, GIF, JPEG, JPG. Max 1Gb.</p>
                                    </label>
                                </div>
                                {hasImageError && !selectedBannerImage && <ErrorText>Banner Image is required</ErrorText>}
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="form-wrapper-one">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="collectionName" className="form-label">Collection Name</label>
                                            <input
                                                id="collectionName"
                                                placeholder="e. g. `Digital Awesome Game`"
                                                {...register("collectionName", { required: "Collection Name is required" })}
                                            />
                                            {errors.collectionName && <ErrorText>{errors.collectionName.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="creatorWallet" className="form-label">Creator Wallet Address</label>
                                            <input
                                                id="creatorWallet"
                                                placeholder="e. g. `k:0x1234567890`"
                                                {...register("creatorWallet", {
                                                    pattern: {
                                                        value: /^k:/,
                                                        message: "Please enter a valid wallet address",
                                                    },
                                                    required: "Wallet Address is required",
                                                })}
                                            />
                                            {errors.creatorWallet && <ErrorText>{errors.creatorWallet.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label htmlFor="projectDescription" className="form-label">Description</label>
                                            <textarea
                                                id="projectDescription"
                                                rows="3"
                                                placeholder="e. g. `This is a digital awesome game`"
                                                {...register("projectDescription", { required: "Description is required" })}
                                            />
                                            {errors.projectDescription && <ErrorText>{errors.projectDescription.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="projectCategory" className="form-label">Project Category</label>
                                            <select
                                                id="projectCategory"
                                                {...register("projectCategory", { required: "Project Category is required" })}
                                            >
                                                <option value="">Select a category</option>
                                                <option value="art">Art & Collectibles</option>
                                                <option value="photography">Photography</option>
                                                <option value="gaming">Gaming</option>
                                                <option value="music">Music & Audio</option>
                                                <option value="virtual">Virtual Real Estate</option>
                                                <option value="fashion">Fashion & Accessories</option>
                                                <option value="sports">Sports</option>
                                                <option value="utility">Utility & Memberships</option>
                                                <option value="domains">Domains & Virtual Assets</option>
                                                <option value="real">Real World Assets</option>
                                            </select>
                                            {errors.projectCategory && <ErrorText>{errors.projectCategory.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="totalSupply" className="form-label">Total Supply</label>
                                            <input
                                                id="totalSupply"
                                                type="number"
                                                {...register("totalSupply", {
                                                    required: "Total Supply is required",
                                                    min: { value: 1, message: "Total supply must be at least 1" }
                                                })}
                                            />
                                            {errors.totalSupply && <ErrorText>{errors.totalSupply.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="mintPrice" className="form-label">Mint Price</label>
                                            <input
                                                id="mintPrice"
                                                type="number"
                                                step="0.000000000000000001"
                                                {...register("mintPrice", {
                                                    required: "Mint Price is required",
                                                    min: { value: 0, message: "Mint price must be non-negative" }
                                                })}
                                            />
                                            {errors.mintPrice && <ErrorText>{errors.mintPrice.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="royaltyPercentage" className="form-label">Royalty Percentage</label>
                                            <input
                                                id="royaltyPercentage"
                                                type="number"
                                                step="0.01"
                                                {...register("royaltyPercentage", {
                                                    required: "Royalty Percentage is required",
                                                    min: { value: 0, message: "Royalty percentage must be non-negative" },
                                                    max: { value: 100, message: "Royalty percentage must be 100 or less" }
                                                })}
                                            />
                                            {errors.royaltyPercentage && <ErrorText>{errors.royaltyPercentage.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label htmlFor="royaltyAddress" className="form-label">Royalty Address</label>
                                            <input
                                                id="royaltyAddress"
                                                placeholder="e. g. `k:0x1234567890`"
                                                {...register("royaltyAddress", {
                                                    pattern: {
                                                        value: /^k:/,
                                                        message: "Please enter a valid wallet address",
                                                    },
                                                    required: "Royalty Address is required",
                                                })}
                                            />
                                            {errors.royaltyAddress && <ErrorText>{errors.royaltyAddress.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="mintStartDate" className="form-label">Mint Start Date</label>
                                            <input
                                                id="mintStartDate"
                                                type="date"
                                                {...register("mintStartDate", { required: "Mint Start Date is required" })}
                                            />
                                            {errors.mintStartDate && <ErrorText>{errors.mintStartDate.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="mintStartTime" className="form-label">Mint Start Time</label>
                                            <input
                                                id="mintStartTime"
                                                type="time"
                                                {...register("mintStartTime", { required: "Mint Start Time is required" })}
                                            />
                                            {errors.mintStartTime && <ErrorText>{errors.mintStartTime.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="mintEndDate" className="form-label">Mint End Date</label>
                                            <input
                                                id="mintEndDate"
                                                type="date"
                                                {...register("mintEndDate", { required: "Mint End Date is required" })}
                                            />
                                            {errors.mintEndDate && <ErrorText>{errors.mintEndDate.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-box pb--20">
                                            <label htmlFor="mintEndTime" className="form-label">Mint End Time</label>
                                            <input
                                                id="mintEndTime"
                                                type="time"
                                                {...register("mintEndTime", { required: "Mint End Time is required" })}
                                            />
                                            {errors.mintEndTime && <ErrorText>{errors.mintEndTime.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label htmlFor="tokenList" className="form-label">Token List</label>
                                            <textarea
                                                id="tokenList"
                                                rows="3"
                                                placeholder={`e. g. "token1","token2","token3"`}
                                                {...register("tokenList", {
                                                    pattern: {
                                                        value: /^("[^"]*"(,"[^"]*")*)?$/,
                                                        message: "Please enter a valid token list",
                                                    },
                                                    required: "Token List is required",
                                                })}
                                            />
                                            {errors.tokenList && <ErrorText>{errors.tokenList.message}</ErrorText>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label htmlFor="policy" className="form-label">Policy</label>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple
                                                value={policy}
                                                onChange={handlePolicyChange}
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {policies.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, policy, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="allowFreeMints"
                                                {...register("allowFreeMints")}
                                            />
                                            <label className="rn-check-box-label" htmlFor="allowFreeMints">
                                                Allow Free Mints
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enableWhitelist"
                                                {...register("enableWhitelist")}
                                            />
                                            <label className="rn-check-box-label" htmlFor="enableWhitelist">
                                                Enable Whitelist
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enablePresale"
                                                {...register("enablePresale")}
                                            />
                                            <label className="rn-check-box-label" htmlFor="enablePresale">
                                                Enable Presale
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="input-box pb--20 rn-check-box">
                                            <input
                                                className="rn-check-box-input"
                                                type="checkbox"
                                                id="enableAirdrop"
                                                {...register("enableAirdrop")}
                                            />
                                            <label className="rn-check-box-label" htmlFor="enableAirdrop">
                                                Enable Airdrop
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-box">
                                            <Button type="submit" fullwidth>
                                                Create Collection
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {isLoading && <Loader />}
        </div>
    );
};

export default MarketplaceCreateCollectionWrapper;