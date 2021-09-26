import {useContext, useState} from "react";
import {toast} from "react-toastify";
import {UserContext} from "../../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../../context/view-context/view-context";
import {fetcher} from "../../../../../../hooks/fetcher";
import VoiceChat from "../../voice-chat/voice-chat";
import classes from "./headersetting.module.scss";

const HeaderSetting = () => {
    const {chatsToShow, theme, setShowVideoChat, showVideoChat} =
        useContext(ViewContext);
    const {userId, token, connection} = useContext(UserContext);
    const [voiceChatShow, setVoiceChatShow] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const sendNotification = () => {
        connection
            .invoke("NotifyUser", userId, chatsToShow.userName)
            .then((r) => {
                toast.success("sended successfully");
            });
    };

    return (
        <div
            className={`${classes.chatSettingListContainer}`}
            style={{backgroundColor: theme.info}}>
            <ul className={`${classes.chatSettingList}`}>
                <li className={`${classes.chatSettingListItem}`}>
                    <button
                        onClick={handleLeaving}
                        style={{
                            backgroundColor: theme.danger,
                        }}
                        className={`${classes.chatSettingListItemBtn} btn h-100 w-100 center`}>
                        {loading ? (
                            <i className="spinner-border"></i>
                        ) : (
                            <>Leave {chatsToShow.type}</>
                        )}
                    </button>
                </li>
                <li className={`${classes.chatSettingListItem}`}>
                    <button
                        style={{
                            backgroundColor: theme.light,
                        }}
                        className={`${classes.chatSettingListItemBtn} btn h-100 w-100 center`}>
                        Copy {chatsToShow.type} ID
                    </button>
                </li>
                <li className={`${classes.chatSettingListItem}`}>
                    <button
                        style={{
                            backgroundColor: theme.light,
                        }}
                        className={`${classes.chatSettingListItemBtn} btn h-100 w-100 center`}>
                        {"<"} {chatsToShow.type} Members
                        <div
                            style={{
                                backgroundColor: theme.primary,
                            }}>
                            <ul
                                className={`${classes.chatSettingList} h-100 w-100 overflow-y-scroll center`}>
                                {chatsToShow.MembersName.map((name) => (
                                    <li
                                        style={{
                                            backgroundColor: theme.primaryLight,
                                            color: theme.textGray,
                                        }}
                                        className={`${classes.chatSettingListItem}`}>
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </button>
                </li>
                {chatsToShow.type === "group" && (
                    <li
                        style={{
                            backgroundColor: theme.light,
                        }}
                        className={`${classes.chatSettingListItem}`}>
                        <button
                            onClick={() => setVoiceChatShow((p) => !p)}
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
                {chatsToShow.type === "room" && (
                    <>
                        <li
                            style={{
                                backgroundColor: theme.primary,
                            }}
                            className={`${classes.chatSettingListItem}`}>
                            <button
                                onClick={sendNotification}
                                className={`${classes.chatSettingListItemBtn} btn h-100 w-100 center`}>
                                send notification
                            </button>
                        </li>
                        <li
                            style={{
                                backgroundColor: theme.primary,
                            }}
                            className={`${classes.chatSettingListItem}`}>
                            <button
                                onClick={() => setShowVideoChat((p) => !p)}
                                className={`${classes.chatSettingListItemBtn} btn h-100 w-100 center`}>
                                {showVideoChat ? "close" : "open"} video chat
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default HeaderSetting;
