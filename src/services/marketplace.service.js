// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {
//     createClient,
//     Pact,
//     createSignWithChainweaver,
//     createEckoWalletQuicksign,
// } from "@kadena/client";
// import {
//     NETWORKID,
//     GAS_PRICE,
//     GAS_LIMIT,
//     creationTime,
//     CHAIN_ID,
//     NETWORK,
// } from "../constants/contextConstants";

// const API_HOST = NETWORK;
// const client = createClient(API_HOST);
// const signWithChainweaver = createSignWithChainweaver();
// const eckoWallet = createEckoWalletQuicksign();

// const admin = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";

// const signFunction = async (signedTx) => {
//     const transactionDescriptor = await client.submit(signedTx);
//     console.log("transactionDescriptor", transactionDescriptor);

//     const response = await client.listen(transactionDescriptor, {});
//     console.log("response", response);
//     return response;
// };

// const getFee = async () => {
//     const pactCode = `(free.mp-ng-003.get-fee "mint")`;

//     const transaction = Pact.builder
//         .execution(pactCode)
//         .setMeta({ chainId: CHAIN_ID })
//         .setNetworkId(NETWORKID)
//         .createTransaction();

//     const response = await client.local(transaction, {
//         preflight: false,
//         signatureVerification: false,
//     });

//     if (response.result.status === "success") {
//         let fee = response.result.data;
//         console.log(fee);
//         return fee;
//     }
// };

// export const marketplaceApi = createApi({
//     reducerPath: "marketplaceApi",
//     baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
//     endpoints: (builder) => ({
//         launchCollection: builder.mutation({
//             async queryFn(args) {
//                 const {
//                     collectionRequestName,
//                     collectionRequestSymbol,
//                     collectionRequestCreator,
//                     collectionRequestDescription,
//                     collectionRequestCategory,
//                     collectionRequestRoyalityPerc,
//                     collectionRequestRoyalityAddress,
//                     collectionRequestCoverImgUrl,
//                     collectionRequestBannerImgUrl,
//                     collectionRequestStartDate,
//                     collectionRequesEndDate,
//                     collectionRequestEnableAirdrop,
//                     collectionRequestPolicy,
//                     collectionRequestUriList,
//                     collectionRequestSupply,
//                     walletName
//                 } = args;
//                 console.log(args);

//                 const account = collectionRequestCreator;
//                 const publicKey = account.slice(2, account.length);
//                 const guard = { keys: [publicKey], pred: "keys-all" };

//                 const pactCode = `(free.mp-ng-003.launch-collection
//                     ${JSON.stringify(collectionRequestName)}
//                     ${JSON.stringify(collectionRequestSymbol)}
//                     ${JSON.stringify(account)}
//                     (read-keyset "guard")
//                     ${JSON.stringify(collectionRequestDescription)}
//                     ${JSON.stringify(collectionRequestCategory)}
//                     ${collectionRequestSupply}
//                     ${JSON.stringify(collectionRequestUriList)}
//                     1.0
//                     ${collectionRequestRoyalityPerc}
//                     ${JSON.stringify(collectionRequestRoyalityAddress)}
//                     ${JSON.stringify(collectionRequestCoverImgUrl)}
//                     ${JSON.stringify(collectionRequestBannerImgUrl)}
//                     ${JSON.stringify(collectionRequestStartDate)}
//                     (${collectionRequestStartDate})
//                     ${JSON.stringify(collectionRequesEndDate)}
//                     (${collectionRequesEndDate})
//                     ${collectionRequestEnableAirdrop}
//                     ${JSON.stringify(collectionRequestPolicy)}
//                 )`;
//                 console.log(pactCode);
//                 const txn = Pact.builder
//                     .execution(pactCode)
//                     .addData("guard", guard)
//                     .addSigner(publicKey)
//                     .setMeta({
//                         creationTime: creationTime(),
//                         sender: account,
//                         gasLimit: 150000,
//                         chainId: CHAIN_ID,
//                         ttl: 28800,
//                     })
//                     .setNetworkId(NETWORKID)
//                     .createTransaction();

//                 try {
//                     const localResponse = await client.local(txn, {
//                         preflight: false,
//                         signatureVerification: false,
//                     });

