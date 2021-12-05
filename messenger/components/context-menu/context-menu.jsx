import {useContext, useState} from "react";
import { files_url } from "../../configs/configs";
import {ViewContext} from "../../context/view-context/view-context";
import classes from "./contextmenu.module.scss";

const ContextMenu = () => {
    const {
        contextMenu,
        setContextMenu,
        setSelectedChatsId,
        setSelectedForwardDestinations,
        selectedChatsId,
        selectedForwardDestinations,
    } = useContext(ViewContext);
    return (
        contextMenu.show && (
            <div
                id="contextMenuContainer"
                onClick={(e) => {
                    if (e.target.id === "contextMenuContainer") {
                        setContextMenu({show: false, x: 0, y: 0});
                    }
                }}
                className={`${classes.contextMenuContainer}`}>
                <div
                    style={{
                        top: contextMenu.y + "px",
                        left: contextMenu.x + "px",
                    }}
                    className={`${classes.contextMenu} ${classes.fadeInAnimation}`}>
                    <ul className={`${classes.contextMenuList}`}>
                        {contextMenu.chatData && contextMenu.chatData.ChatID && (
                            <>
                                {contextMenu.chatData.Text && (
                                    <li
                                        className={`${classes.contextMenuListItem}`}>
                                        <button
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(
                                                    contextMenu.chatData.Text,
                                                );
                                                setContextMenu({
                                                    show: false,
                                                    chatId: "",
                                                    chatData: {},
                                                    listItemData: {},
                                                    x: 0,
                                                    y: 0,
                                                });
                                            }}>
                                            <i className="bi bi-clipboard mx-2"></i>
                                            <span>Copy Chat Text</span>
                                        </button>
                                    </li>
                                )}
                                {contextMenu.chatData.Video && (
                                    <li
                                        className={`${classes.contextMenuListItem}`}>
                                        <button
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(
                                                    `${files_url}/videos/${contextMenu.chatData.Video}`,
                                                );
                                                setContextMenu({
                                                    show: false,
                                                    chatId: "",
                                                    chatData: {},
                                                    listItemData: {},
                                                    x: 0,
                                                    y: 0,
                                                });
                                            }}>
                                            <i className="bi bi-camera-video-fill mx-2"></i>
                                            <span>Copy Chat Video url</span>
                                        </button>
                                    </li>
                                )}
                                {contextMenu.chatData.Image && (
                                    <li
                                        className={`${classes.contextMenuListItem}`}>
                                        <button
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(
                                                    `${files_url}/images/${contextMenu.chatData.Image}`,
                                                );
                                                setContextMenu({
                                                    show: false,
                                                    chatId: "",
                                                    chatData: {},
                                                    listItemData: {},
                                                    x: 0,
                                                    y: 0,
                                                });
                                            }}>
                                            <i className="bi bi-file-image mx-2"></i>
                                            <span>Copy Chat Image url</span>
                                        </button>
                                    </li>
                                )}
                                {contextMenu.chatData.File && (
                                    <li
                                        className={`${classes.contextMenuListItem}`}>
                                        <button
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(
                                                    `${files_url}/main/${contextMenu.chatData.File}`,
                                                );
                                                setContextMenu({
                                                    show: false,
                                                    chatId: "",
                                                    chatData: {},
                                                    listItemData: {},
                                                    x: 0,
                                                    y: 0,
                                                });
                                            }}>
                                            <i className="bi bi-clipboard mx-2"></i>
                                            <span>Copy Chat File url</span>
                                        </button>
                                    </li>
                                )}
                                {contextMenu.chatData.Voice && (
                                    <li
                                        className={`${classes.contextMenuListItem}`}>
                                        <button
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(
                                                    `${files_url}/voices/${contextMenu.chatData.Voice}`,
                                                );
                                                setContextMenu({
                                                    show: false,
                                                    chatId: "",
                                                    chatData: {},
                                                    listItemData: {},
                                                    x: 0,
                                                    y: 0,
                                                });
                                            }}>
                                            <i className="bi bi-voicemail mx-2"></i>
                                            <span>Copy Chat Voice url</span>
                                        </button>
                                    </li>
                                )}
                                <li
                                    className={`${classes.contextMenuListItem}`}>
                                    <button
                                        onClick={async () => {
                                            setSelectedChatsId((p) => [
                                                ...p,
                                                contextMenu.chatData.ChatID,
                                            ]);
                                            setContextMenu({
                                                show: false,
                                                chatId: "",
                                                chatData: {},
                                                listItemData:{},
                                                x: 0,
                                                y: 0,
                                            });
                                        }}>
                                        <i className="bi bi-voicemail mx-2"></i>
                                        <span>Select Chat</span>
                                    </button>
                                </li>
                            </>
                        )}
                        {contextMenu.listItemData.type && (
                            <>
                                <li
                                    className={`${classes.contextMenuListItem}`}>
                                    <button
                                        onClick={async () => {
                                            setSelectedForwardDestinations(
                                                (p) => {
                                                    console.log(
                                                        "forwards => ",
                                                        p,
                                                    );
                                                    if (
                                                        contextMenu.listItemData
                                                            .type === "room"
                                                    ) {
                                                        return {
                                                            rooms: [
                                                                ...p.rooms,
                                                                contextMenu
                                                                    .listItemData
                                                                    .room
                                                                    .RoomID,
                                                            ],
                                                            channels: [
                                                                ...p.channels,
                                                            ],
                                                            groups: [
                                                                ...p.groups,
                                                            ],
                                                        };
                                                    } else if (
                                                        contextMenu.listItemData
                                                            .type === "group"
                                                    ) {
                                                        return {
                                                            rooms: [...p.rooms],
                                                            channels: [
                                                                ...p.channels,
                                                            ],
                                                            groups: [
                                                                ...p.groups,
                                                                contextMenu
                                                                    .listItemData
                                                                    .group
                                                                    .GroupID,
                                                            ],
                                                        };
                                                    } else {
                                                        return {
                                                            rooms: [...p.rooms],
                                                            channels: [
                                                                ...p.channels,
                                                                contextMenu
                                                                    .listItemData
                                                                    .channel
                                                                    .ChannelID,
                                                            ],
                                                            groups: [
                                                                ...p.groups,
                                                                ,
                                                            ],
                                                        };
                                                    }
                                                },
                                            );
                                            setContextMenu({
                                                show: false,
                                                chatId: "",
                                                chatData: {},
                                                listItemData: {},
                                                x: 0,
                                                y: 0,
                                            });
                                        }}>
                                        <i className="bi bi-voicemail mx-2"></i>
                                        <span>Select For Forward</span>
                                    </button>
                                </li>
                            </>
                        )}
                        <li className={`${classes.contextMenuListItem}`}>
                            <button
                                onClick={async () => {
                                    setSelectedChatsId([]);
                                    setContextMenu({
                                        show: false,
                                        chatId: "",
                                        data: {},
                                        x: 0,
                                        y: 0,
                                    });
                                }}>
                                <i className="bi bi-voicemail mx-2"></i>
                                <span>Clear Selected Chats</span>
                            </button>
                        </li>
                        <li className={`${classes.contextMenuListItem}`}>
                            <button
                                onClick={async () => {
                                    setSelectedForwardDestinations({
                                        rooms: [],
                                        groups: [],
                                        channels: [],
                                    });
                                    setContextMenu({
                                        show: false,
                                        chatId: "",
                                        data: {},
                                        x: 0,
                                        y: 0,
                                    });
                                }}>
                                <i className="bi bi-voicemail mx-2"></i>
                                <span>Clear Selected Destinations</span>
                            </button>
                        </li>
                        {selectedChatsId.length > 0 &&
                            (selectedForwardDestinations.channels.length > 0 ||
                                selectedForwardDestinations.groups.length > 0 ||
                                selectedForwardDestinations.rooms.length >
                                    0) && (
                                <li
                                    title={JSON.stringify(selectedChatsId) + "\n\n"+JSON.stringify(selectedForwardDestinations)}
                                    className={`${classes.contextMenuListItem}`}>
                                    <button onClick={async () => {}}>
                                        <i className="bi bi-save-fill mx-2"></i>
                                        <span>Send Selecteds</span>
                                    </button>
                                </li>
                            )}
                    </ul>
                </div>
            </div>
        )
    );
};

export default ContextMenu;
