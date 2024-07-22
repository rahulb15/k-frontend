import PropTypes from "prop-types";
import React from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-03";
import ProductArea from "@containers/product/layout-03";
import CollectionDetailsArea from "@containers/collection-detail";
import CollectionDetailHeader from "@components/collection-detail-header";
import NftListArea from "@components/nft-list";
import productData from "../../../data/products.json";
import collectionService from "src/services/collection.service";

const CollectionDetails = ({ collection }) => {
    console.log("🚀 ~ CollectionDetails ~ collection", collection);

    // const collectionsData = [
    //     {
    //         id: 1,
    //         title: "Priority Pass",
    //         slug: "/priority-pass",
    //         total_item: 27,
    //         image: { src: "/assets-images/AI-nft/AI-1.jpeg" },
    //         thumbnails: [
    //             { src: "/assets-images/AI-nft/AI-7.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-2.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-3.jpeg" },
    //         ],
    //         profile_image: { src: "/images/client/client-15.png" },
    //     },
    //     {
    //         id: 2,
    //         title: "DB cooper",
    //         slug: "/db-cooper",
    //         total_item: 20,
    //         image: { src: "/assets-images/AI-nft/AI-4.jpeg" },
    //         thumbnails: [
    //             { src: "/assets-images/AI-nft/AI-7.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-2.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-3.jpeg" },
    //         ],
    //         profile_image: { src: "/images/client/client-12.png" },
    //     },
    //     {
    //         id: 3,
    //         title: "Monkey",
    //         slug: "/monkey",
    //         total_item: 20,
    //         image: { src: "/assets-images/AI-nft/AI-5.jpeg" },
    //         thumbnails: [
    //             { src: "/assets-images/AI-nft/AI-7.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-2.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-3.jpeg" },
    //         ],
    //         profile_image: { src: "/images/client/client-12.png" },
    //     },
    //     {
    //         id: 4,
    //         title: "Batman",
    //         slug: "/batman",
    //         total_item: 20,
    //         image: { src: "/assets-images/AI-nft/AI-6.jpeg" },
    //         thumbnails: [
    //             { src: "/assets-images/AI-nft/AI-7.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-2.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-3.jpeg" },
    //         ],
    //         profile_image: { src: "/images/client/client-12.png" },
    //     },
    //     {
    //         id: 5,
    //         title: "Shaktiman",
    //         slug: "/shaktiman",
    //         total_item: 20,
    //         image: { src: "/assets-images/AI-nft/shaktiman/AI-1.jpeg" },
    //         thumbnails: [
    //             { src: "/assets-images/AI-nft/AI-2.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-3.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-4.jpeg" },
    //         ],
    //         profile_image: { src: "/images/client/client-12.png" },
    //     },
    //     {
    //         id: 6,
    //         title: "Bharat Mata",
    //         slug: "/bharat-mata",
    //         total_item: 20,
    //         image: { src: "/assets-images/AI-nft/shaktiman/AI-4.jpeg" },
    //         thumbnails: [
    //             { src: "/assets-images/AI-nft/AI-2.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-3.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-4.jpeg" },
    //         ],
    //         profile_image: { src: "/images/client/client-12.png" },
    //     },
    //     {
    //         id: 7,
    //         title: "Papu Pompom",
    //         slug: "/papu-pompom",
    //         total_item: 20,
    //         image: { src: "/assets-images/AI-nft/shaktiman/AI-3.jpeg" },
    //         thumbnails: [
    //             { src: "/assets-images/AI-nft/AI-2.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-3.jpeg" },
    //             { src: "/assets-images/AI-nft/AI-4.jpeg" },
    //         ],
    //         profile_image: { src: "/images/client/client-12.png" },
    //     },
    // ];

    // console.log("🚀 ~ CollectionDetails ~ collectionsData", collectionsData.map((collectioninner) => {
    //     console.log("🚀 ~ CollectionDetails ~ collectioninner", collectioninner);
    //     console.log("🚀 ~ CollectionDetails ~ collection.collectionType", collection.collectionType);
    //     console.log("🚀 ~ CollectionDetails ~ collectioninner.slug.split(/)[1]", collectioninner.slug.split("/")[1]);

    //     if (collectioninner.slug.split("/")[1] === collection.collectionType) {
    //         console.log("🚀 ~ CollectionDetails ~ collectioninner.image.src", collectioninner.image.src);
    //         return collectioninner.image.src;
    //     }
    // }));


    // const product = {
    //     id: 6,
    //     title: collection.title,
    //     slug: collection.collectionType,
    //     published_at: "24-JUN-2021 08:05:00",
    //     latestBid: "6/30",
    //     price: { amount: 0.334, currency: "wETH" },
    //     likeCount: 205,
    //     categories: ["highest", "music"],
    //     image: {
    //         // src: collectionsData.map((collectioninner) => {
    //         //     if (collectioninner.slug.split("/")[1] === collection.collectionType) {
    //         //         return collectioninner.image.src;
    //         //     }
    //         // }),
    //         src: collectionsData.filter((collectioninner) => collectioninner.slug.split("/")[1] === collection.collectionType)[0].image.src,
    //     },
    //     auction_date: "2023-12-09",
    //     authors: [
    //         {
    //             name: "Mark Jordan",
    //             slug: "/author",
    //             image: { src: "/images/client/client-2.png" },
    //         },
    //         {
    //             name: "Liz Erd",
    //             slug: "/author",
    //             image: { src: "/images/client/client-3.png" },
    //         },
    //         {
    //             name: "John Doe",
    //             slug: "/author",
    //             image: { src: "/images/client/client-5.png" },
    //         },
    //     ],
    //     bitCount: 17,
    //     owner: {
    //         name: "Brodband",
    //         slug: "/author",
    //         image: { src: "/images/client/client-1.png" },
    //     },
    //     collection: {
    //         name: "MutantApeYachtClub",
    //         slug: "/collection",
    //         image: { src: "/images/client/client-2.png" },
    //         total_sale: "2500,000",
    //     },
    //     bids: Array(6)[
    //         ({
    //             id: 1,
    //             user: {
    //                 name: "Allen Waltker",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-3.png" },
    //             },
    //             amount: "0.234wETH",
    //             bidAt: "1 hours ago",
    //         },
    //         {
    //             id: 2,
    //             user: {
    //                 name: "Joe Biden",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-4.png" },
    //             },
    //             amount: "0.09wETH",
    //             bidAt: "1.30 hours ago",
    //         },
    //         {
    //             id: 3,
    //             user: {
    //                 name: "Sonial Mridha",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-5.png" },
    //             },
    //             amount: "0.07wETH",
    //             bidAt: "1.35 hours ago",
    //         },
    //         {
    //             id: 4,
    //             user: {
    //                 name: "Tribute Dhusra",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-6.png" },
    //             },
    //             amount: "0.07wETH",
    //             bidAt: "1.55 hours ago",
    //         },
    //         {
    //             id: 5,
    //             user: {
    //                 name: "Sonia Sobnom",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-7.png" },
    //             },
    //             amount: "0.07wETH",
    //             bidAt: "2 hours ago",
    //         },
    //         {
    //             id: 6,
    //             user: {
    //                 name: "Sadia Rummon",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-8.png" },
    //             },
    //             amount: "0.07wETH",
    //             bidAt: "2.5 hours ago",
    //         })
    //     ],
    //     properties:
    //         Array(8)[
    //             ({ id: 1, type: "HYPE TYPE", value: "CALM AF (STILL)" },
    //             { id: 2, type: "BASTARDNESS", value: "C00LIO BASTARD" },
    //             { id: 3, type: "TYPE", value: "APE" },
    //             { id: 4, type: "ASTARDNESS", value: "BASTARD" },
    //             { id: 5, type: "BAD HABIT(S)", value: "PIPE" },
    //             { id: 6, type: "BID", value: "BPEYti" },
    //             { id: 7, type: "ASTRAGENAKAR", value: "BASTARD" },
    //             { id: 8, type: "CITY", value: "TOKYO" })
    //         ],
    //     tags: Array(6)[
    //         ({ id: 1, type: "ZARY", value: "APP" },
    //         { id: 2, type: "SOMALIAN", value: "TRIBUTE" },
    //         { id: 3, type: "TUNA", value: "PIPE" },
    //         { id: 4, type: "BID", value: "BPEYti" },
    //         { id: 5, type: "ASTRAGENAKAR", value: "BASTARD" },
    //         { id: 8, type: "CITY", value: "TOKYO" })
    //     ],
    //     history: [
    //         {
    //             id: 1,
    //             user: {
    //                 name: "Allen Waltker",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-3.png" },
    //             },
    //             amount: "0.234wETH",
    //             bidAt: "1 hours ago",
    //         },
    //         {
    //             id: 2,
    //             user: {
    //                 name: "Joe Biden",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-4.png" },
    //             },
    //             amount: "0.09wETH",
    //             bidAt: "1.30 hours ago",
    //         },
    //         {
    //             id: 3,
    //             user: {
    //                 name: "Sonial Mridha",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-5.png" },
    //             },
    //             amount: "0.07wETH",
    //             bidAt: "1.35 hours ago",
    //         },
    //         {
    //             id: 4,
    //             user: {
    //                 name: "Tribute Dhusra",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-6.png" },
    //             },
    //             amount: "0.07wETH",
    //             bidAt: "1.55 hours ago",
    //         },
    //         {
    //             id: 5,
    //             user: {
    //                 name: "Sonia Sobnom",
    //                 slug: "/author",
    //                 image: { src: "/images/client/client-7.png" },
    //             },
    //             amount: "0.07wETH",
    //             bidAt: "2 hours ago",
    //         },
    //     ],
    //     highest_bid: {
    //         amount: "0.234wETH",
    //         bidder: {
    //             name: "Brodband",
    //             slug: "/author",
    //             image: { src: "/images/client/client-1.png" },
    //         },
    //     },
    //     sale_type: "not-for-sale",
    //     level: "Beginner",
    //     language: "Russian",
    //     rating: 3,
    // };

    return (
        <Wrapper>
            <SEO pageTitle="Launchpad Details" />
            <Header />
            <main id="main-content" style={{ marginBottom: "100px" }}>
                {/* <div className="rn-blog-area rn-blog-details-default rn-section-gapTop">
                    <div className="container">
                        <h1>{collection.title}</h1>
                        <p>Blockchain: {collection.blockchain}</p>
                        <p>Pass Type: {collection.collectionType}</p>
                        
                    </div>
                </div> */}
                <CollectionDetailHeader
                    pageTitle={collection?.title}
                    data={collection?.data?.data}
                />
                <CollectionDetailsArea product={collection?.data?.data} />
                <NftListArea
            data={{
                section_title: {
                    title: "Explore Product",
                },
                products: productData,
            }}
            collection = {collection?.data?.data}
        />
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getStaticPaths() {
    // In a real-world scenario, you'd probably fetch this data from an API or database
    const paths = [
        { params: { blockchain: "kadena", collectionType: "priority-pass" } },
        { params: { blockchain: "solana", collectionType: "early-access" } },
        // Add more paths as needed
    ];

    return {
        paths,
        fallback: "blocking", // or false if you only want to pre-render at build time
    };
}

export async function getStaticProps({ params }) {
    const { blockchain, collectionType } = params;
    console.log("🚀 ~ getStaticProps ~ blockchain:", blockchain);
    console.log("🚀 ~ getStaticProps ~ collectionType:", collectionType);

    // Simulate fetching data
    // In a real application, replace this with an actual API call
    const collection = await fetchCollectionData(blockchain, collectionType);

    // Check if data is not found
    if (!collection || !collection.data || Object.keys(collection.data).length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            collection,
            className: "template-color-1",
        },
        revalidate: 60, // Optional: enable ISR, revalidate every 60 seconds
    };
}

// Simulated data fetching function
async function fetchCollectionData(blockchain, collectionType) {
    // Simulate an API call
    // await new Promise((resolve) => setTimeout(resolve, 100));

    // getCollectionByName
    const response = await collectionService.getCollectionByName(collectionType);
    console.log("🚀 ~ fetchCollectionData ~ response", response?.data);

    return {
        title: `${collectionType.replace("-", " ")}`,
        blockchain,
        collectionType,
        data: response?.data || {},
    };
}

CollectionDetails.propTypes = {
    collection: PropTypes.shape({
        title: PropTypes.string.isRequired,
        blockchain: PropTypes.string.isRequired,
        collectionType: PropTypes.string.isRequired,
        data: PropTypes.shape({ collections: PropTypes.array }).isRequired,


    }).isRequired,
};

export default CollectionDetails;
