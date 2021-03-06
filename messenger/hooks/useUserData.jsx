import { useContext, useState } from "react";
import { files_url } from "../configs/configs";
import { UserDataContext } from "../context/data-context/data-context";
import { UserContext } from "../context/user-context/user-context";
import { ViewContext } from "../context/view-context/view-context";

const useUserData = () => {

    const {rooms, groups, channels} = useContext(UserDataContext);
    const {setIsInChat, setChatsToShow} = useContext(ViewContext);
    
    const { user} = useContext(UserContext);
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
                    ? `${files_url}/images/channels/${ch.ChannelProfileImage}`
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
                    ? `${files_url}/images/groups/${gr.GroupProfileImage}`
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
                    ? `${files_url}/images/profiles/${ro.OtherUserImage}`
                    : "/assets/images/png/avatar.png",
                chatsCount: ro?.Chats?.length,
                MembersName: [ro?.SenderName, ro?.ReceiverName],
                userName: ro?.OtherUserName,
                description: ro?.OtherDescription,
            };
        });
    }

    return ({roomsList,groupsList,channelsList,handleRoomClick,handleGroupClick,handleChannelClick});
}
 
export default useUserData;