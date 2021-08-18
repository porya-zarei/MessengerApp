import {useContext, useEffect, useState} from "react";
import {files_url} from "../../../../../../configs/configs";
import {ViewContext} from "../../../../../../context/view-context/view-context";
import classes from "./medias.module.scss";

const Medias = () => {
    const {chatsToShow, theme} = useContext(ViewContext);

    const [mediaImages, setMediaImages] = useState([""]);
    const [mediaVideos, setMediaVideos] = useState([{}]);
    const [mediaFiles, setMediaFiles] = useState([{}]);
    const [mediaVoices, setMediaVoices] = useState([{}]);

    const [currentMedia, setCurrentMedia] = useState("images");

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
        <>
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
                            key={image}
                            className={classes.mediaImage}
                            src={`${files_url}/images/${image}`}
                        />
                    ))}
                {currentMedia === "images" &&
                    mediaVideos.map((video) => (
                        <video
                            key={video.name}
                            controls
                            className={classes.mediaImage}
                            src={`${files_url}/videos/${video.name}`}></video>
                    ))}
                {currentMedia === "voices" &&
                    mediaVoices.map((voice) => (
                        <div className={classes.mediaVoice}>
                            <a
                                key={voice.name}
                                target="_blank"
                                href={`${files_url}/voices/${voice.name}}`}>
                                name : {voice.name}
                            </a>
                            <div>size : {voice.size}</div>
                        </div>
                    ))}
                {currentMedia === "files" &&
                    mediaFiles.map((file) => (
                        <div className={classes.mediaVoice}>
                            <a
                                key={file.name}
                                target="_blank"
                                href={`${files_url}/main/${file.name}}`}>
                                name : {file.name}
                            </a>
                            <div>size : {file.size}</div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Medias;
