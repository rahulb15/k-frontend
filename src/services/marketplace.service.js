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

const admin = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";

const signFunction = async (signedTx) => {
    const transactionDescriptor = await client.submit(signedTx);
    console.log("transactionDescriptor", transactionDescriptor);

    const response = await client.listen(transactionDescriptor, {});
    console.log("response", response);
    return response;
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
                    walletName
                } = args;
                console.log(args);

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
                console.log(pactCode);
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
                        console.log("localResponse", localResponse);
                        let signedTx;
                        if (walletName === "ecko") {
                            console.log("ecko");
                            signedTx = await eckoWallet(txn);
                        } else if (walletName === "CW") {
                            signedTx = await signWithChainweaver(txn);
                        }
                        const response = await signFunction(signedTx);
                        if (response.result.data === true) {
                            console.log(`Collection: ${collectionRequestName} Requested Successfully`);
                        }
                        return { data: response };
                    } else {
                        return { error: localResponse.result.error };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        reserveTokens: builder.mutation({
            async queryFn(args) {
                const { reseveTknColName, reserverAcc, reserveTknAmount, wallet } = args;
                const fee = await getFee();
                const price = await checkPublicPrice(reseveTknColName);

                const account = reserverAcc;
                const creator = await getColCreator(reseveTknColName);
                const publicKey = account.slice(2, account.length);
                const guard = { keys: [publicKey], pred: "keys-all" };

                let mintPrice = reserveTknAmount * price;
                let mintFee = mintPrice * fee;

                const pactCode = `(free.mp-ng-003.reserve-token ${JSON.stringify(reseveTknColName)} ${JSON.stringify(account)} ${reserveTknAmount})`;

                let txn;
                if (account === creator) {
                    txn = Pact.builder
                        .execution(pactCode)
                        .addData("guard", guard)
                        .addSigner(publicKey, (withCapability) => [
                            withCapability("coin.GAS"),
                            withCapability("free.mp-ng-003.MINT-NFT", account),
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
                            withCapability("free.mp-ng-003.MINT-NFT", account),
                            withCapability("coin.TRANSFER", account, admin, mintFee),
                            withCapability("coin.TRANSFER", account, creator, mintPrice),
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

    }),
});

export const {
    useLaunchCollectionMutation,
    useReserveTokensMutation,
} = marketplaceApi;

// Helper functions
const checkPublicPrice = async (colName) => {
    const pactCode = `(free.mp-ng-003.get-mint-price ${JSON.stringify(colName)})`;

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
    const pactCode = `(free.mp-ng-003.get-collection-creator ${JSON.stringify(colName)})`;

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