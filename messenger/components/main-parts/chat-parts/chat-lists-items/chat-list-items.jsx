import {useContext} from "react";
import {UserDataContext} from "../../../../context/data-context/data-context";
import {ViewContext} from "../../../../context/view-context/view-context";
import {UserContext} from "../../../../context/user-context/user-context";
import ChatListItem from "../chat-list-item/chat-list-item";

import classes from "./chatlistitems.module.scss";
const ChatListItems = () => {
    const {setIsInChat, setChatsToShow} = useContext(ViewContext);
    const {rooms, groups, channels} = useContext(UserDataContext);
    const {userId, user} = useContext(UserContext);
    console.log("user data in lists => ", rooms, groups, channels);
    let channelsList;
    if (channels.length !== 0) {
        channelsList = channels.map((ch) => {
            return {
                Name: ch?.Name,
                LastChatText:
                    ch?.Chats.length !== 0
                        ? ch?.Chats[ch?.Chats.length - 1]?.Text
                        : "",
                Id: ch?.ChannelID,
                Image: "",
                UserAccess: ch?.AdminsUserName?.includes(user.UserName),
                chatsCount: ch?.Chats?.length,
                MembersName: ch?.AdminsUserName,
            };
        });
    }

    let groupsList;
    if (groups.length !== 0) {
        groupsList = groups.map((gr) => {
            console.log(
                "access group => ",
                gr?.GroupMembersName,
                user?.FirstName + " " + user.LastName,
            );
            return {
                Name: gr?.Name,
                LastChatText:
                    gr.Chats.length !== 0
                        ? gr?.Chats[gr?.Chats?.length - 1]?.Text
                        : "",
                Id: gr?.GroupID,
                Image: gr?.GroupProfileImage,
                UserAccess: gr?.GroupMembersName?.includes(
                    user?.FirstName + " " + user?.LastName,
                ),
                chatsCount: gr?.Chats.length,
                MembersName: gr?.GroupMembersName,
            };
        });
    }

    let roomsList;
    if (rooms.length !== 0) {
        roomsList = rooms.map((ro) => {
            return {
                Name: ro?.OtherUserName,
                LastChatText:
                    ro?.Chats.length !== 0
                        ? ro?.Chats[ro?.Chats?.length - 1]?.Text
                        : "",
                Id: ro?.RoomID,
                Image: ro?.OtherUserImage,
                chatsCount: ro?.Chats?.length,
                MembersName: [ro?.SenderName, ro?.ReceiverName],
            };
        });
    }
    return (
        <ul className={`${classes.ulDecorationNone} w-100 p-0 m-0`}>
            {roomsList?.map((item) => (
                <li className={`w-100`} key={item.name}>
                    <button
                        onClick={() => {
                            setIsInChat(true);
                            setChatsToShow({
                                chats: rooms.find((ro) => ro.RoomID === item.Id)
                                    .Chats,
                                type: "room",
                                Id: item.Id,
                                Name: item.Name,
                                Image: item.Image,
                                UserAccess: true,
                                MembersName: item.MembersName,
                            });
                        }}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            name={item.Name}
                            lastText={item.LastChatText}
                            color={"info"}
                            count={item.chatsCount}
                            image={item.Image}
                            detail={{id: item.Id, type: "room"}}
                        />
                    </button>
                </li>
            ))}
            {groupsList?.map((item) => (
                <li className={`w-100`} key={item.Name}>
                    <button
                        onClick={() => {
                            setIsInChat(true);
                            setChatsToShow({
                                chats: groups.find(
                                    (gr) => gr.GroupID === item.Id,
                                ).Chats,
                                type: "group",
                                Id: item.Id,
                                Name: item.Name,
                                Image: item.Image,
                                UserAccess: item.UserAccess,
                                MembersName: item.MembersName,
                            });
                        }}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            name={item.Name}
                            lastText={item.LastChatText}
                            color={"primary"}
                            count={item.chatsCount}
                            image={item.Image}
                            detail={{id: item.Id, type: "group"}}
                        />
                    </button>
                </li>
            ))}
            {channelsList?.map((item) => (
                <li className={`w-100`} key={item.Name}>
                    <button
                        onClick={() => {
                            setIsInChat(true);
                            setChatsToShow({
                                chats: channels.find(
                                    (ch) => ch.ChannelID === item.Id,
                                ).Chats,
                                type: "channel",
                                Id: item.Id,
                                Name: item.Name,
                                Image: item.Image,
                                UserAccess: item.UserAccess,
                                MembersName: item.MembersName,
                            });
                        }}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            name={item.Name}
                            lastText={item.LastChatText}
                            color={"danger"}
                            count={item.chatsCount}
                            image={item.Image}
                            detail={{id: item.Id, type: "channel"}}
                        />
                    </button>
                </li>
            ))}
            <li className={`w-100`} key={"nothing"}>
                <div className="p-2 my-3 text-white-50">what do you want ?</div>
            </li>
        </ul>
    );
};

export default ChatListItems;
