import styles from "./TVChartContainer.module.css";
import { useEffect, useRef } from "react";
import dynamic from 'next/dynamic';

const TVChartContainer = (props) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        let tvWidget = null;

        const loadTradingViewWidget = async () => {
            const TradingView = await import('../../../public/static/charting_library');
            
            const widgetOptions = {
                symbol: props.symbol || 'NASDAQ:AAPL',
                datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
                    "https://demo_feed.tradingview.com",
                    undefined,
                    {
                        maxResponseLength: 1000,
                        expectedOrder: "latestFirst",
                    }
                ),
                interval: props.interval || 'D',
                container: chartContainerRef.current,
                library_path: props.library_path || '../../../public/static/charting_library/',
                locale: props.locale || 'en',
                disabled_features: ["use_localstorage_for_settings"],
                enabled_features: ["study_templates"],
                charts_storage_url: props.charts_storage_url,
                charts_storage_api_version: props.charts_storage_api_version,
                client_id: props.client_id,
                user_id: props.user_id,
                fullscreen: props.fullscreen,
                autosize: props.autosize,
            };

            tvWidget = new TradingView.widget(widgetOptions);

            tvWidget.onChartReady(() => {
                tvWidget.headerReady().then(() => {
                    const button = tvWidget.createButton();
                    button.setAttribute("title", "Click to show a notification popup");
                    button.classList.add("apply-common-tooltip");
                    button.addEventListener("click", () =>
                        tvWidget.showNoticeDialog({
                            title: "Notification",
                            body: "TradingView Charting Library API works correctly",
                            callback: () => {
                                console.log("Noticed!");
                            },
                        })
                    );

                    button.innerHTML = "Check API";
                });
            });
        };

        if (typeof window !== 'undefined') {
            loadTradingViewWidget();
        }

        return () => {
            if (tvWidget !== null) {
                tvWidget.remove();
            }
        };
    }, [props]);

    return (
        <>
            <div ref={chartContainerRef} className={styles.TVChartContainer} />
        </>
    );
};

export default dynamic(() => Promise.resolve(TVChartContainer), { ssr: false });



// // File: components/TVChartContainer.js
// import { useEffect, useRef } from 'react';
// import customDatafeed from '../CustomDatafeed';
// import APITest from './api-test';

// const TVChartContainer = (props) => {
//   const chartContainerRef = useRef(null);

//   useEffect(() => {
//     const loadTradingViewWidget = async () => {
//       const TradingView = await import('../../../public/static/charting_library');
      
//       const widgetOptions = {
//         symbol: props.symbol || 'CUSTOM:ASSET',
//         datafeed: customDatafeed, // Use the imported instance directly
//         interval: props.interval || 'D',
//         container: chartContainerRef.current,
//         library_path: props.library_path || '/static/charting_library/',
//         locale: props.locale || 'en',
//         disabled_features: ['use_localstorage_for_settings'],
//         enabled_features: ['study_templates'],
//         charts_storage_url: props.charts_storage_url,
//         charts_storage_api_version: props.charts_storage_api_version,
//         client_id: props.client_id,
//         user_id: props.user_id,
//         fullscreen: props.fullscreen,
//         autosize: props.autosize,
//       };

//       const tvWidget = new TradingView.widget(widgetOptions);

//       return () => {
//         if (tvWidget !== null) {
//           tvWidget.remove();
//         }
//       };
//     };

//     loadTradingViewWidget();
//   }, [props]);

//   return (<><div ref={chartContainerRef} className="TVChartContainer" /> <APITest /></>);
// };

// export default TVChartContainer;