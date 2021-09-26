import {useContext, useEffect, useRef} from "react";
import {ViewContext} from "../../../../../context/view-context/view-context";
import useVideoChat from "../../../../../hooks/useVideoChat";
import classes from "./videochat.module.scss";

const VideoChat = () => {
    const userVideoTagRef = useRef();
    const otherUserVideoTagRef = useRef();
    const canvasRef = useRef();

    const {callOtherUser} = useVideoChat(
        otherUserVideoTagRef,
        userVideoTagRef,
        canvasRef,
    );

    return (
        <div className={classes.container}>
            <div className={classes.videoChat}>
                {/* <video
                    ref={otherUserVideoTagRef}
                    className={classes.otherUserVideo}
                    autoPlay></video> */}
                <canvas ref={canvasRef} className={classes.otherUserVideo} />
                <video
                    ref={userVideoTagRef}
                    autoPlay
                    className={classes.userVideo}></video>
                <div className={classes.controlsContainer}>
                    <button onClick={callOtherUser} className="btn btn-info">
                        call
                    </button>
                    <button className="btn btn-danger">call</button>
                    <button className="btn btn-warning">call</button>
                </div>
            </div>
        </div>
    );
};

export default VideoChat;
