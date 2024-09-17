// /* eslint-disable */
// import SumsubWebSdk from "@sumsub/websdk-react";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import userService from "src/services/user.service";
// import Modal from "@mui/material/Modal";
// import { useState } from "react";
// import Box from "@mui/material/Box";

// const Verification = (props) => {
//     console.log("🚀 ~ Verification ~ props", props);
//     const [open, setOpen] = useState(false);
//     const [sumsubData, setSumsubData] = useState(null);
//     // useEffect(() => {
//     //     const fetchAccessToken = async () => {
//     //         try {
//     //             await userService.getAccessToken();
//     //         } catch (error) {
//     //             toast.error("Something went wrong");
//     //         }
//     //     };

//     //     fetchAccessToken();
//     // }, []);

//     const applicantEmail = "rahul.baghel1508@gmail.com";
//     const applicantPhone = "9999999999";
//     const accessToken =
//         "_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC1mZjNkNTlhNy04OTNjLTRkMzEtYTI1ZC0wODViZTg3Njc5NDktdjIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.-v2";

//     const getAccessToken = async () => {
//         try {
//             // const response = await userService.getAccessToken();
//             // console.log("🚀 ~ getAccessToken ~ response", response);

//             setOpen(true);
//         } catch (error) {
//             toast.error("Something went wrong");
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-full">
//             <div className="flex flex-col items-center justify-center">
//                 <div className="text-2xl font-bold">Verification</div>
//                 <div className="text-gray-500">Please verify your identity</div>
//             </div>
//             <div className="mt-8">
//                 <button
//                     style={{
//                         backgroundColor: "#1a202c",
//                         color: "#fff",
//                         padding: "10px 20px",
//                         borderRadius: "5px",
//                     }}
//                     onClick={() => {
//                         getAccessToken();
//                     }}
//                 >
//                     Verify
//                 </button>
//             </div>
//             {/* <div className="mt-8">
//                 <div className="App">
//                     <SumsubWebSdk
//                         accessToken={accessToken}
//                         updateAccessToken={() =>
//                             console.log("updateAccessToken")
//                         }
//                         expirationHandler={() => Promise.resolve(accessToken)}
//                         config={{
//                             lang: "en",
//                             email: applicantEmail,
//                             phone: applicantPhone,
//                             i18n: {
//                                 document: {
//                                     subTitles: {
//                                         IDENTITY:
//                                             "Upload a document that proves your identity",
//                                     },
//                                 },
//                             },
//                             onMessage: (type, payload) => {
//                                 console.log("WebSDK onMessage", type, payload);
//                             },
//                             uiConf: {
//                                 customCssStr:
//                                     ":root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}",
//                             },
//                             onError: (error) => {
//                                 console.error("WebSDK onError", error);
//                             },
//                         }}
//                         options={{
//                             addViewportTag: false,
//                             adaptIframeHeight: true,
//                         }}
//                         onMessage={(type, payload) => {
//                             console.log("onMessage", type, payload);
//                         }}
//                         onError={(data) => console.log("onError", data)}
//                     />
//                 </div>
//             </div> */}


// {/* {
//     reviewId: 'sRYJj',
//     attemptId: 'iLtJE',
//     attemptCnt: 1,
//     elapsedSincePendingMs: 171,
//     elapsedSinceQueuedMs: 171,
//     reprocessing: true,
//     levelName: 'basic-kyc-level',
//     levelAutoCheckMode: null,
//     createDate: '2024-06-02 11:25:45+0000',
//     reviewDate: '2024-06-02 11:25:45+0000',
//     reviewResult: { reviewAnswer: 'GREEN' },
//     reviewStatus: 'completed',
//     priority: 0
//   } */}

