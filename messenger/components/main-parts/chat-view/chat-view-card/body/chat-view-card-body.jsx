import {useContext, useState} from "react";
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
    return (
        <div style={bgStyle} className={`${classes.cardBodyContainer} col-12`}>
            <div className={`${classes.cardBody}`}>
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
