import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import clsx from "clsx";
import BlogCard from "@components/blog/blog-card";
import Pagination from "@components/pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const BlogArea = ({ space, className, data }) => {
    const [value, setValue] = React.useState(0);
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNewsData = async () => {
            const requestOptions = {
                headers: {
                    'X-RapidAPI-Key': '1b5ef01b29msh0baedd54f041bc7p15b12ajsnf226e0982d01',
                    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
                }
            };

            try {
                const [
                    coindeskResponse,
                    cointelegraphResponse,
                    bitcoinistResponse,
                    decryptResponse
                ] = await Promise.all([
                    axios.get('https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk', requestOptions),
                    axios.get('https://cryptocurrency-news2.p.rapidapi.com/v1/cointelegraph', requestOptions),
                    axios.get('https://cryptocurrency-news2.p.rapidapi.com/v1/bitcoinist', requestOptions),
                    axios.get('https://cryptocurrency-news2.p.rapidapi.com/v1/decrypt', requestOptions)
                ]);

                const coindeskData = coindeskResponse.data.data || [];
                const cointelegraphData = cointelegraphResponse.data.data || [];
                const bitcoinistData = bitcoinistResponse.data.data || [];
                const decryptData = decryptResponse.data.data || [];

                const coindeskItems = coindeskData.map(item => ({
                    id: item.id,
                    url: item.url,
                    title: item.title,
                    description: item.description || '',
                    thumbnail: item.thumbnail,
                    createdAt: item.createdAt,
                    source: 'Coindesk'
                }));

                const cointelegraphItems = cointelegraphData.map(item => ({
                    id: item.id,
                    url: item.url,
                    title: item.title,
                    description: item.description || '',
                    thumbnail: item.thumbnail,
                    createdAt: item.createdAt,
                    source: 'Cointelegraph'
                }));

                const bitcoinistItems = bitcoinistData.map(item => ({
                    id: item.id,
                    url: item.url,
                    title: item.title,
                    description: item.description || '',
                    thumbnail: item.thumbnail,
                    createdAt: item.createdAt,
                    source: 'Bitcoinist'
                }));

                const decryptItems = decryptData.map(item => ({
                    id: item.id,
                    url: item.url,
                    title: item.title,
                    description: item.description || '',
                    thumbnail: item.thumbnail,
                    createdAt: item.createdAt,
                    source: 'Decrypt'
                }));

                const allNewsItems = [
                    ...coindeskItems,
                    ...cointelegraphItems,
                    ...bitcoinistItems,
                    ...decryptItems
                ];
                setNewsData(allNewsItems);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsData();
    }, []);

    const groupNewsByDate = (newsItems) => {
        const groupedNews = {};

        newsItems.forEach((item) => {
            const dateKey = item.createdAt?.slice(0, 10);
            if (dateKey) {
                if (!groupedNews[dateKey]) {
                    groupedNews[dateKey] = [];
                }
                groupedNews[dateKey].push(item);
            }
        });

        return groupedNews;
    };

    const groupedNewsData = groupNewsByDate(newsData);






    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div
                className={clsx(
                    "rn-breadcrumb-inner",
                    className,
                    space === 1 && "ptb--30"
                )}
            >
                <div className="container">
                    <div className="row align-items-center">
                        {/* <div className="col-lg-6 col-md-6 col-12"> */}
                            <Box sx={{ width: "100%" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    sx={{
                                        '& .MuiTab-root': {
                                            color: '#888',
                                            fontSize: 'small',
                                            '&.Mui-selected': {
                                                color: '#a9b729c9',
                                                fontSize: 'large',
                                            },
                                        },
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: '#a9b729c9',
                                        },
                                    }}
                                >
                                    <Tab label="All" {...a11yProps(0)} />
                                    <Tab
                                        label="Crypto Currency"
                                        {...a11yProps(1)}
                                    />
                                    <Tab
                                        label="Creator"
                                        {...a11yProps(2)}
                                    />
                                    <Tab
                                        label="NFT"
                                        {...a11yProps(3)}
                                    />
                                </Tabs>
                            </Box>
                        {/* </div> */}
                    </div>
                </div>
            </div>



            <div
                className={clsx(
                    "rn-blog-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <div className="container">
                    <div className="row g-5">
                        {/* {data?.posts?.map((post) => (
                            <div
                                className="col-xl-3 col-lg-4 col-md-6 col-12"
                                data-sal="slide-up"
                                data-sal-duration="800"
                                data-sal-delay="150"
                                key={post.slug}
                            >
                                <BlogCard
                                    title={post.title}
                                    slug={post.slug}
                                    category={post.category}
                                    timeToRead={post.timeToRead}
                                    image={post.image}
                                />
                            </div>
                        ))} */}
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {value === 0 &&
                                    Object.keys(groupedNewsData).map((dateKey) => (
                                        <div key={dateKey}>
                                            <h3>{dateKey}</h3>
                                            <div className="row">
                                                {groupedNewsData[dateKey].map((newsItem) => (
                                                    <div
                                                        className="col-xl-3 col-lg-4 col-md-6 col-12"
                                                        key={newsItem.id}
                                                    >
                                                        <BlogCard
                                                            title={newsItem.title}
                                                            slug={newsItem.url}
                                                            category={newsItem.source}
                                                            timeToRead={newsItem.createdAt}
                                                            image={newsItem.thumbnail}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                {value === 1 &&
                                    Object.keys(groupedNewsData).map((dateKey) => (
                                        <div key={dateKey}>
                                            <h3>{dateKey}</h3>
                                            <div className="row">
                                                {groupedNewsData[dateKey].map((newsItem) =>
                                                    newsItem.title.toLowerCase().includes('crypto') ? (
                                                        <div
                                                            className="col-xl-3 col-lg-4 col-md-6 col-12"
                                                            key={newsItem.id}
                                                        >
                                                            <BlogCard
                                                                title={newsItem.title}
                                                                slug={newsItem.url}
                                                                category={newsItem.source}
                                                                timeToRead={newsItem.createdAt}
                                                                image={newsItem.thumbnail}
                                                            />
                                                        </div>
                                                    ) : null
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                {value === 2 &&
                                    Object.keys(groupedNewsData).map((dateKey) => (
                                        <div key={dateKey}>
                                            <h3>{dateKey}</h3>
                                            <div className="row">
                                                {groupedNewsData[dateKey].map((newsItem) =>
                                                    newsItem.title.toLowerCase().includes('creator') ? (
                                                        <div
                                                            className="col-xl-3 col-lg-4 col-md-6 col-12"
                                                            key={newsItem.id}
                                                        >
                                                            <BlogCard
                                                                title={newsItem.title}
                                                                slug={newsItem.url}
                                                                category={newsItem.source}
                                                                timeToRead={newsItem.createdAt}
                                                                image={newsItem.thumbnail}
                                                            />
                                                        </div>
                                                    ) : null
                                                )}
                                                </div>
                                                </div>
                                    ))}
                                {value === 3 &&
                                    Object.keys(groupedNewsData).map((dateKey) => (
                                        <div key={dateKey}>
                                            <h3>{dateKey}</h3>
                                            <div className="row">
                                                {groupedNewsData[dateKey].map((newsItem) =>
                                                    newsItem.title.toLowerCase().includes('nft') ? (
                                                        <div
                                                            className="col-xl-3 col-lg-4 col-md-6 col-12"
                                                            key={newsItem.id}
                                                        >
                                                            <BlogCard
                                                                title={newsItem.title}
                                                                slug={newsItem.url}
                                                                category={newsItem.source}
                                                                timeToRead={newsItem.createdAt}
                                                                image={newsItem.thumbnail}
                                                            />
                                                        </div>
                                                    ) : null
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}



                    </div>
                    {data.pagiData?.numberOfPages > 1 && (
                        <Pagination
                            currentPage={data.pagiData.currentPage}
                            numberOfPages={data.pagiData.numberOfPages}
                            rootPage="/blog"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

BlogArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        posts: PropTypes.arrayOf(PropTypes.shape({})),
        pagiData: PropTypes.shape({
            currentPage: PropTypes.number.isRequired,
            numberOfPages: PropTypes.number.isRequired,
        }),
    }),
};

BlogArea.defaultProps = {
    space: 1,
};

export default BlogArea;
