/* eslint-disable */

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import userService from "src/services/user.service";

const TickerHeader = () => {
    const [tickerData, setTickerData] = useState(null);
    const [closeTicker, setCloseTicker] = useState(false);

    useEffect(() => {
        const fetchTickerData = async () => {
            const response = await userService.getTicker();
            setTickerData(response?.data?.value);
        };
        fetchTickerData();
    }, []);

    return (
        <>
            {closeTicker === false && (
                <section
                    className="ticker-wrap"
                    style={{ backgroundColor: tickerData?.color || "#fffff" }}
                >
                    <div
                        className="close-ticker"
                        onClick={() => setCloseTicker(!closeTicker)}
                    >
                        <MdClose />
                    </div>
                    <div className={` ${tickerData?.scroller ? "ticker" : ""}`}>
                        <div
                            className="ticker__content"
                            dangerouslySetInnerHTML={{
                                __html: tickerData?.html,
                            }}
                        ></div>
                    </div>
                </section>
            )}
        </>
    );
};

export default TickerHeader;
