import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import { ProductType } from "@utils/types";
import { shuffleArray } from "@utils/methods";
import { useGetNFTsQuery } from "src/services/nft.service";
import { useGetTokenDetailsMutation } from "src/services/launchpad.service";
import Nft from "@components/nfts";
import { useAccountContext } from "src/contexts";
import nftServices from "src/services/nftServices";

const PREFERED_GATEWAY = "ipfs.io";

function ipfsResolution(cid) {
    return `https://${PREFERED_GATEWAY}/ipfs/${cid}`;
}

// Usage
const ipfsUri =
    "ipfs://bafkreicm7uen4kb3y7nwoexrsx7sre6ckfmtbfufslidbesfsbzfi2lguy";

// const AuthorProfileArea = ({ className }) => (
const AuthorProfileArea = ({ className }) => {
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(0);
    const [nfts, setNfts] = useState([]);
    const account = useAccountContext();
    const { data, error, isLoading, refetch } = useGetNFTsQuery({
        pageNo,
        limit,
        search,
    });
    const [jsonData, setJsonData] = useState(null);
    const [imageData, setImageData] = useState(null);
    console.log(
        "🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ data",
        data
    );

    useEffect(() => {
        if (data) {
            setNfts(data.data.nfts);
            setTotal(data.data.total);
        }
    }, [data]);

    // getTokenDetails: builder.mutation({
    //     async queryFn(args) {
    //         const { account } = args;
    //         console.log("account", account);

    // const [balanceMutation, { isLoading, isError, error }] =
    // useBalanceMutation();

    const [getTokenDetailsMutation] = useGetTokenDetailsMutation();

    async function fetchIPFSData(uri) {
        const [protocol, cid] = uri.split("//");
        console.log(
            "🚀 ~ file: index.jsx ~ line 38 ~ fetchIPFSData ~ protocol",
            protocol
        );
        console.log(
            "🚀 ~ file: index.jsx ~ line 38 ~ fetchIPFSData ~ cid",
            cid
        );

        if (protocol !== "ipfs:") {
            throw new Error("Invalid protocol. Expected IPFS URI.");
        }

        const url = ipfsResolution(cid);
        console.log(
            "🚀 ~ file: index.jsx ~ line 38 ~ fetchIPFSData ~ url",
            url
        );

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");

            if (contentType.startsWith("application/json")) {
                const data = await response.json();
                console.log("Metadata:", data);
                return data;
            } else if (contentType.startsWith("image")) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                console.log("Image URL:", imageUrl);
                return { image: imageUrl };
            } else {
                throw new Error("Unknown content type");
            }
        } catch (error) {
            console.error("Error fetching IPFS data:", error);
            throw error;
        }
    }

    useEffect(() => {
        console.log(
            "🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ account.user.walletAddress",
            account.user.walletAddress
        );
        const fetchBalance = async () => {
            try {
                if (account?.user?.walletAddress?.length > 0) {
                    console.log(
                        "🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ account.user.walletAddress",
                        account.user.walletAddress
                    );
                    const response = await getTokenDetailsMutation({
                        account: account.user.walletAddress,
                    }).unwrap();
                    console.log(
                        "🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ response",
                        response
                    );
                    // const uri = response[0].uri;
                    // const data = await fetchIPFSData(uri);
                    // console.log("🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ data", data);

                    // updateRevealedNFTs
                    const body = {
                        reveledData: response,
                    };
                    const responses = await nftServices.updateRevealedNFTs(
                        body
                    );
                    console.log(
                        "🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ responses",
                        responses
                    );

                    refetch();
                }
            } catch (error) {
                console.log(
                    "🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ error",
                    error
                );
            } finally {
                console.log(
                    "🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ finally"
                );
            }
        };

        fetchBalance();
    }, [account.user.walletAddress]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // data: {
    //     nfts: [
    //       {
    //         _id: '66a36d930c6577263d4ee3cc',
    //         user: {
    //           _id: '66a0d2394efea0ada8460285',
    //           name: 'Rahul',
    //           isAdminAccess: true,
    //           email: 'rahulb@yopmail.com',
    //           walletAddress:
    //             'k:d1d47937b0ec42efa859048d0fb5f51707639ddad991e58ae9efcff5f4ff9dbe',
    //           walletBalance: 0,
    //           walletName: 'Ecko Wallet',
    //           isWalletConnected: true,
    //           password: '$2b$10$2EToEK2E09f5nulyk8YlEeCvJ6Z6EegdvVoVfkihUGuAptZM.VJa2',
    //           is2FAEnabled: true,
    //           is2FAVerified: true,
    //           role: 'user',
    //           status: 'active',
    //           verified: true,
    //           followers: [],
    //           following: [],
    //           posts: [],
    //           comments: [],
    //           likes: [],
    //           isEmailVerified: true,
    //           isPhoneVerified: false,
    //           isSocialLogin: false,
    //           isActive: true,
    //           isDeleted: false,
    //           createdAt: '2024-07-24T10:06:49.107Z',
    //           updatedAt: '2024-07-26T08:27:09.739Z',
    //           __v: 0,
    //           adminPassword:
    //             '$2b$10$SXnVdXM7QC/AbWhq9l4/We6kW5qhSC6QvfqYVju5.zBxs2hv4Ma1i',
    //           username: 'j3vq31',
    //           secret2FA: 'JJFUIPTXERNWMPBMHQYTGNTOIMTEKJSP'
    //         },
    //         collectionId: '66a1e6160a133887fa037ed1',
    //         collectionType: 'Launchpad',
    //         collectionName: 'monkeyaz8',
    //         tokenImage: '',
    //         tokenId: 't:VjGG8oUD4t_Z73IrS8dAKGeuxV_A-4T0IzYBaDNiP3Q',
    //         nftPrice: 0,
    //         unlockable: false,
    //         isRevealed: false,
    //         digitalCode: '',
    //         onMarketplace: false,
    //         onSale: false,
    //         bidInfo: [],
    //         onAuction: false,
    //         sellingType: 'All',
    //         creatorName: 'j3vq31',
    //         duration: '',
    //         properties: [],
    //         likes: 0,
    //         creator: 'j3vq31'
    //       }
    //     ],
    //     total: 1,
    //     currentPage: 1
    //   }
    // useEffect(() => {
    //     if (data) {
    //         setTotal(data.total);
    //     }
    // }
    // , [data]);

    return (
        <div className={clsx("rn-authore-profile-area", className)}>
            <TabContainer defaultActiveKey="nav-profile">
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
                            {/* {onSaleProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))} */}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-profile"
                        >
                            {/* {ownedProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))} */}

                            {data?.data?.nfts?.map((prod) => (
                                <div
                                    key={prod._id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    {console.log(
                                        "🚀 ~ file: index.jsx ~ line 38 ~ AuthorProfileArea ~ prod",
                                        prod
                                    )}
                                    <Nft
                                        overlay
                                        placeBid
                                        title={prod.collectionName}
                                        slug={prod.tokenId}
                                        latestBid={prod.nftPrice}
                                        price={prod.nftPrice}
                                        likeCount={prod.likes}
                                        auction_date={prod.createdAt}
                                        image={prod.tokenImage}
                                        authors={prod.creatorName}
                                        bitCount={prod.likes}
                                        data={prod}
                                    />
                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-contact"
                        >
                            {/* {createdProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))} */}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-liked"
                        >
                            {/* {likedProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))} */}
                        </TabPane>
                    </TabContent>
                </div>
            </TabContainer>
        </div>
    );
};

AuthorProfileArea.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        products: PropTypes.arrayOf(ProductType),
    }),
};
export default AuthorProfileArea;
