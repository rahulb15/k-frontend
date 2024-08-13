import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import SectionTitle from "@components/section-title/layout-02";
import Product from "@components/product/layout-01";
import FilterButtons from "@components/filter-buttons";
import nftServices from "src/services/nftServices";

const ExploreProductArea = ({ className, space, data }) => {
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(1);
    const [nfts, setNfts] = useState([]);
    console.log("nfts", nfts);
    const [totalNfts, setTotalNfts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [search, setSearch] = useState("");

    const fetchNfts = useCallback(async () => {
        if (loading || allLoaded) return;

        try {
            setLoading(true);
            const res = await nftServices.getAllmarketPlaceNfts({}, pageNo, limit, search);
            if (res.status === 'success') {
                setNfts(prevNfts => [...prevNfts, ...res.data.nfts]);
                setTotalNfts(res.data.total);
                
                if (nfts.length + res.data.nfts.length >= res.data.total) {
                    setAllLoaded(true);
                }
            }
        } catch (error) {
            console.error("Error fetching NFTs:", error);
        } finally {
            setLoading(false);
        }
    }, [pageNo, limit, search, loading, allLoaded, nfts.length]);

    useEffect(() => {
        fetchNfts();
    }, [fetchNfts]);

    const loadMore = () => {
        if (!allLoaded) {
            setPageNo(prevPageNo => prevPageNo + 1);
            setLimit(10);
        }
    };

    const filterCategories = ["All", "Music", "Art"];

    const filterHandler = (filterKey) => {
        setNfts([]);
        setPageNo(1);
        setLimit(1);
        setAllLoaded(false);
        setSearch(filterKey === "All" ? "" : filterKey);
    };

    return (
        <div className={clsx("rn-product-area masonary-wrapper-activation", space === 1 && "rn-section-gapTop", className)}>
            <div className="container">
                <div className="row align-items-center mb--60">
                    <div className="col-lg-4">
                        {data?.section_title && (
                            <SectionTitle className="mb--0" disableAnimation {...data.section_title} />
                        )}
                    </div>
                    <div className="col-lg-8 d-flex flex-wrap justify-content-end">
                        <div className="justify-content-end">
                            <FilterButtons buttons={filterCategories} filterHandler={filterHandler} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <motion.div layout className="isotope-list item-5">
                        {nfts.map((nft) => (
                            <motion.div key={nft._id} className={clsx("grid-item")} layout>
                                                            {console.log(nft)}

                                <Product
                                    title={nft.collectionName}
                                    slug={nft.tokenId}
                                    price={nft.nftPrice}
                                    likeCount={nft.likes}
                                    image={nft.tokenImage}
                                    authors={[{ name: nft.creatorName }]}
                                    bitCount={nft.bidInfo.length}
                                    nft={nft}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                {!allLoaded && (
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <button
                                onClick={loadMore}
                                className="btn btn-primary mt--30"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

ExploreProductArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: PropTypes.object,
    }),
};

ExploreProductArea.defaultProps = {
    space: 1,
};

export default ExploreProductArea;