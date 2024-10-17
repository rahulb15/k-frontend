// // // /* eslint-disable */

// // // import PropTypes from "prop-types";
// // // import Button from "@ui/button";
// // // import Slider, { SliderItem } from "@ui/slider";
// // // import Image from "next/image";
// // // import { ButtonType, IDType, ImageType } from "@utils/types";

// // // const SliderOptions = {
// // //     slidesToShow: 1,
// // //     slidesToScroll: 1,
// // //     dots: false,
// // //     arrows: true,
// // //     autoplay: true,
// // //     autoplaySpeed: 5000,
// // //     fade: true,
// // //     infinite: true,
// // //     speed: 1000,
// // //     cssEase: "linear",
// // //     pauseOnHover: true,
// // //     pauseOnFocus: true,
// // //     swipeToSlide: true,

// // //     // responsive: [
// // //     //     {
// // //     //         breakpoint: 992,
// // //     //         settings: {
// // //     //             arrows: false,
// // //     //         },
// // //     //     },
// // //     // ],
// // // };

// // // const LaunchpadHeroArea = ({ data }) => (
// // //     <div className="rn-banner-area rn-section-gapTop">
// // //         <div className="container" style={{ width: "90%", marginTop: "-70px" }}>
// // //             {data && (
// // //                 <Slider
// // //                     options={SliderOptions}
// // //                     className="slider-style-6 wide-wrapper slick-activation-06 slick-arrow-between"
// // //                 >
// // //                     {data.map(
// // //                         (banner) => (
// // //                             console.log(banner.image.src),
// // //                             (
// // //                                 <SliderItem key={banner.id}>
// // //                                     <div className="slide">
// // //                                         {banner.image?.src && (
// // //                                             <Image
// // //                                                 src={banner.image.src}
// // //                                                 alt="Slider BG"
// // //                                                 quality={100}
// // //                                                 priority
// // //                                                 fill
// // //                                                 sizes="100vw"
// // //                                                 style={{
// // //                                                     objectFit: "cover",
// // //                                                 }}
// // //                                             />
// // //                                         )}

// // //                                         <div className="banner-read-thumb-lg">
// // //                                             <h4 className="banner-read-thumb-lg__title"
// // //                                                 dangerouslySetInnerHTML={{
// // //                                                     __html: banner?.title,
// // //                                                 }}
// // //                                             />
// // //                                             <p className="banner-read-thumb-lg__description"
// // //                                                 dangerouslySetInnerHTML={{
// // //                                                     __html: banner?.description,
// // //                                                 }}
// // //                                             />
// // //                                             {banner?.buttons && (
// // //                                                 <div className="button-group">
// // //                                                     {banner.buttons.map(
// // //                                                         (
// // //                                                             {
// // //                                                                 id,
// // //                                                                 content,
// // //                                                                 ...btn
// // //                                                             },
// // //                                                             i
// // //                                                         ) => (
// // //                                                             <Button
// // //                                                                 key={id}
// // //                                                                 data-sal="slide-up"
// // //                                                                 data-sal-delay="300"
// // //                                                                 data-sal-duration="800"
// // //                                                                 {...btn}
// // //                                                                 className={
// // //                                                                     i === 0
// // //                                                                         ? "mr--15"
// // //                                                                         : ""
// // //                                                                 }
// // //                                                             >
// // //                                                                 {content}
// // //                                                             </Button>
// // //                                                         )
// // //                                                     )}
// // //                                                 </div>
// // //                                             )}
// // //                                         </div>
// // //                                     </div>
// // //                                 </SliderItem>
// // //                             )
// // //                         )
// // //                     )}
// // //                 </Slider>
// // //             )}
// // //         </div>
// // //     </div>
// // // );

