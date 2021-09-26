import {createElement, useContext, useEffect, useRef} from "react";
import {HOST, PORT} from "../configs/configs";
import {UserContext} from "../context/user-context/user-context";
import {ViewContext} from "../context/view-context/view-context";
// import Peer from 'peerjs'

const useVideoChat = (otherUserVideoTagRef, userVideoTagRef, canvasRef) => {

    // !!!!! Unfinished 😡😡

    // const {user, connection} = useContext(UserContext);
    // const {chatsToShow} = useContext(ViewContext);
    // const recorder = useRef(new MediaRecorder(new MediaStream()));

    const userVideo = useRef();
    const otherUserVideo = useRef();
    const userStream = useRef(new MediaStream());

    const constraints = {
        video: true,
        audio: true,
    };

    const setCanvasImage = () => {
        const w = canvasRef.current.width;
        const h = canvasRef.current.height;
        const context = canvasRef.current.getContext("2d");
        context.scale(-1, 1);
        context.drawImage(userVideoTagRef.current, 0, 0, w, h);
        image = context.getImageData(0, 0, w, h);
        console.log("image data => ", image);
    };

    const callOtherUser = () => {};

    const answerOtherUser = () => {};

    useEffect(() => {
        let track = null;
        if (navigator && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                userStream.current = stream;
                userVideoTagRef.current.srcObject = stream;
                track = stream.getTracks()[0];
                console.log("stream video => ", stream);
            });

            answerOtherUser();
            // const inter = setTimeout(() => setCanvasImage(width, height), 10000);
            return () => {
                // clearInterval(inter);
                track?.stop();
                userStream.current?.removeTrack(track);
            };
        }
    }, [userVideoTagRef.current]);
    return {
        userVideo,
        otherUserVideo,
        callOtherUser,
        answerOtherUser,
    };
};

export default useVideoChat;