//             <Modal
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         width: 400,
//                         bgcolor: "background.paper",
//                         border: "2px solid #000",
//                         boxShadow: 24,
//                         p: 4,
//                     }}
//                 >
//                     <div className="App">
//                         <SumsubWebSdk
//                             accessToken={accessToken}
//                             updateAccessToken={() =>
//                                 console.log("updateAccessToken")
//                             }
//                             expirationHandler={() =>
//                                 Promise.resolve(accessToken)
//                             }
//                             config={{
//                                 lang: "en",
//                                 email: applicantEmail,
//                                 phone: applicantPhone,
//                                 i18n: {
//                                     document: {
//                                         subTitles: {
//                                             IDENTITY:
//                                                 "Upload a document that proves your identity",
//                                         },
//                                     },
//                                 },
//                                 onMessage: (type, payload) => {
//                                     console.log(
//                                         "WebSDK onMessage",
//                                         type,
//                                         payload
//                                     );
//                                 },

//                                 onError: (error) => {
//                                     console.error("WebSDK onError", error);
//                                 },
//                             }}
//                             options={{
//                                 addViewportTag: false,
//                                 adaptIframeHeight: true,
//                             }}
//                             onMessage={(type, payload) => {
//                                 console.log("onMessage", type, payload);
//                                 if(payload.reviewStatus === 'completed') {
//                                     console.log('payload', payload)
//                                 }

//                             }}
//                             onError={(data) => console.log("onError", data)}
//                         />

//                         <button
//                             onClick={() => setOpen(false)}
//                             style={{
//                                 backgroundColor: "#1a202c",
//                                 color: "#fff",
//                                 padding: "10px 20px",
//                                 borderRadius: "5px",
//                                 marginTop: "20px",
//                             }}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default Verification;

import React, { useState } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { toast } from "react-toastify";
import userService from "src/services/user.service";

const KYCVerification = ({ onVerificationComplete }) => {
  const [open, setOpen] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const handleKyc = async () => {
    try {
      const response = await userService.getAccessToken();
      if (response?.data?.status === "success") {
        setAccessToken(response.data.data.token);
        setOpen(true);
      } else {
        toast.error("Failed to get access token. Please try again later.");
      }
    } catch (error) {
      console.error("Error in handleKyc:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleVerificationComplete = async (payload) => {
    try {
      const response = await userService.createVerification({ applicantData: payload });
      console.log("Verification response:", response);
      if (response?.status === 200 || response?.status === 201) {
        // onVerificationComplete(true);
        toast.success("KYC verification completed successfully!");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleVerificationComplete:", error);
      toast.error("An error occurred during verification. Please try again.");
    }
    setOpen(false);
  };

  return (
    <div className="kyc-verification-container">
      <button
        className="kyc-verification-start-btn"
        onClick={handleKyc}
      >
        Start KYC Verification
      </button>

      {open && (
        <div className="kyc-verification-modal-overlay">
          <div className="kyc-verification-modal">
            <h2 className="kyc-verification-modal-title">KYC Verification</h2>
            <div className="kyc-verification-modal-content">
              <SumsubWebSdk
                accessToken={accessToken}
                expirationHandler={() => Promise.resolve(accessToken)}
                config={{
                  lang: "en",
                  email: "user@example.com", // Replace with actual user email
                  phone: "123456789", // Replace with actual user phone
                  i18n: {
                    document: {
                      subTitles: {
                        IDENTITY: "Upload a document that proves your identity"
                      }
                    }
                  },
                  onMessage: (type, payload) => {
                    console.log("WebSDK onMessage", type, payload);
                  },
                  onError: (error) => {
                    console.error("WebSDK onError", error);
                    toast.error("An error occurred during KYC. Please try again.");
                  },
                }}
                options={{ addViewportTag: false, adaptIframeHeight: true }}
                onMessage={(type, payload) => {
                  if (payload.reviewStatus === "completed") {
                    handleVerificationComplete(payload);
                  }
                }}
                onError={(error) => console.error("SumsubWebSdk Error:", error)}
              />
            </div>
            <button 
              className="kyc-verification-modal-close-btn"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCVerification;