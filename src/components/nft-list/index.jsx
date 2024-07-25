/* eslint-disable */

import { useReducer, useRef, useEffect, useCallback, useState } from "react";

import PropTypes from "prop-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import SectionTitle from "@components/section-title/layout-02";
import Product from "@components/product/layout-01";
import FilterButtons from "@components/filter-buttons";
import { flatDeep } from "@utils/methods";
import { SectionTitleType, ProductType } from "@utils/types";
import FilterButton from "@ui/filter-button";
import ProductFilter from "@components/product-filter/layout-01";
import { slideToggle } from "@utils/methods";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function reducer(state, action) {
    switch (action.type) {
        case "FILTER_TOGGLE":
            return { ...state, filterToggle: !state.filterToggle };
        case "SET_INPUTS":
            return { ...state, inputs: { ...state.inputs, ...action.payload } };
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        default:
            return state;
    }
}
const NftListArea = ({ className, space, data, collection }) => {
    console.log(collection);
    const [value, setValue] = useState(0);
  

    console.log(data);
    const filters = [
        ...new Set(
            flatDeep(data?.products.map((item) => item.categories) || [])
        ),
    ];

    console.log(filters);

    //new filters with only these 3 categories All Music Art
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(data?.products);
    }, [data?.products]);

    useEffect(() => {
        switch (value) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const filterHandler2 = (filterKey) => {
        const prods = data?.products ? [...data.products] : [];
        if (filterKey === "all") {
            setProducts(data?.products);
            return;
        }
        const filterProds = prods.filter((prod) =>
            prod.categories.includes(filterKey)
        );
        setProducts(filterProds);
    };

    const itemsToFilter = [...data.products];
    const [state, dispatch] = useReducer(reducer, {
        filterToggle: false,
        products: data.products || [],
        inputs: { price: [0, 100] },
    });
    const filterRef = useRef(null);
    const filterHandler = () => {
        dispatch({ type: "FILTER_TOGGLE" });
        if (!filterRef.current) return;
        slideToggle(filterRef.current);
    };

    const slectHandler = ({ value }, name) => {
        dispatch({ type: "SET_INPUTS", payload: { [name]: value } });
    };

    const priceHandler = (value) => {
        dispatch({ type: "SET_INPUTS", payload: { price: value } });
    };

    const sortHandler = ({ value }) => {
        const sortedProducts = state.products.sort((a, b) => {
            if (value === "most-liked") {
                return a.likeCount < b.likeCount ? 1 : -1;
            }
            return a.likeCount > b.likeCount ? 1 : -1;
        });
        dispatch({ type: "SET_PRODUCTS", payload: sortedProducts });
    };

    const filterMethods = (item, filterKey, value) => {
        if (value === "all") return false;
        let itemKey = filterKey;
        if (filterKey === "category") {
            itemKey = "categories";
        }
        if (filterKey === "price") {
            return (
                item[itemKey].amount <= value[0] / 100 ||
                item[itemKey].amount >= value[1] / 100
            );
        }
        if (Array.isArray(item[itemKey])) {
            return !item[itemKey].includes(value);
        }
        if (filterKey === "collection") {
            return item[itemKey].name !== value;
        }
        return item[itemKey] !== value;
    };

    const itemFilterHandler = useCallback(() => {
        let filteredItems = [];

        filteredItems = itemsToFilter.filter((item) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in state.inputs) {
                if (filterMethods(item, key, state.inputs[key])) return false;
            }
            return true;
        });
        dispatch({ type: "SET_PRODUCTS", payload: filteredItems });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.inputs]);

    useEffect(() => {
        itemFilterHandler();
    }, [itemFilterHandler]);

    const overview = `<p>The NFT collection is a collection of unique digital art pieces that are created by the kryptomerch team. Each NFT is unique and has its own story. The collection is a limited edition and only a few pieces are available. The NFTs are created using the latest technology and are stored on the blockchain. Each NFT comes with a certificate of authenticity and is signed by the artist. The NFT collection is a great way to own a piece of digital art that is unique and valuable.</p>`;

    return (
        <div
            className={clsx(
                "rn-product-area masonary-wrapper-activation",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="col-lg-12">
                    {/* <div className="row">
                    <div className="col-12 mb--50">
                    <h3
        className={clsx("title", className)}
        data-sal-delay="150"
        data-sal={"slide-up"}
        data-sal-duration="800"
        dangerouslySetInnerHTML={{ __html: "NFT" }}
    />
                    </div>
                </div> */}

                    <Box sx={{ width: "100%", marginBottom: "30px" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            sx={{
                                "& .MuiTab-root": {
                                    color: "#888",
                                    fontSize: "small",
                                    "&.Mui-selected": {
                                        color: "#a9b729c9",
                                        fontSize: "large",
                                    },
                                },
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "#a9b729c9",
                                },
                            }}
                        >
                            <Tab label="Overview" {...a11yProps(0)} />
                            <Tab label="Nft's" {...a11yProps(1)} />
                            {/* <Tab label="Team" {...a11yProps(2)} /> */}
                            {/* <Tab label="Kryptomerch" {...a11yProps(3)} /> */}
                        </Tabs>
                    </Box>
                    {/* horizontal line */}
                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: "#a9b729c9",
                            marginBottom: "30px",
                        }}
                    ></div>

                    {value === 0 && (
                        //overview page with description of collection
                        <motion.div
                            layout
                            className="isotope-list item-5"
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <div className={clsx("grid-item")}>
                                <h3
                                    style={{
                                        color: "#a9b729c9",
                                        fontSize: "x-large",
                                    }}
                                >
                                    Overview
                                </h3>
                                {/* <p>
                                        The NFT collection is a collection of
                                        unique digital art pieces that are
                                        created by the Kryptomind team. Each NFT
                                        is unique and has its own story. The
                                        collection is a limited edition and only
                                        a few pieces are available. The NFTs are
                                        created using the latest technology and
                                        are stored on the blockchain. Each NFT
                                        comes with a certificate of authenticity
                                        and is signed by the artist. The NFT
                                        collection is a great way to own a piece
                                        of digital art that is unique and
                                        valuable.
                                    </p> */}

                                <p
                                    style={{
                                        fontSize: "large",
                                        textAlign: "justify",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: collection?.projectDescription || "",
                                    }}
                                ></p>
                            </div>
                        </motion.div>
                    )}

                    {value === 1 && (
                        <motion.div layout className="isotope-list item-5">
                            {products?.slice(0, 10)?.map((prod) => (
                                <motion.div
                                    key={prod.id}
                                    className={clsx("grid-item")}
                                    layout
                                >
                                    <Product
                                        placeBid={!!data.placeBid}
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

NftListArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType),
        placeBid: PropTypes.bool,
    }),
};

NftListArea.defaultProps = {
    space: 1,
};

export default NftListArea;
