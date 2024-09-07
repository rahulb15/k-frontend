// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { TabContent, TabContainer, TabPane, Nav } from "react-bootstrap";
// import { useGetOwnedNftsQuery } from "src/services/nft.service";
// import { useGetTokenDetailsMutation } from "src/services/launchpad.service";
// import { useAccountContext } from "src/contexts";
// import nftServices from "src/services/nftServices";
// import Nft from "@components/nfts";
// import Collection from "@components/collection";
// import collectionService from "src/services/collection.service";

// const PREFERED_GATEWAY = "ipfs.io";

// const ipfsResolution = (cid) => `https://${PREFERED_GATEWAY}/ipfs/${cid}`;

// const AuthorProfileArea = ({ className }) => {
//     const [activeTab, setActiveTab] = useState("nav-profile");
//     const [pageNo, setPageNo] = useState(1);
//     const [limit, setLimit] = useState(20);
//     const [search, setSearch] = useState("");
//     const [nfts, setNfts] = useState([]);
//     const [onSaleNfts, setOnSaleNfts] = useState([]);
//     const [createdCollections, setCreatedCollections] = useState([]);
//     const account = useAccountContext();

//     const { data: ownedNftsData, error: ownedNftsError, isLoading: ownedNftsLoading, refetch: refetchOwnedNfts } = useGetOwnedNftsQuery({
//         pageNo,
//         limit,
//         search,
//     });

//     const [getTokenDetailsMutation] = useGetTokenDetailsMutation();

//     useEffect(() => {
//         if (ownedNftsData) {
//             setNfts(ownedNftsData.data.nfts);
//         }
//     }, [ownedNftsData]);

//     useEffect(() => {
//         const fetchTokenDetails = async () => {
//             if (account?.user?.walletAddress) {
//                 try {
//                     const response = await getTokenDetailsMutation({
//                         account: account.user.walletAddress,
//                     }).unwrap();
//                     console.log("Token details:", response);
//                     const body = { reveledData: response };
//                     await nftServices.updateRevealedNFTs(body);
//                     refetchOwnedNfts();
//                 } catch (error) {
//                     console.error("Error fetching token details:", error);
//                 }
//             }
//         };

//         fetchTokenDetails();
//     }, [account.user.walletAddress, getTokenDetailsMutation, refetchOwnedNfts]);

//     useEffect(() => {
//         const fetchOnSaleNfts = async () => {
//             if (activeTab === "nav-home") {
//                 try {
//                     const data = {}; // Add any necessary data for the API call
//                     const response = await nftServices.getOwnSaleNfts(data, pageNo, limit, search);
//                     setOnSaleNfts(response.data.nfts);
//                 } catch (error) {
//                     console.error("Error fetching on sale NFTs:", error);
//                 }
//             }
//         };

//         fetchOnSaleNfts();
//     }, [activeTab, pageNo, limit, search]);

//     useEffect(() => {
//         const fetchCreatedCollections = async () => {
//             if (activeTab === "nav-contact") {
//                 try {
//                     console.log("Fetching created collections...");
//                     // Replace this with your actual API call to fetch created collections
//                     const response = await collectionService.getCreatedCollections(pageNo, limit, search);
//                     console.log("Created collections:", response.data);
//                     setCreatedCollections(response.data.data[0].data);
//                 } catch (error) {
//                     console.error("Error fetching created collections:", error);
//                 }
//             }
//         };

//         fetchCreatedCollections();
//     }, [activeTab, account.user.walletAddress, pageNo, limit, search]);
//     console.log("createdCollections", createdCollections);

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };

//     if (ownedNftsLoading) return <div>Loading...</div>;
//     if (ownedNftsError) return <div>Error: {ownedNftsError.message}</div>;

