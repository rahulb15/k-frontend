/* eslint-disable */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const register = async (body) => {
    try {
        const response = await axios.post(API_URL + "user/create", body);
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

const registerWithEmail = async (body) => {
    try {
        const response = await axios.post(API_URL + "user/register", body);
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

const login = async (body) => {
    return await axios.post(API_URL + "user/login", body).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("token", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const forgotPassword = async (body) => {
    return await axios
        .post(API_URL + "forgot-password", body)
        .then((response) => {
            return response;
        });
};

const getUser = async (walletAddress) => {
    try {
        const response = await axios.get(
            API_URL + `user/check-user/${walletAddress}`
        );
        console.log(response, "response");
        return response;
    } catch (error) {
        console.error(error);
    }
};

// const getUserInit = () => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/login/success`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Credentials": true,
//       },
//     })
//       .then((response) => {
//         if (response.status === 200) return response.json();
//         throw new Error("authentication has been failed!");
//       })
//       .then((resObject) => {
//         setUser(resObject.user);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

const logout = () => {
    // localStorage.removeItem("token");
    // return axios.get(API_URL + "logout");
    try {
        return axios.get(API_URL + "logout");
    } catch (error) {
        console.error(error);
    }
};

const getUserInit = async () => {
    try {
        const response = await axios.get(API_URL + "auth/login/success", {
            withCredentials: true,
        });
        console.log("🚀 ~ getUserInit ~ response:", response);
        return response;
    } catch (error) {
        console.error(error);
    }
};

const enable2FA = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            API_URL + "user/enableTwoFactorAuth",
            {},
            config
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

const verify2FA = async (body) => {
    try {
        const response = await axios.post(
            API_URL + "user/verifyTwoFactorAuth",
            body
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

// checkEmailExist
const checkEmailExist = async (email) => {
    console.log("🚀 ~ checkEmailExist ~ email:", email);
    try {
        const response = await axios.post(API_URL + "user/check-email", {
            email,
        });
        console.log("🚀 ~ checkEmailExist ~ response:", response);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default {
    register,
    login,
    forgotPassword,
    logout,
    getUser,
    enable2FA,
    verify2FA,
    checkEmailExist,
    registerWithEmail,
    getUserInit,
};
