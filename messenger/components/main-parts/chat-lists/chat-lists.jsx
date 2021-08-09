import ChatListItems from "../chat-parts/chat-lists-items/chat-list-items";

const ChatLists = () => {
    return (
        <div className="m-0 w-100" style={{height:"100%",overflowY:"scroll",zIndex:"0",padding:"50px 0 0 0"}}>
            <ChatListItems />
        </div>
    );
};

export default ChatLists;
