import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import TopCollectionList from "@components/product/topcollectionlist";
import Slider, { SliderItem } from "@ui/slider";
import { SectionTitleType, ProductType } from "@utils/types";

const SliderOptions = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    dots: true,
    responsive: [
        {
            breakpoint: 1399,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
            },
        },
    ],
};

const TopCollection = ({ data, className, space }) => (
    <div
        className={clsx(
            "en-product-area",
            space === 1 && "rn-section-gapTop",
            space === 2 && "rn-section-gap",
            space === 3 && "rn-section-gapBottom",
            className
        )}
    >
        <div className="container mt--80 mt_md--60 mt_sm--40 mt-3">
            {data?.section_title && (
                <div className="row mb--30">
                    <div className="col-12">
                        <SectionTitle {...data.section_title} />
                    </div>
                </div>
            )}
            {data?.products && (
                <div className="row">
                    <div className="col-lg-12">
                        <Slider
                            options={SliderOptions}
                            className="banner-one-slick slick-arrow-style-one rn-slick-dot-style slick-gutter-15"
                        >
                            {data.products.map((prod) => (
                                <SliderItem
                                    key={prod.id}
                                    className="single-slide-product"
                                >
                                    <TopCollectionList
                                        overlay
                                        placeBid={!!data.placeBid}
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </SliderItem>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    </div>
);

TopCollection.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2, 3, 4]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType).isRequired,
        placeBid: PropTypes.bool,
    }),
};

TopCollection.defaultProps = {
    space: 1,
};

export default TopCollection;
