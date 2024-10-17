import PropTypes from "prop-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import FilterButton from "@ui/filter-button";
import { Tooltip } from "@mui/material";

const LaunchpadChainHeader = ({ className, space, state, filterHandler }) => (
    <div
        className={clsx(
            "rn-breadcrumb-inner",
            className,
            space === 1 && "ptb--1"
        )}
    >
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-12 col-md-12 col-12">
                    <nav className="chain-tabs">
                        <ul>
                            <li className="active">
                                <button className="special-btn">All Chains</button>
                            </li>
                            <li>
                                <Tooltip title="Kadena" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/Kadena.png"
                                            alt="Kadena"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Solana" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/solana-sol-logo.svg"
                                            alt="Solana"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>

                            <li>
                                <Tooltip title="Arbitrum" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/arbitrum-arb-logo.png"
                                            alt="Arbitrum"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip
                                    title="BNB Smart Chain"
                                    arrow
                                    placement="top"
                                >
                                    <button>
                                        <Image
                                            src="/wallet/bnb-bnb-logo.png"
                                            alt="BNB"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip
                                    title="Avalanche"
                                    arrow
                                    placement="top"
                                >
                                    <button>
                                        <Image
                                            src="/wallet/avalanche-avax-logo.png"
                                            alt="Avalanche"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Optimism" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/optimism-ethereum-op-logo.png"
                                            alt="Optimism"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Polygon" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/polygon-matic-logo.png"
                                            alt="Polygon"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Fantom" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/klaytn-klay-logo.png"
                                            alt="Fantom"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Ethereum" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/ethereum-eth-logo.png"
                                            alt="Ethereum"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Blast" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/download.jpeg"
                                            alt="Blast"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Bitcoin" arrow placement="top">
                                    <button>
                                        <Image
                                            src="/wallet/bitcoin-symbol.png"
                                            alt="Bitcoin"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </Tooltip>
                            </li>
                            {/* <li className="filter-item">
                                {state && (
                                    <FilterButton
                                        open={state.filterToggle}
                                        onClick={filterHandler}
                                    />
                                )}
                            </li> */}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
);

LaunchpadChainHeader.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

LaunchpadChainHeader.defaultProps = {
    space: 1,
};

export default LaunchpadChainHeader;
