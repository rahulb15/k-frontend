/* eslint-disable */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;


// launch-collection
const launchCollection = async (body) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + "launch-collection/create",
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

//update collection
const updateCollection = async (body,name) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            API_URL + "launch-collection/update/"+name,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getCollection = async (walletAddress) => {
    try {
        const response = await axios.get(
            API_URL + `collection/check-collection/${walletAddress}`
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};


// createCheckoutSession
const createCheckoutSession = async (body) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + "transaction",
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

// checkTransaction
const checkTransaction = async (session_id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            API_URL + "transaction/checkTransaction/" + session_id,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};


//uploadImage
const uploadImage = async (formData,name) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            API_URL + "launch-collection/upload-image/"+name,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};


//get all collections
const getAllCollections = async () => {
    try {
        const response = await axios.get(
            API_URL + "collection"
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

//get collection by name
const getCollectionByName = async (name) => {
    console.log(name)
    try {
        const response = await axios.get(
            API_URL + "collection/"+name
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};





export default {
    launchCollection,
    updateCollection,
    getCollection,
    createCheckoutSession,
    checkTransaction,
    uploadImage,
    getAllCollections,
    getCollectionByName
};
