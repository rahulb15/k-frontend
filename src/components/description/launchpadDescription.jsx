// import React from "react";

// const RenderDescription = ({ collection }) => {
//     const containerStyle = {
//         backgroundColor: "#1a1a1a",
//         color: "#f0f0f0",
//         padding: "2rem",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     };

//     const headingStyle = {
//         color: "#a9b729",
//         marginBottom: "1.5rem",
//         fontWeight: "bold",
//         fontSize: "2.5rem",
//     };

//     const paragraphStyle = {
//         fontSize: "1.1rem",
//         lineHeight: 1.8,
//         marginBottom: "1rem",
//     };

//     const dividerStyle = {
//         height: "2px",
//         backgroundColor: "#a9b729",
//         margin: "2rem 0",
//     };

//     const subHeadingStyle = {
//         color: "#a9b729",
//         marginBottom: "1rem",
//         fontWeight: "bold",
//         fontSize: "1.8rem",
//     };

//     const detailsContainerStyle = {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "1rem",
//     };

//     const detailItemStyle = {
//         display: "flex",
//         alignItems: "center",
//         marginBottom: "1rem",
//     };

//     const iconStyle = {
//         marginRight: "1rem",
//         color: "#a9b729",
//     };

//     return (
//         <div style={containerStyle}>
//             <h1 style={headingStyle}>{collection.title}</h1>

//             <div>
//                 {collection.data.data.projectDescription
//                     .split("\n\n")
//                     .map((paragraph, index) => (
//                         <p key={index} style={paragraphStyle}>
//                             {paragraph}
//                         </p>
//                     ))}
//             </div>

//             <div style={dividerStyle}></div>

//             <h2 style={subHeadingStyle}>Collection Details</h2>

//             <div style={detailsContainerStyle}>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>🪙</span>
//                     <span>Total Supply: {collection.data.data.totalSupply}</span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>🔗</span>
//                     <span>Blockchain: {collection.blockchain}</span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>💰</span>
//                     <span>
//                         Mint Price: {collection.data.data.mintPrice}{" "}
//                         {collection.data.data.mintPriceCurrency}
//                     </span>
//                 </div>
//                 <div style={detailItemStyle}>
//                     <span style={iconStyle}>📅</span>
//                     <span>
//                         Launch Date:{" "}
//                         {new Date(
//                             collection.data.data.expectedLaunchDate
//                         ).toLocaleDateString()}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RenderDescription;
import React from "react";
import collectionService from "src/services/collection.service";
import { useEffect, useState } from "react";

const RenderDescription = ({ collection }) => {
    console.log(collection);
    const [collectionId, setCollectionId] = useState(null);
    console.log(collectionId);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await collectionService.getCollectionByName(
                    collection?.collectionType
                );
                setCollectionId(response?.data?.data?.collectionId);
                console.log(response);
            } catch (err) {
                console.error(err);
            }
        };
        if (collection?.collectionType) {
            fetchCollection();
        }
    }, [collection.id]);

    const containerStyle = {
        backgroundColor: "#1a1a1a",
        color: "#f0f0f0",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const headingStyle = {
        color: "#a9b729",
        marginBottom: "1.5rem",
        fontWeight: "bold",
        fontSize: "2.5rem",
    };

    const paragraphStyle = {
        fontSize: "1.5rem",
        lineHeight: 1.8,
        marginBottom: "1rem",
    };

    const dividerStyle = {
        height: "2px",
        backgroundColor: "#a9b729",
        margin: "2rem 0",
    };

    const subHeadingStyle = {
        color: "#a9b729",
        marginBottom: "1rem",
        fontWeight: "bold",
        fontSize: "1.8rem",
    };

    const detailsContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
    };

    const detailItemStyle = {
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
    };

    const iconStyle = {
        marginRight: "1rem",
        color: "#a9b729",
    };

    const contractLinkStyle = {
        backgroundColor: "#2a2a2a",
        color: "#a9b729",
        padding: "1rem",
        borderRadius: "4px",
        textDecoration: "none",
        display: "inline-block",
        marginTop: "1rem",
        marginBottom: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
    };

    const disclaimerStyle = {
        fontSize: "0.9rem",
        color: "#888",
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        borderRadius: "4px",
    };

    const handleContractClick = () => {
        // https://explorer.marmalade-ng.xyz/#/collection/c_DB%20COOPER%20NFT_gtFuZSpU8qBVLbMkbrajYIt8zwQrv2iD9VqhirDclfU
        // Replace 'https://example.com' with the actual external website URL
        window.open(
            "https://explorer.marmalade-ng.xyz/#/collection/" + collectionId,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>{collection?.title}</h1>

            <div>
                {collection?.data?.data?.projectDescription
                    .split("\n\n")
                    .map((paragraph, index) => (
                        <p key={index} style={paragraphStyle}>
                            {paragraph}
                        </p>
                    ))}
            </div>

            <div style={dividerStyle}></div>

            {/* <div onClick={handleContractClick} style={contractLinkStyle}>
                View Contract Details
            </div> */}
            {collectionId && (
                <div onClick={handleContractClick} style={contractLinkStyle}>
                    View Contract Details
                </div>
            )}

            <div style={dividerStyle}></div>

            <h2 style={subHeadingStyle}>Collection Details</h2>

            <div style={detailsContainerStyle}>
                <div style={detailItemStyle}>
                    <span style={iconStyle}>🪙</span>
                    <span>
                        Total Supply: {collection?.data?.data?.totalSupply}
                    </span>
                </div>
                <div style={detailItemStyle}>
                    <span style={iconStyle}>🔗</span>
                    <span>Blockchain: {collection?.blockchain}</span>
                </div>
                <div style={detailItemStyle}>
                    <span style={iconStyle}>💰</span>
                    <span>
                        Mint Price: {collection?.data?.data?.mintPrice}{" "}
                        {collection?.data?.data?.mintPriceCurrency}
                    </span>
                </div>
                <div style={detailItemStyle}>
                    <span style={iconStyle}>📅</span>
                    <span>
                        Launch Date:{" "}
                        {new Date(
                            collection?.data?.data?.expectedLaunchDate
                        ).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div style={dividerStyle}></div>

            <h3 style={{ ...subHeadingStyle, fontSize: "1.4rem" }}>
                Contract Information
            </h3>
            {/* <p>Contract Address: 5Wk5...hTGL</p>
            <p>Contract Standard: Metaplex</p>
            <p>Chain: Solana</p>
            <p>Token Standard: Non-Fungible</p> */}

            <div style={disclaimerStyle}>
                <p>
                    Certain information has been prepared by third parties,
                    including the Creator using Launchpad. Kryptomerch is not
                    affiliated with such third parties or the Creator, and is
                    not responsible for the information provided on Launchpad.
                    Such information is provided for informational purposes only
                    and is in no way investment advice. Kryptomerch is not
                    liable for any errors, changes or amendments to such
                    information, including any actions taken in reliance on such
                    information. Kryptomerch makes no representation on the
                    accuracy, suitability, or validity of any information
                    provided in relation to any NFT project that chooses to use
                    Launchpad.
                </p>
                <p>
                    By clicking "Mint", I acknowledge that I am choosing to mint
                    the NFT with the understanding that it may be worth
                    significantly less than the mint price, and may end up being
                    worth nothing at all.
                </p>
            </div>
        </div>
    );
};

export default RenderDescription;
