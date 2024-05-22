import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import {
    Box,
    Card,
    Icon,
    Badge,
    Button,
    Drawer,
    styled,
    IconButton,
    Avatar,
    ThemeProvider,
} from "@mui/material";
import { sideNavWidth, topBarHeight } from "@utils/constant";
import { motion, sync, useCycle } from "framer-motion";
import { ImProfile } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import userService from "src/services/user.service";
import { useAccountContext } from "src/contexts";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";

export default function ProfileBar({ container }) {
    const [panelOpen, setPanelOpen] = useState(false);
    const handleDrawerToggle = () => setPanelOpen(!panelOpen);
    const account = useAccountContext();
    const { disconnect } = useWalletConnectClient();

    const logout = async () => {
        const response = await userService.logout();
        console.log(response, "response");

        account.logoutWalletConnect();
        disconnect();
    };
    const getUser = async () => {
        const response = await userService.getUserInit();
        if (response?.data?.status === "success") {
            localStorage.setItem("token", response?.data?.token);
            await account.authWalletConnect(response?.data?.data.walletAddress);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Fragment>
            <IconButton onClick={handleDrawerToggle}>
                <Avatar
                    src={"/assets-images/client-logo3.png"}
                    alt="user photo"
                    variant="rounded"
                    sx={{ cursor: "pointer", width: 42, height: 42 }}
                />
            </IconButton>

            <Drawer
                width={"100px"}
                container={container}
                variant="temporary"
                anchor={"right"}
                open={panelOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        background: "#21210b",
                    },
                }}
            >
                <Box sx={{ width: sideNavWidth }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            marginTop: "20px",
                        }}
                    >
                        <Avatar
                            src={"/assets-images/client-logo3.png"}
                            alt="user photo"
                            variant="rounded"
                            sx={{
                                cursor: "pointer",
                                width: 100,
                                height: 100,
                                marginBottom: "20px",
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            {/* Wallet Address profile logout with full width link not button */}
                            <span
                                style={{
                                    fontSize: "22px",
                                    color: "#f6f6f6",
                                    marginTop: "10px",
                                    borderBottom: "1px solid #f6f6f6",
                                    borderTop: "1px solid #f6f6f6",
                                    padding: "10px",
                                    width: "100%",
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                {account.walletAddressContect.slice(0, 6)}
                                ...
                                {account.walletAddressContect.slice(-4)}
                            </span>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Link href="/author">
                                <span
                                    style={{
                                        fontSize: "22px",
                                        color: "#f6f6f6",
                                        marginTop: "10px",
                                        borderBottom: "1px solid #f6f6f6",
                                        padding: "10px",
                                        width: "100%",
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <ImProfile />
                                    Profile
                                </span>
                            </Link>
                            <span
                                style={{
                                    fontSize: "22px",
                                    color: "#f6f6f6",
                                    marginTop: "10px",
                                    borderBottom: "1px solid #f6f6f6",
                                    padding: "10px",
                                    width: "100%",
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <IoLogOut />
                                Logout
                            </span>
                        </Box>
                    </div>
                </Box>
            </Drawer>
        </Fragment>
    );
}

// <div
//     className={clsx(
//         "nice-select",
//         isDropDownEnabled && "open"
//     )}
//     role="button"
//     tabIndex={0}
//     onClick={() =>
//         setIsDropDownEnabled(
//             (prev) => !prev
//         )
//     }
// >
//     <span className="current">
//         {account.walletAddressContect.slice(
//             0,
//             6
//         )}
//         ...
//         {account.walletAddressContect.slice(
//             -4
//         )}
//     </span>
//     <ul
//         className="list"
//         role="menubar"
//         onClick={(e) =>
//             e.stopPropagation()
//         }
//         style={{
//             width: "100%",
//             minWidth: "auto",
//             marginTop: "3px",
//             height: "auto",
//         }}
//     >
//         <li
//             className={clsx(
//                 "option",
//                 "selected focus"
//             )}
//             role="menuitem"
//             onClick={() =>
//                 router.push("/author")
//             }
//         >
//             <ImProfile />
//             Profile
//         </li>

//         <li
//             className={clsx(
//                 "option",
//                 "selected focus"
//             )}
//             role="menuitem"
//             onClick={() => {
//                 logout();
//             }}
//         >
//             <IoLogOut />
//             Logout
//         </li>
//     </ul>
// </div>
