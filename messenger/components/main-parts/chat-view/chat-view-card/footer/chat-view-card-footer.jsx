import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import classes from "./cvcf.module.scss";
import Emojis from "./emojis/emojis";
import FileSender from "./file-sender/file-sender";
import {sendRequest} from "./send-request";
import VoiceSender from "./voice-sender/voice-sender";

const ChatViewCardFooter = () => {
    const {chatsToShow, theme, sendByEnter} = useContext(ViewContext);
    const {userId, token, user} = useContext(UserContext);
    const [text, setText] = useState("");
    const file = useRef();
    const image = useRef();
    const video = useRef();
    const [voice, setVoice] = useState();
    const inputRef = useRef();
    const handleSendChat = async () => {
        if (
            (text.length > 0 || file.current.files[0] !== null,
            image.current.files[0] !== null,
            video.current.files[0] !== null,
            voice !== null)
        ) {
            const {isError} = await sendRequest(
                {...chatsToShow},
                token,
                text,
                userId,
                file.current.files[0],
                image.current.files[0],
                video.current.files[0],
                voice,
            );
            if (!isError) {
                file.current.value = null;
                image.current.value = null;
                video.current.value = null;
                setText("");
            }
        }
    };
    useEffect(() => {
        console.log("show chats => ", chatsToShow, user, userId);
        inputRef.current.focus();
        const handleEnter = (e) => {
            if (
                e.keyCode === 13 &&
                text.length > 0 &&
                document.activeElement === inputRef.current
            ) {
                handleSendChat();
            }
        };
        if (sendByEnter) {
            window.addEventListener("keydown", handleEnter);
            return () => {
                window.removeEventListener("keydown", handleEnter);
            };
        }
    }, []);
    return (
        <div
            style={{backgroundColor: theme.primarier}}
            className={`${classes.cardFooterContainer} col-12 mb-auto mt-1`}>
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
                            <div className={classes.searchInputContainer}>
                                <input
                                    type="text"
                                    placeholder="type..."
                                    ref={inputRef}
                                    className={`${classes.searchInput} p-2 m-0`}
                                    value={text}
                                    onChange={(e) => {
                                        setText(e.target.value);
                                    }}
                                    style={{
                                        borderColor: theme.text,
                                        color: theme.text,
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleSendChat}
                                className={`${classes.searchBtn} m-0 mr-auto mb-auto h-100 w-40px center`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-100 w-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke={theme.text}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                            </button>
                            <button className="btn bg-transparent text-white-50 emoji-button">
                                <i
                                    style={{color: theme.textGray}}
                                    className="bi bi-emoji-laughing fs-larger"></i>
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
