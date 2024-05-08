/* eslint-disable */
"use client";
import Pact from "pact-lang-api";
import { createContext, useEffect, useState } from "react";
import {
    CHAIN_ID,
    GAS_PRICE,
    NETWORK,
    creationTime,
} from "../constants/contextConstants";

export const AccountContext = createContext();
export const AccountProvider = (props) => {
    const [fetchAccountBalance, setFetchAccountBalance] = useState(false);
    const [localRes, setLocalRes] = useState(null);
    const [walletAddressContect, setWalletAddressContect] = useState("");

    const authWalletConnect = async (walletAddress) => {
        setWalletAddressContect(walletAddress);
        localStorage.setItem("walletAddress", walletAddress);
    };

    const logoutWalletConnect = async () => {
        setWalletAddressContect("");
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("token");
    };

    //useEffect check if local storage has wallet address
    useEffect(() => {
        const walletAddress = localStorage.getItem("walletAddress");
        if (walletAddress) {
            setWalletAddressContect(walletAddress);
        }
    }, []);

    const setVerifiedAccount = async (accountName) => {
        try {
            let data = await Pact.fetch.local(
                {
                    pactCode: `(coin.details ${JSON.stringify(accountName)})`,
                    meta: Pact.lang.mkMeta(
                        "",
                        CHAIN_ID,
                        GAS_PRICE,
                        3000,
                        creationTime(),
                        600
                    ),
                },
                NETWORK
            );
            if (data.result.status === "success") {
                setLocalRes(data.result.data);
                return data.result;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const contextValues = {
        setFetchAccountBalance,
        setLocalRes,
        setVerifiedAccount,
        walletAddressContect,
        authWalletConnect,
        fetchAccountBalance,
        localRes,
        logoutWalletConnect,
    };

    return (
        <AccountContext.Provider value={contextValues}>
            {props.children}
        </AccountContext.Provider>
    );
};

export const AccountConsumer = AccountContext.Consumer;
