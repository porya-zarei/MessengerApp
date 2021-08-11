import {useContext, useEffect, useState} from "react";
import {ViewContext} from "../../../../../context/view-context/view-context";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from "framer-motion";
import classes from "./headerinfo.module.scss";

const HeaderInfo = () => {
    const {showHeaderInfo, setShowHeaderInfo, chatsToShow} =
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
                        style={{x: xPosition, opacity}}
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
                            <div className={`${classes.userFullName}`}>
                                {chatsToShow.Name}
                            </div>
                        </div>
                        <div className={`${classes.infoContainer}`}>
                            <div className={`${classes.info}`}>
                                <div className={`${classes.infoTitle}`}>
                                    Info
                                </div>
                                <div className={`${classes.infoUserName}`}>
                                    @{chatsToShow.userName}
                                </div>
                                <div className={`${classes.infoUserNameTitle}`}>
                                    Username
                                </div>
                                <div className={`${classes.infoBio}`}>
                                    {chatsToShow.description}
                                </div>
                                <div className={`${classes.infoBioTitle}`}>
                                    Bio
                                </div>
                                <button
                                    onClick={() => setShowHeaderInfo(false)}
                                    className={`${classes.infoGotoChatBtn}`}>
                                    <i className="bi-chat"></i>
                                </button>
                            </div>
                        </div>
                        <div className={`${classes.mediaContainer}`}>
                            <div className={classes.mediaTitle}>
                                <button
                                    onClick={() => setCurrentMedia("images")}
                                    className={
                                        currentMedia === "images"
                                            ? classes.mediaBtnActive
                                            : classes.mediaBtn
                                    }>
                                    images
                                </button>
                                <button
                                    onClick={() => setCurrentMedia("voices")}
                                    className={
                                        currentMedia === "voices"
                                            ? classes.mediaBtnActive
                                            : classes.mediaBtn
                                    }>
                                    Voices
                                </button>
                                <button
                                    onClick={() => setCurrentMedia("files")}
                                    className={
                                        currentMedia === "files"
                                            ? classes.mediaBtnActive
                                            : classes.mediaBtn
                                    }>
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
