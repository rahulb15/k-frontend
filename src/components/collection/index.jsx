// /* eslint-disable */
// import PropTypes from "prop-types";
// import Anchor from "@ui/anchor";
// import Image from "next/image";
// import { Rings } from "react-loader-spinner";
// import moment from "moment";

// const Collection = ({
//     title,
//     total_item,
//     image,
//     thumbnails,
//     profile_image,
//     price,
//     reservePrice,
//     mintStartDate,
//     mintEndDate,
//     data,
//     path,
// }) => {
//     console.log(data);

//     // {
//     //     _id: '66a0dfd4e6d44576141be399',
//     //     user: '66a0d2394efea0ada8460285',
//     //     collectionName: 'monkeyaz7',
//     //     creatorName: 'Rahul',
//     //     creatorWallet:
//     //       'k:d1d47937b0ec42efa859048d0fb5f51707639ddad991e58ae9efcff5f4ff9dbe',
//     //     creatorEmail: 'rahulb@yopmail.com',
//     //     projectDescription: 'Hello',
//     //     projectCategory: 'ART',
//     //     expectedLaunchDate: '2024-07-31',
//     //     twitter: '',
//     //     discord: '',
//     //     instagram: '',
//     //     website: '',
//     //     totalSupply: '4',
//     //     contractType: 'ng',
//     //     royaltyPercentage: '0.5',
//     //     mintPrice: '1.0',
//     //     mintPriceCurrency: 'kda',
//     //     tokenList: [
//     //       'ipfs://QmVdXq6EjDEQq6U5cDqab2xvaMzHLgpQKjW56iVJYbji7a', 'ipfs://QmRPqajKGNCtKyA7oE5Lx3H8YijyfopS8oaVcdZCSUDyEP',
//     //       'ipfs://QmPJAuW9MpZwcdzw86ECFyBqVb9HvTfHsaqAQiKCvPmSPD', 'ipfs://QmXHR1BFLd8MYMEYbrhMkboLc1oEG2tbygomaxCknosQNN'
//     //     ],
//     //     policy: [ 'INSTANT-MINT MARKETPLACE FIXED-SALE COLLECTION' ],
//     //     mintStartDate: '2024-07-31T11:03:00.000Z',
//     //     mintStartTime: 'time "2024-07-31T11:03:00Z"',
//     //     mintEndDate: '2025-07-31T11:03:00.000Z',
//     //     mintEndTime: 'time "2025-07-31T11:03:00Z"',
//     //     allowFreeMints: false,
//     //     enableWhitelist: true,
//     //     whitelistAddresses: [],
//     //     reservePrice: 0,
//     //     enablePresale: true,
//     //     presaleAddressess: [],
//     //     enableAirdrop: false,
//     //     isPaid: true,
//     //     isApproved: true,
//     //     isRejected: false,
//     //     isLaunched: true,
//     //     createdAt: '2024-07-24T11:04:52.182Z',
//     //     updatedAt: '2024-07-24T11:04:52.182Z',
//     //     __v: 0,
//     //     collectionCoverImage:
//     //       'https://res.cloudinary.com/dh187xay8/image/upload/v1721817315/collectionCoverImage/file.jpg',
//     //     collectionBannerImage:
//     //       'https://res.cloudinary.com/dh187xay8/image/upload/v1721817316/collectionBannerImage/file.jpg'
//     //   }

//     const renderLaunchDate = (utcDateTime) => {
//         console.log(utcDateTime);
//         // '2025-07-31T11:03:00.000Z'

//         const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//         console.log(userTimeZone);

//         const localDateTime = moment(utcDateTime)
//             .local()
//             .format("YYYY-MM-DD HH:mm:ss");
//         console.log(localDateTime);

//         const diff = moment(utcDateTime).diff(moment(), "days");
//         console.log(diff);

//         return diff;
//     };

//     const renderLaunchInfo = () => {
//         const now = moment();

//         if (data.enablePresale && data.presaleStartDateAndTime) {
//             const presaleStart = moment(data.presaleStartDateAndTime);
//             const presaleEnd = moment(data.presaleEndDateAndTime);

//             if (now.isBefore(presaleStart)) {
//                 return {
//                     status: "Upcoming",
//                     text: "Presale starts in",
//                     time: presaleStart.diff(now, "days"),
//                 };
//             } else if (now.isBetween(presaleStart, presaleEnd)) {
//                 return {
//                     status: "Live",
//                     text: "Presale ends in",
//                     time: presaleEnd.diff(now, "days"),
//                 };
//             }
//         }

//         if (data.enableWhitelist && data.whitelistStartDateAndTime) {
//             const whitelistStart = moment(data.whitelistStartDateAndTime);
//             const mintStart = moment(data.mintStartDate);

