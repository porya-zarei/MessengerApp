import classes from "./filesender.module.scss";

const FileSender = ({file, image, video}) => {
    const handleSelectFile = () => {
        file.current.click();
        console.log("file input => ", file.current);
    };
    const handleSelectImage = () => {
        image.current.click();
    };
    const handleSelectVideo = () => {
        video.current.click();
    };

    return (
        <div className={`${classes.senderContainer}`}>
            <i className="bi bi-paperclip text-white-50 fs-larger"></i>
            <div className={`${classes.sender}`}>
                <button
                    onClick={handleSelectFile}
                    className={`${classes.fileSenderBtn}`}>
                    <i className="bi bi-file-earmark-text"></i>
                </button>
                <button
                    onClick={handleSelectImage}
                    className={`${classes.imageSenderBtn}`}>
                    <i className="bi bi-file-image"></i>
                </button>
                <button
                    onClick={handleSelectVideo}
                    className={`${classes.videoSenderBtn}`}>
                    <i className="bi bi-camera-video"></i>
                </button>
                <input
                    ref={image}
                    name="ImageInput"
                    id="ImageInputInChatView"
                    className="display-none"
                    type="file"
                    hidden="true"
                />
                <input
                    ref={file}
                    name="FileInput"
                    id="FileInputInChatView"
                    className="display-none"
                    type="file"
                    hidden="true"
                />
                <input
                    ref={video}
                    name="VideoInput"
                    id="VideoInputInChatView"
                    className="display-none"
                    type="file"
                    hidden="true"
                />
            </div>
        </div>
    );
};

export default FileSender;