// // // LaunchpadHeroArea.propTypes = {
// // //     data: PropTypes.arrayOf(
// // //         PropTypes.shape({
// // //             id: IDType,
// // //             title: PropTypes.string.isRequired,
// // //             description: PropTypes.string.isRequired,
// // //             buttons: PropTypes.arrayOf(ButtonType),
// // //             image: ImageType,
// // //         })
// // //     ),
// // // };

// // // export default LaunchpadHeroArea;


// // import PropTypes from "prop-types";
// // import Button from "@ui/button";
// // import Slider, { SliderItem } from "@ui/slider";
// // import Image from "next/image";
// // import { ButtonType, IDType, ImageType } from "@utils/types";

// // const SliderOptions = {
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
// //     dots: false,
// //     arrows: true,
// //     autoplay: true,
// //     autoplaySpeed: 5000,
// //     fade: true,
// //     infinite: true,
// //     speed: 1000,
// //     cssEase: "linear",
// //     pauseOnHover: true,
// //     pauseOnFocus: true,
// //     swipeToSlide: true,
// // };

// // const LaunchpadHeroArea = ({ data }) => (
// //     <div className="rn-banner-area rn-section-gapTop">
// //         <div className="container" style={{ width: "90%", marginTop: "-70px" }}>
// //             {data && data.length > 0 && (
// //                 <Slider
// //                     options={SliderOptions}
// //                     className="slider-style-6 wide-wrapper slick-activation-06 slick-arrow-between"
// //                 >
// //                     {data.map((collection) => (
// //                         <SliderItem key={collection.id}>
// //                             <div className="slide">
// //                                 {collection.image?.src && (
// //                                     <Image
// //                                         src={collection.image.src}
// //                                         alt={collection.title}
// //                                         quality={100}
// //                                         priority
// //                                         fill
// //                                         sizes="100vw"
// //                                         style={{
// //                                             objectFit: "cover",
// //                                         }}
// //                                     />
// //                                 )}

// //                                 <div className="banner-read-thumb-lg">
// //                                     <h4 className="banner-read-thumb-lg__title"
// //                                         dangerouslySetInnerHTML={{
// //                                             __html: collection.title,
// //                                         }}
// //                                     />
// //                                     <p className="banner-read-thumb-lg__description"
// //                                         dangerouslySetInnerHTML={{
// //                                             __html: collection.description,
// //                                         }}
// //                                     />
// //                                     <p>Mint Price: {collection.mintPrice}</p>
// //                                     <p>Mint Start: {new Date(collection.mintStartDate).toLocaleString()}</p>
// //                                     <p>Mint End: {new Date(collection.mintEndDate).toLocaleString()}</p>
// //                                     {collection.buttons && (
// //                                         <div className="button-group">
// //                                             {collection.buttons.map(
// //                                                 ({ id, content, ...btn }, i) => (
// //                                                     <Button
// //                                                         key={id}
// //                                                         data-sal="slide-up"
// //                                                         data-sal-delay="300"
// //                                                         data-sal-duration="800"
// //                                                         {...btn}
// //                                                         className={i === 0 ? "mr--15" : ""}
// //                                                     >
// //                                                         {content}
// //                                                     </Button>
// //                                                 )
// //                                             )}
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         </SliderItem>
// //                     ))}
// //                 </Slider>
// //             )}
// //         </div>
// //     </div>
// // );

// // LaunchpadHeroArea.propTypes = {
// //     data: PropTypes.arrayOf(
// //         PropTypes.shape({
// //             id: IDType,
// //             title: PropTypes.string.isRequired,
// //             description: PropTypes.string.isRequired,
// //             buttons: PropTypes.arrayOf(ButtonType),
// //             image: ImageType,
// //             mintPrice: PropTypes.string,
// //             mintStartDate: PropTypes.string,
// //             mintEndDate: PropTypes.string,
// //         })
// //     ),
// // };

// // export default LaunchpadHeroArea;


// // import React from "react";
// // import PropTypes from "prop-types";
// // import Button from "@ui/button";
// // import Slider, { SliderItem } from "@ui/slider";
// // import Image from "next/image";
// // import { ButtonType, IDType, ImageType } from "@utils/types";
// // import { motion } from "framer-motion";

