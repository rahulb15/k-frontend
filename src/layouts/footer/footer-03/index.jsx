import ColorSwitcher from "@components/color-switcher";
import { ItemType } from "@utils/types";
import PropTypes from "prop-types";
import { IoSettings } from "react-icons/io5";
import { MdKeyboard } from "react-icons/md";
import { FaUser, FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SettingsModal from "@components/SettingsModal";
import { useRouter } from "next/router";
import Image from "next/image";
import AnimatedCursor from "react-animated-cursor";
import dynamic from "next/dynamic";
const MouseParticles = dynamic(() => import("react-mouse-particles"), {
    ssr: false,
});
const Footer = () => {
    const router = useRouter();
    const [prices, setPrices] = useState({ solana: 0, kda: 0 });
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const [mouseEffects, setMouseEffects] = useState("none");
    const [mouseEffectSparkles, setMouseEffectSparkles] = useState(false);
    const [mouseEffectBubbles, setMouseEffectBubbles] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const toggleShortcuts = () => {
        setShowShortcuts(!showShortcuts);
    };

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/simple/price?ids=solana,kadena&vs_currencies=usd"
                );
                setPrices({
                    solana: response.data.solana.usd,
                    kda: response.data.kadena.usd,
                });
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };

        fetchPrices();
        // Set up an interval to fetch prices every minute
        const interval = setInterval(fetchPrices, 60000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const shortcuts = [
        { key: "Ctrl + K", description: "Open search" },
        { key: "Ctrl + L", description: "Launchpad" },
        { key: "Ctrl + H", description: "Home" },
        { key: "Ctrl + P", description: "Profile" },
        // Add more shortcuts as needed
    ];

    const handleBackward = () => {
        router.back();
    };

    const handleForward = () => {
        window.history.forward();
    };

    const handleHome = () => {
        router.push("/");
    };

    return (
        <div className="footer-fixed">
            <div className="footer-container">
                <div className="footer-menu">
                    <div className="footer-section start">
                        <div className="setting-option" onClick={handleHome}>
                            <FaHome />
                        </div>
                        <div className="setting-option">
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                    <div className="footer-section middle">
                        {/* <div className="setting-option">
                            
                        </div> */}
                        {/* copyright */}
                        <div style={{ color: "#fff", fontSize: "1.2rem" }}>
                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                }}
                            >
                                Kryptomerch
                            </span>
                            <span>&copy; {new Date().getFullYear()}</span>
                        </div>
                    </div>
                    <div className="footer-section end">
                        <div
                            className="setting-option"
                            onClick={handleBackward}
                        >
                            <FaArrowLeft />
                        </div>
                        <div className="setting-option" onClick={handleForward}>
                            <FaArrowRight />
                        </div>
                        <div
                            className="setting-option"
                            onClick={toggleSettings}
                        >
                            <IoSettings />
                        </div>
                        <div
                            className="setting-option"
                            onClick={toggleShortcuts}
                            style={{ position: "relative" }}
                        >
                            <MdKeyboard />
                            {showShortcuts && (
                                <div className="shortcuts-menu">
                                    <h3>Keyboard Shortcuts</h3>
                                    <ul>
                                        {shortcuts.map((shortcut, index) => (
                                            <li key={index}>
                                                <span className="shortcut-key">
                                                    {shortcut.key}
                                                </span>
                                                <span className="shortcut-description">
                                                    {shortcut.description}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div
                            style={{
                                color: "#fff",
                                fontSize: "1.2rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                }}
                            >
                                <Image
                                    src="/wallet/solana-sol-logo.svg"
                                    alt="Solana"
                                    width={15}
                                    height={15}
                                />
                            </span>
                            <span style={{ color: "#fff" }}>
                                {" "}
                                $ {prices.solana.toFixed(2)}
                            </span>

                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    marginLeft: "10px",
                                }}
                            >
                                <Image
                                    src="/wallet/Kadena.png"
                                    alt="Kadena"
                                    width={20}
                                    height={20}
                                />
                            </span>
                            <span style={{ color: "#fff" }}>
                                {" "}
                                $ {prices.kda.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <SettingsModal
                isOpen={showSettings}
                onClose={toggleSettings}
                mouseEffects={mouseEffects}
                setMouseEffects={setMouseEffects}
                setMouseEffectSparkles={setMouseEffectSparkles}
                setMouseEffectBubbles={setMouseEffectBubbles}
            />
            {mouseEffectSparkles && (
                <MouseParticles
                    g={1}
                    color="random"
                    cull="MuiSvgIcon-root,MuiButton-root"
                    level={6}
                />
            )}
            {mouseEffectBubbles && (
                <AnimatedCursor
                    innerSize={8}
                    outerSize={8}
                    color="193, 11, 111"
                    outerAlpha={0.2}
                    innerScale={0.7}
                    outerScale={5}
                />
            )}
        </div>
    );
};

Footer.propTypes = {
    space: PropTypes.oneOf([1, 2, 3]),
    className: PropTypes.string,
    data: PropTypes.shape({
        items: PropTypes.arrayOf(ItemType),
    }),
};

Footer.defaultProps = {
    space: 1,
};

export default Footer;
