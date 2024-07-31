import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Tabs,
    Tab,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";
import SyncIcon from "@mui/icons-material/Sync";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import collectionService from "src/services/collection.service";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import axios from "axios";

const DarkPaper = styled(Paper)({
    backgroundColor: "#1E1E1E",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
});

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    iconColor: "white",
    customClass: {
        popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
});

const GreenButton = styled(Button)({
    backgroundColor: "#b2b500",
    height: "40px",
    borderRadius: "12px",
    color: "black",
    "&:hover": {
        backgroundColor: "#b2b500",
        color: "white",
    },
});

const StyledTabs = styled(Tabs)({
    backgroundColor: "#2E2E2E",
    borderRadius: "10px",
    "& .MuiTabs-flexContainer": {
        justifyContent: "space-between",
    },
    "& .MuiTabs-indicator": {
        backgroundColor: "#b2b500", // Change this to your desired color
    },
});

const StyledTab = styled(Tab)({
    textTransform: "none",
    minWidth: 0,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
        color: "#fff",
    },
});

const DepositArea = () => {
    const [value, setValue] = useState(0);
    const searchParams = useSearchParams();
    const [amount, setAmount] = useState(0);
    const [fee, setFee] = useState(0);
    const [address, setAddress] = useState("");
    const [depositAmount, setDepositAmount] = useState(0);
    const [depositFee, setDepositFee] = useState(0);
    const [price, setPrice] = useState(null);
    const router = useRouter();
    const [depositHistory, setDepositHistory] = useState([
        {
            id: 1,
            amount: 0.1,
            date: "2024-10-10",
        },
        {
            id: 2,
            amount: 0.2,
            date: "2024-10-11",
        },
    ]);

    const balance = useSelector((state) => state.balance.value);
    console.log(balance, "balance");


    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/simple/price",
                    {
                        params: {
                            ids: "kadena",
                            vs_currencies: "usd",
                        },
                    }
                );
                if (response.status === 200) {
                    setPrice(response.data.kadena.usd);
                }
            } catch (error) {
                console.error("Error fetching the Kadena price:", error);
            }
        };

        fetchPrice();
    }, []);
    console.log("price", price);

    useEffect(() => {
        if (!searchParams.get("status")) return;

        const fetchCollection = async () => {
            if (!searchParams.get("session_id")) return;
            const response = await collectionService.checkTransaction(
                searchParams.get("session_id")
            );
            console.log("response", response);
        };

        if (searchParams.get("status") === "success") {
            fetchCollection();

            Toast.fire({
                icon: "success",
                title: "Transaction successful",
            });

            setTimeout(() => {
                router.push("/deposit");
            }
            , 3000);


        }
        if (searchParams.get("status") === "cancel") {
            fetchCollection();

            Toast.fire({
                icon: "error",
                title: "Transaction failed",
            });
            // router.push("/deposit");
            setTimeout(() => {
                router.push("/deposit");
            }
            , 3000);
        }

        // const fetchCollection = async () => {
        //     const response = await collectionService.checkTransaction(
        //         searchParams.get("session_id")
        //     );
        //     console.log("response", response);
        // };
        // fetchCollection();
    }, [searchParams.get("status")]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        const regex = /^\d*\.?\d*$/;
        if (value === "" || regex.test(value)) {
            setAmount(value);
        }
    };
    console.log("amount", amount);

    useEffect(() => {
        const walletAddress = localStorage.getItem("walletAddress");
        console.log(walletAddress, "walletAddress");
        if (walletAddress) {
            setAddress(walletAddress);
        }
    }, []);

    const copyWalletAddress = () => {
        navigator.clipboard.writeText(address);
        Swal.fire({
            icon: "success",
            title: "Copied",
            text: "Wallet address copied to clipboard",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const deposit = async () => {
        // console.log("Deposit");
        // const newBalance = balance + parseFloat(amount);
        // setBalance(newBalance);
        // const newDeposit = {
        //     id: depositHistory.length + 1,
        //     amount: parseFloat(amount),
        //     date: new Date().toDateString(),
        // };
        // setDepositHistory([...depositHistory, newDeposit]);
        // setAmount(0);
        // setFee(0);

        // Toast.fire({
        //     icon: "success",
        //     title: "Deposit successful",
        // });

        // const deposit: IDeposit = {
        //     user: userId,
        //     transactionId: newTransaction._id as string,
        //     amount: req.body.amount,
        //     cryptoCurrency: req.body.cryptoCurrency,
        //     status: "pending",
        //     address: req.body.address,
        //     txHash: req.body.txHash,
        //     priorityFee: req.body.priorityFee,
        //     percentage: req.body.percentage,
        //     totalAmount: newTransaction.paymentAmount,
        //   };

        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        );
        const body = {
            amount: amount,
            priorityFee: fee,
            cryptoCurrency: "KDA",
            address: address,
            price: price,
            type: "deposit",
        };
        console.log("🚀 ~ handleSubmit ~ body", body);

        const response = await collectionService.createCheckoutSession(body);
        console.log("🚀 ~ handleSubmit ~ response", response);
        const session = response.data.data;
        console.log("🚀 ~ handleSubmit ~ session", session);
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    };

    useEffect(() => {
        const fee = (amount * 3.5) / 100;
        setFee(fee);
    }, [amount]);

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Trading Wallet Balance
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
                <Image
                    src="/wallet/Kadena.png"
                    alt="Solana"
                    width={30}
                    height={30}
                />
                <span style={{ marginLeft: 10 }}>≋ {parseFloat(balance).toFixed(2)}</span>
                <SyncIcon />
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    backgroundColor: "#1E1E1E",
                    padding: "10px",
                    borderRadius: "10px",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="body2" sx={{ mr: 1, fontSize: 12 }}>
                    {address}
                </Typography>
                <ContentCopyIcon
                    fontSize="small"
                    sx={{ cursor: "pointer" }}
                    onClick={copyWalletAddress}
                />
            </Box>
            <StyledTabs
                value={value}
                onChange={handleChange}
                sx={{ mb: 2 }}
                variant="fullWidth"
                scrollButtons="auto"
            >
                <StyledTab label="Deposit • KDA" />
                <StyledTab label="History" />
            </StyledTabs>

            {value === 0 && (
                <DarkPaper elevation={3}>
                    <Box
                        sx={{
                            border: "1px solid #2E2E2E",
                            padding: "12px",
                            borderRadius: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                            }}
                        >
                            <Typography>From Your Wallet</Typography>
                            <Typography>To Trading Wallet</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                            }}
                        >
                            <Typography>
                                <Image
                                    src="/wallet/Kadena.png"
                                    alt="Solana"
                                    width={30}
                                    height={30}
                                />
                                <span style={{ marginLeft: 10 }}>
                                    ≋ {parseFloat(balance).toFixed(2)}
                                </span>
                            </Typography>
                            <Typography>
                                {address.slice(0, 6)}...{address.slice(-4)}
                                <ContentCopyIcon
                                    fontSize="small"
                                    sx={{ cursor: "pointer", marginLeft: 1 }}
                                    onClick={copyWalletAddress}
                                />
                            </Typography>
                        </Box>
                    </Box>

                    <Typography sx={{ mb: 1 }}>AMOUNT TO DEPOSIT</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={amount}
                        onChange={handleAmountChange}
                        sx={{
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                height: "60px",
                                color: "white",
                                borderRadius: "12px",
                                "& fieldset": {
                                    borderColor: "rgba(255, 255, 255, 0.5)",
                                    borderWidth: "2px",
                                },
                                "&:hover fieldset": {
                                    borderColor: "white",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "white",
                                },
                            },
                            "& .MuiInputAdornment-root": {
                                marginLeft: "10px",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Image
                                        src="/wallet/Kadena.png"
                                        alt="KDA"
                                        width={24}
                                        height={24}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography sx={{ mb: 1 }}>PRIORITY FEE</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={fee}
                        // onChange={(e) => setFee(e.target.value)}
                        sx={{
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                height: "60px",
                                color: "white",
                                borderRadius: "12px",
                                "& fieldset": {
                                    borderColor: "rgba(255, 255, 255, 0.5)",
                                    borderWidth: "2px",
                                },
                                "&:hover fieldset": {
                                    borderColor: "white",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "white",
                                },
                            },
                            "& .MuiInputAdornment-root": {
                                marginLeft: "10px",
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Image
                                        src="/wallet/Kadena.png"
                                        alt="KDA"
                                        width={24}
                                        height={24}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <GreenButton
                        fullWidth
                        variant="contained"
                        onClick={deposit}
                    >
                        Deposit
                    </GreenButton>
                </DarkPaper>
            )}

            {value === 1 && (
                <DarkPaper
                    elevation={3}
                    sx={{ maxHeight: 300, overflow: "auto", height: 300 }}
                >
                    {depositHistory.map((deposit) => (
                        <Box
                            key={deposit.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderBottom: "1px solid #2E2E2E",
                                padding: "10px",
                            }}
                        >
                            <Typography>{deposit.date}</Typography>
                            <Typography>{deposit.amount} KDA</Typography>
                        </Box>
                    ))}
                </DarkPaper>
            )}
        </Box>
    );
};

export default DepositArea;
