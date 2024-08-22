import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, ClickAwayListener } from "@mui/material";
import { removeSingleIteams,removeToCart, emptycartIteam } from "src/features/cartSlice";
import { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import Scrollbars from "react-custom-scrollbars-2";
import { motion, AnimatePresence } from "framer-motion";


const CartDropdown = () => {
    const { carts } = useSelector((state) => state.cart);
    console.log(carts);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleRemoveItem = (item) => {
        dispatch(removeToCart(item._id));
    };

    const handleCheckout = () => {
        dispatch(emptycartIteam());
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={closeDropdown}>
            <Box position="relative">
                <Button 
                    onClick={toggleDropdown}
                    startIcon={<FaShoppingCart />}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    {carts?.length}
                </Button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: "absolute",
                                right: 0,
                                marginTop: 10,
                                width: 350,
                                backgroundColor: "#ffffff",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                                borderRadius: 12,
                                overflow: "hidden",
                                zIndex: 10,
                            }}
                        >
                            <Typography variant="h6" sx={{ p: 3, borderBottom: "1px solid #e0e0e0", color: "#333", fontWeight: 600 }}>
                                Your Cart
                            </Typography>
                            <Scrollbars style={{ height: 300 }}>
                                <Box p={3}>
                                    <AnimatePresence>
                                        {carts?.length > 0 ? (
                                            carts.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            mb: 3,
                                                            pb: 3,
                                                            borderBottom: "1px solid #e0e0e0",
                                                        }}
                                                    >
                                                        <img
                                                            src={item.tokenImage}
                                                            alt={item.tokenId}
                                                            style={{
                                                                width: 70,
                                                                height: 70,
                                                                borderRadius: 10,
                                                                marginRight: 16,
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                        <Box flex={1}>
                                                            <Typography variant="subtitle1" sx={{ color: "#333", fontWeight: "bold", mb: 0.5 }}>
                                                                {item.collectionName}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ color: "#666" }}>
                                                                {item.tokenId}
                                                            </Typography>
                                                        </Box>
                                                        <Button
                                                            onClick={() => handleRemoveItem(item)}
                                                            sx={{
                                                                minWidth: 'auto',
                                                                p: 1,
                                                                color: '#ff4444',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                                                },
                                                            }}
                                                        >
                                                            <FaTrash size={18} />
                                                        </Button>
                                                    </Box>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <Typography variant="body1" sx={{ color: "#666", textAlign: "center", mt: 4 }}>
                                                Your cart is empty
                                            </Typography>
                                        )}
                                    </AnimatePresence>
                                </Box>
                            </Scrollbars>
                            {carts?.length > 0 && (
                                <Box
                                    p={3}
                                    sx={{
                                        borderTop: "1px solid #e0e0e0",
                                        backgroundColor: "#f8f8f8",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handleCheckout}
                                        fullWidth
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            backgroundColor: "#4CAF50",
                                            borderRadius: 2,
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: "#45a049",
                                            }
                                        }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Box>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </ClickAwayListener>
    );
};

export default CartDropdown;