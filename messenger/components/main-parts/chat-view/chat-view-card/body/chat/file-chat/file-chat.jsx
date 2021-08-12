import {useContext, useRef, useState} from "react";
import { ViewContext } from "../../../../../../../context/view-context/view-context";
import classes from "./filechat.module.scss";

const FileChat = ({fileName, fileSize}) => {
    const [downloading, setDownloading] = useState(false);
    const {theme} = useContext(ViewContext);
    const aRef = useRef();
    const handleDownload = () => {
        aRef.current.click();
    };
    return (
        <div className={`${classes.container}`}>
            <div className={`${classes.file}`}>
                <button
                    onClick={handleDownload}
                    style={{color: theme.textGray, borderColor: theme.textGray,backgroundColor:theme.primary}}
                    className={`${classes.downloadBtn}`}>
                    {downloading ? (
                        <i className="spinner-border"></i>
                    ) : (
                        <i className="bi bi-download"></i>
                    )}
                </button>
                <a
                    ref={aRef}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="display-none"
                    href={"https://localhost:44389/files/main/" + fileName}
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
