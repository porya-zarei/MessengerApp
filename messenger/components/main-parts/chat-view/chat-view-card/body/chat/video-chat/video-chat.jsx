import {useEffect, useState} from "react";

const VideoChat = ({videoName, videoSize}) => {
    const [source, setSource] = useState("");
    const [show, setShow] = useState(false);
    function formatBytes(a, b = 2, k = 1024) {
        let d = Math.floor(Math.log(a) / Math.log(k));
        return 0 == a
            ? "0 Bytes"
            : parseFloat((a / Math.pow(k, d)).toFixed(Math.max(0, b))) +
                  " " +
                  ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d];
    }

    const handleShowImage = () => {
        setSource(`https://localhost:44389/files/videos/${videoName}`);
        localStorage.setItem(
            `${videoName}`,
            `https://localhost:44389/files/videos/${videoName}`,
        );
        setShow(true);
    };
    useEffect(() => {
        if (localStorage.getItem(`${videoName}`)) {
            setSource(localStorage.getItem(`${videoName}`));
        }
    }, []);
    if (!show && source.length > 0) {
        return (
            <video
                title={videoName}
                src={source}
                className="w-100 h-100"
                height="200px"
                controls></video>
        );
    }
    return show ? (
        <video
            controls
            title={videoName}
            src={source}
            className="w-100 h-100"
            height="200px"></video>
    ) : (
        <div className="bg-secondary w-100 center" style={{height: "200px"}}>
            <button
                onClick={handleShowImage}
                className="rounded rounded rounded-2 h-auto w-auto center btn btn-dark text-white">
                <i className="bi bi-download text-white"></i>
                <span className="my-3">{formatBytes(videoSize)}</span>
            </button>
        </div>
    );
};

export default VideoChat;