//             if (now.isBefore(whitelistStart)) {
//                 return {
//                     status: "Upcoming",
//                     text: "Whitelist starts in",
//                     time: whitelistStart.diff(now, "days"),
//                 };
//             } else if (now.isBetween(whitelistStart, mintStart)) {
//                 return {
//                     status: "Live",
//                     text: "Whitelist ends in",
//                     time: mintStart.diff(now, "days"),
//                 };
//             }
//         }

//         const mintStart = moment(data.mintStartDate);
//         const mintEnd = moment(data.mintEndDate);

//         if (now.isBefore(mintStart)) {
//             return {
//                 status: "Upcoming",
//                 text: "Mint starts in",
//                 time: mintStart.diff(now, "days"),
//             };
//         } else if (now.isBetween(mintStart, mintEnd)) {
//             return {
//                 status: "Live",
//                 text: "Mint ends in",
//                 time: mintEnd.diff(now, "days"),
//             };
//         } else {
//             return {
//                 status: "Ended",
//                 text: "Mint ended",
//                 time: 0,
//             };
//         }
//     };

//     const launchInfo = renderLaunchInfo();

//     return (
//         <Anchor
//             path={`/launchpad/kadena/${path}`}
//             className="rn-collection-inner-one"
//         >
//             <div className="collection-wrapper">
//                 {image && (
//                     <div className="collection-big-thumbnail">
//                         <Image
//                             src={image}
//                             alt={image?.alt || "Nft_Profile"}
//                             width={507}
//                             height={339}
//                         />
//                     </div>
//                 )}
//                 {/* <div className="collenction-small-thumbnail">
//                 {thumbnails?.map((thumb) => (
//                     <div key={thumb?.src}>
//                         <Image
//                             src={thumb?.src}
//                             alt={thumb?.alt || "Nft_Profile"}
//                             width={164}
//                             height={110}
//                         />
//                     </div>
//                 ))}
//             </div> */}
//                 <div className="collection-deg">
//                     <h6 className="title">{title}</h6>
//                     <button className="btn btn-primary">Mint</button>
//                 </div>
//                 <div
//                     className="collection-deg"
//                     style={{ justifyContent: "center" }}
//                 >
//                     <div className="d-flex justify-content-between">
//                         <Rings
//                             color={
//                                 launchInfo.status === "Live"
//                                     ? "green"
//                                     : "orange"
//                             }
//                             height={20}
//                             width={20}
//                         />
//                         <span
//                             style={{
//                                 fontWeight: "bold",
//                                 color:
//                                     launchInfo.status === "Live"
//                                         ? "green"
//                                         : "orange",
//                             }}
//                         >
//                             {launchInfo.status}
//                         </span>
//                         <span
//                             style={{ fontWeight: "bold", marginLeft: "10px" }}
//                         >
//                             {launchInfo.text}
//                         </span>
//                         <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
//                             {launchInfo.time} days
//                         </span>
//                     </div>
//                 </div>

//                 <div className="horizontal-line"></div>
//                 <div className="collection-footer d-flex justify-content-between">
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Items</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Price</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>Minted</span>
//                     </div>
//                 </div>

//                 <div className="collection-footer d-flex justify-content-between mt-2">
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>{total_item}</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>{price} KDA</span>
//                     </div>
//                     <div className="collection-item">
//                         <span style={{ fontWeight: "bold" }}>
//                             {reservePrice}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </Anchor>
//     );
// };

// Collection.propTypes = {
//     title: PropTypes.string.isRequired,
//     total_item: PropTypes.number.isRequired,
//     path: PropTypes.string.isRequired,
//     image: PropTypes.shape({
//         src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//             .isRequired,
//         alt: PropTypes.string,
//     }).isRequired,
//     thumbnails: PropTypes.arrayOf(
//         PropTypes.shape({
//             src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//                 .isRequired,
//             alt: PropTypes.string,
//         }).isRequired
//     ).isRequired,
//     profile_image: PropTypes.shape({
//         src: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string])
//             .isRequired,
//         alt: PropTypes.string,
//     }).isRequired,
// };

// export default Collection;

/* eslint-disable */
import PropTypes from "prop-types";
import Anchor from "@ui/anchor";
import Image from "next/image";
import { Rings } from "react-loader-spinner";
import moment from "moment";
import { useEffect, useState } from "react";