//                     if (localResponse.result.status === "success") {
//                         console.log("localResponse", localResponse);
//                         let signedTx;
//                         if (walletName === "Ecko Wallet") {
//                             console.log("Ecko Wallet");
//                             signedTx = await eckoWallet(txn);
//                         } else if (walletName === "Chainweaver") {
//                             signedTx = await signWithChainweaver(txn);
//                         }
//                         const response = await signFunction(signedTx);
//                         if (response.result.data === true) {
//                             console.log(`Collection: ${collectionRequestName} Requested Successfully`);
//                         }
//                         return { data: response };
//                     } else {
//                         return { error: localResponse.result.error };
//                     }
//                 } catch (error) {
//                     return { error: error.message };
//                 }
//             },
//         }),

//         reserveTokens: builder.mutation({
//             async queryFn(args) {
//                 const { reseveTknColName, reserverAcc, reserveTknAmount, wallet } = args;
//                 const fee = await getFee();
//                 const price = await checkPublicPrice(reseveTknColName);

//                 const account = reserverAcc;
//                 const creator = await getColCreator(reseveTknColName);
//                 const publicKey = account.slice(2, account.length);
//                 const guard = { keys: [publicKey], pred: "keys-all" };

//                 let mintPrice = reserveTknAmount * price;
//                 let mintFee = mintPrice * fee;

//                 const pactCode = `(free.mp-ng-003.reserve-token ${JSON.stringify(reseveTknColName)} ${JSON.stringify(account)} ${reserveTknAmount})`;

//                 let txn;
//                 if (account === creator) {
//                     txn = Pact.builder
//                         .execution(pactCode)
//                         .addData("guard", guard)
//                         .addSigner(publicKey, (withCapability) => [
//                             withCapability("coin.GAS"),
//                             withCapability("free.mp-ng-003.MINT-NFT", account),
//                             withCapability("coin.TRANSFER", account, admin, mintFee),
//                         ])
//                         .setMeta({
//                             creationTime: creationTime(),
//                             sender: account,
//                             gasLimit: 150000,
//                             chainId: CHAIN_ID,
//                             ttl: 28800,
//                         })
//                         .setNetworkId(NETWORKID)
//                         .createTransaction();
//                 } else {
//                     txn = Pact.builder
//                         .execution(pactCode)
//                         .addData("guard", guard)
//                         .addSigner(publicKey, (withCapability) => [
//                             withCapability("coin.GAS"),
//                             withCapability("free.mp-ng-003.MINT-NFT", account),
//                             withCapability("coin.TRANSFER", account, admin, mintFee),
//                             withCapability("coin.TRANSFER", account, creator, mintPrice),
//                         ])
//                         .setMeta({
//                             creationTime: creationTime(),
//                             sender: account,
//                             gasLimit: 150000,
//                             chainId: CHAIN_ID,
//                             ttl: 28800,
//                         })
//                         .setNetworkId(NETWORKID)
//                         .createTransaction();
//                 }

//                 try {
//                     const localResponse = await client.local(txn, {
//                         preflight: false,
//                         signatureVerification: false,
//                     });

//                     if (localResponse.result.status === "success") {
//                         let signedTx;
//                         if (wallet === "ecko") {
//                             signedTx = await eckoWallet(txn);
//                         } else if (wallet === "CW") {
//                             signedTx = await signWithChainweaver(txn);
//                         }
//                         const response = await signFunction(signedTx);
//                         return { data: response };
//                     } else {
//                         return { error: localResponse.result.error };
//                     }
//                 } catch (error) {
//                     return { error: error.message };
//                 }
//             },
//         }),

//     }),
// });

// export const {
//     useLaunchCollectionMutation,
//     useReserveTokensMutation,
// } = marketplaceApi;

// // Helper functions
// const checkPublicPrice = async (colName) => {
//     const pactCode = `(free.mp-ng-003.get-mint-price ${JSON.stringify(colName)})`;

//     const transaction = Pact.builder
//         .execution(pactCode)
//         .setMeta({ chainId: CHAIN_ID })
//         .setNetworkId(NETWORKID)
//         .createTransaction();

//     const response = await client.local(transaction, {
//         preflight: false,
//         signatureVerification: false,
//     });

//     if (response.result.status === "success") {
//         return response.result.data;
//     } else {
//         throw new Error("Failed to get public price");
//     }
// };

// const getColCreator = async (colName) => {
//     const pactCode = `(free.mp-ng-003.get-collection-creator ${JSON.stringify(colName)})`;

//     const transaction = Pact.builder
//         .execution(pactCode)
//         .setMeta({ chainId: CHAIN_ID })
//         .setNetworkId(NETWORKID)
//         .createTransaction();

//     const response = await client.local(transaction, {
//         preflight: false,
//         signatureVerification: false,
//     });

