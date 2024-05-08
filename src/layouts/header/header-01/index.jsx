/* eslint-disable */
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import { useFlyoutSearch, useOffcanvas, useSticky } from "@hooks";
import Anchor from "@ui/anchor";
import BurgerButton from "@ui/burger-button";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ImProfile } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { useAccountContext } from "src/contexts";
import { useWalletConnectClient } from "src/contexts/WalletConnectContext";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";
import menuleftData from "../../../data/general/menu-left.json";
import userService from "src/services/user.service";

const Header = ({ className }) => {
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const account = useAccountContext();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [ethBalance, setEthBalance] = useState("");
    const [isDropDownEnabled, setIsDropDownEnabled] = useState(false);
    const router = useRouter();
    const { disconnect } = useWalletConnectClient();

    const logout = async () => {
        const response = await userService.logout();
        console.log(response, "response");

        account.logoutWalletConnect();
        disconnect();
        setIsDropDownEnabled(false);
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
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={menuleftData} />
                                </nav>
                            </div>
                            <div className="setting-option d-none d-lg-block">
                                <SearchForm />
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>

                            <div className="setting-option header-btn">
                                <div className="icon-box">
                                    {account.walletAddressContect.length > 0 ? (
                                        <div
                                            className={clsx(
                                                "nice-select",
                                                isDropDownEnabled && "open"
                                            )}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() =>
                                                setIsDropDownEnabled(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            <span className="current">
                                                {account.walletAddressContect.slice(
                                                    0,
                                                    6
                                                )}
                                                ...
                                                {account.walletAddressContect.slice(
                                                    -4
                                                )}
                                            </span>
                                            <ul
                                                className="list"
                                                role="menubar"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                style={{
                                                    width: "100%",
                                                    minWidth: "auto",
                                                    marginTop: "3px",
                                                    height: "auto",
                                                }}
                                            >
                                                <li
                                                    className={clsx(
                                                        "option",
                                                        "selected focus"
                                                    )}
                                                    role="menuitem"
                                                    onClick={() =>
                                                        router.push("/author")
                                                    }
                                                >
                                                    <ImProfile />
                                                    Profile
                                                </li>

                                                <li
                                                    className={clsx(
                                                        "option",
                                                        "selected focus"
                                                    )}
                                                    role="menuitem"
                                                    onClick={() => {
                                                        logout();
                                                    }}
                                                >
                                                    <IoLogOut />
                                                    Logout
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link
                                            href="/connect"
                                            className="cn-btn"
                                        >
                                            <span>Connect Wallet</span>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* {isAuthenticated && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown
                                        onDisconnect={onDisconnect}
                                        ethBalance={ethBalance}
                                    />
                                </div>
                            )} */}
                            <div className="setting-option rn-icon-list notification-badge">
                                <div className="icon-box">
                                    <Anchor path={headerData.activity_link}>
                                        <i className="feather-bell" />
                                        <span className="badge">6</span>
                                    </Anchor>
                                </div>
                            </div>
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuData}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
