import Chat from "../chat/chat";

const Chats = ({type = "", chats, userId}) => {
    if (type === "room") {
        return (
            <>
                {chats.map((chat) => (
                    <Chat
                        me={chat.SenderID === userId ? true : false}
                        content={chat?.Text}
                        fileName={chat?.File}
                        fileSize={chat?.FileSize}
                        imageName={chat?.Image}
                        imageSize={chat?.ImageSize}
                        voiceName={chat?.Voice}
                        voiceSize={chat?.VoiceSize}
                        videoName={chat?.Video}
                        videoSize={chat?.VideoSize}
                        key={chat.ChatID}
                        type={"room"}
                        chatId={chat.ChatID}
                        id={chat.RoomID}
                        time={chat.SendingTime}
                    />
                ))}
            </>
        );
    } else if (type === "group") {
        return (
            <>
                {chats.map((chat) => (
                    <Chat
                        me={chat.SenderID === userId ? true : false}
                        content={chat?.Text}
                        fileName={chat?.File}
                        fileSize={chat?.FileSize}
                        imageName={chat?.Image}
                        imageSize={chat?.ImageSize}
                        voiceName={chat?.Voice}
                        voiceSize={chat?.VoiceSize}
                        videoName={chat?.Video}
                        videoSize={chat?.VideoSize}
                        key={chat.ChatID}
                        type={"group"}
                        chatId={chat.ChatID}
                        id={chat.GroupID}
                        time={chat.SendingTime}
                    />
                ))}
            </>
        );
    } else {
        return (
            <>
                {chats.map((chat) => (
                    <Chat
                        me={false}
                        content={chat?.Text}
                        fileName={chat?.File}
                        fileSize={chat?.FileSize}
                        imageName={chat?.Image}
                        imageSize={chat?.ImageSize}
                        voiceName={chat?.Voice}
                        voiceSize={chat?.VoiceSize}
                        videoName={chat?.Video}
                        videoSize={chat?.VideoSize}
                        key={chat.ChatID}
                        type={"Channel"}
                        chatId={chat.ChatID}
                        id={chat.ChannelID}
                        time={chat.SendingTime}
                    />
                ))}
            </>
        );
    }
};

export default Chats;
