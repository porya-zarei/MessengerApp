import Layout from "../components/Layout/layout";
import ContextProvider from "../context/main-context";
import "../styles/globals.css";

function MyChatApp({Component, pageProps}) {
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <ContextProvider>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </ContextProvider>
    );
}

export default MyChatApp;
