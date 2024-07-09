import PropTypes from "prop-types";
import clsx from "clsx";
import Anchor from "@ui/anchor";

const CollectionDetailHeader = ({
    pageTitle,
    data,
    className,
    space,
}) => (
    <div
        className={clsx(
            "rn-breadcrumb-inner",
            className,
            space === 1 && "ptb--10"
        )}
    >
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-12">
                    <h5 className="pageTitle text-center text-md-start">
                       Collections / {pageTitle}
                    </h5>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                    <ul className="breadcrumb-list gap-5 text-center text-md-end">
                        {/* <li className="item">
                            
                        </li> */}
                        {/* <li className="separator">
                        </li> */}
                        {/* <li className="item current">
                        </li> */}

                        {/* <li
                            className="item current"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <span>Buy Now</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span>
                        </li> */}
                        {/* <li className="item current"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        >
                            <span>Sell Now</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span>
                        </li> */}
                        <li className="item current"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        >
                            <span>Listed/Supply</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span>
                        </li>
                        <li className="item current"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        >
                            <span>Volume[24h]</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span>
                        </li>
                        <li className="item current"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        >
                            <span>Volume[all]</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span>
                        </li>
                        <li className="item current"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        >
                            <span>Sales</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span>
                        </li>
                        <li className="item current"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        >
                            <span>Price</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

CollectionDetailHeader.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CollectionDetailHeader.defaultProps = {
    space: 1,
};

export default CollectionDetailHeader;
