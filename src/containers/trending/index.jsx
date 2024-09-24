import React, { useState, useEffect, useCallback } from "react";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import collectionService from "src/services/collection.service";
import { debounce } from 'lodash';
import SectionTitle from "@components/section-title/layout-02";

const TrendingArea = ({ className, space }) => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    console.log(itemsPerPage, "itemsPerPage");
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");
    const [timeRange, setTimeRange] = useState("1 day");

    const getCollections = useCallback(async () => {
        setLoading(true);
        try {
            const response = await collectionService.getAllMarketplaceCollections(
                currentPage,
                itemsPerPage,
                search
            );
            setCollections(response.data.data.collections);
            setTotalItems(response?.data?.pagination?.totalItems);
            setTotalPages(response.data.pagination.totalPages);
        } catch (error) {
            console.error("Error fetching collections:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage, search]);

    useEffect(() => {
        getCollections();
    }, [getCollections]);


    const debouncedSearch = useCallback(
        debounce((value) => {
          setSearch(value);
          setCurrentPage(1);
          getCollections();
        }, 300),
        [getCollections]
      );
      
      const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
      };

    const handleTimeRangeChange = (value) => {
        setTimeRange(value);
        setCurrentPage(1);
    };

    // const handleSearchChange = (e) => {
    //     setSearch(e.target.value);
    //     setCurrentPage(1);
    // };

    const handleItemsPerPageChange = (value) => {
        console.log(value, "value");
        setItemsPerPage(parseInt(value.value, 10));
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPageOptions = [
        { value: "10", text: "10" },
        { value: "25", text: "25" },
        { value: "50", text: "50" },
        { value: "100", text: "100" },
    ];

    if (totalItems > 100) {
        itemsPerPageOptions.push({
            value: totalItems?.toString(),
            text: "Show All",
        });
    }


    return (
        <div
            className={`rn-upcoming-area mt-5
         ${space === 1 ? "rn-section-gapTop" : ""} ${className || ""}`}
        >
            
            <div className="container">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb--50 mt--50">
                        
                        <SectionTitle
                            title="Trending Collections"
                            className="mb--0"
                            disableAnimation
                        />
                    
                </div>
           
                <div className="row">
                    <div className="col-12">
                        <TabContainer defaultActiveKey="nav-home">
                            <Nav className="product-tab-nav">
                                <div className="nav">
                                    <Nav.Link as="button" eventKey="nav-home">
                                        Trending
                                    </Nav.Link>
                                    <Nav.Link
                                        as="button"
                                        eventKey="nav-profile"
                                    >
                                        Top
                                    </Nav.Link>
                                    <div className="shortby-default text-start text-sm-end">
                                        <NiceSelect
                                            options={[
                                                {
                                                    value: "1 day",
                                                    text: "1 day",
                                                },
                                                {
                                                    value: "7 days",
                                                    text: "7 days",
                                                },
                                                {
                                                    value: "30 days",
                                                    text: "30 days",
                                                },
                                                {
                                                    value: "All time",
                                                    text: "All time",
                                                },
                                            ]}
                                            defaultCurrent={0}
                                            name="timeRange"
                                            onChange={handleTimeRangeChange}
                                        />
                                    </div>
                                    <div className="search-box">
                                        <input
                                            type="text"
                                            placeholder="Search collections"
                                            value={search}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                    <div className="items-per-page">
                                        <NiceSelect
                                            options={itemsPerPageOptions}
                                            defaultCurrent={0}
                                            name="itemsPerPage"
                                            onChange={handleItemsPerPageChange}
                                        />
                                    </div>
                                </div>
                            </Nav>
                            <TabContent>
                                <TabPane
                                    eventKey="nav-home"
                                    className="lg-product_tab-pane"
                                >
                                    <div className="lg-product-wrapper">
                                        <table className="table upcoming-projects">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <span>Rank</span>
                                                    </th>
                                                    <th>
                                                        <span>Collection</span>
                                                    </th>
                                                    <th>
                                                        <span>Volume</span>
                                                    </th>
                                                    <th>
                                                        <span>24h %</span>
                                                    </th>
                                                    <th>
                                                        <span>7d %</span>
                                                    </th>
                                                    <th>
                                                        <span>Floor Price</span>
                                                    </th>
                                                    <th>
                                                        <span>Owners</span>
                                                    </th>
                                                    <th>
                                                        <span>Items</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="ranking">
                                                {collections.map(
                                                    (item, index) => (
                                                        <tr
                                                            key={item._id}
                                                            className={
                                                                index % 2 === 0
                                                                    ? "color-light"
                                                                    : ""
                                                            }
                                                        >
                                                            <td>
                                                                <span>
                                                                    {(currentPage -
                                                                        1) *
                                                                        itemsPerPage +
                                                                        index +
                                                                        1}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="product-wrapper d-flex align-items-center">
                                                                    <Anchor
                                                                        path={`/collections/kadena/${item.collectionName}`}
                                                                        className="thumbnail"
                                                                    >
                                                                        <Image
                                                                            src={
                                                                                item
                                                                                    .firstTokenData
                                                                                    ?.thumbnail ||
                                                                                "/assets-images/collections/noimagefound.webp"
                                                                            }
                                                                            alt={
                                                                                item.collectionName
                                                                            }
                                                                            width={
                                                                                56
                                                                            }
                                                                            height={
                                                                                56
                                                                            }
                                                                        />
                                                                    </Anchor>
                                                                    <span>
                                                                        {
                                                                            item.collectionName
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    {item.totalSupply *
                                                                        (item.reservePrice ||
                                                                            0)}{" "}
                                                                    KDA
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span>+0%</span>
                                                            </td>
                                                            <td>
                                                                <span>+0%</span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    {item.reservePrice ||
                                                                        0}{" "}
                                                                    KDA
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    {item.tokens
                                                                        ?.length ||
                                                                        0}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    {
                                                                        item.totalSupply
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>
                                <TabPane
                                    eventKey="nav-profile"
                                    className="lg-product_tab-pane"
                                >
                                    {/* You can add content for the "Top" tab here */}
                                </TabPane>
                            </TabContent>
                        </TabContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingArea;
