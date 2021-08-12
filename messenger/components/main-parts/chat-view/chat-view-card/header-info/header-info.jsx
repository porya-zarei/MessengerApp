import {useContext, useEffect, useState} from "react";
import {ViewContext} from "../../../../../context/view-context/view-context";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from "framer-motion";
import classes from "./headerinfo.module.scss";
import ChannelUpdate from "./channel-update/channel-update";
import GroupUpdate from "./group-update/group-update";

const HeaderInfo = () => {
    const {showHeaderInfo, setShowHeaderInfo, chatsToShow, theme} =
        useContext(ViewContext);
    const xPosition = useMotionValue(0);
    const xRange = [-200, 0, 200];
    const opacityRange = [0, 1, 0];
    const opacity = useTransform(xPosition, xRange, opacityRange);

    const [mediaImages, setMediaImages] = useState([""]);
    const [mediaVideos, setMediaVideos] = useState([{}]);
    const [mediaFiles, setMediaFiles] = useState([{}]);
    const [mediaVoices, setMediaVoices] = useState([{}]);

    const [currentMedia, setCurrentMedia] = useState("images");

    const handleDragEnd = () => {
        if (xPosition.get() > 70) {
            setShowHeaderInfo(false);
        }
    };
    useEffect(() => {
        let images = chatsToShow?.chats
            ?.filter((chat) => chat?.Image !== null && chat?.Image?.length > 0)
            .map((chat) => chat.Image);
        let videos = chatsToShow?.chats
            ?.filter((chat) => chat?.Video !== null && chat?.Video?.length > 0)
            .map((chat) => {
                return {
                    name: chat.Video,
                    size: chat.VideoSize,
                    id: chat.ChatID,
                };
            });
        let voices = chatsToShow?.chats
            ?.filter((chat) => chat?.Voice !== null && chat?.Voice?.length > 0)
            .map((chat) => {
                return {
                    name: chat.Voice,
                    size: chat.VoiceSize,
                    id: chat.ChatID,
                };
            });

        let files = chatsToShow?.chats
            ?.filter((chat) => chat?.File !== null && chat?.File?.length > 0)
            .map((chat) => {
                return {name: chat.File, size: chat.FileSize, id: chat.ChatID};
            });

        setMediaImages(images);
        setMediaVideos(videos);
        setMediaVoices(voices);
        setMediaFiles(files);
    }, [chatsToShow, chatsToShow.chats]);
    return (
        showHeaderInfo && (
            <div className={`${classes.headerInfoContainer}`}>
                <AnimatePresence>
                    <motion.div
                        drag="x"
                        style={{
                            x: xPosition,
                            opacity,
                            backgroundColor: theme.dark,
                            color: theme.text,
                        }}
                        dragConstraints={{
                            left: 0,
                            right: 0,
                        }}
                        onDragEnd={() => handleDragEnd()}
                        className={`${classes.headerInfo}`}>
                        <div className={`${classes.imageContainer}`}>
                            <img
                                src={
                                    chatsToShow.Image.length > 0
                                        ? `https://localhost:44389/files/images/profiles/${chatsToShow.Image}`
                                        : "/assets/images/jpg/dasht.jpg"
                                }
                                className={`${classes.image}`}
                            />
                            <div
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.text,
                                }}
                                className={`${classes.userFullName}`}>
                                {chatsToShow.Name}
                            </div>
                        </div>
                        <div className={`${classes.infoContainer}`}>
                            <div
                                style={{
                                    backgroundColor: theme.primarier,
                                    color: theme.text,
                                }}
                                className={`${classes.info}`}>
                                <div
                                    style={{
                                        color: theme.info,
                                    }}
                                    className={`${classes.infoTitle}`}>
                                    Info
                                </div>
                                <div className={`${classes.infoUserName}`}>
                                    @{chatsToShow.userName}
                                </div>
                                <div
                                    style={{
                                        color: theme.textGray,
                                    }}
                                    className={`${classes.infoUserNameTitle}`}>
                                    Username
                                </div>
                                <div className={`${classes.infoBio}`}>
                                    {chatsToShow.description}
                                </div>
                                <div
                                    style={{
                                        color: theme.textGray,
                                    }}
                                    className={`${classes.infoBioTitle}`}>
                                    Bio
                                </div>
                                <button
                                    onClick={() => setShowHeaderInfo(false)}
                                    className={`${classes.infoGotoChatBtn}`}
                                    style={{
                                        backgroundColor: theme.dark,
                                        color: theme.text,
                                    }}>
                                    <i className="bi-chat"></i>
                                </button>
                            </div>
                        </div>
                        {chatsToShow.UserAccess && (
                            <div className="w-100 h-auto">
                                {chatsToShow.type === "group" && (
                                    <GroupUpdate />
                                )}
                                {chatsToShow.type === "channel" && (
                                    <ChannelUpdate />
                                )}
                            </div>
                        )}
                        <div className={`${classes.mediaContainer}`}>
                            <div className={classes.mediaTitle}>
                                <button
                                    style={{
                                        backgroundColor:
                                            currentMedia === "images"
                                                ? theme.primarier
                                                : "transparent",
                                        color: theme.textGray,
                                    }}
                                    onClick={() => setCurrentMedia("images")}
                                    className={classes.mediaBtnActive}>
                                    images
                                </button>
                                <button
                                    onClick={() => setCurrentMedia("voices")}
                                    style={{
                                        backgroundColor:
                                            currentMedia === "voices"
                                                ? theme.primarier
                                                : "transparent",
                                        color: theme.textGray,
                                    }}
                                    className={classes.mediaBtnActive}>
                                    Voices
                                </button>
                                <button
                                    onClick={() => setCurrentMedia("files")}
                                    style={{
                                        backgroundColor:
                                            currentMedia === "files"
                                                ? theme.primarier
                                                : "transparent",
                                        color: theme.textGray,
                                    }}
                                    className={classes.mediaBtnActive}>
                                    files
                                </button>
                            </div>
                            <div className={`${classes.media}`}>
                                {currentMedia === "images" &&
                                    mediaImages.map((image) => (
                                        <img
                                            className={classes.mediaImage}
                                            src={`https://localhost:44389/files/images/${image}`}
                                        />
                                    ))}
                                {currentMedia === "images" &&
                                    mediaVideos.map((video) => (
                                        <video
                                            controls
                                            className={classes.mediaImage}
                                            src={`https://localhost:44389/files/videos/${video.name}`}></video>
                                    ))}
                                {currentMedia === "voices" &&
                                    mediaVoices.map((voice) => (
                                        <div className={classes.mediaVoice}>
                                            <a
                                                target="_blank"
                                                href={`https://localhost:44389/files/voices/${voice.name}}`}>
                                                name : {voice.name}
                                            </a>
                                            <div>size : {voice.size}</div>
                                        </div>
                                    ))}
                                {currentMedia === "files" &&
                                    mediaFiles.map((file) => (
                                        <div className={classes.mediaVoice}>
                                            <a
                                                target="_blank"
                                                href={`https://localhost:44389/files/files/${file.name}}`}>
                                                name : {file.name}
                                            </a>
                                            <div>size : {file.size}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        )
    );
};

export default HeaderInfo;
