import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Paper } from "@mui/material";
import CreateCollectionModal from "./createCollectionModal";

const CreateNewArea = ({ className, space }) => {
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [collectionName, setCollectionName] = useState("");
    const [collectionCreated, setCollectionCreated] = useState(false);
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [collectionImage, setCollectionImage] = useState(null);
    const [collectionTokenSymbol, setCollectionTokenSymbol] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const notify = () => toast("Your product has been submitted");

    const handleProductModal = () => {
        setShowProductModal(false);
    };

    const handleCollectionModal = () => {
        setShowCollectionModal(false);
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const onSubmit = (data, e) => {
        setHasImageError(!selectedImage);

        if (!collectionCreated) {
            toast.error("Please create a collection before creating an NFT.");
            return;
        }

        const { target } = e;
        const submitBtn =
            target.localName === "span" ? target.parentElement : target;
        const isPreviewBtn = submitBtn.dataset?.btn;

        if (isPreviewBtn && selectedImage) {
            setPreviewData({ ...data, image: selectedImage });
            setShowProductModal(true);
        }

        if (!isPreviewBtn) {
            notify();
            reset();
            setSelectedImage();
        }
    };

    const handleAddCollectionClick = () => {
        setShowCollectionModal(true);
    };

    const handleCollectionSubmit = () => {
        // Perform validation and collection creation logic
        if (!collectionName || !collectionImage || !collectionTokenSymbol) {
            toast.error("Please fill all collection fields.");
            return;
        }
        setCollectionCreated(true);
        setShowCollectionModal(false);
        toast.success("Collection created successfully.");
    };

    return (
        <>
          
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                                <div className="upload-area mt--30">
                                    <div className="upload-formate mb--30">
                                        <h6 className="title">Upload file</h6>
                                        <p className="formate">
                                            Drag or choose your file to upload
                                        </p>
                                    </div>

                                    <div className="brows-file-wrapper">
                                        <input
                                            name="file"
                                            id="file"
                                            type="file"
                                            className="inputfile"
                                            data-multiple-caption="{count} files selected"
                                            multiple
                                            onChange={imageChange}
                                        />
                                        {selectedImage && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedImage
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}

                                        <label
                                            htmlFor="file"
                                            title="No File Choosen"
                                        >
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Choose a File
                                            </span>
                                            <p className="text-center mt--10">
                                                PNG, GIF, WEBP, MP4 or MP3.{" "}
                                                <br /> Max 1Gb.
                                            </p>
                                        </label>
                                    </div>
                                    {hasImageError && !selectedImage && (
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
                                    <span>
                                        {" "}
                                        You will receive :{" "}
                                        <strong>25.00 ETH $50,000</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="header-title text-center mb--30">
                                    <h3>Create New NFT</h3>
                                    <p>
                                        {" "}
                                        Create your own NFT and sell it on our
                                        platform{" "}
                                    </p>
                                </div>
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        <div className="col-12 mb-4">
                                            <Paper
                                                elevation={0}
                                                style={{
                                                    width: "200px",
                                                    height: "100px",
                                                    margin: "0 auto",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.3s ease",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        height: "100%",
                                                        width: "100%",
                                                        transition:
                                                            "all 0.3s ease",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor =
                                                            "transparent";
                                                        e.currentTarget.querySelector(
                                                            ".add-icon"
                                                        ).style.display =
                                                            "none";
                                                        e.currentTarget.querySelector(
                                                            ".create-text"
                                                        ).style.opacity = 1;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor =
                                                            "#f5f5f5";
                                                        e.currentTarget.querySelector(
                                                            ".add-icon"
                                                        ).style.display =
                                                            "block";
                                                        e.currentTarget.querySelector(
                                                            ".create-text"
                                                        ).style.opacity = 0;
                                                    }}
                                                    onClick={
                                                        handleAddCollectionClick
                                                    }
                                                >
                                                    <AddIcon
                                                        className="add-icon"
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            color: "#1976d2",
                                                        }}
                                                    />
                                                    <div
                                                        className="create-text"
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            opacity: 0,
                                                            transition:
                                                                "opacity 0.3s ease",
                                                            textAlign: "center",
                                                            color: "#1976d2",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Create Collection
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    id="name"
                                                    placeholder="e. g. `Digital Awesome Game`"
                                                    {...register("name", {
                                                        required:
                                                            "Name is required",
                                                    })}
                                                />
                                                {errors.name && (
                                                    <ErrorText>
                                                        {errors.name?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Discription"
                                                    className="form-label"
                                                >
                                                    Discription
                                                </label>
                                                <textarea
                                                    id="discription"
                                                    rows="3"
                                                    placeholder="e. g. “This is a digital art piece that I created for my collection. It is a one of a kind piece that will never be replicated.”"
                                                    {...register(
                                                        "discription",
                                                        {
                                                            required:
                                                                "Discription is required",
                                                        }
                                                    )}
                                                />
                                                {errors.discription && (
                                                    <ErrorText>
                                                        {
                                                            errors.discription
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="supply"
                                                    className="form-label"
                                                >
                                                    Supply
                                                </label>
                                                <input
                                                    id="supply"
                                                    placeholder="e. g. `20`"
                                                    {...register("supply", {
                                                        pattern: {
                                                            value: /^[0-9]+$/,
                                                            message:
                                                                "Please enter a number",
                                                        },
                                                        required:
                                                            "Supply is required",
                                                    })}
                                                />
                                                {errors.supply && (
                                                    <ErrorText>
                                                        {errors.supply?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="externalLink"
                                                    className="form-label"
                                                >
                                                    External Link
                                                </label>
                                                <input
                                                    id="externalLink"
                                                    placeholder="e. g. `https://www.example.com`"
                                                    {...register(
                                                        "externalLink",
                                                        {
                                                            required:
                                                                "Link is required",
                                                        }
                                                    )}
                                                />
                                                {errors.externalLink && (
                                                    <ErrorText>
                                                        {
                                                            errors.externalLink
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="input-box">
                                                <Button
                                                    type="button"
                                                    data-btn="preview"
                                                    className="mr--15"
                                                    onClick={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    Preview
                                                </Button>
                                                <Button type="submit">
                                                    Submit Item
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            
<CreateCollectionModal
                open={showCollectionModal}
                handleClose={handleCollectionModal}
            />
            {/* <ProductModal
                open={showProductModal}
                handleClose={handleProductModal}
                previewData={previewData}
            /> */}



        </>
    );
};

CreateNewArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
CreateNewArea.defaultProps = {
    space: 1,
};

export default CreateNewArea;
