import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

//create nft
const createNFT = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}/nft/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// updateNFT
const updateNFT = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${url}/nft/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// post updateRevealedNFTs
const updateRevealedNFTs = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}/nft/owned`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const onSale = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${url}/nft/onSale`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// getAllmarketPlaceNfts ?pageNo=1&limit=10&search= post api
const getAllmarketPlaceNfts = async (data, pageNo, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}nft/marketPlaceNfts?pageNo=${pageNo}&limit=${limit}&search=${search}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

// //   getOwnSaleNfts: builder.query({
//     query: ({ pageNo, limit, search }) => ({
//         url: "/nft/ownSaleNfts",
//         body: { pageNo, limit, search },
//         method: "POST",
//     }),
// }),

const getOwnSaleNfts = async (data, pageNo, limit, search) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}nft/ownSaleNfts?pageNo=${pageNo}&limit=${limit}&search=${search}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}




// getNftsMyCollectionName paginating post
const getNftsMyCollectionName = async (data, pageNo, limit) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${url}nft/collectionNfts?pageNo=${pageNo}&limit=${limit}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}






export default {
    createNFT,
    updateNFT,
    updateRevealedNFTs,
    onSale,
    getAllmarketPlaceNfts,
    getNftsMyCollectionName,
    getOwnSaleNfts
};
