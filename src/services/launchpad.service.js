/* eslint-disable */
import {
    Pact,
    createClient,
    createEckoWalletQuicksign,
    createSignWithChainweaver,
    createWalletConnectSign,
    createWalletConnectQuicksign,
} from "@kadena/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    CHAIN_ID,
    NETWORK,
    NETWORKID,
    creationTime,
} from "src/constants/contextConstants";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";

const API_HOST = NETWORK;
const client = createClient(API_HOST);
const signWithChainweaver = createSignWithChainweaver();
const eckoWallet = createEckoWalletQuicksign();

const admin = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

const signFunction = async (signedTx) => {
    const transactionDescriptor = await client.submit(signedTx);
    console.log("transactionDescriptor", transactionDescriptor);

    const response = await client.listen(transactionDescriptor, {});
    console.log("response", response);
    return response;
};

const fetchData = async () => {
    const isEckoWalletInstalled = eckoWallet.isInstalled();
    if (!isEckoWalletInstalled) {
        alert(`Wallet not installed`);
    }

    const isEckoWalletConnected = await eckoWallet.isConnected();
    console.log(isEckoWalletConnected);

    if (!isEckoWalletConnected) {
        const data = await eckoWallet.connect(NETWORKID);
        console.log(data);
        return data;
    }
};


