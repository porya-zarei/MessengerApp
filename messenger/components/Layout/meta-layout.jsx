import Head from "next/head";
import Script from "next/script";

const MetaLayout = () => {
    return (
        <>
            <Head>
                <title>PZE Messager</title>
                <meta charset="utf-8" />
                {/* <meta http-equiv="content-language" content="en-us" /> */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Porya Zarei Nextjs Message Application using SignalR"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="EINSTEIN" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="cyan"
                />

                <link rel="icon" href="/assets/icons/pze.png" />

                <link rel="apple-touch-icon" href="/assets/icons/pze.svg" />
                <link rel="apple-touch-icon" href="/assets/icons/pze1024.png" />

                <link
                    rel="shortcut icon"
                    href="/assets/icons/pze.svg"
                    type="vector/svg"
                />
                <link
                    rel="shortcut icon"
                    href="/assets/icons/pze1024.png"
                    type="image/png"
                />
                <link rel="manifest" href="./manifest.json" />

                {/*  css links */}
                <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
                <link
                    rel="stylesheet"
                    href="/assets/css/bootstrap-icons.min.css"
                />
                <script async src="/assets/js/bootstrap.bundle.min.js"></script>
                {/* scripts */}
                {/* <Script async="true" strategy="afterInteractive" src="/assets/js/bootstrap.bundle.min.js" /> */}
            </Head>
        </>
    );
};

export default MetaLayout;
