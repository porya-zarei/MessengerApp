import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import {fetcher} from "../../../../../hooks/fetcher";
import VoiceChat from "../voice-chat/voice-chat";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from "framer-motion";
import classes from "./cvch.module.scss";

const ChatViewCardHeader = () => {
    const {chatsToShow, isMobile, setIsInChat} = useContext(ViewContext);
    const {userId, token} = useContext(UserContext);
    const [settingShow, setSettingShow] = useState(false);
    const [voiceChatShow, setVoiceChatShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const xPosition = useMotionValue(0);
    const xRange = [-200, 0, 200];
    const opacityRange = [0, 1, 0];
    const opacity = useTransform(xPosition, xRange, opacityRange);

    const handleLeaving = async () => {
        setLoading(true);
        if (chatsToShow.type === "channel") {
            const data = {
                ChannelID: chatsToShow.Id,
                UserID: userId,
            };

            const {result, error} = await fetcher(
                "POST",
                "Channels/LeaveChannel",
                data,
                token,
            );
            console.log(
                "result in leaving channel => ",
                result,
                error,
                chatsToShow,
            );
        } else if (chatsToShow.type === "group") {
            const data = {
                GroupID: chatsToShow.Id,
                UserID: userId,
            };

            const {result, error} = await fetcher(
                "POST",
                "Groups/LeaveGroup",
                data,
                token,
            );
            console.log(
                "result in leaving group => ",
                result,
                error,
                chatsToShow,
            );
        }
        setLoading(false);
    };

    const handleDragEnd = () => {
        if (xPosition.get() > 70) {
            setIsInChat(false);
        }
    };

    useEffect(() => {
        
        const handleBackButton = () => {
            console.log("in back button");
        }
        window.addEventListener("backbutton",handleBackButton);

        return () => {
            window.removeEventListener("backbutton",handleBackButton);
        };
    }, []);

    return (
        <div className={`${classes.cardHeaderContainer} co-12`}>
            <AnimatePresence>
                <motion.div
                    drag="x"
                    style={{x: xPosition, opacity}}
                    dragConstraints={{
                        left: 0,
                        right: 0,
                    }}
                    onDragEnd={() => isMobile && handleDragEnd()}
                    className={`${classes.cardHeader}`}>
                    <div className={`${classes.userAvatar} center`}>
                        <div className="center m-auto hw-70px">
                            <img
                                src={
                                    chatsToShow.Image !== ""
                                        ? "https://localhost:44389/files/images/profiles/" +
                                          chatsToShow.Image
                                        : "/assets/images/png/avatar.png"
                                }
                                height="66px"
                                width="66px"
                                className="h-100 w-100 img-circle"
                            />
                        </div>
                    </div>
                    <div className={`${classes.userName}`}>
                        <marquee
                            className="w-100 h-100"
                            behavior="scroll"
                            direction="left"
                            scrollamount="5">
                            {chatsToShow.Name}
                        </marquee>
                    </div>
                    <div className={`${classes.networkStatus}`}>
                        start to chat...
                    </div>
                    <div className={`${classes.chatSetting}`}>
                        <button
                            onClick={() => setSettingShow((p) => !p)}
                            className="btn btn-primary bg-transparent border-0 rounded rounded-circle">
                            <i className="bi bi-three-dots-vertical fs-large"></i>
                        </button>
                        {settingShow && (
                            <div
                                className={`${classes.chatSettingListContainer}`}>
                                <ul className={`${classes.chatSettingList}`}>
                                    <li
                                        className={`${classes.chatSettingListItem}`}>
                                        <button
                                            onClick={handleLeaving}
                                            className={`${classes.chatSettingListItemBtn} btn btn-danger h-100 w-100 center`}>
                                            {loading ? (
                                                <i className="spinner-border"></i>
                                            ) : (
                                                <>Leave {chatsToShow.type}</>
                                            )}
                                        </button>
                                    </li>
                                    <li
                                        className={`${classes.chatSettingListItem}`}>
                                        <button
                                            className={`${classes.chatSettingListItemBtn} btn btn-info h-100 w-100 center`}>
                                            Copy {chatsToShow.type} ID
                                        </button>
                                    </li>
                                    <li
                                        className={`${classes.chatSettingListItem}`}>
                                        <button
                                            className={`${classes.chatSettingListItemBtn} btn btn-info h-100 w-100 center`}>
                                            {"<"} {chatsToShow.type} Members
                                            <div>
                                                <ul
                                                    className={`${classes.chatSettingList} h-100 w-100 overflow-y-scroll center`}>
                                                    {chatsToShow.MembersName.map(
                                                        (name) => (
                                                            <li
                                                                className={`${classes.chatSettingListItem}`}>
                                                                {name}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </button>
                                    </li>
                                    {chatsToShow.type === "group" && (
                                        <li
                                            className={`${classes.chatSettingListItem}`}>
                                            <button
                                                onClick={() =>
                                                    setVoiceChatShow((p) => !p)
                                                }
                                                className={`${classes.chatSettingListItemBtn} btn btn-secondary h-100 w-100 center`}>
                                                Join Voice Chat
                                            </button>
                                            {voiceChatShow && (
                                                <VoiceChat
                                                    show={voiceChatShow}
                                                    setShow={setVoiceChatShow}
                                                    id={chatsToShow.Id}
                                                    type={chatsToShow.type}
                                                />
                                            )}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ChatViewCardHeader;
