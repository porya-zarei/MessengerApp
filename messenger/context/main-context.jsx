import {createContext, useEffect, useState} from "react";
import * as SignalR from "@microsoft/signalr";

export const MainContext = createContext({
    onlineUsers: 0,
    setOnlineUsers: () => {},
    showBurgerMenu: false,
    setShowBurgerMenu: () => {},
});

const ContextProvider = ({children}) => {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);

    useEffect(() => {
        // let succeed = false;
        // let startConnection = new SignalR.HubConnectionBuilder()
        //     .configureLogging(SignalR.LogLevel.Trace)
        //     .withUrl("https://localhost:44389/hubs/main")
        //     .build();
        // startConnection.on("OnlineUsersUpdated", (_onlineUsers) => {
        //     console.log("online users =>", _onlineUsers);
        //     setOnlineUsers(_onlineUsers);
        // });
        // try {
        //     startConnection
        //         .start()
        //         .then((r) => r)
        //         .then((res) => {
        //             console.log(`Connection started =>`, res);
        //             console.log("start connection => ", startConnection);
        //         });
        //     if (startConnection.connectionId.length !== 0) {
        //         succeed = true;
        //     }
        // } catch (error) {
        //     console.log(`startConnection =>`, error, startConnection);
        //     succeed = false;
        // }
        // return () => {
        //     if (succeed) {
        //         startConnection?.stop();
        //     }
        // }
    }, []);

    const context = {
        onlineUsers,
        setOnlineUsers,
        showBurgerMenu,
        setShowBurgerMenu,
    };
    return (
        <MainContext.Provider value={context}>{children}</MainContext.Provider>
    );
};

export default ContextProvider;
