import React, { useState,useEffect } from "react";
import { IoClose } from "react-icons/io5";

const SettingsModal = ({ isOpen, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeTab, setActiveTab] = useState("GENERAL");


    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            className={`settings-modal-overlay ${
                isAnimating ? "animating" : ""
            }`}
        >
            <div className={`settings-modal ${isAnimating ? "animating" : ""}`}>
            <button className="close-button" onClick={onClose}>
                        <IoClose />
                    </button>
                <div className="settings-modal-header">
                    <h2>App Settings</h2>
                
                </div>
                <div className="settings-modal-content">
                    <div className="settings-tabs">
                        <button
                            className={activeTab === "GENERAL" ? "active" : ""}
                            onClick={() => setActiveTab("GENERAL")}
                        >
                            GENERAL
                        </button>
                        <button
                            className={
                                activeTab === "NOTIFICATIONS" ? "active" : ""
                            }
                            onClick={() => setActiveTab("NOTIFICATIONS")}
                        >
                            NOTIFICATIONS
                        </button>
                    </div>
                    {activeTab === "GENERAL" && (
                        <div className="settings-general">
                            <div className="settings-section">
                                <h3>RARITY</h3>
                                <select defaultValue="default">
                                    <option value="default">
                                        Default / Rarity
                                    </option>
                                    <option value="statistical">
                                        Statistical Rarity
                                    </option>
                                    <option value="team"> Team Rarity</option>
                                    <option value="trait">
                                        Trait Normalized
                                    </option>
                                </select>
                            </div>
                            <div className="settings-section">
                                <h3>DISPLAY</h3>
                                <label>
                                    <input type="checkbox" /> Freeze GIFs
                                </label>
                                <label>
                                    <input type="checkbox" defaultChecked />{" "}
                                    Keep pools grouped
                                </label>
                                <label>
                                    <input type="checkbox" defaultChecked />{" "}
                                    Show prices post fees/royalties
                                </label>
                                <label>
                                    <input type="checkbox" /> Show marketplace
                                    icons
                                </label>
                                <label>
                                    <input type="checkbox" defaultChecked />{" "}
                                    Show YOLO buy
                                </label>
                                <label>
                                    <input type="checkbox" defaultChecked />{" "}
                                    Show Tensorian helper (bottom right)
                                </label>
                            </div>
                            {/* <div className="settings-section">
                                <h3>TRADING</h3>
                                <div>Optional Royalty</div>
                                <div className="royalty-options">
                                    <button>NONE</button>
                                    <button>HALF</button>
                                    <button className="active">FULL</button>
                                </div>
                                <label>
                                    <input type="checkbox" /> Use shared escrow
                                    for bids
                                </label>
                                <label>
                                    <input type="checkbox" defaultChecked /> Use
                                    Jito bundled transactions
                                </label>
                            </div>
                            <div className="settings-section">
                                <h3>EXPLORER & RPC</h3>
                                <label>
                                    <input
                                        type="radio"
                                        name="explorer"
                                        defaultChecked
                                    />{" "}
                                    SolanaFM
                                </label>
                                <label>
                                    <input type="radio" name="explorer" />{" "}
                                    Solscan
                                </label>
                                <label>
                                    <input type="radio" name="explorer" /> XRAY
                                </label>
                                <label>
                                    <input type="radio" name="explorer" />{" "}
                                    Solana Explorer
                                </label>
                                <label>
                                    <input type="radio" name="explorer" /> Jito
                                </label>
                                <div className="custom-rpc">
                                    <input
                                        type="text"
                                        placeholder="Custom RPC url: https://..."
                                    />
                                    <button>Confirm</button>
                                </div>
                            </div> */}
                        </div>
                    )}
                    {activeTab === "NOTIFICATIONS" && (
                        <div className="settings-notifications">
                            {/* Add notification settings here */}
                        </div>
                    )}
                </div>
                <div className="settings-modal-footer">
                    <label>
                        <input type="checkbox" /> Lite
                    </label>
                    <label>
                        <input type="checkbox" defaultChecked /> Pro
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
