export const channelsReducer = (state = {}, action) => {
    switch (action.type) {
        case "Initial": {
            return [...action.payload];
        }
        case "addChannel": {
            let channels = [...state];
            channels.push(action.payload.Channel);
            return [...channels];
        }
        case "updateChannel": {
            let channels = [...state];
            let newChannels = channels.filter(
                (c) => c.ChannelID !== action.payload.Channel.ChannelID,
            );
            newChannels.push(action.payload.Channel);
            return [...newChannels];
        }
        case "removeChannel": {
            let channels = [...state];
            let newChannels = channels.filter(
                (c) => c.ChannelID !== action.payload.ChannelID,
            );
            return [...newChannels];
        }
        case "addChannelChat": {
            console.log("state in chs => ", state);
            let channels = [...state];
            let channel = {
                ...channels.find(
                    (c) => c.ChannelID === action.payload.Chat.ChannelID,
                ),
            };
            if (
                channel.Chats[channel.Chats?.length - 1].ChatID !==
                action.payload.Chat?.ChatID
            ) {
                channel.Chats.push(action.payload.Chat);
            }

            let newChannels = channels.filter(
                (c) => c.ChannelID !== channel.ChannelID,
            );
            newChannels.push(channel);
            return [...newChannels];
        }
        case "updateChannelChat": {
            let channels = [...state];
            let channel = {
                ...channels.find(
                    (channel) => channel.ChannelID === action.payload.ChannelID,
                ),
            };
            let chatIndex = channel.Chats.findIndex(
                (chat) => chat.ChatID === action.payload.Chat.ChatID,
            );
            channel.Chats.splice(chatIndex, 1, action.payload.Chat);
            let newChannels = [
                ...channels.filter((ro) => ro.ChannelID !== channel.ChannelID),
            ];
            newChannels.push(channel);
            return [...newChannels];
        }
        case "deleteChannelChat": {
            let channels = [...state];
            let channel = {
                ...channels.find(
                    (channel) =>
                        channel.ChannelID === action.payload.Chat.ChannelID,
                ),
            };
            let newChannels = [
                ...channels.filter((ro) => ro.ChannelID !== channel.ChannelID),
            ];
            let chatIndex = channel.Chats.findIndex(
                (ch) => ch.ChatID === action.payload.ChatID,
            );
            channel.Chats.splice(chatIndex, 1);
            newChannels.push(channel);
            return [...newChannels];
        }
        case "addChannelsChats": {
            let channels = [...state];
            let updatedChannels = [];
            let channelsIdSet = new Set();

            action.payload.Chats.forEach((chat) =>
                channelsIdSet.add(chat.ChannelID),
            );

            channelsIdSet.forEach((channelId) => {
                let channelChats = action.payload.Chats.filter(
                    (ch) => ch.ChannelID === channelId,
                );
                let channel = {
                    ...channels.find((r) => r.ChannelID === channelId),
                };
                for (let chat in channelChats) {
                    if (
                        !channel.Chats.includes(
                            (ch) => ch.ChatID === action.payload.Chat.ChatID,
                        )
                    ) {
                        channel.Chats.push(chat);
                    }
                }

                updatedChannels.push(channel);
            });
            let outChannels = channels.filter(
                (ro) => !channelsIdSet.has(ro.ChannelID),
            );
            outChannels.push(updatedChannels);
            return [...outChannels];
        }
        default:
            return state;
    }
};
