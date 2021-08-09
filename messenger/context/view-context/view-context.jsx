import {createContext, useEffect, useState} from "react";

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
    contextMenu: {show: false, x: 0, y: 0, chatData: {},listItemData:{}},
    setContextMenu: ({show, x, y, chatData,listItemData}) => {},
    selectedForwardDestinations: {
        rooms: [],
        channels: [],
        groups: [],
    },
    setSelectedForwardDestinations: ({rooms, channels, groups}) => {},
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
        listItemData:{}
    });
    const [chatsToShow, setChatsToShow] = useState({
        chats: [],
        type: "",
        Id: "",
        Name: "",
        Image: "",
        UserAccess: false,
        MembersName: [],
    });
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
    };
    return (
        <ViewContext.Provider value={context}>{children}</ViewContext.Provider>
    );
};

export default ViewContextProvider;
