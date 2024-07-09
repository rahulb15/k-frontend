import {
    createClient,
    Pact,
    createSignWithChainweaver,
    createEckoWalletQuicksign,
  } from "@kadena/client";
  import { event } from "pact-lang-api";
  import { NETWORKID, GAS_PRICE, GAS_LIMIT, creationTime, CHAIN_ID,NETWORK } from "src/constants/contextConstants";
  const API_HOST = NETWORK;
  const client = createClient(API_HOST);
  const signWithChainweaver = createSignWithChainweaver();
  const eckoWallet = createEckoWalletQuicksign();


  const coin_fungible = {
    refSpec: [{ namespace: null, name: "fungible-v2" }],
    refName: { namespace: null, name: "coin" },
  };
  
  const admin =
  "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";
  



  const collectionRequest = async () =>
    // collectionRequestName,
    // collectionRequestSymbol,
    // collectionRequestCreator,
    // collectionRequestDescription,
    // collectionRequestCategory,
    // collectionRequestSupply,
    // collectionRequestUriList,
    // collectionRequestMintPrice,
    // collectionRequestRoyalityPerc,
    // collectionRequestCoverImgUrl,
    // collectionRequestBannerImgUrl,
    // collectionRequestStartDate,
    // collectionRequestStartTime,
    // collectionRequesEndDate,
    // collectionRequestEndTime,
    // collectionRequestEnableFreeMint,
    // collectionRequestEnableWl,
    // collectionRequestEnablePresale,
    // collectionRequestEnableAirdrop,
    // collectionRequestPolicy
    {
      // [
      //   "ipfs://QmSsSuBXoWKYWJWQgaeaMPsKVFbW6GC46u1ijjDzsHNuNC",
      //   "ipfs://QmZF4tUbkZNhskWYt4kmkJsqh7KuoMimqgkXvMvmXzkyQ7",
      //   "ipfs://bafkreicdwftz5igoacayewcpmdzdybgdxeqtp4774pqfdgdit6xixl5jgy",
      //   "ipfs://bafkreibrlhemnw63b2cr7r6o3vs34fsuo77zqmx45tj3ztw7qmrycl5c5q",
      //   "ipfs://bafkreigtyofrxv33njecc5fski5q3nidktksnhugleumjde6sj7v3swljy",
      //   "ipfs://bafkreia5bz3ixnx6g3pnjvtujvahjb5jcm63552p5bdmkrc7xhl4q6vkrm",
      //   "ipfs://bafkreiaw75aajtlkmlhkjeenu6473aqfrtn4nig5etrcu2aapvjv2uf3aa",
      //   "ipfs://bafkreihxlzfjc2chgyz4ao6zlblo774oh6s3tk2duare3625r6r2nacs6y",
      //   "ipfs://bafkreid4uc4baeopme5xupafcy4ey2dm43xdlotq3eapmy672t3mfxoewa",
      //   "ipfs://bafkreih645w5xqpmglc6ejaj2duxyxrlqb7j3cdbwycxkx5r4urbysan2e",
      //   "ipfs://bafkreicd7k5ktdxjvthcm4jp2axarbpiuyvzy2orro4oqvjna2tw3xjiga",
      //   "ipfs://bafkreig6a3mvbn4blkmt3nugiwtbz5ydhtsaqe3wj7qwww6am53mgkwsb4",
      //   "ipfs://bafkreialpb4aacqsdtpifn4e2ulgxcfm5kkcsuifhz2p5iiec4vnrfomtu",
      //   "ipfs://bafkreih6zc7jvmkip7xv4nn4gymuhvo7rlr3r67cxdezif7vozbyfhcjum",
      //   "ipfs://bafkreicgffmo63z2jzdec72nwmetryn4r3g7mxjxzu63zp53lhslkfkboa",
      //   "ipfs://bafkreidsgfcwf5nnle6o7orau2llmfvxw76ckms42dwcgkzqsmbfvxp3ea",
      //   "ipfs://bafkreih6jnvfle4ddshrapwvei6dspeenooz7mq5jrfdpthh7h7nhuyfsm",
      //   "ipfs://bafkreidrejsfgzstowjv326ofeqqkr5b2da6s3wm2t4wqnmwoppamhjgiy"
      // ]

      const collectionRequestName = "K/C-CW-101";
      const collectionRequestSymbol = "";
      const collectionRequestCreator =
        "k:57dd1796e919ac60b91d4b6b345c1676b864f12ee9da10d00991b2a29f2f2b43";
      const collectionRequestDescription = "";
      const collectionRequestCategory = "ART";
      const collectionRequestSupply = 4;
      const collectionRequestUriList = [
        "ipfs://bafkreifabzsykcr23o2xyzovys6olid63oaxrb3i3byzz32caklymlvm5u",
        "ipfs://bafkreic5iyftd6mus6o7llctwpgxyarkcxzz55jiptayot3rya6y3y5teu",
        "ipfs://bafkreid3gpivbqhqcjvpcol5l7zpn4oj2na5dthygsrlkdxyjmnm4qaqta",
        "ipfs://bafkreicm7uen4kb3y7nwoexrsx7sre6ckfmtbfufslidbesfsbzfi2lguy",
      ];
      const collectionRequestMintPrice = 1.0;
      const collectionRequestRoyalityPerc = 10;
      const collectionRequestCoverImgUrl = "";
      const collectionRequestBannerImgUrl = "";
      const collectionRequestStartDate = "";

      const collectionRequesEndDate = "";
      const collectionRequestEnableFreeMint = false;
      const collectionRequestEnableWl = true;
      const collectionRequestEnablePresale = true;
      const collectionRequestEnableAirdrop = false;
      const collectionRequestPolicy =
        "COLLECTION INSTANT-MINT MARKETPLACE FIXED-SALE";

      console.log(
        collectionRequestName,
        collectionRequestSymbol,
        collectionRequestCreator,
        collectionRequestDescription,
        collectionRequestCategory,
        collectionRequestSupply,
        collectionRequestUriList,
        collectionRequestMintPrice,
        collectionRequestRoyalityPerc,
        collectionRequestCoverImgUrl,
        collectionRequestBannerImgUrl,
        collectionRequestStartDate,
        collectionRequestStartTime,
        collectionRequesEndDate,
        collectionRequestEndTime,
        collectionRequestEnableFreeMint,
        collectionRequestEnableWl,
        collectionRequestEnablePresale,
        collectionRequestEnableAirdrop,
        collectionRequestPolicy
      );

      const account = collectionRequestCreator;
      const publicKey = account.slice(2, account.length);
      const guard = { keys: [publicKey], pred: "keys-all" };

      const pactCode = `(free.lptest001.nft-collection-request 
                                                        ${JSON.stringify(collectionRequestName)}  
                                                        ${JSON.stringify(collectionRequestSymbol)}  
                                                        ${JSON.stringify(account)}        
                                                        (read-keyset  "guard")
                                                        ${JSON.stringify(collectionRequestDescription)}
                                                        ${JSON.stringify(collectionRequestCategory)}
                                                        4
[
        "ipfs://QmVdXq6EjDEQq6U5cDqab2xvaMzHLgpQKjW56iVJYbji7a",
        "ipfs://QmRPqajKGNCtKyA7oE5Lx3H8YijyfopS8oaVcdZCSUDyEP",
        "ipfs://QmPJAuW9MpZwcdzw86ECFyBqVb9HvTfHsaqAQiKCvPmSPD",
        "ipfs://QmXHR1BFLd8MYMEYbrhMkboLc1oEG2tbygomaxCknosQNN"
      ]
                                                        1.0
                                                        ${collectionRequestRoyalityPerc}
                                                        ${JSON.stringify(collectionRequestCoverImgUrl)}
                                                        ${JSON.stringify(collectionRequestBannerImgUrl)}
                                                        ${JSON.stringify(collectionRequestStartDate)}
                                                        (time "2024-03-22T14:00:00Z")
                                                        ${JSON.stringify(collectionRequesEndDate)}       
                                                        (time "2025-03-22T14:00:00Z") 
                                                        ${collectionRequestEnableFreeMint}                 
                                                        ${collectionRequestEnableWl} 
                                                        ${collectionRequestEnablePresale} 
                                                        ${collectionRequestEnableAirdrop} 
                                                        ${JSON.stringify(collectionRequestPolicy)}
                                                        )
                                                        `;
      // (time "2024-05-24T00:58:27Z")
      const txn = Pact.builder
        .execution(pactCode)
        .addData("guard", guard)
        .addSigner(publicKey, (withCapability) => [
          withCapability("coin.GAS"),
          withCapability("coin.TRANSFER", account, admin, 1.0),
        ])
        .setMeta({
          creationTime: creationTime(),
          sender: account,
          gasLimit: 150000,
          chainId: CHAIN_ID,
          ttl: 28800,
        })
        .setNetworkId(NETWORK_ID)
        .createTransaction();

      console.log("create_collection", txn);
      console.log("sign");

      const localResponse = await client.local(txn, {
        preflight: false,
        signatureVerification: false,
      });

      if (localResponse.result.status == "success") {
        let signedTx;
        if (wallet == "ecko") {
          signedTx = await eckoWallet(txn);
        }
        if (wallet == "CW") {
          signedTx = await signWithChainweaver(txn);
        }
        console.log("sign1");
        const response = await signFunction(signedTx);
        if (response.result.data == true) {
          alert(`Collection: ${collectionRequestName} Resqeusted Successfully`);
        }
        console.log("response", response);
      } else {
        console.log("Error in local response", localResponse.result.error);
      }
    };
