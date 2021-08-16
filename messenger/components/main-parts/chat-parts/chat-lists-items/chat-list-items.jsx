import {useContext, useMemo} from "react";
import {UserDataContext} from "../../../../context/data-context/data-context";
import {ViewContext} from "../../../../context/view-context/view-context";
import {UserContext} from "../../../../context/user-context/user-context";
import ChatListItem from "../chat-list-item/chat-list-item";

import classes from "./chatlistitems.module.scss";
const ChatListItems = () => {
    const {setIsInChat, setChatsToShow, theme} = useContext(ViewContext);
    const {rooms, groups, channels} = useContext(UserDataContext);
    const {userId, user} = useContext(UserContext);

    const handleRoomClick = (item) => {
        setIsInChat(true);
        setChatsToShow({
            chats: rooms.find((ro) => ro.RoomID === item.Id).Chats,
            type: "room",
            Id: item.Id,
            Name: item.Name,
            Image: item.Image,
            UserAccess: true,
            MembersName: item.MembersName,
            userName: item.userName,
            description: item.description,
        });
    };
    const handleGroupClick = (item) => {
        setIsInChat(true);
        setChatsToShow({
            chats: groups.find((gr) => gr.GroupID === item.Id).Chats,
            type: "group",
            Id: item.Id,
            Name: item.Name,
            Image: item.Image,
            UserAccess: item.UserAccess,
            MembersName: item.MembersName,
            userName: item.userName,
            description: item.description,
        });
    };

    const handleChannelClick = (item) => {
        setIsInChat(true);
        setChatsToShow({
            chats: channels.find((ch) => ch.ChannelID === item.Id).Chats,
            type: "channel",
            Id: item.Id,
            Name: item.Name,
            Image: item.Image,
            UserAccess: item.UserAccess,
            MembersName: item.MembersName,
            userName: item.userName,
            description: item.description,
        });
    };

    let channelsList;
    if (channels.length !== 0) {
        channelsList = channels.map((ch) => {
            return {
                Name: ch?.Name,
                LastChatText:
                    ch?.Chats.length !== 0
                        ? ch?.Chats[ch?.Chats.length - 1]?.Text
                        : "",
                lastChatSendingTime:
                    ch?.Chats.length !== 0
                        ? ch?.Chats[ch?.Chats?.length - 1]?.SendingTime
                        : "",
                Id: ch?.ChannelID,
                Image: ch?.ChannelProfileImage
                    ? `https://localhost:44389/files/images/channels/${ch.ChannelProfileImage}`
                    : "/assets/images/png/avatar.png",
                UserAccess: ch?.AdminsUserName?.includes(user.UserName),
                chatsCount: ch?.Chats?.length,
                MembersName: ch?.AdminsUserName,
                userName: ch?.ChannelUserName,
                description: ch?.ChannelDescription,
            };
        });
    }

    let groupsList;
    if (groups.length !== 0) {
        groupsList = groups.map((gr) => {
            return {
                Name: gr?.Name,
                LastChatText:
                    gr.Chats.length !== 0
                        ? gr?.Chats[gr?.Chats?.length - 1]?.Text
                        : "",
                lastChatSendingTime:
                    gr?.Chats.length !== 0
                        ? gr?.Chats[gr?.Chats?.length - 1]?.SendingTime
                        : "",
                Id: gr?.GroupID,
                Image: gr?.GroupProfileImage
                    ? `https://localhost:44389/files/images/groups/${gr.GroupProfileImage}`
                    : "/assets/images/png/avatar.png",
                UserAccess: gr?.GroupMembersName?.includes(
                    user?.FirstName + " " + user?.LastName,
                ),
                chatsCount: gr?.Chats.length,
                MembersName: gr?.GroupMembersName,
                userName: gr?.GroupUserName,
                description: gr?.GroupDescription,
            };
        });
    }

    let roomsList;
    if (rooms.length !== 0) {
        roomsList = rooms.map((ro) => {
            return {
                Name: ro?.OtherName,
                LastChatText:
                    ro?.Chats.length !== 0
                        ? ro?.Chats[ro?.Chats?.length - 1]?.Text
                        : "",
                lastChatSendingTime:
                    ro?.Chats.length !== 0
                        ? ro?.Chats[ro?.Chats?.length - 1]?.SendingTime
                        : "",
                Id: ro?.RoomID,
                Image: ro?.OtherUserImage
                    ? `https://localhost:44389/files/images/profiles/${ro.OtherUserImage}`
                    : "/assets/images/png/avatar.png",
                chatsCount: ro?.Chats?.length,
                MembersName: [ro?.SenderName, ro?.ReceiverName],
                userName: ro?.OtherUserName,
                description: ro?.OtherDescription,
            };
        });
    }
    return (
        <ul className={`${classes.ulDecorationNone} w-100 p-0 m-0`}>
            {roomsList?.map((item) => (
                <li className={`w-100`} key={item.Name}>
                    <button
                        onClick={() => handleRoomClick(item)}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            name={item.Name}
                            lastText={item.LastChatText}
                            lastChatTime={item.lastChatSendingTime}
                            color={"info"}
                            count={item.chatsCount}
                            image={item.Image}
                            detail={{id: item.Id, type: "room"}}
                            item={item}
                            onDragEnd={handleRoomClick}
                        />
                    </button>
                </li>
            ))}
            {groupsList?.map((item) => (
                <li className={`w-100`} key={item.Name}>
                    <button
                        onClick={() => handleGroupClick(item)}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            name={item.Name}
                            lastText={item.LastChatText}
                            lastChatTime={item.lastChatSendingTime}
                            color={"primary"}
                            count={item.chatsCount}
                            image={item.Image}
                            detail={{id: item.Id, type: "group"}}
                            item={item}
                            onDragEnd={handleGroupClick}
                        />
                    </button>
                </li>
            ))}
            {channelsList?.map((item) => (
                <li className={`w-100`} key={item.Name}>
                    <button
                        onClick={() => handleChannelClick(item)}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            name={item.Name}
                            lastText={item.LastChatText}
                            lastChatTime={item.lastChatSendingTime}
                            color={"danger"}
                            count={item.chatsCount}
                            image={item.Image}
                            detail={{id: item.Id, type: "channel"}}
                            item={item}
                            onDragEnd={handleChannelClick}
                        />
                    </button>
                </li>
            ))}
            <li className={`w-100`} key={"nothing"}>
                <div className="p-2 my-3" style={{color: theme.textGray}}>
                    what do you want ?
                </div>
            </li>
        </ul>
    );
};

export default ChatListItems;
