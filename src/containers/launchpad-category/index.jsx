import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Slider, { SliderItem } from "@ui/slider";
import { SectionTitleType, ProductType } from "@utils/types";
import { motion } from "framer-motion";
import Link from 'next/link';
const SliderOptions = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
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

{
    /* <option value="art">
Art & Collectibles
</option>
<option value="photography">
Photography
</option>
<option value="gaming">
Gaming
</option>
<option value="music">
Music & Audio
</option>
<option value="virtual">
Virtual Real Estate
</option>
<option value="fashion">
Fashion & Accessories
</option>
<option value="sports">
Sports
</option>
<option value="utility">
Utility & Memberships
</option>
<option value="domains">
Domains & Virtual Assets
</option>
<option value="real">
Real World Assets
</option> */
}

const LaunchpadCategory = ({ className, space }) => {
    const data = [{
        section_title: {
            title: "Music",
            subtitle: "Explore the most popular products",
        },
        products: [
            {
                id: 1,
                title: "Art & Collectibles",
                image: { src: "/assets-images/launchpad/launchpad-01.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 2,
                title: "Photography",
                image: { src: "/assets-images/launchpad/launchpad-02.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 3,
                title: "Gaming",
                image: { src: "/assets-images/launchpad/launchpad-03.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 4,
                title: "Music & Audio",
                image: { src: "/assets-images/launchpad/launchpad-04.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 5,
                title: "Virtual Real Estate",
                image: { src: "/assets-images/launchpad/launchpad-05.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 6,
                title: "Fashion & Accessories",
                image: { src: "/assets-images/launchpad/launchpad-06.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 7,
                title: "Sports",
                image: { src: "/assets-images/launchpad/launchpad-07.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 8,
                title: "Utility & Memberships",
                image: { src: "/assets-images/launchpad/launchpad-08.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 9,
                title: "Domains & Virtual Assets",
                image: { src: "/assets-images/launchpad/launchpad-09.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
            {
                id: 10,
                title: "Real World Assets",
                image: { src: "/assets-images/launchpad/launchpad-10.jpeg" },
                path: "/collections/kadena/priority-pass",
            },
        ],
    },
    {
        section_title: {
            title: "Art",
            subtitle: "Explore the most popular products",
        },
        products: [
            {
                id: 1,
                title: "Art & Collectibles",
                image: { src: "/assets-images/launchpad/launchpad-01.jpeg" },
                path: "/launchpad/art",
            },
            {
                id: 2,
                title: "Photography",
                image: { src: "/assets-images/launchpad/launchpad-02.jpeg" },
                path: "/launchpad/photography",
            },
            {
                id: 3,
                title: "Gaming",
                image: { src: "/assets-images/launchpad/launchpad-03.jpeg" },
                path: "/launchpad/gaming",
            },
            {
                id: 4,
                title: "Music & Audio",
                image: { src: "/assets-images/launchpad/launchpad-04.jpeg" },
                path: "/launchpad/music",
            },
            {
                id: 5,
                title: "Virtual Real Estate",
                image: { src: "/assets-images/launchpad/launchpad-05.jpeg" },
                path: "/launchpad/virtual",
            },
            {
                id: 6,
                title: "Fashion & Accessories",
                image: { src: "/assets-images/launchpad/launchpad-06.jpeg" },
                path: "/launchpad/fashion",
            },
            {
                id: 7,
                title: "Sports",
                image: { src: "/assets-images/launchpad/launchpad-07.jpeg" },
                path: "/launchpad/sports",
            },
            {
                id: 8,
                title: "Utility & Memberships",
                image: { src: "/assets-images/launchpad/launchpad-08.jpeg" },
                path: "/launchpad/utility",
            },
            {
                id: 9,
                title: "Domains & Virtual Assets",
                image: { src: "/assets-images/launchpad/launchpad-09.jpeg" },
                path: "/launchpad/domains",
            },
            {
                id: 10,
                title: "Real World Assets",
                image: { src: "/assets-images/launchpad/launchpad-10.jpeg" },
                path: "/launchpad/real",
            },
        ],
    },
    {
        section_title: {
            title: "Photography",
            subtitle: "Explore the most popular products",
        },
        products: [
            {
                id: 1,
                title: "Art & Collectibles",
                image: { src: "/assets-images/launchpad/launchpad-01.jpeg" },
                path: "/launchpad/art",
            },
            {
                id: 2,
                title: "Photography",
                image: { src: "/assets-images/launchpad/launchpad-02.jpeg" },
                path: "/launchpad/photography",
            },
            {
                id: 3,
                title: "Gaming",
                image: { src: "/assets-images/launchpad/launchpad-03.jpeg" },
                path: "/launchpad/gaming",
            },
            {
                id: 4,
                title: "Music & Audio",
                image: { src: "/assets-images/launchpad/launchpad-04.jpeg" },
                path: "/launchpad/music",
            },
            {
                id: 5,
                title: "Virtual Real Estate",
                image: { src: "/assets-images/launchpad/launchpad-05.jpeg" },
                path: "/launchpad/virtual",
            },
            {
                id: 6,
                title: "Fashion & Accessories",
                image: { src: "/assets-images/launchpad/launchpad-06.jpeg" },
                path: "/launchpad/fashion",
            },
            {
                id: 7,
                title: "Sports",
                image: { src: "/assets-images/launchpad/launchpad-07.jpeg" },
                path: "/launchpad/sports",
            },
            {
                id: 8,
                title: "Utility & Memberships",
                image: { src: "/assets-images/launchpad/launchpad-08.jpeg" },
                path: "/launchpad/utility",
            },
            {
                id: 9,
                title: "Domains & Virtual Assets",
                image: { src: "/assets-images/launchpad/launchpad-09.jpeg" },
                path: "/launchpad/domains",
            },
            {
                id: 10,
                title: "Real World Assets",
                image: { src: "/assets-images/launchpad/launchpad-10.jpeg" },
                path: "/launchpad/real",
            },
        ],
    },
    {
        section_title: {
            title: "Gaming",
            subtitle: "Explore the most popular products",
        },
        products: [
            {
                id: 1,
                title: "Art & Collectibles",
                image: { src: "/assets-images/launchpad/launchpad-01.jpeg" },
                path: "/launchpad/art",
            },
            {
                id: 2,
                title: "Photography",
                image: { src: "/assets-images/launchpad/launchpad-02.jpeg" },
                path: "/launchpad/photography",
            },
            {
                id: 3,
                title: "Gaming",
                image: { src: "/assets-images/launchpad/launchpad-03.jpeg" },
                path: "/launchpad/gaming",
            },
            {
                id: 4,
                title: "Music & Audio",
                image: { src: "/assets-images/launchpad/launchpad-04.jpeg" },
                path: "/launchpad/music",
            },
            {
                id: 5,
                title: "Virtual Real Estate",
                image: { src: "/assets-images/launchpad/launchpad-05.jpeg" },
                path: "/launchpad/virtual",
            },
            {
                id: 6,
                title: "Fashion & Accessories",
                image: { src: "/assets-images/launchpad/launchpad-06.jpeg" },
                path: "/launchpad/fashion",
            },
            {
                id: 7,
                title: "Sports",
                image: { src: "/assets-images/launchpad/launchpad-07.jpeg" },
                path: "/launchpad/sports",
            },
            {
                id: 8,
                title: "Utility & Memberships",
                image: { src: "/assets-images/launchpad/launchpad-08.jpeg" },
                path: "/launchpad/utility",
            },
            {
                id: 9,
                title: "Domains & Virtual Assets",
                image: { src: "/assets-images/launchpad/launchpad-09.jpeg" },
                path: "/launchpad/domains",
            },
            {
                id: 10,
                title: "Real World Assets",
                image: { src: "/assets-images/launchpad/launchpad-10.jpeg" },
                path: "/launchpad/real",
            },
        ],
    }
    ];
    return (
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
                {data.map((category, index) => (
                    <div key={index}>
                        {category.section_title && (
                            <div className="row mb--30">
                                <div className="col-12">
                                    <SectionTitle {...category.section_title} />
                                </div>
                            </div>
                        )}
                        {category.products && (
                            <div className="row">
                                <div className="col-lg-12">
                                    <Slider
                                        options={SliderOptions}
                                        className="banner-one-slick slick-arrow-style-one rn-slick-dot-style slick-gutter-15"
                                    >
                                        {category.products.map((prod) => (
                                          <SliderItem
                                          key={prod.id}
                                          className="single-slide-product"
                                      >
                                          <div className="product-card">
                                              <motion.div
                                                  whileHover={{ scale: 1.05 }}
                                                  whileTap={{ scale: 1 }}
                                              >
                                                  <Link href={prod.path}>
                                                      <div className="image">
                                                          <img
                                                              src={prod.image.src}
                                                              alt={prod.title}
                                                              style={{
                                                                  width: "100%",
                                                                  height: "auto",
                                                                  borderRadius: "10px",
                                                                  boxShadow: "0 0 2px #fbf39c, 0 0 5px #cbd02e, 0 0 10px #fef2a1",
                                                              }}
                                                          />
                                                      </div>
                                                  </Link>
                                              </motion.div>
                                          </div>
                                      </SliderItem>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

LaunchpadCategory.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2, 3, 4]),
};

LaunchpadCategory.defaultProps = {
    space: 1,
};

export default LaunchpadCategory;