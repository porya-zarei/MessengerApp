import Image from "next/image";
import {useEffect, useLayoutEffect, useState} from "react";
import classes from "./chatlistitem.module.scss";
import ChatsCount from "./chats-count";
const ChatListItem = ({name, lastText, color, count, image, detail}) => {
    return (
        <div
            className={`${classes.itemHeight} p-0 m-0 p-1px w-100 bg-${color}`}>
            <div className="row w-100 h-100 p-0 m-0 justify-content-evenly align-items-center">
                <div className="col-2 h-100 p-0 m-0 center">
                    <div className="center m-auto hw-70px">
                        <img
                            aria-listitemdetail={JSON.stringify(detail)}
                            src={
                                image.length > 0
                                    ? "https://localhost:44389/files/images/profiles/" +
                                      image
                                    : "/assets/images/png/avatar.png"
                            }
                            height="60px"
                            width="60px"
                            className="h-100 w-100 img-circle"
                        />
                    </div>
                </div>
                <div
                    aria-listitemdetail={JSON.stringify(detail)}
                    className={`${classes.chatDetail} col-10 h-100 bg-white p-0 m-0`}>
                    <span className={`${classes.timeSpan}`}>
                        {new Date().toUTCString()}
                    </span>
                    <span className={`${classes.nameSpan}`}>{name}</span>
                    <ChatsCount
                        className={classes.unReadChatsSpan}
                        count={count}
                    />
                    <span className={`${classes.checkSpan}`}>
                        <i className="bi bi-check-all"></i>
                    </span>
                    <span
                        aria-listitemdetail={JSON.stringify(detail)}
                        className={`${classes.lastChatSpan}`}>
                        {lastText}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatListItem;