//     return (
//         <div className={clsx("rn-authore-profile-area", className)}>
//             <TabContainer activeKey={activeTab} onSelect={handleTabChange}>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-12">
//                             <div className="tab-wrapper-one">
//                                 <nav className="tab-button-one">
//                                     <Nav className="nav nav-tabs" id="nav-tab" role="tablist">
//                                         <Nav.Link as="button" eventKey="nav-home">On Sale</Nav.Link>
//                                         <Nav.Link as="button" eventKey="nav-profile">Owned</Nav.Link>
//                                         <Nav.Link as="button" eventKey="nav-contact">Created</Nav.Link>
//                                         <Nav.Link as="button" eventKey="nav-liked">Liked</Nav.Link>
//                                     </Nav>
//                                 </nav>
//                             </div>
//                         </div>
//                     </div>

//                     <TabContent className="tab-content rn-bid-content">
//                         <TabPane className="row d-flex g-5" eventKey="nav-home">
//                             {onSaleNfts?.map((nft) => (
//                                 <div key={nft._id} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
//                                     <Nft
//                                         overlay
//                                         placeBid
//                                         title={nft.collectionName}
//                                         slug={nft.tokenId}
//                                         latestBid={nft.nftPrice}
//                                         price={nft.nftPrice}
//                                         likeCount={nft.likes}
//                                         auction_date={nft.createdAt}
//                                         image={nft.tokenImage}
//                                         authors={nft.creatorName}
//                                         bitCount={nft.likes}
//                                         data={nft}
//                                     />
//                                 </div>
//                             ))}
//                         </TabPane>
//                         <TabPane className="row g-5 d-flex" eventKey="nav-profile">
//                             {nfts?.map((nft) => (
//                                 <div key={nft._id} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
//                                     <Nft
//                                         overlay
//                                         placeBid
//                                         title={nft.collectionName}
//                                         slug={nft.tokenId}
//                                         latestBid={nft.nftPrice}
//                                         price={nft.nftPrice}
//                                         likeCount={nft.likes}
//                                         auction_date={nft.createdAt}
//                                         image={nft.tokenImage}
//                                         authors={nft.creatorName}
//                                         bitCount={nft.likes}
//                                         data={nft}
//                                     />
//                                 </div>
//                             ))}
//                         </TabPane>
//                         <TabPane className="row g-5 d-flex" eventKey="nav-contact">
//                             {createdCollections?.map((collection) => (
//                                 <div key={collection._id} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
//                                     <Collection
//                                         title={collection.collectionName}
//                                         total_item={collection.totalSupply}
//                                         path={collection.collectionName}
//                                         image={collection.collectionCoverImage}
//                                         thumbnails={collection.collectionBannerImage}
//                                         price={collection.mintPrice}
//                                         reservePrice={collection.reservePrice}
//                                         mintStartDate={collection.mintStartDate}
//                                         mintEndDate={collection.mintEndDate}
//                                         data={collection}
//                                     />
//                                 </div>
//                             ))}
//                         </TabPane>
//                         <TabPane className="row g-5 d-flex" eventKey="nav-liked">
//                             {/* Liked NFTs */}
//                         </TabPane>
//                     </TabContent>
//                 </div>
//             </TabContainer>
//         </div>
//     );
// };

// AuthorProfileArea.propTypes = {
//     className: PropTypes.string,
// };

// export default AuthorProfileArea;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { TabContent, TabContainer, TabPane, Nav } from "react-bootstrap";
import { useGetOwnedNftsQuery } from "src/services/nft.service";
import { useGetTokenDetailsMutation } from "src/services/launchpad.service";
import { useAccountContext } from "src/contexts";
import nftServices from "src/services/nftServices";
import singleNftService from "src/services/singleNft.service";
import Nft from "@components/nfts";
import SingleNft from "@components/singleNft";
import MarketCollection from "@components/marketplace-collection";
import collectionService from "src/services/collection.service";

const PREFERED_GATEWAY = "ipfs.io";

