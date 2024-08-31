// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { setSearchFocus } from 'src/features/searchSlice';
// import { useRouter } from "next/router";
// import { Input } from "./Input";

// const SearchBar = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const inputRef = useRef(null);
//   const router = useRouter();
//   const isSearchFocused = useSelector(state => state.search?.isSearchFocused);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (isSearchFocused && inputRef.current) {
//       inputRef.current.focus();
//       dispatch(setSearchFocus(false));
//     }
//   }, [isSearchFocused, dispatch]);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (query.length > 0) {
//         setIsLoading(true);
//         try {
//           const response = await axios.get(`http://localhost:5000/api/v1/elastic/flexible-search-collections?q=${query}`);
//           setResults(response.data);
//           setIsDropdownOpen(true);
//         } catch (error) {
//           console.error('Error fetching search results:', error);
//           setResults([]);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setResults([]);
//         setIsDropdownOpen(false);
//       }
//     };

//     const debounceTimer = setTimeout(fetchResults, 300);
//     return () => clearTimeout(debounceTimer);
//   }, [query]);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleClickedResult = (result) => {
//     router.push(`/collections/kadena/${result._source.collectionName}`);
//     setIsDropdownOpen(false);
//   }

//   const SearchIcon = () => (
//     <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="11" cy="11" r="8"></circle>
//       <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//     </svg>
//   );

//   return (
//     <div className="search-container">
//               <SearchIcon />
//       <Input
//         ref={inputRef}
//         value={query}
//         onChange={handleInputChange}
//         placeholder="Search collections"
//         className="search-input"
//       />
//       {isDropdownOpen && (
//         <div className="search-dropdown">
//           {isLoading ? (
//             <div className="search-result-item">Loading...</div>
//           ) : results.length > 0 ? (
//             results.map((item, index) => (
//               <div key={index} className="search-result-item" onClick={() => handleClickedResult(item)}>
//                 <img src={item._source.collectionBannerImage || '/placeholder.png'} alt={item._source.collectionName} className="result-icon" />
//                 <div className="result-info">
//                   <div className="result-name">{item._source.collectionName}</div>
//                   <div className="result-details">
//                     <span>{item.chain}</span>
//                     <span>{item.floor} {item.currency}</span>
//                     <span>{item.volume} {item.currency}</span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="search-result-item no-results">No results found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSearchFocus } from "src/features/searchSlice";
import { useRouter } from "next/router";
import { Input } from "./Input";
import styled from "styled-components";

// Existing styled components for tabs
const TabContainer = styled.div`
    display: flex;
    background-color: #3a3a3a;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    margin-bottom: 10px;
`;

const Tab = styled.button`
    flex: 1;
    padding: 10px;
    background-color: ${(props) => (props.active ? "#2c2c2c" : "#3a3a3a")};
    color: ${(props) => (props.active ? "white" : "#bbb")};
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${(props) => (props.active ? "#2c2c2c" : "#4a4a4a")};
    }
`;

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ collections: [], nfts: [] });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("collections");
    const [inputValidity, setInputValidity] = useState("Neutral");
    console.log(inputValidity, "inputValidity");
    const inputRef = useRef(null);
    const router = useRouter();
    const isSearchFocused = useSelector(
        (state) => state.search?.isSearchFocused
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSearchFocused && inputRef.current) {
            inputRef.current.focus();
            dispatch(setSearchFocus(false));
        }
    }, [isSearchFocused, dispatch]);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length > 0) {
                setIsLoading(true);
                try {
                    const url = `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/elastic/flexible-search?q=${query}`;
                    const response = await axios.get(
                        // `http://localhost:5000/api/v1/elastic/flexible-search?q=${query}`
                        url
                    );
                    const collections = response.data.filter(
                        (item) => item._index === "collections"
                    );
                    const nfts = response.data.filter(
                        (item) => item._index === "nfts"
                    );
                    setResults({ collections, nfts });
                    setIsDropdownOpen(true);
                    setInputValidity(
                        collections.length === 0 && nfts.length === 0
                            ? "Invalid"
                            : "Valid"
                    );
                } catch (error) {
                    console.error("Error fetching search results:", error);
                    setResults({ collections: [], nfts: [] });
                    setInputValidity("Invalid");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults({ collections: [], nfts: [] });
                setIsDropdownOpen(false);
                setInputValidity("Neutral");
            }
        };

        const debounceTimer = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        if (e.target.value === "") {
            setInputValidity("Neutral");
        }
    };

    const handleClickedResult = (result, type) => {
        if (type === "collection") {
            router.push(`/collections/kadena/${result._source.collectionName}`);
        } else if (type === "nft") {
            // Adjust this route as needed for NFT details page
            router.push(`/nft/${result._source.tokenId}`);
        }
        setIsDropdownOpen(false);
    };

    const SearchIcon = () => (
        <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    );

    const ResultItem = ({ item, type }) => (
        <div
            className="search-result-item"
            onClick={() => handleClickedResult(item, type)}
        >
            <img
                src={
                    type === "collection"
                        ? item._source.collectionBannerImage
                        : item._source.tokenImage || "/placeholder.png"
                }
                alt={
                    type === "collection"
                        ? item._source.collectionName
                        : item._source.tokenId
                }
                className="result-icon"
            />
            <div className="result-info">
                <div className="result-name">
                    {type === "collection"
                        ? item._source.collectionName
                        : `${item._source.collectionName} #${item._source.tokenId}`}
                </div>
                <div className="result-details">
                    <span>{item._source.creator}</span>
                    {type === "nft" && <span>{item._source.nftPrice} KDA</span>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="search-container">
            <SearchIcon />
            <Input
                ref={inputRef}
                value={query}
                onChange={handleInputChange}
                placeholder="Search collections and NFTs"
                className="search-input"
                validityResult={inputValidity}
            />
            {isDropdownOpen && (
                <div className="search-dropdown">
                    {isLoading ? (
                        <div className="search-result-item loading">
                            Loading...
                        </div>
                    ) : results.collections.length > 0 ||
                      results.nfts.length > 0 ? (
                        <>
                            <TabContainer>
                                <Tab
                                    active={activeTab === "collections"}
                                    onClick={() => setActiveTab("collections")}
                                >
                                    Collections ({results.collections.length})
                                </Tab>
                                <Tab
                                    active={activeTab === "nfts"}
                                    onClick={() => setActiveTab("nfts")}
                                >
                                    NFTs ({results.nfts.length})
                                </Tab>
                            </TabContainer>
                            {activeTab === "collections" &&
                                results.collections.map((item, index) => (
                                    <ResultItem
                                        key={index}
                                        item={item}
                                        type="collection"
                                    />
                                ))}
                            {activeTab === "nfts" &&
                                results.nfts.map((item, index) => (
                                    <ResultItem
                                        key={index}
                                        item={item}
                                        type="nft"
                                    />
                                ))}
                        </>
                    ) : (
                        <div className="search-result-item no-results">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