const Collection = ({
    title,
    total_item,
    image,
    thumbnails,
    profile_image,
    price,
    reservePrice,
    mintStartDate,
    mintEndDate,
    data,
    path,
}) => {
    console.log(data);

    const renderLaunchInfo = () => {
        const now = moment();

        const formatTimeLeft = (targetTime) => {
            const duration = moment.duration(targetTime.diff(now));
            const years = duration.years();
            const months = duration.months();
            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            if (years > 0) {
                return `${years} year${years > 1 ? "s" : ""} ${months} month${
                    months > 1 ? "s" : ""
                }`;
            } else if (months > 0) {
                return `${months} month${months > 1 ? "s" : ""} ${days} day${
                    days > 1 ? "s" : ""
                }`;
            } else if (days > 0) {
                return `${days} day${days > 1 ? "s" : ""} ${hours}h`;
            } else if (hours > 0) {
                return `${hours}h ${minutes}m`;
            } else if (minutes > 0) {
                return `${minutes}m ${seconds}s`;
            } else {
                return `${seconds}s`;
            }
        };
        if (data.enablePresale && data.presaleStartDateAndTime) {
            const presaleStart = moment(data.presaleStartDateAndTime);
            const presaleEnd = moment(data.presaleEndDateAndTime);

            if (now.isBefore(presaleStart)) {
                return {
                    status: "Upcoming",
                    text: "Presale starts in",
                    time: formatTimeLeft(presaleStart),
                };
            } else if (now.isBetween(presaleStart, presaleEnd)) {
                return {
                    status: "Live",
                    text: "Presale ends in",
                    time: formatTimeLeft(presaleEnd),
                };
            }
        }

        if (data.enableWhitelist && data.whitelistStartDateAndTime) {
            const whitelistStart = moment(data.whitelistStartDateAndTime);
            const mintStart = moment(data.mintStartDate);

            if (now.isBefore(whitelistStart)) {
                return {
                    status: "Upcoming",
                    text: "Whitelist starts in",
                    time: formatTimeLeft(whitelistStart),
                };
            } else if (now.isBetween(whitelistStart, mintStart)) {
                return {
                    status: "Live",
                    text: "Whitelist ends in",
                    time: formatTimeLeft(mintStart),
                };
            }
        }

        const mintStart = moment(data.mintStartDate);
        const mintEnd = moment(data.mintEndDate);

        if (now.isBefore(mintStart)) {
            return {
                status: "Upcoming",
                text: "Mint starts in",
                time: formatTimeLeft(mintStart),
            };
        } else if (now.isBetween(mintStart, mintEnd)) {
            return {
                status: "Live",
                text: "Mint ends in",
                time: formatTimeLeft(mintEnd),
            };
        } else {
            return {
                status: "Ended",
                text: "Mint ended",
                time: "0s",
            };
        }
    };
    const [launchInfo, setLaunchInfo] = useState(renderLaunchInfo());

    useEffect(() => {
        const timer = setInterval(() => {
            setLaunchInfo(renderLaunchInfo());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Anchor
            path={`/launchpad/kadena/${path}`}
            className={`rn-collection-inner-one ${data?.collectionName === "Priority Pass" ? "priority-pass" : ""}`}
            >
            <div className="collection-wrapper">
                {image && (
                    <div className="collection-big-thumbnail">
                        <Image
                            src={data.collectionName === "Priority Pass" ? "https://ipfs.filebase.io/ipfs/QmXtzpiDDDT6dkguKmNPsLVBoZLMme4QgwX7WknCoDKuMG" : image}
                            alt={image?.alt || "Nft_Profile"}
                            width={507}
                            height={339}
                        />
                    </div>
                )}
                <div className="collection-deg">
                    <h6 className="title">{title}</h6>
                    <button className="btn btn-primary">Mint</button>
                </div>
                <div
                    className="collection-deg"
                    style={{ justifyContent: "center" }}
                >
                    <div className="d-flex justify-content-between">
                        <Rings
                            color={
                                launchInfo.status === "Live"
                                    ? "green"
                                    : "orange"
                            }
                            height={20}
                            width={20}
                        />
                        <span
                            style={{
                                fontWeight: "bold",
                                color:
                                    launchInfo.status === "Live"
                                        ? "green"
                                        : "orange",
                            }}
                        >
                            {launchInfo.status}
                        </span>
                        <span
                            style={{ fontWeight: "bold", marginLeft: "10px" }}
                        >
                            {/* {launchInfo.text} */}
                            {data?.collectionName === "Priority Pass" ? "" : launchInfo.text}
                        </span>
                        <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                            {/* {launchInfo.time} */}
                            {data?.collectionName === "Priority Pass" ? "" : launchInfo.time}
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
                        <span style={{ fontWeight: "bold" }}>{price} KDA</span>
                    </div>
                    <div className="collection-item">
                        <span style={{ fontWeight: "bold" }}>
                            {reservePrice}
                        </span>
                    </div>
                </div>
            </div>
        </Anchor>
    );
};

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
