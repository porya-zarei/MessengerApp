import {useContext} from "react";
import {ViewContext} from "../../../context/view-context/view-context";
import ChatListItems from "../chat-parts/chat-lists-items/chat-list-items";

const ChatLists = () => {
    const {theme} = useContext(ViewContext);
    return (
        <div
            className="m-0 w-100"
            style={{
                height: "100%",
                overflowY: "scroll",
                zIndex: "0",
                padding: "70px 0 0 0",
                backgroundColor: theme.dark,
            }}>
            <ChatListItems />
        </div>
    );
};

export default ChatLists;
