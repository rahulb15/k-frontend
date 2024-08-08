import CollectionDetailHeader from "@components/collection-detail-header";
import SEO from "@components/seo";
import Footer from "@layout/footer/footer-03";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import PropTypes from "prop-types";
import React, { useState } from "react";
import collectionService from "src/services/collection.service";
import dynamic from "next/dynamic";
import Script from "next/script";
import Head from "next/head";
import NftListArea from "@components/nft-list";
import productData from "../../../data/products.json";
console.log(productData)


const defaultWidgetProps = {
  symbol: "AAPL",
  interval: "1D",
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
};

const TVChartContainer = dynamic(
  () => import("@components/TVChartContainer").then((mod) => mod.TVChartContainer),
  { ssr: false }
);

const CollectionDetails = ({ collection }) => {
    const [isScriptReady, setIsScriptReady] = useState(false);
    console.log(isScriptReady);

    return (
        <Wrapper>
            <Head>
                <title>{collection?.title} - Launchpad Details</title>
            </Head>
            <SEO pageTitle="Launchpad Details" />
            <Header />
            <main id="main-content" style={{ marginBottom: "100px" }}>
                <CollectionDetailHeader
                    pageTitle={collection?.title}
                    data={collection?.data?.data}
                />
                <Script
                    src="/static/datafeeds/udf/dist/bundle.js"
                    strategy="lazyOnload"
                    onReady={() => {
                        setIsScriptReady(true);
                    }}
                />
                {isScriptReady && <TVChartContainer {...defaultWidgetProps} />}
                <NftListArea
            data={{
                section_title: {
                    title: "Explore Product",
                },
                products: productData,
            }}
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
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }) {
    const { blockchain, collectionType } = params;
    const collection = await fetchCollectionData(blockchain, collectionType);

    return {
        props: {
            collection,
            className: "template-color-1",
        },
        revalidate: 60,
    };
}

async function fetchCollectionData(blockchain, collectionType) {
    const response = await collectionService.getLaunchCollectionByName(
        collectionType
    );

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