//     if (response.result.status === "success") {
//         return response.result.data;
//     } else {
//         throw new Error("Failed to get collection creator");
//     }
// };

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    createClient,
    Pact,
    createSignWithChainweaver,
    createEckoWalletQuicksign,
} from "@kadena/client";
import {
    NETWORKID,
    GAS_PRICE,
    GAS_LIMIT,
    creationTime,
    CHAIN_ID,
    NETWORK,
} from "../constants/contextConstants";

const API_HOST = NETWORK;
const client = createClient(API_HOST);
const signWithChainweaver = createSignWithChainweaver();
const eckoWallet = createEckoWalletQuicksign();

const admin =
    "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";

const signFunction = async (signedTx) => {
    const transactionDescriptor = await client.submit(signedTx);
    console.log("transactionDescriptor", transactionDescriptor);

    const response = await client.listen(transactionDescriptor, {});
    console.log("response", response);
    return response;
};

const coin_fungible = {
    refSpec: [{ name: "fungible-v2" }],
    refName: { name: "coin" },
  };

const getFee = async () => {
    const pactCode = `(free.mp-ng-003.get-fee "mint")`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        let fee = response.result.data;
        console.log(fee);
        return fee;
    }
};

export const marketplaceApi = createApi({
    reducerPath: "marketplaceApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
    endpoints: (builder) => ({
        launchCollection: builder.mutation({
            async queryFn(args) {
                const {
                    collectionRequestName,
                    collectionRequestSymbol,
                    collectionRequestCreator,
                    collectionRequestDescription,
                    collectionRequestCategory,
                    collectionRequestRoyalityPerc,
                    collectionRequestRoyalityAddress,
                    collectionRequestCoverImgUrl,
                    collectionRequestBannerImgUrl,
                    collectionRequestStartDate,
                    collectionRequesEndDate,
                    collectionRequestEnableAirdrop,
                    collectionRequestPolicy,
                    collectionRequestUriList,
                    collectionRequestSupply,
                    walletName,
                } = args;
                console.log(walletName);

                const account = collectionRequestCreator;
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                const pactCode = `(free.mp-ng-003.launch-collection
                    ${JSON.stringify(collectionRequestName)}  
                    ${JSON.stringify(collectionRequestSymbol)}  
                    ${JSON.stringify(account)}        
                    (read-keyset "guard")
                    ${JSON.stringify(collectionRequestDescription)}
                    ${JSON.stringify(collectionRequestCategory)}
                    ${collectionRequestSupply}
                    ${JSON.stringify(collectionRequestUriList)}
                    1.0
                    ${collectionRequestRoyalityPerc}
                    ${JSON.stringify(collectionRequestRoyalityAddress)}
                    ${JSON.stringify(collectionRequestCoverImgUrl)}
                    ${JSON.stringify(collectionRequestBannerImgUrl)}
                    ${JSON.stringify(collectionRequestStartDate)}
                    (${collectionRequestStartDate})
                    ${JSON.stringify(collectionRequesEndDate)}       
                    (${collectionRequesEndDate})
                    ${collectionRequestEnableAirdrop} 
                    ${JSON.stringify(collectionRequestPolicy)}
                )`;

                const txn = Pact.builder
                    .execution(pactCode)
                    .addData("guard", guard)
                    .addSigner(publicKey)
                    .setMeta({
                        creationTime: creationTime(),
                        sender: account,
                        gasLimit: 150000,
                        chainId: CHAIN_ID,
                        ttl: 28800,
                    })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            console.log("Ecko Wallet");
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
                            console.log("Chainweaver");
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

        marketReserveTokens: builder.mutation({
            async queryFn(args) {
                const {
                    reseveTknColName,
                    reserverAcc,
                    reserveTknAmount,
                    walletName,
                } = args;
                console.log(args);
                const fee = await getFee();
                const price = await checkPublicPrice(reseveTknColName);

                const account = reserverAcc;
                const creator = await getColCreator(reseveTknColName);
                console.log(creator);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                let mintPrice = reserveTknAmount * price;
                let mintFee = mintPrice * fee;

                const pactCode = `(free.mp-ng-003.reserve-token ${JSON.stringify(
                    reseveTknColName
                )} ${JSON.stringify(account)} ${reserveTknAmount})`;

                let txn;
                if (account === creator) {
                    console.log("Creator");
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability("free.mp-ng-003.MINT-NFT", account),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                admin,
                                mintFee
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
                } else {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability("free.mp-ng-003.MINT-NFT", account),
                            withCapability(
                                "coin.TRANSFER",
                                account,
                                admin,
                                mintFee
                            ),
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

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });
                    console.log(localResponse.result);

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            console.log("Ecko Wallet");
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
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

        unrevealedTokens: builder.mutation({
            async queryFn(args) {
                const { unrevealedColName, wallet } = args;
                console.log(unrevealedColName);
                const account = await getColCreator(unrevealedColName);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                const pactCode = `(free.mp-ng-003.get-unrevealed-tokens-for-collection ${JSON.stringify(
                    unrevealedColName
                )} (read-keyset  "guard"))`;

                const txn = Pact.builder
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

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        console.log(localResponse.result.data);
                        return { data: localResponse.result.data };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),
        checkMarketPublic: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.mp-ng-003.check-public ${JSON.stringify(
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
        checkMarketPublicPrice: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                console.log(args);
                const pactCode = `(free.mp-ng-003.get-mint-price ${JSON.stringify(
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

        getRoyaltyAddress: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                const pactCode = `(free.mp-ng-003.get-royalty-info ${JSON.stringify(
                    colName
                )} "account")`;
                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const response = await client.local(transaction, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (response.result.status === "success") {
                        return { data: response.result.data };
                    } else {
                        return { error: response.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        getRoyaltyPerc: builder.mutation({
            async queryFn(args) {
                const { colName } = args;
                const pactCode = `(free.mp-ng-003.get-royalty-info ${JSON.stringify(
                    colName
                )} "rate")`;

                const transaction = Pact.builder
                    .execution(pactCode)
                    .setMeta({ chainId: CHAIN_ID })
                    .setNetworkId(NETWORKID)
                    .createTransaction();

                try {
                    const response = await client.local(transaction, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (response.result.status === "success") {
                        return { data: response.result.data };
                    } else {
                        return { error: response.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        syncWithNg: builder.mutation({
            async queryFn(args) {
                const { syncColName, syncTkns, walletName } = args;
                console.log(args);

                const colId = await collectionId(syncColName);
                const account = await getColCreator(syncColName);

                const royaltyAddress = await getRoyaltyAddress({
                    colName: syncColName,
                });
                const royaltyPerc = await getRoyaltyPerc({
                    colName: syncColName,
                });

                const publicKey = account.slice(2, account.length);
                const publicKeyRoyalty = royaltyAddress.slice(
                    2,
                    royaltyAddress.length
                );

                const guard = { keys: [publicKey], pred: "keys-all" };
                const guardRoyalty = {
                    keys: [publicKeyRoyalty],
                    pred: "keys-all",
                };
                const formattedSyncTkns = `[${syncTkns}]`;


                const pactCode = `(free.mp-ng-003.bulk-sync-with-ng ${JSON.stringify(
                    syncColName
                )} ${formattedSyncTkns} )`;
                let txn;
                console.log(royaltyAddress, royaltyPerc);
                console.log(royaltyPerc > 0.0 && royaltyPerc <= 1.0);

                if (
                    royaltyAddress !== "" &&
                    royaltyPerc > 0.0 &&
                    royaltyPerc <= 1.0
                ) {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addData("marmalade_collection", { id: colId })
                        .addData("marmalade_royalty", {
                            creator_acct: royaltyAddress,
                            creator_guard: guardRoyalty,
                            rate: royaltyPerc,
                            currencies: [coin_fungible],
                        })
                        .addSigner(publicKey)
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
                        .addData("marmalade_collection", { id: colId })
                        .addSigner(publicKey)
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

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });
                    console.log(localResponse.result);

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            console.log("Ecko Wallet");
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
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

        createAirdrop: builder.mutation({
            async queryFn(args) {
                const { createAirdropCol, accounts, wallet } = args;
                const account = await getColCreator(createAirdropCol);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                const pactCode = `(free.mp-ng-003.create-airdrop  
                    ${JSON.stringify(createAirdropCol)} 
                    (read-keyset  "guard") 
                    ${JSON.stringify(accounts)} )`;

                const txn = Pact.builder
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

        airdropNft: builder.mutation({
            async queryFn(args) {
                const { airdropCol, tokens, wallet } = args;
                const account = await getColCreator(airdropCol);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                const pactCode = `(free.mp-ng-003.bulk-airdrop ${JSON.stringify(
                    airdropCol
                )} 
                    ${JSON.stringify(tokens)} 
                    ${JSON.stringify(account)} 
                    (read-keyset  "guard"))`;

                const txnBuilder = Pact.builder
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
                    .setNetworkId(NETWORKID);

                // Adding signer with all required capabilities for each token
                tokens.forEach((item) => {
                    txnBuilder.addSigner(publicKey, (withCapability) => [
                        withCapability(
                            `n_442d3e11cfe0d39859878e5b1520cd8b8c36e5db.ledger.TRANSFER`,
                            item["token-id"],
                            account,
                            item["account"],
                            1.0
                        ),
                    ]);
                });

                const txn = txnBuilder.createTransaction();

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
        launchSingleNft: builder.mutation({
            async queryFn(args) {
                const {
                    account,
                    royaltyAccount,
                    nftName,
                    nftUri,
                    nftPolicy,
                    nftPrice,
                    royaltyPerc,
                    walletName,
                } = args;
                console.log(args);

                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                const pactCode = `(free.mp-ng-003.launch-single-nft
                    ${JSON.stringify(account)}
                    (read-keyset "guard")
                    ${JSON.stringify(nftName)}
                    ${JSON.stringify(nftUri)}
                    ${JSON.stringify(nftPolicy)}
                    ${nftPrice}
                    ${royaltyPerc}
                    ${JSON.stringify(royaltyAccount)})`;

                const txn = Pact.builder
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

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
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

        reserveSingleNft: builder.mutation({
            async queryFn(args) {
                const { nftName, reserverAcc, walletName } = args;
                console.log(args);

                const fee = await getFee();
                const price = await checkSingleNftPrice(nftName);

                const account = reserverAcc;
                const creator = await getSingleNftCreator(nftName);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                let mintFee = price * fee;

                const pactCode = `(free.mp-ng-003.reserve-single-nft ${JSON.stringify(account)} (read-keyset "guard") ${JSON.stringify(nftName)})`;

                let txn;
                if (account === creator) {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability("coin.TRANSFER", account, admin, mintFee),
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
                            withCapability("coin.TRANSFER", account, admin, mintFee),
                            withCapability("coin.TRANSFER", account, creator, price),
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

                try {
                    const localResponse = await client.local(txn, {
                        preflight: false,
                        signatureVerification: false,
                    });

                    if (localResponse.result.status === "success") {
                        let signedTx;
                        if (walletName === "Ecko Wallet") {
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "Chainweaver") {
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
    }),
});

export const {
    useLaunchCollectionMutation,
    useMarketReserveTokensMutation,
    useUnrevealedTokensMutation,
    useCheckMarketPublicMutation,
    useCheckMarketPublicPriceMutation,
    useGetRoyaltyAddressMutation,
    useGetRoyaltyPercMutation,
    useSyncWithNgMutation,
    useCreateAirdropMutation,
    useAirdropNftMutation,
    useLaunchSingleNftMutation,
    useReserveSingleNftMutation,
} = marketplaceApi;

// Helper functions
const checkPublicPrice = async (colName) => {
    const pactCode = `(free.mp-ng-003.get-mint-price ${JSON.stringify(
        colName
    )})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get public price");
    }
};

const getColCreator = async (colName) => {
    const pactCode = `(free.mp-ng-003.get-collection-creator ${JSON.stringify(
        colName
    )})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get collection creator");
    }
};

const getRoyaltyAddress = async ({ colName }) => {
    const pactCode = `(free.mp-ng-003.get-royalty-info ${JSON.stringify(
        colName
    )} "account")`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get royalty address");
    }
};

const getRoyaltyPerc = async ({ colName }) => {
    const pactCode = `(free.mp-ng-003.get-royalty-info ${JSON.stringify(
        colName
    )} "rate")`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get royalty percentage");
    }
};

const collectionId = async (colNameId) => {
    const pactCode = `(free.mp-ng-003.get-collection-id ${JSON.stringify(
        colNameId
    )})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        let colId = response.result.data;
        return colId;
    } else {
        throw new Error("Failed to get collection ID");
    }
};

const checkSingleNftPrice = async (nftName) => {
    const pactCode = `(free.mp-ng-003.get-single-nft-mint-price ${JSON.stringify(nftName)})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get single NFT price");
    }
};

const getSingleNftCreator = async (nftName) => {
    const pactCode = `(free.mp-ng-003.get-single-nft-creator ${JSON.stringify(nftName)})`;

    const transaction = Pact.builder
        .execution(pactCode)
        .setMeta({ chainId: CHAIN_ID })
        .setNetworkId(NETWORKID)
        .createTransaction();

    const response = await client.local(transaction, {
        preflight: false,
        signatureVerification: false,
    });

    if (response.result.status === "success") {
        return response.result.data;
    } else {
        throw new Error("Failed to get single NFT creator");
    }
};
