import {useContext} from "react";
import {ViewContext} from "../../../context/view-context/view-context";
import ChatListItems from "../chat-parts/chat-lists-items/chat-list-items";
import classes from "./cl.module.scss";
const ChatLists = () => {
    const {theme} = useContext(ViewContext);

    return (
        <div
            className={classes.chatListItemsContainer}
            style={{backgroundColor: theme.primarier}}>
            <ChatListItems />
        </div>
    );
};

export default ChatLists;
