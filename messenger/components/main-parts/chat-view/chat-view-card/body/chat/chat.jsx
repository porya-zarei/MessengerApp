import {useContext, useRef, useState} from "react";
import {UserContext} from "../../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../../context/view-context/view-context";
import {fetcher} from "../../../../../../hooks/fetcher";
import classes from "./chat.module.scss";
import FileChat from "./file-chat/file-chat";
import ImageChat from "./image-chat/image-chat";
import VideoChat from "./video-chat/video-chat";
import VoiceChat from "./voice-chat/voice-chat";

const Chat = ({
    me,
    content,
    imageName,
    fileName,
    fileSize,
    imageSize,
    voiceSize,
    voiceName,
    videoName,
    videoSize,
    type,
    chatId,
    id,
    time,
}) => {
    
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const contentRef = useRef();
    const {token} = useContext(UserContext);
    const {theme} = useContext(ViewContext);

    let sendingTime = new Date(time);
    let style = {
        backgroundColor: theme.bubble1,
    };
    if (!me) {
        style.backgroundColor = theme.bubble2;
    }
    if (fileName) {
        console.log("file name => ", fileName, fileSize);
    }
    let orgText = content;
    let chatDetail = {
        chatId,
        id,
        type,
    };

    const sendEditingReq = async () => {
        let url = "";
        if (type === "room") {
            url = "Rooms/UpdateRoomChat";
        } else if (type === "group") {
            url = "Groups/UpdateGroupChat";
        } else {
            url = "Channels/UpdateChannelChat";
        }
        const data = {
            ChatID: chatId,
            Text: contentRef.current?.innerText,
        };
        const {result, isError} = await fetcher("POST", url, data, token);
        console.log("result in update chat => ", result, data);
        if (isError) {
            contentRef.current.innerText = orgText;
        }
        return {result, isError};
    };
    const handleEditing = async () => {
        if (editing) {
            console.log("edited Text => ", contentRef.current.innerText);
            await sendEditingReq();
            setEditing(false);
        } else {
            setEditing(true);
        }
    };
    const sendDeletingReq = async () => {
        let url = "";
        if (type === "room") {
            url = "Rooms/DeleteRoomChat";
        } else if (type === "group") {
            url = "Groups/DeleteGroupChat";
        } else {
            url = "Channels/DeleteChannelChat";
        }
        const data = {
            ChatID: chatId,
        };
        const {result, isError} = await fetcher("POST", url, data, token);
        console.log("result in delete chat => ", result, data);
        return {result, isError};
    };
    const handleDeleting = async () => {
        setDeleting(true);
        await sendDeletingReq();
        setDeleting(false);
    };

    return (
        <div
            id={chatId}
            aria-chatdetail={JSON.stringify(chatDetail)}
            className={`${
                classes.chatContainer
            } text-white h-auto bg-transparent w-100 p-0 row ${
                !me ? "justify-content-start" : "justify-content-end"
            }`}>
            <div
                style={{backgroundColor: style.backgroundColor,color:theme.text}}
                className={`${classes.chat} row m-0 my-1 p-1`}>
                {imageName && (
                    <div className="col-12 m-0 p-0 h-auto">
                        <ImageChat imageName={imageName} />
                    </div>
                )}
                {videoName && (
                    <div className="col-12 m-0 p-0 h-auto">
                        <VideoChat
                            videoName={videoName}
                            videoSize={videoSize}
                        />
                    </div>
                )}
                <div
                    contentEditable={editing}
                    className={`${classes.chatContent} col-12 m-0 p-1`}
                    ref={contentRef}>
                    {content}
                </div>
                <div className={`${classes.chatDetail} col-12 m-0 p-0`}>
                    {me && (
                        <>
                            <div className={`${classes.chatEdit}`}>
                                <button onClick={handleEditing} className="">
                                    {editing ? (
                                        <i className="spinner-border fs-9px h-9px w-9px"></i>
                                    ) : (
                                        <i className="bi bi-pen-fill"></i>
                                    )}
                                </button>
                            </div>
                            <div className={`${classes.chatDelete}`}>
                                <button onClick={handleDeleting} className="">
                                    {deleting ? (
                                        <i className="spinner-border fs-9px  h-9px w-9px"></i>
                                    ) : (
                                        <i className="bi bi-trash2-fill text-danger"></i>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                    <div className={`${classes.chatTime}`}>
                        {sendingTime.getHours() +
                            ":" +
                            sendingTime.getMinutes()}
                    </div>
                    <div className={`${classes.chatStatus}`}>
                        <i className="bi bi-check-all" style={{color:theme.textGray}}></i>
                    </div>
                </div>
                {voiceName && voiceName?.length > 0 && (
                    <div className="col-12 p-0 m-0 w-100">
                        <VoiceChat
                            voiceSize={voiceSize}
                            voiceName={voiceName}
                        />
                    </div>
                )}
                {(fileName || fileSize !== 0) && (
                    <div className="col-12 p-0 m-0 w-100">
                        <FileChat fileName={fileName} fileSize={fileSize} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
