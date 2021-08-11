import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import Chat from "./chat/chat";
import Chats from "./chats/chats";
import ContextMenu from "../../../../context-menu/context-menu";
import classes from "./cvcb.module.scss";

const ChatViewCardBody = () => {
    const bgStyle = {
        backgroundImage: "url('/assets/images/webp/background.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };

    const {chatsToShow} = useContext(ViewContext);
    const {userId} = useContext(UserContext);

    const chatsBody = useRef();
    const scrollButton = useRef();

    const handleScrollButton = () => {
        chatsBody.current.scrollTop = Number(chatsBody.current.scrollHeight);
        scrollButton.current.style.display = "none";
    }

    useEffect(() => {
        handleScrollButton();
        chatsBody.current.onscroll = (e) => {
            if (
                Number(chatsBody.current.scrollTop) <=
                Number(chatsBody.current.scrollHeight - 1000)
            ) {
                if (scrollButton.current.style.display==="none") {
                    scrollButton.current.style.display="block";
                }
            }else{
                if (scrollButton.current.style.display!== "none") {
                    scrollButton.current.style.display="none";
                }   
            }
        };
    }, []);

    return (
        <div style={bgStyle} className={`${classes.cardBodyContainer} col-12`}>
            <button ref={scrollButton} onClick={handleScrollButton} className={classes.scrollToBottom}>
                <i className="bi-arrow-bar-down"></i>
            </button>
            <div ref={chatsBody} className={`${classes.cardBody}`}>
                <Chats
                    userId={userId}
                    chats={chatsToShow.chats}
                    type={chatsToShow.type}
                />
            </div>
        </div>
    );
};

export default ChatViewCardBody;
