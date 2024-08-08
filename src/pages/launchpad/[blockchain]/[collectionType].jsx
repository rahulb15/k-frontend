/* eslint-disable */

import LaunchpadCollectionDetailHeader from "@components/launchpad-collection-detail-header";
import NftListArea from "@components/nft-list";
import SEO from "@components/seo";
import CollectionDetailsArea from "@containers/collection-detail";
import PriorityPassDetailsArea from "@containers/prioritypass-detail";
import Footer from "@layout/footer/footer-03";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import PropTypes from "prop-types";
import React from "react";
import collectionService from "src/services/collection.service";
import productData from "../../../data/products.json";

const CollectionDetails = ({ collection }) => {
    console.log("🚀 ~ CollectionDetails ~ collection", collection);
    return (
        <Wrapper>
            <SEO pageTitle="Launchpad Details" />
            <Header />
            <main id="main-content" style={{ marginBottom: "100px" }}>
                <LaunchpadCollectionDetailHeader
                    pageTitle={collection?.title}
                    data={collection?.data?.data}
                />
                {/* <CollectionDetailsArea product={collection?.data?.data} /> */}
                {collection?.title === "Priority Pass" ? (
                    <PriorityPassDetailsArea product={collection?.data?.data} />
                ) : (
                    <CollectionDetailsArea product={collection?.data?.data} />
                )}

                <NftListArea
                    data={{
                        section_title: {
                            title: "Explore Product",
                        },
                        products: productData,
                    }}
                    collection={collection?.data?.data}
                />
            </main>
            <Footer />
        </Wrapper>
    );
};

export async function getStaticPaths() {
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
    if (
        !collection ||
        !collection.data ||
        Object.keys(collection.data).length === 0
    ) {
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
    const response = await collectionService.getLaunchCollectionByName(
        collectionType
    );
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
