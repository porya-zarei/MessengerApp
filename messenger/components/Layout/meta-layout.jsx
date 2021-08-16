import Head from "next/head";
import Script from "next/script";

const MetaLayout = () => {
    return (
        <>
            <Head>
                <title>PZE Messager</title>
                <meta charSet="utf-8" />
                {/* <meta http-equiv="content-language" content="en-us" /> */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Porya Zarei Nextjs Messeger Application using Asp.NetCore Web API + SignalR"
                />
                <meta name="application-name" content="Messenger App" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Messenger App"
                />
                <meta
                    name="description"
                    content="Best Messenger App in the world"
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                    name="msapplication-config"
                    content="/assets/icons/browserconfig.xml"
                />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />

                <link
                    rel="apple-touch-icon"
                    href="/assets/icons/MessengerApp.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/assets/icons/MessengerApp152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/assets/icons/MessengerApp180.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="167x167"
                    href="/assets/icons/MessengerApp167.png"
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="64x64"
                    href="/assets/icons/MessengerApp64.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/assets/icons/MessengerApp16.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="mask-icon"
                    href="/assets/icons/MessengerApp.svg"
                    color="#000000"
                />
                <link rel="shortcut icon" href="/MessengerApp.png" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://yourdomain.com" />
                <meta name="twitter:title" content="Messenger App" />
                <meta
                    name="twitter:description"
                    content="Best Messenger App in the world :)"
                />
                <meta
                    name="twitter:image"
                    content="https://yourdomain.com/assets/icons/MessengerApp192.png"
                />
                <meta name="twitter:creator" content="@Porya_Zarei" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Messenger App" />
                <meta
                    property="og:description"
                    content="Best Messenger App in the world :)"
                />
                <meta property="og:site_name" content="Messenger App" />
                <meta property="og:url" content="https://yourdomain.com" />
                <meta
                    property="og:image"
                    content="https://yourdomain.com/assets/icons/MessengerApp.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/assets/images/splashscreens/splashscreen1536.png"
                    sizes="1536x2048"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/assets/images/splashscreens/splashscreen640.png"
                    sizes="640x1136"
                />
                <link rel="manifest" href="./manifest.json" />

                {/*  css links */}
                <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
                <link
                    rel="stylesheet"
                    href="/assets/css/ReactToastify.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/ReactToastify.minimal.css"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/bootstrap-icons.min.css"
                />
            </Head>
        </>
    );
};

export default MetaLayout;
