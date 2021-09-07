import {createContext, useEffect, useMemo, useState} from "react";

export const ViewContext = createContext({
    isInChat: false,
    setIsInChat: () => {},
    isMobile: false,
    setIsMobile: () => {},
    chatsToShow: {
        chats: [],
        type: "",
        Id: "",
        Name: "",
        Image: "",
        UserAccess: false,
        MembersName: [],
        userName: "",
        description: "",
    },
    setChatsToShow: () => {},
    showCreateGroup: false,
    setShowCreateGroup: () => {},
    showCreateChannel: false,
    setShowCreateChannel: () => {},
    showCreateRoom: false,
    setShowCreateRoom: () => {},
    selectedChatsId: [],
    setSelectedChatsId: () => {},
    contextMenu: {show: false, x: 0, y: 0, chatData: {}, listItemData: {}},
    setContextMenu: ({show, x, y, chatData, listItemData}) => {},
    selectedForwardDestinations: {
        rooms: [],
        channels: [],
        groups: [],
    },
    setSelectedForwardDestinations: ({rooms, channels, groups}) => {},
    showBurgerMenu: false,
    setShowBurgerMenu: () => {},
    showHeaderInfo: false,
    setShowHeaderInfo: () => {},
    theme: {
        name: "dark",
        light: "#DDDDDD",
        primary: "#30475E",
        primarier: "#0A043C",
        primaryLight: "#1c6ce3",
        dark: "#222831",
        darker: "#171717",
        danger: "#F05454",
        warning: "#FFD369",
        info: "#03506F",
        textGray: "#C4BBF0",
        text: "#F5EDED",
        textDark: "#151515",
        bubble1: "#577399",
        bubble2: "#495867",
        illuColors: ["#6e6eff", "#3f3d56"],
    },
    setTheme: () => {},
    chatBackground: "/assets/images/webp/background.webp",
    setChatBackground: () => {},
});

const ViewContextProvider = ({children}) => {
    const [isInChat, setIsInChat] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showCreateChannel, setShowCreateChannel] = useState(false);
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [selectedChatsId, setSelectedChatsId] = useState([]);
    const [selectedForwardDestinations, setSelectedForwardDestinations] =
        useState({
            rooms: [],
            channels: [],
            groups: [],
        });
    const [contextMenu, setContextMenu] = useState({
        show: false,
        x: 0,
        y: 0,
        chatData: {},
        listItemData: {},
    });
    const [chatsToShow, setChatsToShow] = useState({
        chats: [],
        type: "",
        Id: "",
        Name: "",
        Image: "/assets/images/png/avatar.png",
        UserAccess: false,
        MembersName: [],
        userName: "",
        description: "",
    });
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const [showHeaderInfo, setShowHeaderInfo] = useState(false);

    const [th, setTheme] = useState({
        name: "dark",
        light: "#DDDDDD",
        primary: "#30475E",
        primarier: "#0A043C",
        primaryLight: "rgba(28, 107, 226, 0.514)",
        dark: "#222831",
        darker: "#171717",
        danger: "#F05454",
        warning: "#FFD369",
        info: "#03506F",
        textGray: "#C4BBF0",
        text: "#F5EDED",
        textDark: "#151515",
        bubble1: "#577399",
        bubble2: "#495867",
        illuColors: ["#6e6eff", "#3f3d56"],
    });
    const theme = useMemo(() => th, [th.name]);
    const [chatBackground, setChatBackground] = useState(
        "/assets/images/webp/background.webp",
    );
    useEffect(() => {
        if (window) {
            console.log(
                "width & height => ",
                window.screenX,
                window.screenY,
                window.screen,
            );
            if (window.screen.availWidth < 800) {
                setIsMobile(true);
            }
        }
        if (localStorage.getItem("theme")) {
            const storageTheme = JSON.parse(localStorage.getItem("theme"));
            if (theme.name !== storageTheme.name) {
                setTheme(storageTheme);
            }
        }
    }, []);
    const context = {
        isInChat,
        setIsInChat,
        isMobile,
        setIsMobile,
        chatsToShow,
        setChatsToShow,
        showCreateChannel,
        setShowCreateChannel,
        showCreateGroup,
        setShowCreateGroup,
        showCreateRoom,
        setShowCreateRoom,
        selectedChatsId,
        setSelectedChatsId,
        contextMenu,
        setContextMenu,
        selectedForwardDestinations,
        setSelectedForwardDestinations,
        showBurgerMenu,
        setShowBurgerMenu,
        showHeaderInfo,
        setShowHeaderInfo,
        theme,
        setTheme,
        chatBackground,
        setChatBackground,
    };
    return (
        <ViewContext.Provider value={context}>{children}</ViewContext.Provider>
    );
};

export default ViewContextProvider;