// // const SliderOptions = {
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
// //     dots: false,
// //     arrows: true,
// //     autoplay: true,
// //     autoplaySpeed: 5000,
// //     fade: true,
// //     infinite: true,
// //     speed: 1000,
// //     cssEase: "linear",
// //     pauseOnHover: true,
// //     pauseOnFocus: true,
// //     swipeToSlide: true,
// // };

// // const LaunchpadHeroArea = ({ data }) => (
// // <div className="rn-banner-area rn-section-gapTop">
// //         <div className="container" style={{ width: "90%", marginTop: "-70px" }}>
// //             {data && data.length > 0 && (
// //                 <Slider
// //                     options={SliderOptions}
// //                     className="slider-style-6 wide-wrapper slick-activation-06 slick-arrow-between"
// //                 >
// //                     {data.map((collection) => (
// //                         <SliderItem key={collection.id}>
// //                             <div className="slide">
// //                                 {collection.image?.src && (
// //                                     <Image
// //                                         src={collection.image.src}
// //                                         alt={collection.title}
// //                                         quality={100}
// //                                         priority
// //                                         fill
// //                                         sizes="100vw"
// //                                         style={{
// //                                             objectFit: "cover",
// //                                         }}
// //                                     />
// //                                 )}

// //                                 <motion.div 
// //                                     className="banner-read-thumb-lg"
// //                                     initial={{ opacity: 0, x: -50 }}
// //                                     animate={{ opacity: 1, x: 0 }}
// //                                     transition={{ duration: 0.5 }}
// //                                 >
// //                                     <div className="banner-content-wrapper">
// //                                         <motion.h4 
// //                                             className="banner-read-thumb-lg__title"
// //                                             initial={{ opacity: 0, y: 20 }}
// //                                             animate={{ opacity: 1, y: 0 }}
// //                                             transition={{ delay: 0.2, duration: 0.5 }}
// //                                         >
// //                                             {collection.title}
// //                                         </motion.h4>
// //                                         <motion.div 
// //                                             className="banner-read-thumb-lg__description"
// //                                             initial={{ opacity: 0, y: 20 }}
// //                                             animate={{ opacity: 1, y: 0 }}
// //                                             transition={{ delay: 0.4, duration: 0.5 }}
// //                                         >
// //                                             <p>{collection.description}</p>
// //                                         </motion.div>
// //                                     </div>
// //                                     <motion.div 
// //                                         className="mint-info"
// //                                         initial={{ opacity: 0, y: 20 }}
// //                                         animate={{ opacity: 1, y: 0 }}
// //                                         transition={{ delay: 0.6, duration: 0.5 }}
// //                                     >
// //                                         <div className="mint-price">
// //                                             <span>Mint Price</span>
// //                                             <strong>{collection.mintPrice}</strong>
// //                                         </div>
// //                                         <div className="mint-period">
// //                                             <span>Mint Period</span>
// //                                             <strong>{new Date(collection.mintStartDate).toLocaleDateString()} - {new Date(collection.mintEndDate).toLocaleDateString()}</strong>
// //                                             <small>{new Date(collection.mintStartDate).toLocaleTimeString()} - {new Date(collection.mintEndDate).toLocaleTimeString()}</small>
// //                                         </div>
// //                                     </motion.div>
// //                                     {collection.buttons && (
// //                                         <motion.div 
// //                                             className="button-group"
// //                                             initial={{ opacity: 0, y: 20 }}
// //                                             animate={{ opacity: 1, y: 0 }}
// //                                             transition={{ delay: 0.8, duration: 0.5 }}
// //                                         >
// //                                             {collection.buttons.map(
// //                                                 ({ id, content, ...btn }, i) => (
// //                                                     <Button
// //                                                         key={id}
// //                                                         {...btn}
// //                                                         className={i === 0 ? "mr--15" : ""}
// //                                                     >
// //                                                         {content}
// //                                                     </Button>
// //                                                 )
// //                                             )}
// //                                         </motion.div>
// //                                     )}
// //                                 </motion.div>
// //                             </div>
// //                         </SliderItem>
// //                     ))}
// //                 </Slider>
// //             )}
// //         </div>
// //     </div>
// // );

