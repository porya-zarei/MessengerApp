import Layout from "../components/Layout/layout";
import ContextProvider from "../context/main-context";
import "../styles/globals.css";

function MyChatApp({Component, pageProps}) {
    return (
        <>
            <ContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ContextProvider>
        </>
    );
}

export default MyChatApp;
