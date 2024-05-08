/* eslint-disable */
import ColorSwitcher from "@components/color-switcher";
import { ItemType } from "@utils/types";
import PropTypes from "prop-types";
import { IoSettings } from "react-icons/io5";
import { MdKeyboard } from "react-icons/md";

const Footer = () => {
    return (
        <>
            <div className="footer-fixed">
                <div className="container footer-container">
                    {/* <div style={{ display: "flex", flexDirection: "row" }}>
                        <div
                            id="my_switcher"
                            className="setting-option my_switcher"
                        >
                            <ColorSwitcher />
                        </div>

                        <div style={{ width: "1%" }}></div>
                        <div
                            id="my_switcher"
                            className="setting-option my_switcher"
                        >
                            <IoSettings />
                        </div>
                        <div style={{ width: "1%" }}></div>
                        <div
                            id="my_switcher"
                            className="setting-option my_switcher"
                        >
                            <MdKeyboard />
                        </div>
                    </div> */}

                    <div className="footer-menu">
                        <ul>
                            <li>
                                <div
                                    id="my_switcher"
                                    className="setting-option my_switcher"
                                >
                                    <ColorSwitcher />
                                </div>
                            </li>
                            <li>
                                <div
                                    id="my_switcher"
                                    className="setting-option my_switcher"
                                >
                                    <IoSettings />
                                </div>{" "}
                            </li>
                            <li>
                                <div
                                    id="my_switcher"
                                    className="setting-option my_switcher"
                                >
                                    <MdKeyboard />
                                </div>{" "}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
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
