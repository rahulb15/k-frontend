import PropTypes from "prop-types";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";
const LaunchpadCollectionDetailHeader = ({ pageTitle, data, className, space }) => (
    console.log(data),
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
                        <li
                            className="item current"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* <span>Listed/Supply</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span> */}
                            {/* <a href="#!">
                        <span className="icon">
                            <i className="feather-facebook" />
                        </span> */}

                            {/* </a> */}

                            <FacebookShareButton
                                url={"https://www.facebook.com"}
                                quote={"Facebook share button"}
                                hashtag="#facebook"
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                        </li>
                        <li
                            className="item current"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* <span>Volume[24h]</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span> */}
                            <TwitterShareButton
                                url={"https://www.twitter.com"}
                                title={"Twitter share button"}
                                hashtags={["twitter"]}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>


                        </li>
                        <li
                            className="item current"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* <span>Volume[all]</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span> */}
                            <TelegramShareButton
                                url={"https://www.telegram.com"}
                                title={"Telegram share button"}
                            >
                                <TelegramIcon size={32} round />
                            </TelegramShareButton>

                        </li>
                        <li
                            className="item current"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* <span>Sales</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span> */}
                            <LinkedinShareButton
                                url={"https://www.linkedin.com"}
                                title={"Linkedin share button"}
                                summary={"Linkedin share button"}
                            >
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>

                        </li>
                        <li
                            className="item current"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* <span>Price</span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    marginTop: "5px",
                                }}
                            >
                                20
                            </span> */}
                            <EmailShareButton
                                url={"https://www.email.com"}
                                subject={"Email share button"}
                                body={"Email share button"}
                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

LaunchpadCollectionDetailHeader.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

LaunchpadCollectionDetailHeader.defaultProps = {
    space: 1,
};

export default LaunchpadCollectionDetailHeader;
