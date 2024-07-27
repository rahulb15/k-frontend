/* eslint-disable */
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";
import "react-country-state-city/dist/react-country-state-city.css";
import { useHotkeys } from "react-hotkeys-hook";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import sal from "sal.js";
import { setSearchFocus } from "src/features/searchSlice"; // Make sure to import this
import { Providers } from "src/providers";
import { persistor, store } from "src/store/store";
import "sweetalert2/src/sweetalert2.scss";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "../assets/css/swal.css";
import "../assets/scss/style.scss";
import "../components/search/styles.css";
import "../containers/wallet-button/styles.css";
const AppContent = ({ Component, pageProps }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);

    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });

    useHotkeys("ctrl+shift+s", (event) => {
        console.log("Hotkey triggered");
        event.preventDefault();
        dispatch(setSearchFocus(true));
    });

    useHotkeys("esc", (event) => {
        console.log("Hotkey triggered");
        event.preventDefault();
        dispatch(setSearchFocus(false));
    });

    useHotkeys("ctrl+shift+l", (event) => {
        console.log("Hotkey triggered");
        event.preventDefault();
        router.push("/launchpad");
    });
    useHotkeys("ctrl+shift+c", (event) => {
        console.log("Hotkey triggered");
        event.preventDefault();
        router.push("/connect");
    });

    return (
        <ThemeProvider defaultTheme="dark">
            <ToastContainer />
            <Providers>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Component {...pageProps} />
                </LocalizationProvider>
            </Providers>
        </ThemeProvider>
    );
};

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppContent Component={Component} pageProps={pageProps} />
            </PersistGate>
        </Provider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
