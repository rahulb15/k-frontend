/* eslint-disable */
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Collection from "@components/collection";
import Pagination from "@components/pagination-02";
import { CollectionType } from "@utils/types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const POSTS_PER_PAGE = 8;

const CollectionArea = ({ className, space, id, data }) => {
    console.log(data);
    const [currentPage, setCurrentPage] = useState(1);
    const numberOfPages = Math.ceil(data.collections.length / POSTS_PER_PAGE);
    const paginationHandler = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const [value, setValue] = useState("one");

    // const creatorHandler = useCallback(() => {
    //     const start = (currentPage - 1) * POSTS_PER_PAGE;
    //     setCollections(data.collections.slice(start, start + POSTS_PER_PAGE));
    // }, [currentPage, data.collections]);

    // useEffect(() => {
    //     creatorHandler();
    // }, [currentPage, creatorHandler]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div
            className={clsx(
                "rn-collection-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
            id={id}
        >
            <div className="container">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#ffd700",
                        },
                    }}
                    sx={{
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
                        value="one"
                        sx={{
                            fontSize: "16px",
                            color: "#757575", // color for unselected tabs
                            "&.Mui-selected": {
                                color: "#ffd700",
                                fontWeight: "bold",
                            },
                        }}
                    />
                    <Tab
                        label="Upcoming"
                        value="two"
                        sx={{
                            fontSize: "16px",
                            color: "#757575", // color for unselected tabs
                            "&.Mui-selected": {
                                color: "#ffd700",
                                fontWeight: "bold",
                            },
                        }}
                    />
                    <Tab
                        label="Past"
                        value="three"
                        sx={{
                            fontSize: "16px",
                            color: "#757575", // color for unselected tabs
                            "&.Mui-selected": {
                                color: "#ffd700",
                                fontWeight: "bold",
                            },
                        }}
                    />
                </Tabs>

                <div
                    className="horizontal-line"
                    style={{ marginBottom: "30px" }}
                ></div>

                <div className="tab-content">
                    {value === "one" && (
                        <div className="row g-5">
                            {data?.collections?.map((collection) => (
                                <div
                                    key={collection._id}
                                    className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                                >
                                    {console.log(collection)}

                                    <Collection
                                        title={collection.collectionName}
                                        total_item={collection.totalSupply}
                                        path={collection.collectionName}
                                        image={collection.collectionCoverImage}
                                        thumbnails={collection.collectionBannerImage}
                                        price={collection.mintPrice}
                                        reservePrice = {collection.reservePrice}
                                        mintStartDate = {collection.mintStartDate}
                                        mintEndDate = {collection.mintEndDate}
                                        data={collection}
                                        // profile_image={collection.profile_image}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {value === "two" && (
                        <div className="row g-5">
                            {data?.collections?.map((collection) => (
                                <div
                                    key={collection.id}
                                    className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                                >
                                    <Collection
                                        title={collection.title}
                                        total_item={collection.total_item}
                                        path={collection.slug}
                                        image={collection.image}
                                        thumbnails={collection.thumbnails}
                                        profile_image={collection.profile_image}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {value === "three" && (
                        <div className="row g-5">
                            {data?.collections?.map((collection) => (
                                <div
                                    key={collection.id}
                                    className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                                >
                                    <Collection
                                        title={collection.title}
                                        total_item={collection.total_item}
                                        path={collection.slug}
                                        image={collection.image}
                                        thumbnails={collection.thumbnails}
                                        profile_image={collection.profile_image}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="row">
                    <div
                        className="col-lg-12"
                        data-sal="slide-up"
                        data-sal-delay="950"
                        data-sal-duration="800"
                    >
                        <Pagination
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            onClick={paginationHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

CollectionArea.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        collections: PropTypes.arrayOf(CollectionType),
    }),
};
CollectionArea.defaultProps = {
    space: 1,
};

export default CollectionArea;
