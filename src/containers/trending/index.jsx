/* eslint-disable */
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";
import { IDType, ImageType } from "@utils/types";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";

const POSTS_PER_PAGE = 31;

const TabContent = dynamic(() => import("react-bootstrap/TabContent"), {
    ssr: false,
});
const TabContainer = dynamic(() => import("react-bootstrap/TabContainer"), {
    ssr: false,
});
const TabPane = dynamic(() => import("react-bootstrap/TabPane"), {
    ssr: false,
});

const TrendingArea = ({ className, space, data }) => {
    const [ranking, setRanking] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [current, setCurrent] = useState("1 day");
    // const [sellers, setSellers] = useState([]);
    // const changeHandler = (item) => {
    //     setCurrent(item.value);
    // };
    // const numberOfPages = Math.ceil(data.ranking.length / POSTS_PER_PAGE);
    // const paginationHandler = (page) => {
    //     setCurrentPage(page);
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // };

    const rankingHandler = useCallback(() => {
        const start = 0 * POSTS_PER_PAGE;
        setRanking(data.ranking.slice(start, start + POSTS_PER_PAGE));
    }, [data.ranking]);

    useEffect(() => {
        rankingHandler();
    }, [rankingHandler]);

    return (
        <div
            className={clsx(
                "rn-upcoming-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
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

                                    <div
                                        className="shortby-default text-start text-sm-end"
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <NiceSelect
                                            options={[
                                                {
                                                    value: "1 day",
                                                    text: "1 day",
                                                },
                                                {
                                                    value: "7 Day's",
                                                    text: "7 Day's",
                                                },
                                                {
                                                    value: "15 Day's",
                                                    text: "15 Day's",
                                                },
                                                {
                                                    value: "30 Day's",
                                                    text: "30 Day's",
                                                },
                                            ]}
                                            defaultCurrent={0}
                                            name="sellerSort"
                                            // onChange={changeHandler}
                                        />
                                    </div>
                                    <div className="shortby-default text-start text-sm-end ml--30">
                                        <Button
                                            color="primary-alta"
                                            size="medium"
                                            className="mr--30 bid-btn"
                                        >
                                            View All
                                        </Button>
                                    </div>
                                </div>
                            </Nav>
                            <TabContent>
                                <TabPane
                                    eventKey="nav-home"
                                    className="lg-product_tab-pane lg-product-col-2"
                                >
                                    <div className="lg-product-wrapper colum-2 two-colum-parent-product col-lg-6">
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
                                                        <span>Floor Price</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="ranking">
                                                {ranking
                                                    ?.slice(0, 7)
                                                    .map((item, index) => (
                                                        <tr
                                                            key={item.id}
                                                            className={
                                                                index % 2 === 0
                                                                    ? "color-light"
                                                                    : ""
                                                            }
                                                        >
                                                            <td>
                                                                <span>
                                                                    {index + 1}.
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="product-wrapper d-flex align-items-center">
                                                                    {item
                                                                        ?.product
                                                                        ?.image
                                                                        ?.src && (
                                                                        <Anchor
                                                                            path={
                                                                                item
                                                                                    .product
                                                                                    .slug
                                                                            }
                                                                            className="thumbnail"
                                                                        >
                                                                            <Image
                                                                                src={
                                                                                    item
                                                                                        .product
                                                                                        .image
                                                                                        .src
                                                                                }
                                                                                alt="Nft_Profile"
                                                                                width={
                                                                                    56
                                                                                }
                                                                                height={
                                                                                    56
                                                                                }
                                                                            />
                                                                        </Anchor>
                                                                    )}

                                                                    <span>
                                                                        {
                                                                            item
                                                                                .product
                                                                                .title
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    {
                                                                        item.volume
                                                                    }
                                                                </span>
                                                            </td>

                                                            <td>
                                                                <span>
                                                                    {
                                                                        item.floor_price
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="lg-product-wrapper colum-2 two-colum-parent-product col-lg-6">
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
                                                        <span>Floor Price</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="ranking">
                                                {ranking
                                                    ?.slice(7, 14)
                                                    .map((item, index) => (
                                                        <tr
                                                            key={item.id}
                                                            className={
                                                                index % 2 === 0
                                                                    ? "color-light"
                                                                    : ""
                                                            }
                                                        >
                                                            <td>
                                                                <span>
                                                                    {index + 1}.
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="product-wrapper d-flex align-items-center">
                                                                    {item
                                                                        ?.product
                                                                        ?.image
                                                                        ?.src && (
                                                                        <Anchor
                                                                            path={
                                                                                item
                                                                                    .product
                                                                                    .slug
                                                                            }
                                                                            className="thumbnail"
                                                                        >
                                                                            <Image
                                                                                src={
                                                                                    item
                                                                                        .product
                                                                                        .image
                                                                                        .src
                                                                                }
                                                                                alt="Nft_Profile"
                                                                                width={
                                                                                    56
                                                                                }
                                                                                height={
                                                                                    56
                                                                                }
                                                                            />
                                                                        </Anchor>
                                                                    )}

                                                                    <span>
                                                                        {
                                                                            item
                                                                                .product
                                                                                .title
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    {
                                                                        item.volume
                                                                    }
                                                                </span>
                                                            </td>

                                                            <td>
                                                                <span>
                                                                    {
                                                                        item.floor_price
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>
                                <TabPane
                                    eventKey="nav-profile"
                                    className="lg-product_tab-pane lg-product-col-2"
                                ></TabPane>
                            </TabContent>
                        </TabContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

TrendingArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        ranking: PropTypes.arrayOf(
            PropTypes.shape({
                id: IDType,
                product: PropTypes.shape({
                    title: PropTypes.string,
                    slug: PropTypes.string,
                    image: ImageType,
                }),
                volume: PropTypes.string,
                "24h%": PropTypes.shape({
                    charge: PropTypes.string,
                    status: PropTypes.oneOf(["-", "+"]),
                }),
                "7d%": PropTypes.shape({
                    charge: PropTypes.string,
                    status: PropTypes.oneOf(["-", "+"]),
                }),
                floor_price: PropTypes.string,
                owners: PropTypes.string,
                items: PropTypes.string,
            })
        ),
    }),
};
TrendingArea.defaultProps = {
    space: 1,
};

export default TrendingArea;
