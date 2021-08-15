import {createContext, useContext, useEffect, useRef, useState} from "react";
import * as SignalR from "@microsoft/signalr";
import {UserDataContext} from "../data-context/data-context";
import {fetcher} from "../../hooks/fetcher";
import {ViewContext} from "../view-context/view-context";
import {toast} from "react-toastify";
export const UserContext = createContext({
    user: {},
    setUser: () => {},
    token: "",
    setToken: () => {},
    connectionId: "",
    setConnectionId: () => {},
    status: "",
    setStatus: () => {},
    isLoged: false,
    setIsLoged: () => {},
    connection: {},
    setConnection: () => {},
    userId: "",
    setUserId: () => {},
});

const UserContextProvider = ({children}) => {
    const {channelsDispatcher, groupsDispatcher, roomsDispatcher} =
        useContext(UserDataContext);
    const {chatsToShow, setChatsToShow} = useContext(ViewContext);

    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [connectionId, setConnectionId] = useState("");
    const [status, setStatus] = useState("");
    const [isLoged, setIsLoged] = useState(false);
    const [connection, setConnection] = useState(null);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const userConnection = new SignalR.HubConnectionBuilder()
            .configureLogging(SignalR.LogLevel.Trace)
            .withAutomaticReconnect()
            .withUrl("https://localhost:44389/hubs/users")
            .build();

        userConnection.on("GetMainUserData", (data) => {
            console.log("main User Data => ", data);
            setUser(data);
            setUserId(data.UserID);
        });
        userConnection.on("NewChannelChat", (data) => {
            console.log("data in NewChannelChat => ", data);
            channelsDispatcher({
                type: "addChannelChat",
                payload: {
                    Chat: data,
                },
            });
        });
        userConnection.on("NewGroupChat", (data) => {
            console.log("data in NewGroupChat => ", data);
            groupsDispatcher({
                type: "addGroupChat",
                payload: {
                    Chat: data,
                },
            });
        });
        userConnection.on("NewRoomChat", (data) => {
            console.log("data in NewRoomChat => ", data);
            roomsDispatcher({
                type: "addRoomChat",
                payload: {
                    Chat: data,
                },
            });
        });
        userConnection.on("NewGroup", (data) => {
            console.log("data in NewGroup => ", data);
            groupsDispatcher({
                type: "addGroup",
                payload: {
                    Group: data,
                },
            });
        });
        userConnection.on("NewChannel", (data) => {
            console.log("data in NewChannel => ", data);
            channelsDispatcher({
                type: "addChannel",
                payload: {
                    Channel: data,
                },
            });
        });
        userConnection.on("NewRoom", (data) => {
            console.log("data in NewRoom => ", data);
            roomsDispatcher({
                type: "addRoom",
                payload: {
                    Room: data,
                },
            });
        });
        userConnection.on("UserJoinedGroup", (data) => {
            console.log("data in UserJoinedGroup => ", data);
            groupsDispatcher({
                type: "updateGroup",
                payload: {
                    Group: data,
                },
            });
        });
        userConnection.on("UserJoinedChannel", (data) => {
            console.log("data in UserJoinedChannel => ", data);
            channelsDispatcher({
                type: "updateChannel",
                payload: {
                    Channel: data,
                },
            });
        });
        userConnection.on("UserJoinedRoom", (data) => {
            console.log("data in UserJoinedRoom => ", data);
            roomsDispatcher({
                type: "updateRoom",
                payload: {
                    Room: data,
                },
            });
        });
        userConnection.on("JoinGroup", (data) => {
            console.log("data in JoinGroup => ", data);
            groupsDispatcher({
                type: "addGroup",
                payload: {
                    Group: data,
                },
            });
        });
        userConnection.on("JoinChannel", (data) => {
            console.log("data in JoinChannel => ", data);
            channelsDispatcher({
                type: "addChannel",
                payload: {
                    Channel: data,
                },
            });
        });
        userConnection.on("JoinRoom", (data) => {
            console.log("data in JoinRoom => ", data);
            roomsDispatcher({
                type: "addRoom",
                payload: {
                    Room: data,
                },
            });
        });

        userConnection.on("UserLeavedGroup", (data) => {
            console.log("data in UserLeavedGroup => ", data);
            groupsDispatcher({
                type: "updateGroup",
                payload: {
                    Group: data,
                },
            });
        });
        userConnection.on("GroupRemoved", (data) => {
            console.log("data in GroupRemoved => ", data);
            groupsDispatcher({
                type: "removeGroup",
                payload: {
                    GroupID: data,
                },
            });
        });
        userConnection.on("GroupDeletedComplete", (data) => {
            console.log("data in GroupDeletedComplete => ", data);
            groupsDispatcher({
                type: "removeGroup",
                payload: {
                    GroupID: data,
                },
            });
        });

        userConnection.on("UserLeavedChannel", (data) => {
            console.log("data in UserLeavedChannel => ", data);
            channelsDispatcher({
                type: "updateChannel",
                payload: {
                    Channel: data,
                },
            });
        });
        userConnection.on("ChannelRemoved", (data) => {
            console.log("data in ChannelRemoved => ", data);
            channelsDispatcher({
                type: "removeChannel",
                payload: {
                    ChannelID: data,
                },
            });
        });
        userConnection.on("ChannelDeletedComplete", (data) => {
            console.log("data in ChannelDeletedComplete => ", data);
            channelsDispatcher({
                type: "removeChannel",
                payload: {
                    ChannelID: data,
                },
            });
        });
        userConnection.on("ChannelChatUpdated", (data) => {
            channelsDispatcher({
                type: "updateChannelChat",
                payload: {Chat: data},
            });
        });
        userConnection.on("ChannelChatDeleted", (data) => {
            channelsDispatcher({
                type: "deleteChannelChat",
                payload: {
                    ChatID: data.ChatID,
                    ChannelID: data.ChannelID,
                },
            });
        });
        userConnection.on("GroupChatUpdated", (data) => {
            groupsDispatcher({
                type: "updateGroupChat",
                payload: {Chat: data},
            });
        });
        userConnection.on("GroupChatDeleted", (data) => {
            groupsDispatcher({
                type: "deleteGroupChat",
                payload: {
                    ChatID: data.ChatID,
                    GroupID: data.GroupID,
                },
            });
        });
        userConnection.on("RoomChatUpdated", (data) => {
            console.log("in update room chat call disp => ", data);
            roomsDispatcher({
                type: "updateRoomChat",
                payload: {Chat: data},
            });
        });

        userConnection.on("RoomChatDeleted", (data) => {
            console.log("data in delete room chat => ", data);
            roomsDispatcher({
                type: "deleteRoomChat",
                payload: {
                    ChatID: data.ChatID,
                    RoomID: data.RoomID,
                },
            });
            console.log("in after delete chat => ,", data, chatsToShow);
        });

        userConnection.on("ChannelUpdated", (channel) => {
            console.log("in channelUpdated => ", channel);
            channelsDispatcher({
                type: "updateChannel",
                payload: {Channel: channel},
            });
        });

        userConnection.on("GroupUpdated", (group) => {
            console.log("in groupUpdated => ", group);
            groupsDispatcher({
                type: "updateGroup",
                payload: {Group: group},
            });
        });
        userConnection.on("GetNotification", (message) => {
            toast.dark(message);
        });

        userConnection.on("NewForwardChatsSended", (data) => {
            if (data.OutputRoomsChats.length > 0) {
                roomsDispatcher({
                    type: "addRoomsChats",
                    payload: {Chats: data.OutputRoomChats},
                });
            }
            if (data.OutputGroupsChats.length > 0) {
                groupsDispatcher({
                    type: "addGroupsChats",
                    payload: {Chats: data.OutputGroupChats},
                });
            }
            if (data.OutputChannelsChats.length > 0) {
                channelsDispatcher({
                    type: "addChannelsChats",
                    payload: {Chats: data.OutputChannelChats},
                });
            }
            console.info("data after update for forward => ", data);
        });

        const onSuccess = async () => {
            console.log("successfull connection", token, userConnection);
            setConnection(userConnection);
            setConnectionId(userConnection.connectionId);
        };
        const onReject = () => {
            console.log("rejected connection");
        };

        userConnection.start().then(onSuccess, onReject);
        return () => {
            userConnection?.stop();
        };
    }, []);

    useEffect(() => {
        connection?.onreconnected(async (connId) => {
            console.log("in reconnected => ", connId, token);
            if (token.length > 0) {
                const data = {
                    UserID: userId,
                    ConnectionID: connId,
                };
                const {result} = await fetcher(
                    "POST",
                    "Users/SetUserConnectionId",
                    data,
                    token,
                );
                console.log("reConnetion => ", connId, "\n res =>", result);
                if (result === connId) {
                    console.log("re connected successFully => ", connId);
                    setConnectionId(connId);
                }
            }
        });
    }, [token]);

    const context = {
        user,
        setUser,
        token,
        setToken,
        connectionId,
        setConnectionId,
        status,
        setStatus,
        isLoged,
        setIsLoged,
        connection,
        setConnection,
        userId,
        setUserId,
    };
    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );
};

export default UserContextProvider;
