/* eslint-disable */
import PropTypes from "prop-types";
import Anchor from "@ui/anchor";
import Image from "next/image";
import { Rings } from "react-loader-spinner";
import moment from "moment";

const Collection = ({
    title,
    total_item,
    image,
    thumbnails,
    profile_image,
    path,
}) => (
    <Anchor
        path={`/launchpad/kadena${path}`}
        className="rn-collection-inner-one"
    >
        <div className="collection-wrapper">
            {image?.src && (
                <div className="collection-big-thumbnail">
                    <Image
                        src={image.src}
                        alt={image?.alt || "Nft_Profile"}
                        width={507}
                        height={339}
                    />
                </div>
            )}
            {/* <div className="collenction-small-thumbnail">
                {thumbnails?.map((thumb) => (
                    <div key={thumb?.src}>
                        <Image
                            src={thumb?.src}
                            alt={thumb?.alt || "Nft_Profile"}
                            width={164}
                            height={110}
                        />
                    </div>
                ))}
            </div> */}
            <div className="collection-deg">
                <h6 className="title">{title}</h6>
                <button className="btn btn-primary">Mint</button>
            </div>
            <div
                className="collection-deg"
                style={{ justifyContent: "center" }}
            >
                <div className="d-flex justify-content-between">
                    <Rings color="green" height={20} width={20} />
                    <span style={{ fontWeight: "bold", color: "green" }}>
                        Live
                    </span>
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                        Ends in
                    </span>
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                        {moment().endOf("day").fromNow()}
                    </span>
                </div>
            </div>

            <div className="horizontal-line"></div>
            <div className="collection-footer d-flex justify-content-between">
                <div className="collection-item">
                    <span style={{ fontWeight: "bold" }}>Items</span>
                </div>
                <div className="collection-item">
                    <span style={{ fontWeight: "bold" }}>Price</span>
                </div>
                <div className="collection-item">
                    <span style={{ fontWeight: "bold" }}>Minted</span>
                </div>
            </div>

            <div className="collection-footer d-flex justify-content-between mt-2">
                <div className="collection-item">
                    <span style={{ fontWeight: "bold" }}>{total_item}</span>
                </div>
                <div className="collection-item">
                    <span style={{ fontWeight: "bold" }}>0.5 KDA</span>
                </div>
                <div className="collection-item">
                    <span style={{ fontWeight: "bold" }}>100</span>
                </div>
            </div>
        </div>
    </Anchor>
);

Collection.propTypes = {
    title: PropTypes.string.isRequired,
    total_item: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
            .isRequired,
        alt: PropTypes.string,
    }).isRequired,
    thumbnails: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
                .isRequired,
            alt: PropTypes.string,
        }).isRequired
    ).isRequired,
    profile_image: PropTypes.shape({
        src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
            .isRequired,
        alt: PropTypes.string,
    }).isRequired,
};

export default Collection;