// // LaunchpadHeroArea.propTypes = {
// //     data: PropTypes.arrayOf(
// //         PropTypes.shape({
// //             id: IDType,
// //             title: PropTypes.string.isRequired,
// //             description: PropTypes.string.isRequired,
// //             buttons: PropTypes.arrayOf(ButtonType),
// //             image: ImageType,
// //             mintPrice: PropTypes.string,
// //             mintStartDate: PropTypes.string,
// //             mintEndDate: PropTypes.string,
// //         })
// //     ),
// // };

// // export default LaunchpadHeroArea;



// import React from "react";
// import PropTypes from "prop-types";
// import Button from "@ui/button";
// import Slider, { SliderItem } from "@ui/slider";
// import Image from "next/image";
// import { ButtonType, IDType, ImageType } from "@utils/types";
// import { motion } from "framer-motion";

// const SliderOptions = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     dots: false,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     fade: true,
//     infinite: true,
//     speed: 1000,
//     cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
//     pauseOnHover: true,
//     pauseOnFocus: true,
//     swipeToSlide: true,
// };

// const LaunchpadHeroArea = ({ data }) => (
//     <div className="rn-banner-area rn-section-gapTop">
//         <div className="container" style={{ width: "90%", marginTop: "-70px" }}>
//             {data && data.length > 0 && (
//                 <Slider
//                     options={SliderOptions}
//                     className="slider-style-6 wide-wrapper slick-activation-06 slick-arrow-between"
//                 >
//                     {data.map((collection) => (
//                         <SliderItem key={collection.id}>
//                             <div className="slide">
//                                 <div className="image-wrapper">
//                                     {collection.image?.src && (
//                                         <Image
//                                             src={collection.image.src}
//                                             alt={collection.title}
//                                             quality={100}
//                                             priority
//                                             fill
//                                             sizes="100vw"
//                                             style={{
//                                                 objectFit: "cover",
//                                             }}
//                                         />
//                                     )}
//                                 </div>

//                                 <motion.div 
//                                     className="banner-read-thumb-lg"
//                                     initial={{ opacity: 0, x: -50 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.5 }}
//                                 >
//                                     <div className="banner-content-wrapper">
//                                         <motion.h4 
//                                             className="banner-read-thumb-lg__title"
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: 0.2, duration: 0.5 }}
//                                         >
//                                             {collection.title}
//                                         </motion.h4>
//                                         <motion.div 
//                                             className="banner-read-thumb-lg__description"
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: 0.4, duration: 0.5 }}
//                                         >
//                                             <p>{collection.description}</p>
//                                         </motion.div>
//                                     </div>
//                                     <motion.div 
//                                         className="mint-info"
//                                         initial={{ opacity: 0, y: 20 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: 0.6, duration: 0.5 }}
//                                     >
//                                         <div className="mint-price">
//                                             <span>Mint Price</span>
//                                             <strong>{collection.mintPrice}</strong>
//                                         </div>
//                                         <div className="mint-period">
//                                             <span>Mint Period</span>
//                                             <strong>{new Date(collection.mintStartDate).toLocaleDateString()} - {new Date(collection.mintEndDate).toLocaleDateString()}</strong>
//                                             <small>{new Date(collection.mintStartDate).toLocaleTimeString()} - {new Date(collection.mintEndDate).toLocaleTimeString()}</small>
//                                         </div>
//                                     </motion.div>
//                                     {collection.buttons && (
//                                         <motion.div 
//                                             className="button-group"
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: 0.8, duration: 0.5 }}
//                                         >
//                                             {collection.buttons.map(
//                                                 ({ id, content, ...btn }, i) => (
//                                                     <Button
//                                                         key={id}
//                                                         {...btn}
//                                                         className={i === 0 ? "mr--15" : ""}
//                                                     >
//                                                         {content}
//                                                     </Button>
//                                                 )
//                                             )}
//                                         </motion.div>
//                                     )}
//                                 </motion.div>
//                             </div>
//                         </SliderItem>
//                     ))}
//                 </Slider>
//             )}
//         </div>
//     </div>
// );

