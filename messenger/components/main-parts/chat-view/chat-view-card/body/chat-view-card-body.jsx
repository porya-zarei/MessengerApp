import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import Chat from "./chat/chat";
import Chats from "./chats/chats";
import ContextMenu from "../../../../context-menu/context-menu";
import classes from "./cvcb.module.scss";
import VideoChat from "../video-chat/video-chat";

const ChatViewCardBody = () => {
    const {chatsToShow, chatBackground, showVideoChat} =
        useContext(ViewContext);

    const {userId} = useContext(UserContext);

    const bgStyle = {
        backgroundImage: `url(${chatBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };

    const chatsBody = useRef();
    const scrollButton = useRef();

    const handleScrollButton = () => {
        chatsBody.current.scrollTop = Number(chatsBody.current.scrollHeight);
        scrollButton.current.style.display = "none";
    };

    useEffect(() => {
        chatsBody.current.onscroll = (e) => {
            if (
                Number(chatsBody.current.scrollTop) <=
                Number(chatsBody.current.scrollHeight - 1000)
            ) {
                if (scrollButton.current.style.display === "none") {
                    scrollButton.current.style.display = "block";
                }
            } else {
                if (scrollButton.current.style.display !== "none") {
                    scrollButton.current.style.display = "none";
                }
            }
        };
        const timeout = setTimeout(() => {
            console.log("in chat view body timeout =>");
            handleScrollButton();
        }, 500);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div style={bgStyle} className={`${classes.cardBodyContainer} col-12`}>
            <button
                ref={scrollButton}
                onClick={handleScrollButton}
                className={classes.scrollToBottom}>
                <i className="bi-arrow-bar-down"></i>
            </button>
            <div ref={chatsBody} className={`${classes.cardBody}`}>
                <Chats
                    userId={userId}
                    chats={chatsToShow.chats}
                    type={chatsToShow.type}
                />
            </div>
            {showVideoChat && <VideoChat />}
        </div>
    );
};

export default ChatViewCardBody;
