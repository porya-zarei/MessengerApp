import {useContext} from "react";
import {ViewContext} from "../../../../context/view-context/view-context";
import ChatListItem from "../chat-list-item/chat-list-item";

import classes from "./chatlistitems.module.scss";
import useUserData from "../../../../hooks/useUserData";
const ChatListItems = () => {
    const {theme} = useContext(ViewContext);

    const {
        roomsList,
        groupsList,
        channelsList,
        handleRoomClick,
        handleGroupClick,
        handleChannelClick,
    } = useUserData();

    return (
        <ul className={`${classes.ulDecorationNone} w-100 p-0 m-0`}>
            {roomsList?.map((item) => (
                <li className={`w-100`} key={item.Name}>
                    <button
                        onClick={() => handleRoomClick(item)}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            detail={{id: item.Id, type: "room"}}
                            item={item}
                            onDragEnd={handleRoomClick}
                        />
                    </button>
                </li>
            ))}
            {groupsList?.map((item) => (
                <li className={`w-100`} key={item.Name}>
                    <button
                        onClick={() => handleGroupClick(item)}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            detail={{id: item.Id, type: "group"}}
                            item={item}
                            onDragEnd={handleGroupClick}
                        />
                    </button>
                </li>
            ))}
            {channelsList?.map((item) => (
                <li className={`w-100`} key={item.Name}>
                    <button
                        onClick={() => handleChannelClick(item)}
                        className="btn w-100 h-100 p-0 m-0">
                        <ChatListItem
                            detail={{id: item.Id, type: "channel"}}
                            item={item}
                            onDragEnd={handleChannelClick}
                        />
                    </button>
                </li>
            ))}
            <li className={`w-100`} key={"nothing"}>
                <div className="p-2 my-3" style={{color: theme.textGray}}>
                    what do you want ?
                </div>
            </li>
        </ul>
    );
};

export default ChatListItems;
