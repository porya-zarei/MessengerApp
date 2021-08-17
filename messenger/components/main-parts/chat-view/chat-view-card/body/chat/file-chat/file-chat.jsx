import {useContext, useEffect, useRef, useState} from "react";
import {files_url} from "../../../../../../../configs/configs";
import {ViewContext} from "../../../../../../../context/view-context/view-context";
import classes from "./filechat.module.scss";

const FileChat = ({fileName, fileSize}) => {
    // const [downloading, setDownloading] = useState(false);
    const {theme} = useContext(ViewContext);
    const aRef = useRef();
    const handleDownload = () => {
        aRef.current.click();
    };

    const getFileIcon = () => {
        const reg = new RegExp("[.](.*)$");
        const ext = reg.exec(fileName)[1].toLowerCase();
        let result = <i className="bi-file-earmark-richtext-fill"></i>;

        const sounds = ["mp3", "ogg", "wav"];
        const compressed = ["7z", "rar", "zip", "pkg", "rpm", "deb"];
        const videos = ["mp4", "mkv", "wmv"];
        const images = [
            "jpeg",
            "jpg",
            "png",
            "bmp",
            "svg",
            "gif",
            "ico",
            "webp",
        ];
        const programmings = [
            "cs",
            "js",
            "py",
            "html",
            "css",
            "java",
            "php",
            "sh",
            "cpp",
        ];
        const texts = ["pdf", "doc", "docx", "ppt", "pptx", "txt", "tex"];
        if (texts.includes(ext)) {
            if (ext === "pdf") {
                result = <i className="bi-file-earmark-pdf-fill"></i>;
            } else {
                result = <i className="bi-file-earmark-text-fill"></i>;
            }
        } else if (images.includes(ext)) {
            result = <i className="bi-file-earmark-image-fill"></i>;
        } else if (videos.includes(ext)) {
            result = <i className="bi-file-earmark-play-fill"></i>;
        } else if (programmings.includes(ext)) {
            result = <i className="bi-file-earmark-code-fill"></i>;
        } else if (sounds.includes(ext)) {
            result = <i className="bi-file-earmark-music-fill"></i>;
        } else if (compressed.includes(ext)) {
            result = <i className="bi-file-earmark-zip-fill"></i>;
        }
        console.log("ext => ", ext);
        return result;
    };

    return (
        <div className={`${classes.container}`}>
            <div className={`${classes.file}`}>
                <button
                    onClick={handleDownload}
                    style={{
                        color: theme.textGray,
                        borderColor: theme.textGray,
                        backgroundColor: theme.primary,
                    }}
                    className={`${classes.downloadBtn} fs-larger center`}>
                    {getFileIcon()}
                </button>
                <a
                    ref={aRef}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="display-none"
                    href={`${files_url}/main/${fileName}`}
                    download={fileName}></a>
                <div
                    style={{color: theme.textGray}}
                    className={`${classes.fileDetail}`}>
                    <span title={fileName} className={`${classes.fileName}`}>
                        Name: {fileName}
                    </span>
                    <span className={`${classes.fileSize}`}>
                        Size: {fileSize} byte
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FileChat;
