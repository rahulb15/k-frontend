import React, { useEffect, useState } from "react";
import LaunchpadChainHeader from "@components/launchpad-chain-header";
import SEO from "@components/seo";
import LaunchpadHeroArea from "@containers/launchpad-hero";
import Footer from "@layout/footer/footer-main";
import Header from "@layout/header/header-01";
import Wrapper from "@layout/wrapper";
import CollectionArea from "@containers/collection/layout-03";
import LaunchpadCategory from "@containers/launchpad-category";
import collectionService from "src/services/collection.service";
import HeroAreaSkeleton from "@components/skeletons/HeroAreaSkeleton";
import CollectionAreaSkeleton from "@components/skeletons/CollectionAreaSkeleton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NoData from "./NoDataLaunchpad";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [search, setSearch] = useState("");
    const [collectionsData, setCollectionsData] = useState([]);
    const [heroCollections, setHeroCollections] = useState([]);
    const [isLoadingCollection, setIsLoadingCollection] = useState(true);
    const [isLoadingHero, setIsLoadingHero] = useState(true);
    const [activeTab, setActiveTab] = useState("live");

    useEffect(() => {
        setIsLoadingHero(true);
        collectionService.getPrioritizedCollections(5)
            .then((response) => {
                setHeroCollections(response?.data?.data || []);
                setIsLoadingHero(false);
            })
            .catch((error) => {
                console.error("Error fetching hero collections:", error);
                setIsLoadingHero(false);
            });
    }, []);

    const fetchCollections = () => {
        switch (activeTab) {
            case "live":
                return collectionService.getLiveCollections(page, limit, search);
            case "upcoming":
                return collectionService.getUpcomingCollections(page, limit, search);
            case "past":
                return collectionService.getEndedCollections(page, limit, search);
            default:
                return collectionService.getLiveCollections(page, limit, search);
        }
    };

    useEffect(() => {
        setIsLoadingCollection(true);
        fetchCollections()
            .then((response) => {
                setCollectionsData(response?.data?.data[0]?.data || []);
                setIsLoadingCollection(false);
            })
            .catch((error) => {
                console.error("Error fetching collections:", error);
                setIsLoadingCollection(false);
                setCollectionsData([]); // Ensure empty array on error
            });
    }, [page, limit, search, activeTab]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setPage(1);
    };

    const getNoDataMessage = () => {
        switch (activeTab) {
            case "live":
                return "There are no live collections at the moment.";
            case "upcoming":
                return "There are no upcoming collections at this time.";
            case "past":
                return "There are no past collections to display.";
            default:
                return "No collections available.";
        }
    };

    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <LaunchpadChainHeader />
                {isLoadingHero ? <HeroAreaSkeleton /> : <LaunchpadHeroArea data={heroCollections} />}
                
                <div className="container" style={{ marginTop: "50px" }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="collection tabs"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#ffd700",
                            },
                        }}
                        sx={{
                            marginBottom: "30px",
                            "& .MuiTabs-scroller": {
                                display: "flex",
                                justifyContent: "start",
                            },
                            "& .MuiTabs-flexContainer": {
                                borderBottom: "none",
                            },
                            "& .MuiTabs-indicator": {
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        <Tab
                            label="Live"
                            value="live"
                            sx={{
                                fontSize: "16px",
                                color: "#757575",
                                "&.Mui-selected": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                        <Tab
                            label="Upcoming"
                            value="upcoming"
                            sx={{
                                fontSize: "16px",
                                color: "#757575",
                                "&.Mui-selected": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                        <Tab
                            label="Past"
                            value="past"
                            sx={{
                                fontSize: "16px",
                                color: "#757575",
                                "&.Mui-selected": {
                                    color: "#ffd700",
                                    fontWeight: "bold",
                                },
                            }}
                        />
                    </Tabs>
                    
                    <div className="horizontal-line" style={{ marginBottom: "30px" }}></div>
                    
                    {isLoadingCollection ? (
                        <CollectionAreaSkeleton />
                    ) : collectionsData.length > 0 ? (
                        <CollectionArea
                            data={{ collections: collectionsData }}
                            activeTab={activeTab}
                        />
                    ) : (
                        <NoData message={getNoDataMessage()} />
                    )}
                </div>
                
                <LaunchpadCategory
                    data={{
                        section_title: {
                            title: "Browse By Category",
                            description: "Discover the latest collections from top creators.",
                        },
                    }}
                />
            </main>
            <div style={{ marginTop: "100px" }} />
            <Footer />
        </Wrapper>
    );
};

export default Home;