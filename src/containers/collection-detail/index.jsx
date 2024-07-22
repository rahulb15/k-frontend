import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import CollectionDetailTab from "@components/product-details/collection-detail-tab";
import ProductTitle from "@components/product-details/title";
import { Range } from "react-range";
import { Rings } from "react-loader-spinner";
import { motion } from "framer-motion";

const CollectionDetailsArea = ({ space, className, product }) => {
    console.log("Product:", product);
    const [passDetails, setPassDetails] = React.useState({
        dbCooperMintedNumber: 0,
        dbCooperTotalNumber: 2500,
    });

    const handleChange = (values) => {
        setPassDetails({
            dbCooperMintedNumber: values[0],
            dbCooperTotalNumber: passDetails.dbCooperTotalNumber,
        });
    };

    const handleChangeComplete = (values) => {
        console.log("Values:", values);
    };

    // const imageUrl = product?.image.src.startsWith("/")
    //     ? product.image.src
    //     : `/${product.image.src}`;

    // console.log("Adjusted image URL:", imageUrl);

    return (
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
            style={{
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background image container */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // backgroundImage: `linear-gradient(rgba(70, 70, 70, 0.7), rgba(70, 70, 70, 0.7)), url(${imageUrl})`,
                    backgroundImage: `url(${product?.bannerUrl})`,
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
                            <CollectionDetailTab image={product?.imageUrl} />
                        </Sticky>
                    </div>
                    {/* <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60"> */}
                    <motion.div
                        //hover effect
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.1 },
                        }}
                        //drag effect
                        // drag
                        // dragConstraints={{
                        //     top: -10,
                        //     left: -10,
                        //     right: 10,
                        //     bottom: 10,
                        // }}
                        //initial position
                        // initial={{ opacity: 0, x: -100 }}
                        //animate to position
                        animate={{ opacity: 1, x: 0 }}
                        //exit position
                        // exit={{ opacity: 0, x: 100 }}




                        className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60"
                    >

                        <div className="rn-pd-content-area">
                            <ProductTitle title="Mint Stages" />
                            <div className="mint-stages">
                                <div className="mint-stage">
                                    <h3>
                                        OG <span className="ended">ENDED</span>
                                    </h3>
                                    <p>5 PER WALLET • Price 21</p>
                                </div>
                                <div className="mint-stage">
                                    <h3>
                                        Whitelist{" "}
                                        <span className="ended">ENDED</span>
                                    </h3>
                                    <p>4 PER WALLET • Price 25</p>
                                </div>
                                <div className="mint-stage">
                                    <h3>
                                        Public{" "}
                                        <span className="ended">ENDED</span>
                                    </h3>
                                    <p>Price 25</p>
                                </div>
                            </div>
                            <div className="mint-info">
                                <div className="total-minted">
                                    {/* <span className="live-indicator"></span> */}
                                    {/* <Rings color="green" height={20} width={20} /> */}
                                    {/* <p>Total Minted 0% (0/2500)</p> */}
                                    {/* <Range
                                        step={1}
                                        min={0}
                                        max={100}
                                        values={[50]}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: "6px",
                                                    width: "100%",
                                                    backgroundColor: "#ccc",
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: "20px",
                                                    width: "20px",
                                                    backgroundColor: "#000",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        )}
                                    /> */}

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
                                            {passDetails.dbCooperMintedNumber} /{" "}
                                            {passDetails.dbCooperTotalNumber}
                                        </p>

                                        <Range
                                            values={[
                                                passDetails
                                                    ? passDetails.dbCooperMintedNumber
                                                    : null,
                                            ]}
                                            step={1}
                                            min={0}
                                            max={
                                                passDetails
                                                    ? passDetails.dbCooperTotalNumber
                                                    : null
                                            }
                                            onChange={handleChange}
                                            onFinalChange={handleChangeComplete}
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
                                                            // background: getTrackBackground({
                                                            //   values: [
                                                            //     passDetails ? passDetails.dbCooperMintedNumber : null,
                                                            //   ],
                                                            //   colors: ["#FF0000", "#ccc"],
                                                            //   min: 0,
                                                            //   max: passDetails ? passDetails.dbCooperTotalNumber : null,
                                                            // }),
                                                            background: `linear-gradient(to right,
                    #FF0000 0%,     
                    #FFFF00 ${
                        passDetails
                            ? (passDetails.dbCooperMintedNumber /
                                  (passDetails.dbCooperTotalNumber || 1)) *
                              100
                            : 0
                    }%,
                    #00FF00 ${
                        passDetails
                            ? (passDetails.dbCooperMintedNumber /
                                  (passDetails.dbCooperTotalNumber || 1)) *
                              100
                            : 0
                    }%, 
                    #0000FF ${
                        passDetails
                            ? (passDetails.dbCooperMintedNumber /
                                  (passDetails.dbCooperTotalNumber || 1)) *
                              100
                            : 0
                    }%, 
                    rgb(204, 204, 204) ${
                        passDetails
                            ? (passDetails.dbCooperMintedNumber /
                                  (passDetails.dbCooperTotalNumber || 1)) *
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
                                                <div
                                                    {...props}
                                                    // style={{
                                                    //   ...props.style,
                                                    //   height: "42px",
                                                    //   width: "42px",
                                                    //   borderRadius: "4px",
                                                    //   backgroundColor: "#FFF",
                                                    //   display: "flex",
                                                    //   justifyContent: "center",
                                                    //   alignItems: "center",
                                                    //   boxShadow: "0px 2px 6px #AAA"
                                                    // }}
                                                >
                                                    <div

                                                    // style={{
                                                    //   height: "16px",
                                                    //   width: "5px",
                                                    //   backgroundColor: "#FF0000"
                                                    // }}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="price">
                                    <h2>25 KDA</h2>
                                    <p>($12.25)</p>
                                </div>
                            </div>
                            <div className="mint-form">
                                {/* <input
                                    type="email"
                                    placeholder="Email Address (Optional)"
                                    defaultValue="hello@example.com"
                                /> */}
                                <div className="terms">
                                    <input type="checkbox" id="terms" />
                                    <label htmlFor="terms">
                                        I agree to the General Terms of Service
                                    </label>
                                </div>
                                <button className="buttonlaunchpad">
                                    Mint Here!
                                </button>
                            </div>
                            <p className="disclaimer">
                                Please note this Collection is not a Launchpad
                                project. The Creator has chosen to mint the
                                Collection on its own website and have it as a
                                Featured Mint on Kryptomerch. Any decision by you
                                to mint the Collection is at your own discretion
                                and subject to any terms that terms that are
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
        image: PropTypes.string.isRequired,
    }),
};

CollectionDetailsArea.defaultProps = {
    space: 1,
};

export default CollectionDetailsArea;
