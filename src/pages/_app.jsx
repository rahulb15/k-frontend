import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sal from "sal.js";
import { Providers } from "src/providers";
import "../assets/css/bootstrap.min.css";
import "../assets/css/swal.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "../assets/scss/style.scss";
import "react-country-state-city/dist/react-country-state-city.css";
import "../containers/wallet-button/styles.css";
import "../components/search/styles.css";
import "sweetalert2/src/sweetalert2.scss";
import { store, persistor } from "src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider defaultTheme="dark">
                    <ToastContainer />
                    <Providers>
                        <Component {...pageProps} />
                    </Providers>
                </ThemeProvider>
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
