import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import classes from "./cvcf.module.scss";
import Emojis from "./emojis/emojis";
import FileSender from "./file-sender/file-sender";
import {sendRequest} from "./send-request";
import VoiceSender from "./voice-sender/voice-sender";

const ChatViewCardFooter = () => {
    const {chatsToShow} = useContext(ViewContext);
    const {userId, token, user} = useContext(UserContext);
    const [text, setText] = useState("");
    const file = useRef();
    const image = useRef();
    const video = useRef();
    const [voice, setVoice] = useState();
    const handleSendChat = async () => {
        console.log("chatsToShow => ", chatsToShow, userId);

        const {result, isError, resStatus, error} = await sendRequest(
            {...chatsToShow},
            token,
            text,
            userId,
            file.current.files[0],
            image.current.files[0],
            video.current.files[0],
            voice
        );
        console.log(
            "result in card footer => ",
            result,
            isError,
            resStatus,
            error,
            file,
            image,
            video,
        );
        if (!isError) {
            file.current.value = null;
            image.current.value = null;
            video.current.value = null;
            setText("");
        }
    };
    useEffect(() => {
        console.log("show chats => ", chatsToShow, user, userId);
    }, []);
    return (
        <div className={`${classes.cardFooterContainer} col-12 mb-auto mt-1`}>
            <div
                className={`${classes.cardFooter} ${
                    chatsToShow.UserAccess ? "" : "display-none"
                }`}>
                <div className="row p-0 m-0 h-100 w-100">
                    <div className="col-12 h-100 p-0 m-0">
                        <div className="m-0 p-0 w-100 h-40px mt-1 center">
                            <FileSender
                                image={image}
                                file={file}
                                video={video}
                            />
                            <input
                                name="ImageFile"
                                id="ImageFileInputInChatView"
                                className="display-none"
                                type="file"
                                hidden="true"
                            />
                            <input
                                type="text"
                                placeholder="type..."
                                className={`${classes.searchInput} form-control p-2 m-0 h-100`}
                                value={text}
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                            />
                            <button
                                onClick={handleSendChat}
                                className={`${classes.searchBtn} btn m-0 mr-auto mb-auto h-100 w-40px center`}>
                                <i className="bi bi-telegram text-white fs-larger"></i>
                            </button>
                            <button className="btn bg-transparent text-white-50 emoji-button">
                                <i className="bi bi-emoji-laughing text-white-50 fs-larger"></i>
                                <Emojis setText={setText} />
                            </button>
                            <VoiceSender voice={voice} setVoice={setVoice} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatViewCardFooter;