const ipfsResolution = (cid) => `https://${PREFERED_GATEWAY}/ipfs/${cid}`;

const AuthorProfileArea = ({ className }) => {
    const [activeTab, setActiveTab] = useState("nav-profile");
    const [createdActiveTab, setCreatedActiveTab] = useState("collections");
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState("");
    const [nfts, setNfts] = useState([]);
    const [onSaleNfts, setOnSaleNfts] = useState([]);
    const [createdCollections, setCreatedCollections] = useState([]);
    const [createdSingleNfts, setCreatedSingleNfts] = useState([]);
    const account = useAccountContext();
    const [refresh, setRefresh] = useState(false);

    const {
        data: ownedNftsData,
        error: ownedNftsError,
        isLoading: ownedNftsLoading,
        refetch: refetchOwnedNfts,
    } = useGetOwnedNftsQuery({
        pageNo,
        limit,
        search,
    });

    const [getTokenDetailsMutation] = useGetTokenDetailsMutation();

    useEffect(() => {
        if (ownedNftsData) {
            setNfts(ownedNftsData.data.nfts);
        }
    }, [ownedNftsData]);

    useEffect(() => {
        const fetchTokenDetails = async () => {
            if (account?.user?.walletAddress) {
                try {
                    const response = await getTokenDetailsMutation({
                        account: account.user.walletAddress,
                    }).unwrap();
                    console.log("Token details:", response);
                    const body = { reveledData: response };
                    await nftServices.updateRevealedNFTs(body);
                    refetchOwnedNfts();
                } catch (error) {
                    console.error("Error fetching token details:", error);
                }
            }
        };

        fetchTokenDetails();
    }, [account.user.walletAddress, getTokenDetailsMutation, refetchOwnedNfts]);

    useEffect(() => {
        const fetchOnSaleNfts = async () => {
            if (activeTab === "nav-home") {
                try {
                    const data = {}; // Add any necessary data for the API call
                    const response = await nftServices.getOwnSaleNfts(
                        data,
                        pageNo,
                        limit,
                        search
                    );
                    setOnSaleNfts(response.data.nfts);
                } catch (error) {
                    console.error("Error fetching on sale NFTs:", error);
                }
            }
        };

        fetchOnSaleNfts();
    }, [activeTab, pageNo, limit, search]);

    useEffect(() => {
        const fetchCreatedItems = async () => {
            if (activeTab === "nav-contact") {
                try {
                    if (
                        createdActiveTab === "collections" ||
                        createdActiveTab === "all"
                    ) {
                        const collectionsResponse =
                            await collectionService.getCreatedCollections(
                                pageNo,
                                limit,
                                search
                            );
                        setCreatedCollections(
                            collectionsResponse.data.data[0].data
                        );
                    }
                    if (
                        createdActiveTab === "single-nfts" ||
                        createdActiveTab === "all"
                    ) {
                        const singleNftsResponse =
                            await singleNftService.getCreatedSingleNfts(
                                pageNo,
                                limit,
                                search
                            );
                        console.log("Single NFTs:", singleNftsResponse.data);
                        setCreatedSingleNfts(
                            singleNftsResponse.data.singleNfts
                        );
                    }
                } catch (error) {
                    console.error("Error fetching created items:", error);
                }
            }
        };

        fetchCreatedItems();
    }, [
        activeTab,
        createdActiveTab,
        account.user.walletAddress,
        pageNo,
        limit,
        search,
        refresh,
    ]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleCreatedTabChange = (tab) => {
        setCreatedActiveTab(tab);
    };

    if (ownedNftsLoading) return <div>Loading...</div>;
    if (ownedNftsError) return <div>Error: {ownedNftsError.message}</div>;

    return (
        <div className={clsx("rn-authore-profile-area", className)}>
            <TabContainer activeKey={activeTab} onSelect={handleTabChange}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="nav-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-home"
                                        >
                                            On Sale
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-profile"
                                        >
                                            Owned
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-contact"
                                        >
                                            Created
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-liked"
                                        >
                                            Liked
                                        </Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <TabContent className="tab-content rn-bid-content">
                        <TabPane className="row d-flex g-5" eventKey="nav-home">
                            {onSaleNfts?.map((nft) => (
                                <div
                                    key={nft._id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Nft
                                        overlay
                                        placeBid
                                        title={nft.collectionName}
                                        slug={nft.tokenId}
                                        latestBid={nft.nftPrice}
                                        price={nft.nftPrice}
                                        likeCount={nft.likes}
                                        auction_date={nft.createdAt}
                                        image={nft.tokenImage}
                                        authors={nft.creatorName}
                                        bitCount={nft.likes}
                                        data={nft}
                                    />
                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-profile"
                        >
                            {nfts?.map((nft) => (
                                <div
                                    key={nft._id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Nft
                                        overlay
                                        placeBid
                                        title={nft.collectionName}
                                        slug={nft.tokenId}
                                        latestBid={nft.nftPrice}
                                        price={nft.nftPrice}
                                        likeCount={nft.likes}
                                        auction_date={nft.createdAt}
                                        image={nft.tokenImage}
                                        authors={nft.creatorName}
                                        bitCount={nft.likes}
                                        data={nft}
                                        refetchOwnedNfts={refetchOwnedNfts}
                                    />
                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-contact"
                        >
                            <div className="col-12">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="created-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="collections"
                                            onClick={() =>
                                                handleCreatedTabChange(
                                                    "collections"
                                                )
                                            }
                                        >
                                            Collections
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="single-nfts"
                                            onClick={() =>
                                                handleCreatedTabChange(
                                                    "single-nfts"
                                                )
                                            }
                                        >
                                            Single NFTs
                                        </Nav.Link>
                                        {/* <Nav.Link as="button" eventKey="all" onClick={() => handleCreatedTabChange("all")}>All</Nav.Link> */}
                                    </Nav>
                                </nav>
                            </div>
                            {(createdActiveTab === "collections" ||
                                createdActiveTab === "all") &&
                                createdCollections?.map((collection) => (
                                    <div
                                        key={collection._id}
                                        className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                    >
                                        <MarketCollection
                                            title={collection.collectionName}
                                            total_item={collection.totalSupply}
                                            path={collection.collectionName}
                                            image={
                                                collection.collectionCoverImage
                                            }
                                            thumbnails={
                                                collection.collectionBannerImage
                                            }
                                            price={collection.mintPrice}
                                            reservePrice={
                                                collection.reservePrice
                                            }
                                            mintStartDate={
                                                collection.mintStartDate
                                            }
                                            mintEndDate={collection.mintEndDate}
                                            data={collection}
                                        />
                                    </div>
                                ))}
                            {(createdActiveTab === "single-nfts" ||
                                createdActiveTab === "all") &&
                                createdSingleNfts?.map((nft) => (
                                    <div
                                        key={nft._id}
                                        className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                    >
                                        <SingleNft
                                            overlay
                                            placeBid
                                            title={nft.collectionName}
                                            slug={nft.tokenId}
                                            latestBid={nft.nftPrice}
                                            price={nft.nftPrice}
                                            likeCount={nft.likes}
                                            auction_date={nft.createdAt}
                                            image={nft.tokenImage}
                                            authors={nft.creatorName}
                                            bitCount={nft.likes}
                                            data={nft}
                                            refresh={refresh}
                                            setRefresh={setRefresh}
                                            refetchOwnedNfts={refetchOwnedNfts}
                                        />
                                    </div>
                                ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-liked"
                        >
                            {/* Liked NFTs */}
                        </TabPane>
                    </TabContent>
                </div>
            </TabContainer>
        </div>
    );
};

AuthorProfileArea.propTypes = {
    className: PropTypes.string,
};

export default AuthorProfileArea;
