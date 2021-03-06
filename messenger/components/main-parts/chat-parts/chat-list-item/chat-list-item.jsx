import Image from "next/image";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from "framer-motion";
import classes from "./chatlistitem.module.scss";
import ChatsCount from "./chats-count";
import {ViewContext} from "../../../../context/view-context/view-context";
const ChatListItem = ({
    detail,
    item,
    onDragEnd,
}) => {
    const sendingTime = new Date(item.lastChatSendingTime);

    const xPosition = useMotionValue(0);
    const xRange = [-200, 0, 200];
    const opacityRange = [0, 1, 0];
    const opacity = useTransform(xPosition, xRange, opacityRange);

    const {theme} = useContext(ViewContext);

    const handleDragEnd = () => {
        console.log("drag end in list item => ", xPosition.get());
        if (xPosition.get() < 70) {
            onDragEnd(item);
        }
    };
    return (
        <div
            className={`${classes.itemHeight} p-0 m-0 p-1px w-100`}
            style={{backgroundColor: theme.primary}}>
            <motion.div
                drag="x"
                style={{x: xPosition, opacity}}
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                onDragEnd={() => handleDragEnd()}
                className={`row w-100 h-100 p-0 m-0 justify-content-evenly align-items-center ${classes.animation}`}>
                <div className="col-2 h-100 p-0 m-0 center">
                    <div
                        style={{width: "70px"}}
                        className="center m-auto h-100 rounded overflow-hidden rounded-circle">
                        <img
                            data-listitemdetail={JSON.stringify(detail)}
                            src={item.Image}
                            className="h-100 w-100 img-circle"
                            alt="user avatar"
                        />
                    </div>
                </div>
                <div
                    data-listitemdetail={JSON.stringify(detail)}
                    className={`${classes.chatDetail} col-10 h-100 p-0 m-0`}
                    style={{backgroundColor: theme.primary, color: theme.text}}>
                    <span className={`${classes.timeSpan}`}>
                        {sendingTime.getHours() +
                            ":" +
                            sendingTime.getMinutes()}
                    </span>
                    <span className={`${classes.nameSpan}`}>{item.Name}</span>
                    <ChatsCount
                        className={classes.unReadChatsSpan}
                        count={item.chatsCount}
                        color={theme.primarier}
                    />
                    <span className={`${classes.checkSpan}`}>
                        <i className="bi bi-check-all"></i>
                    </span>
                    <span
                        style={{color: theme.textGray}}
                        data-listitemdetail={JSON.stringify(detail)}
                        className={`${classes.lastChatSpan}`}>
                        {item.LastChatText}
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default ChatListItem;