const getPrimeRoleUsers = async () => {
    const pactCode = `(free.lptest001.get-prime-role)`;

    const txn = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    if (localResponse.result.status == "success") {
      let users = localResponse.result.data;
      console.log("users", users);
      return users;
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

  const getDiscountRoleUsers = async () => {
    const pactCode = `(free.lptest001.get-discount-role)`;

    const txn = Pact.builder
    .execution(pactCode)
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORKID)
    .createTransaction();

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    if (localResponse.result.status == "success") {
      let users = localResponse.result.data;
      console.log("users", users);
      return users;
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

  const getDiscountRate = async () => {
    const pactCode = `(free.lptest001.get-collection-discount-fee)`;

   
    const txn = Pact.builder
    .execution(pactCode)
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORKID)
    .createTransaction();

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    if (localResponse.result.status == "success") {
      let discount = localResponse.result.data;
      console.log("users", discount);
      return discount;
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

  const getLaunchFee = async () => {
    const pactCode = `(free.lptest001.get-collection-launch-fee)`;

    const txn = Pact.builder
    .execution(pactCode)
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORKID)
    .createTransaction();

    const localResponse = await client.local(txn, {
      preflight: false,
      signatureVerification: false,
    });

    if (localResponse.result.status == "success") {
      let fee = localResponse.result.data;
      console.log("fee", fee);
      return fee;
    } else {
      console.log("Error in local response", localResponse.result.error);
    }
  };

export const launchpadApi = createApi({
    reducerPath: "launchpadApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
    endpoints: (builder) => ({
        // collectionRequest: builder.mutation({
        //     async queryFn(args) {
        //         const {
        //             collectionRequestName,
        //             collectionRequestSymbol,
        //             collectionRequestCreator,
        //             collectionRequestDescription,
        //             collectionRequestCategory,
        //             collectionRequestSupply,
        //             collectionRequestUriList,
        //             collectionRequestMintPrice,
        //             collectionRequestRoyalityPerc,
        //             collectionRequestRoyalityAddress,
        //             collectionRequestCoverImgUrl,
        //             collectionRequestBannerImgUrl,
        //             collectionRequestStartDate,
        //             collectionRequesEndDate,
        //             collectionRequestEnableFreeMint,
        //             collectionRequestEnableWl,
        //             collectionRequestEnablePresale,
        //             collectionRequestEnableAirdrop,
        //             collectionRequestPolicy,
        //             walletName,
        //         } = args;
        //         console.log(args);

        //         // return;

        //         const account = collectionRequestCreator;
        //         const publicKey = account.slice(2, account.length);
        //         console.log(publicKey);
        //         const guard = { keys: [publicKey], pred: "keys-all" };

        //         const pactCode = `(free.lptest001.nft-collection-request 
        //         ${JSON.stringify(collectionRequestName)}
        //         ${JSON.stringify(collectionRequestSymbol)}  
        //         ${JSON.stringify(account)}        
        //         (read-keyset  "guard")
        //         ${JSON.stringify(collectionRequestDescription)}
        //         ${JSON.stringify(collectionRequestCategory)}
        //         ${collectionRequestSupply}
        //         ${JSON.stringify(collectionRequestUriList)}
        //         ${collectionRequestMintPrice}
        //         ${collectionRequestRoyalityPerc}
        //         ${JSON.stringify(collectionRequestRoyalityAddress)}
        //         ${JSON.stringify(collectionRequestCoverImgUrl)}
        //         ${JSON.stringify(collectionRequestBannerImgUrl)}
        //         ${JSON.stringify(collectionRequestStartDate)}
        //         (${collectionRequestStartDate})
        //         ${JSON.stringify(collectionRequesEndDate)}       
        //         (${collectionRequesEndDate}) 
        //         ${collectionRequestEnableFreeMint}                 
        //         ${collectionRequestEnableWl} 
        //         ${collectionRequestEnablePresale} 
        //         ${collectionRequestEnableAirdrop} 
        //         ${JSON.stringify(collectionRequestPolicy)}
        //         )
        //         `;

        //         console.log(pactCode);

        //         const txn = Pact.builder
        //             .execution(pactCode)
        //             .addData("guard", guard)
        //             .addSigner(publicKey, (withCapability) => [
        //                 withCapability("coin.GAS"),
        //                 withCapability("coin.TRANSFER", account, admin, 1.0),
        //             ])
        //             .setMeta({
        //                 creationTime: creationTime(),
        //                 sender: account,
        //                 gasLimit: 150000,
        //                 chainId: CHAIN_ID,
        //                 ttl: 28800,
        //             })
        //             .setNetworkId(NETWORKID)
        //             .createTransaction();

        //         try {
        //             const localResponse = await client.local(txn, {
        //                 preflight: false,
        //                 signatureVerification: false,
        //             });

        //             if (localResponse.result.status === "success") {
        //                 let signedTx;
        //                 if (walletName === "EckoWallet") {
        //                     console.log("ECKO");
        //                     const walletstatus = await fetchData();
        //                     if (walletstatus) {
        //                         signedTx = await eckoWallet(txn);
        //                     } else {
        //                         return { error: "Wallet not connected" };
        //                     }

        //                     // signedTx = await eckoWallet(txn);
        //                 } else if (walletName === "Chainweaver") {
        //                     console.log("Chainweaver");

        //                     signedTx = await signWithChainweaver(txn);
        //                 }

        //                 const response = await signFunction(signedTx);
        //                 console.log("response", response);

        //                 return { data: response };
        //             } else {
        //                 return { error: localResponse.result.error };
        //             }
        //         } catch (error) {
        //             return { error: error.message };
        //         }
        //     },
        // }),
        collectionRequest: builder.mutation({
            async queryFn(args) {
                const {
                    collectionRequestName,
                    collectionRequestSymbol,
                    collectionRequestCreator,
                    collectionRequestDescription,
                    collectionRequestCategory,
                    collectionRequestSupply,
                    collectionRequestUriList,
                    collectionRequestMintPrice,
                    collectionRequestRoyalityPerc,
                    collectionRequestRoyalityAddress,
                    collectionRequestCoverImgUrl,
                    collectionRequestBannerImgUrl,
                    collectionRequestStartDate,
                    collectionRequesEndDate,
                    collectionRequestEnableFreeMint,
                    collectionRequestEnableWl,
                    collectionRequestEnablePresale,
                    collectionRequestEnableAirdrop,
                    collectionRequestPolicy,
                    walletName,
                    wcClient,
                    wcSession,
                } = args;
                console.log(args);

                // Get WalletConnect client and session
                // const { client: wcClient, session: wcSession } = useWalletConnectClient();
                // console.log("wcClient", wcClient);
                // console.log("wcSession", wcSession);

                const launchFee = await getLaunchFee();
                console.log("launchFee", launchFee);
                const primeRole = await getPrimeRoleUsers();
                console.log("primeRole", primeRole);
                const discountRole = await getDiscountRoleUsers();
                console.log("discountRole", discountRole);
                const discountRate = await getDiscountRate();
                console.log("discountRate", discountRate);
                const discountFee = (launchFee * (1 - discountRate));
                console.log("discountFee", discountFee);



                const account = collectionRequestCreator;
                console.log("account", account);

                const primeRoleArray = primeRole.split(" ");
                const discountRoleArray = discountRole.split(" ");

                let decimalPrice;
                const calculateDecimal = (price) => {
                  const priceString = price.toString();
                  const priceArray = priceString.split(".");
                  if (priceArray.length === 1) {
                    decimalPrice = `${priceArray[0]}.0`;
                  } else {
                    decimalPrice = priceString;
                  }
                };
                calculateDecimal(collectionRequestMintPrice);
                console.log("decimalPrice", decimalPrice);


                let royalityPercentage;
                const calculateRoyalityPercentage = (royality) => {
                    royalityPercentage = royality / 100;
                };
                calculateRoyalityPercentage(collectionRequestRoyalityPerc);


                const publicKey = account.slice(2, account.length);
                console.log(publicKey);
                const guard = { keys: [publicKey], pred: "keys-all" };

                const pactCode = `(free.lptest001.nft-collection-request 
                ${JSON.stringify(collectionRequestName)}
                ${JSON.stringify(collectionRequestSymbol)}  
                ${JSON.stringify(account)}        
                (read-keyset  "guard")
                ${JSON.stringify(collectionRequestDescription)}
                ${JSON.stringify(collectionRequestCategory)}
                ${collectionRequestSupply}
                ${JSON.stringify(collectionRequestUriList)}
                ${decimalPrice}
                ${royalityPercentage}
                ${JSON.stringify(collectionRequestRoyalityAddress)}
                ${JSON.stringify(collectionRequestCoverImgUrl)}
                ${JSON.stringify(collectionRequestBannerImgUrl)}
                ${JSON.stringify(collectionRequestStartDate)}
                (${collectionRequestStartDate})
                ${JSON.stringify(collectionRequesEndDate)}       
                (${collectionRequesEndDate}) 
                ${collectionRequestEnableFreeMint}                 
                ${collectionRequestEnableWl} 
                ${collectionRequestEnablePresale} 
                ${collectionRequestEnableAirdrop} 
                ${JSON.stringify(collectionRequestPolicy)}
                )
                `;

                console.log(pactCode);
                let txn;

                if (primeRoleArray.includes(account)) {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                } else if (discountRoleArray.includes(account)) {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability("coin.TRANSFER", account, admin, discountFee),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                } else {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability("coin.TRANSFER", account, admin, launchFee),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                }

                console.log("updateMintTime", txn);

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "EckoWallet") {
                            console.log("ECKO");
                            const walletstatus = await fetchData();
                            if (walletstatus) {
                                signedTx = await eckoWallet(txn);
                            } else {
                                return { error: "Wallet not connected" };
                            }

                            // signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            console.log("Chainweaver");

                            signedTx = await signWithChainweaver(txn);
                        } else if (walletName === "WalletConnect") {
                            console.log("WalletConnect");
                            if (wcClient && wcSession) {
                                const signWithWalletConnect = createWalletConnectSign(
                                    wcClient,
                                    wcSession,
                                    "kadena:testnet04"
                                );
                                signedTx = await signWithWalletConnect(txn);
                            } else {
                                return { error: "WalletConnect not initialized" };
                            }
                        }

                        const response = await signFunction(signedTx);
                        console.log("response", response);

                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
        getLaunchFee: builder.query({
            async queryFn() {
                const pactCode = `(free.lptest001.get-collection-launch-fee)`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(txn, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        getPrimeRoleUsers: builder.query({
            async queryFn() {
                const pactCode = `(free.lptest001.get-prime-role)`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(txn, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        getDiscountRoleUsers: builder.query({
            async queryFn() {
                const pactCode = `(free.lptest001.get-discount-role)`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(txn, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        getDiscountRate: builder.query({
            async queryFn() {
                const pactCode = `(free.lptest001.get-collection-discount-fee)`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                const response = await client.local(txn, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        getColCreator: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.lptest001.get-collection-creator ${JSON.stringify(
                    colName
                )})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: "1" })
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkPublic: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.lptest001.check-public ${JSON.stringify(
                    colName
                )})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: "1" })
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),
        checkWl: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.lptest001.check-whitelist ${JSON.stringify(
                    colName
                )})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: "1" })
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkPresale: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.lptest001.check-presale ${JSON.stringify(
                    colName
                )})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: "1" })
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),
        checkPublicPrice: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.lptest001.get-mint-price ${JSON.stringify(
                    colName
                )})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: "1" })
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkWlPrice: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.lptest001.get-wl-price ${JSON.stringify(
                    colName
                )})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: "1" })
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        checkPresalePrice: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.lptest001.get-presale-price ${JSON.stringify(
                    colName
                )})`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: "1" })
                    .createTransaction();

                const response = await client.local(transaction, {
                    preflight: false,
                    signatureVerification: false,
                });

                if (response.result.status === "success") {
                    return { data: response.result.data };
                } else {
                    return { error: response.result.error };
                }
            },
        }),

        reserveTokens: builder.mutation({
            async queryFn(args, api, extraOptions, baseQuery) {
                const {
                    reseveTknColName,
                    reserverAcc,
                    reserveTknAmount,
                    walletName,
                    wcClient,
                    wcSession,
                } = args;
                console.log(args);
                // Use the api object to dispatch other mutations
                const chkPublic = await api
                    .dispatch(
                        launchpadApi.endpoints.checkPublic.initiate({
                            colName: reseveTknColName,
                        })
                    )
                    .unwrap();
                console.log("chkPublic", chkPublic);
                const chkWl = await api
                    .dispatch(
                        launchpadApi.endpoints.checkWl.initiate({
                            colName: reseveTknColName,
                        })
                    )
                    .unwrap();
                console.log("chkWl", chkWl);
                const chkPresale = await api
                    .dispatch(
                        launchpadApi.endpoints.checkPresale.initiate({
                            colName: reseveTknColName,
                        })
                    )
                    .unwrap();
                console.log("chkPresale", chkPresale);

                let price;
                if (chkPresale) {
                    price = await api
                        .dispatch(
                            launchpadApi.endpoints.checkPresalePrice.initiate({
                                colName: reseveTknColName,
                            })
                        )
                        .unwrap();
                } else if (chkWl) {
                    price = await api
                        .dispatch(
                            launchpadApi.endpoints.checkWlPrice.initiate({
                                colName: reseveTknColName,
                            })
                        )
                        .unwrap();
                } else if (chkPublic) {
                    price = await api
                        .dispatch(
                            launchpadApi.endpoints.checkPublicPrice.initiate({
                                colName: reseveTknColName,
                            })
                        )
                        .unwrap();
                } else {
                    throw new Error("Sale is not live");
                }

                console.log("Determined price:", price);

                const account = reserverAcc;
                const creator = await api
                    .dispatch(
                        launchpadApi.endpoints.getColCreator.initiate({
                            colName: reseveTknColName,
                        })
                    )
                    .unwrap();
                console.log("creator", creator);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                let txn;
                let mintPrice = reserveTknAmount * price;
                console.log(
                    "mintPrice",
                    mintPrice,
                    "Calculation",
                    "reserveTknAmount",
                    reserveTknAmount,
                    "*",
                    "price",
                    price
                );

                const pactCode = `(free.lptest001.reserve-token ${JSON.stringify(
                    reseveTknColName
                )} ${JSON.stringify(account)} ${reserveTknAmount})`;
                console.log(pactCode);

                if (account == creator) {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability("free.lptest001.MINT-NFT", account),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                } else {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability("free.lptest001.MINT-NFT", account),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                creator,
                                mintPrice
                            ),
                        ])
                        .setMeta({
                            creationTime: creationTime(),
                            sender: account,
                            gasLimit: 150000,
                            chainId: CHAIN_ID,
                            ttl: 28800,
                        })
                        .setNetworkId(NETWORKID)
                        .createTransaction();
                }

                console.log("updateMintTime", txn);
                console.log("sign");

                const localResponse = await client.local(txn, {
                    preflight: false,
                    signatureVerification: false,
                });
                console.log("localResponse", localResponse);

                if (localResponse.result.status == "success") {
                    let signedTx;
                    if (walletName == "Ecko Wallet") {
                        signedTx = await eckoWallet(txn);
                    }
                    if (walletName == "Chainweaver") {
                        signedTx = await signWithChainweaver(txn);
                    } else if (walletName == "WalletConnect") {
                        if (wcClient && wcSession) {
                            const signWithWalletConnect = createWalletConnectSign(
                                wcClient,
                                wcSession,
                                "kadena:testnet04"
                            );
                            signedTx = await signWithWalletConnect(txn);
                        } else {
                            return { error: "WalletConnect not initialized" };
                        }
                    }
                    
                    console.log("sign1");
                    const response = await signFunction(signedTx);
                    if (response.result.status == "success") {
                        return { data: response };
                    } else {
                        console.log("Error in response", response.result.error);
                    }
                } else {
                    console.log(
                        "Error in local response",
                        localResponse.result.error
                    );
                }
            },
        }),
        balance: builder.mutation({
            async queryFn(args) {
              try {
                const { account } = args;
                console.log("account", account);
          
                const pactCode = `(coin.get-balance (read-string "account"))`;
                const transaction = Pact.builder
                  .execution(pactCode)
                  .setMeta({ chainId: "1" })
                  .addData("account", account)
                  .setNetworkId(NETWORKID)
                  .createTransaction();
          
                const staticClient = createClient(API_HOST);
          
                const response = await staticClient.local(transaction, {
                  preflight: false,
                  signatureVerification: false,
                });
          
                console.log(response);
                return { data: response.result.data }; 
              } catch (error) {
                return { error: error.toString() };
              }
            },
          }),
          
      
          transfer: builder.mutation({
            async queryFn(args) {
              const { receiver, amount, wallet } = args;
              console.log("receiver", receiver);
              console.log("amount", amount);
              const sender = admin;
              const receiverKey = receiver.slice(2, receiver.length);
              const senderKey = sender.slice(2, receiver.length);
              const guard = { keys: [receiverKey], pred: "keys-all" };
      
              const pactCode = `(coin.transfer-create (read-string "sender") (read-string "receiver") (read-keyset "guard") ${parseFloat(
                amount
              ).toFixed(1)})`;
              const txn = Pact.builder
                .execution(pactCode)
                .addData("guard", guard)
                .addData("sender", admin)
                .addData("receiver", receiver)
                .addSigner(senderKey, (withCapability) => [
                  withCapability("coin.GAS"),
                  withCapability("coin.TRANSFER", sender, receiver, amount),
                ])
                .setMeta({ chainId: "1", sender })
                .setNetworkId(NETWORKID)
                .createTransaction();
      
              console.log("transaction", txn);
      
              try {
                const localResponse = await client.local(txn, {
                  preflight: false,
                  signatureVerification: false,
                });
      
                if (localResponse.result.status === "success") {
                  let signedTx;
                  if (wallet === "ecko") {
                    signedTx = await eckoWallet(txn);
                  } else if (wallet === "CW") {
                    signedTx = await signWithChainweaver(txn);
                  }
      
                  const response = await signFunction(signedTx);
                  return { data: response };
                } else {
                  return { error: localResponse.result.error };
                }
              } catch (error) {
                return { error: error.message };
              }
            },
          }),

          getTokenDetails: builder.mutation({
            async queryFn(args) {
                const { account } = args;
                console.log("account", account);
                const pactCode = `(free.mp-ng-003.get-token-details ${JSON.stringify(account)})`;
                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({
                        creationTime: creationTime(),
                        ttl: 28800,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        gasPrice: 0.00000001,
                        sender: account,
                    })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const response = await client.local(transaction, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (response.result.status === 'success') {
                        return { data: response.result.data };
                    } else {
                        return { error: response.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),



        















    }),
});

export const {
    useCollectionRequestMutation,
    useGetLaunchFeeQuery,
    useGetPrimeRoleUsersQuery,
    useGetDiscountRoleUsersQuery,
    useGetDiscountRateQuery,
    useGetColCreatorMutation,
    useCheckPublicMutation,
    useCheckWlMutation,
    useCheckPresaleMutation,
    useCheckPublicPriceMutation,
    useCheckWlPriceMutation,
    useCheckPresalePriceMutation,
    useReserveTokensMutation,
    useBalanceMutation,
    useTransferMutation,
    useGetTokenDetailsMutation,
} = launchpadApi;
