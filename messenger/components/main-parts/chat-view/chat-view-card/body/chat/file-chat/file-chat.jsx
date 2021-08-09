import {useRef, useState} from "react";
import classes from "./filechat.module.scss";

const FileChat = ({fileName, fileSize}) => {
    const [downloading, setDownloading] = useState(false);
    const aRef = useRef();
    const handleDownload = () => {
        aRef.current.click();
        // fetch("https://localhost:44389/files/main/" + fileName, {
        //     method: "GET",headers:{
        //         "Content-Type":"application/txt",
        //     }
        //     ,mode:"cors",
        // })
        //     .then((response) => response.blob())
        //     .then((blob) => {
        //         console.log("blob => ",blob);
        //         // Create blob link to download
        //         const url = window.URL.createObjectURL(new Blob([blob]));
        //         const link = document.createElement("a");
        //         link.href = url;
        //         link.setAttribute("download", fileName);
        //         link.setAttribute("target","_blank");
        //         // Append to html link element page
        //         document.body.appendChild(link);

        //         // Start download
        //         link.click();

        //         // Clean up and remove the link
        //         link.parentNode.removeChild(link);
        //         setDownloading(false);
        // });
    };
    return (
        <div className={`${classes.container}`}>
            <div className={`${classes.file}`}>
                <button
                    onClick={handleDownload}
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
                <div className={`${classes.fileDetail}`}>
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