// LaunchpadHeroArea.propTypes = {
//     data: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: IDType,
//             title: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             buttons: PropTypes.arrayOf(ButtonType),
//             image: ImageType,
//             mintPrice: PropTypes.string,
//             mintStartDate: PropTypes.string,
//             mintEndDate: PropTypes.string,
//         })
//     ),
// };

// export default LaunchpadHeroArea;



import React from "react";
import PropTypes from "prop-types";
import Button from "@ui/button";
import Slider, { SliderItem } from "@ui/slider";
import Image from "next/image";
import { ButtonType, IDType, ImageType } from "@utils/types";
import { motion } from "framer-motion";

const SliderOptions = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    infinite: true,
    speed: 1000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    pauseOnHover: true,
    pauseOnFocus: true,
    swipeToSlide: true,
};

const LaunchpadHeroArea = ({ data }) => (
    <div className="rn-banner-area rn-section-gapTop">
        <div className="container" style={{ width: "90%", marginTop: "-70px" }}>
            {data && data.length > 0 && (
                <Slider
                    options={SliderOptions}
                    className="slider-style-6 wide-wrapper slick-activation-06 slick-arrow-between"
                >
                    {data.map((collection) => (
                        <SliderItem key={collection.id}>
                            <div className="slide">
                                <div className="image-wrapper">
                                    {collection.image?.src && (
                                        <Image
                                            src={collection.image.src}
                                            alt={collection.title}
                                            quality={100}
                                            priority
                                            fill
                                            sizes="100vw"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </div>

                                <motion.div 
                                    className="banner-read-thumb-lg"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="banner-content-wrapper">
                                        <motion.h4 
                                            className="banner-read-thumb-lg__title"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                            {collection.title}
                                        </motion.h4>
                                        <motion.div 
                                            className="banner-read-thumb-lg__description"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.5 }}
                                        >
                                            <p>{collection.description}</p>
                                        </motion.div>
                                    </div>
                                    <motion.div 
                                        className="mint-info"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                    >
                                        <div className="mint-price">
                                            <span>Mint Price</span>
                                            <strong>{collection.mintPrice}</strong>
                                        </div>
                                        <div className="mint-period">
                                            <span>Mint Period</span>
                                            <strong>{new Date(collection.mintStartDate).toLocaleDateString()} - {new Date(collection.mintEndDate).toLocaleDateString()}</strong>
                                            <small>{new Date(collection.mintStartDate).toLocaleTimeString()} - {new Date(collection.mintEndDate).toLocaleTimeString()}</small>
                                        </div>
                                    </motion.div>
                                    {collection.buttons && (
                                        <motion.div 
                                            className="button-group"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                        >
                                            {collection.buttons.map(
                                                ({ id, content, ...btn }, i) => (
                                                    <Button
                                                        key={id}
                                                        {...btn}
                                                        className={i === 0 ? "mr--15" : ""}
                                                    >
                                                        {content}
                                                    </Button>
                                                )
                                            )}
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </SliderItem>
                    ))}
                </Slider>
            )}
        </div>
    </div>
);

LaunchpadHeroArea.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: IDType,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            buttons: PropTypes.arrayOf(ButtonType),
            image: ImageType,
            mintPrice: PropTypes.string,
            mintStartDate: PropTypes.string,
            mintEndDate: PropTypes.string,
        })
    ),
};

export default LaunchpadHeroArea;