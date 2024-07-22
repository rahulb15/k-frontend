import PropTypes from "prop-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import FilterButton from "@ui/filter-button";

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
                                <a href="#">All Chains</a>
                            </li>
                            <li>
                                <a href="#">
                                    <Image
                                        src="/wallet/solana-sol-logo.svg"
                                        alt="Solana"
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Image
                                        src="/wallet/Kadena.png"
                                        alt="Kadena"
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            </li>
                            <li className="filter-item">
                           

                                <FilterButton
                                    open={state.filterToggle}
                                    onClick={filterHandler}
                                />
                            
                            </li>
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
