import {createContext, useEffect, useState} from "react";
import * as SignalR from "@microsoft/signalr";

export const MainContext = createContext({});

const ContextProvider = ({children}) => {
    // const [onlineUsers, setOnlineUsers] = useState(0);
    // const [showBurgerMenu, setShowBurgerMenu] = useState(false);

    const context = {
        // onlineUsers,
        // setOnlineUsers,
        // showBurgerMenu,
        // setShowBurgerMenu,
    };
    return (
        <MainContext.Provider value={context}>{children}</MainContext.Provider>
    );
};

export default ContextProvider;
