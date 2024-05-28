import SEO from "@components/seo";
import HeroArea from "@containers/hero/layout-06";
import Footer from "@layout/footer/footer-03";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import { normalizedData } from "@utils/methods";

// Demo data
import CollectionArea from "@containers/collection/layout-03";

import homepageData from "../data/homepages/home-06.json";

import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const content = normalizedData(homepageData?.content || []);
    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <HeroArea data={content["hero-section"]} />
                <CollectionArea data={{ collections: collectionsData }} />
            </main>
            <div style={{ marginTop: "100px" }} />
            <Footer />
        </Wrapper>
    );
};

export default Home;
