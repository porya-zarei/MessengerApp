import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from "framer-motion";
import classes from "./cvch.module.scss";
import HeaderSetting from "./header-setting/header-setting";

const ChatViewCardHeader = () => {
    const {chatsToShow, isMobile, setIsInChat, setShowHeaderInfo, theme} =
        useContext(ViewContext);
    const {connection, connectionId} = useContext(UserContext);
    const [settingShow, setSettingShow] = useState(false);
    const [userIsOnline, setUserIsOnline] = useState(false);
    const xPosition = useMotionValue(0);
    const xRange = [-200, 0, 200];
    const opacityRange = [0, 1, 0];
    const opacity = useTransform(xPosition, xRange, opacityRange);

    const handleDragEnd = () => {
        if (xPosition.get() > 70) {
            setIsInChat(false);
        }
    };

    const sendCheckUserStatus = () => {
        userIsOnline && setUserIsOnline(false);
        connection.send(
            "SendCheckUserStatus",
            chatsToShow.userName,
            connectionId,
        );
    };
    useEffect(() => {
        if (
            chatsToShow.type === "room" &&
            chatsToShow.userName.length > 0 &&
            connection.on !== null
        ) {
            connection?.on("GetUserStatus", (isOnline) => {
                if (isOnline) {
                    setUserIsOnline(true);
                }
            });
            sendCheckUserStatus();
        } else {
            userIsOnline && setUserIsOnline(false);
        }
    }, [chatsToShow.userName]);

    useEffect(() => {
        const handleBackButton = () => {
            console.log("in back button");
        };
        window.addEventListener("backbutton", handleBackButton);

        return () => {
            window.removeEventListener("backbutton", handleBackButton);
        };
    }, []);

    return (
        <div className={`${classes.cardHeaderContainer} co-12`}>
            <AnimatePresence>
                <motion.div
                    drag="x"
                    style={{
                        x: xPosition,
                        opacity,
                        backgroundColor: theme.primarier,
                        color: theme.textGray,
                    }}
                    dragConstraints={{
                        left: 0,
                        right: 0,
                    }}
                    onDragEnd={() => isMobile && handleDragEnd()}
                    className={`${classes.cardHeader}`}>
                    <div className={`${classes.userAvatar} center`}>
                        <div className="center m-auto">
                            <img
                                src={chatsToShow.Image}
                                height="66px"
                                width="66px"
                                className="h-100 w-100 img-circle"
                            />
                        </div>
                    </div>
                    {chatsToShow.type === "room" ? (
                        <button
                            className={`${classes.userStatus}`}
                            onClick={sendCheckUserStatus}
                            title="user status,click to reload"
                            style={{
                                backgroundColor: userIsOnline
                                    ? "#00bf00"
                                    : "#6f6f6f",
                            }}></button>
                    ) : null}
                    <div
                        onClick={() => setShowHeaderInfo((p) => !p)}
                        className={`${classes.userName}`}>
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
                        {settingShow && <HeaderSetting />}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ChatViewCardHeader;
