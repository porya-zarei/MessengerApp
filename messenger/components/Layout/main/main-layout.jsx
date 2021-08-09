import {useContext} from "react";
import {UserDataContext} from "../../../context/data-context/data-context";
import {UserContext} from "../../../context/user-context/user-context";
import {ViewContext} from "../../../context/view-context/view-context";

const MainLayout = ({children}) => {
    const {setContextMenu} = useContext(ViewContext);
    const {channels, rooms, groups} = useContext(UserDataContext);
    const handleContextMenu = (e) => {
        e.preventDefault();
        let x = 0,
            y = 0;
        if (e.pageX > window.innerWidth - 220) {
            x = window.innerWidth - 220;
        } else {
            x = e.pageX;
        }
        if (e.pageY > window.innerHeight - 320) {
            y = window.innerHeight - 320;
        } else {
            y = e.pageY;
        }
        const contextData = {
            show: true,
            x: x,
            y: y,
            chatData: {},
            listItemData: {},
        };

        if (e.target.getAttribute("aria-chatdetail")) {
            const detail = JSON.parse(e.target.getAttribute("aria-chatdetail"));
            let chatData = {};
            if (detail.type === "room") {
                chatData = rooms
                    .find((r) => r.RoomID === detail.id)
                    .Chats.find((ch) => ch.ChatID === detail.chatId);
            } else if (detail.type === "group") {
                chatData = groups
                    .find((g) => g.GroupID === detail.id)
                    .Chats.find((ch) => ch.ChatID === detail.chatId);
            } else {
                chatData = channels
                    .find((c) => c.ChannelID === detail.id)
                    .Chats.find((ch) => ch.ChatID === detail.chatId);
            }
            contextData.chatData = chatData;
        }
        if (e.target.getAttribute("aria-listitemdetail")) {
            const detail = JSON.parse(
                e.target.getAttribute("aria-listitemdetail"),
            );
            let listItemData = {};
            console.log("detail in forwards => ",detail);
            if (detail.type === "room") {
                listItemData = {
                    type: "room",
                    room: rooms.find((r) => r.RoomID === detail.id),
                };
            } else if (detail.type === "group") {
                listItemData = {
                    type: "group",
                    group: groups.find((g) => g.GroupID === detail.id),
                };
            } else {
                listItemData = {
                    type: "channel",
                    channel: channels.find((c) => c.ChannelID === detail.id),
                };
            }
            contextData.listItemData = listItemData;
        }
        console.log("on context Menu => ", e, e?.target, contextData);
        setContextMenu(contextData);
    };
    return (
        <main
            onContextMenu={handleContextMenu}
            style={{zIndex: "0", margin: "0"}}
            className="h-auto w-100">
            {children}
        </main>
    );
};

export default MainLayout;
