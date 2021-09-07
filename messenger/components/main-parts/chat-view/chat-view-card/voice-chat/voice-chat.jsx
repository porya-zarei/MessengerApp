import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import * as SignalR from "@microsoft/signalr";
import classes from "./voicechat.module.scss";

const VoiceChat = ({id, type, show, setShow}) => {
    const {connection, connectionId, user} = useContext(UserContext);
    const {theme} = useContext(ViewContext);
    const [source, setSource] = useState();
    const [data, setData] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState();
    const [recording, setRecording] = useState(false);
    const [groupVoiceChat, setGroupVoiceChat] = useState({});
    const [joined, setJoined] = useState(false);

    const fullName = user?.FirstName + " " + user?.LastName;
    const joinGroupVoiceChat = async () => {
        await connection
            ?.invoke("JoinGroupVoiceChat", id, connectionId, fullName)
            .then((r) => r)
            .then((res) => {
                setJoined(true);
                // setGroupVoiceChat(res?res:{});
                console.log("user Joined => ", res);
            });
    };
    useEffect(() => {
        console.log("connection voice chat => ", connection);
        connection
            ?.invoke("GetGroupVoiceChatInfo", id)
            .then((r) => r)
            .then((res) => {
                setGroupVoiceChat(res);
                console.log("data in group chat Voice info => ", res);
            });
        connection?.on("NewUserJoinedGroupVoiceChat", (data) => {
            console.log("new user joined voice chat => ", data);
            setGroupVoiceChat(data);
        });
        connection?.on("UserLeavedGroupVoiceChat", (data) => {
            console.log("user leaved voice chat => ", data);
            setGroupVoiceChat(data);
        });

        return () => {
            connection?.send(
                "LeaveGroupVoiceChat",
                id,
                connectionId,
                fullName,
            );
            setJoined(false);
        };
    }, []);

    const blobToFile = (theBlob, fileName) => {
        try {
            var file = new File(theBlob, fileName);
            console.log("file type 2 => ", file);
            return file;
        } catch (error) {
            console.log("error file type 2 => ", error);
        }
    };

    const handleRecoding = () => {
        let d = [];
        if (!recording) {
            if (navigator && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({
                        audio: true,
                    })
                    .then(function (stream) {
                        let recorder = new MediaRecorder(stream);
                        recorder.ondataavailable = async function (e) {
                            d.push(e.data);

                            let blob = new Blob([e.data], {
                                type: "audio/ogg; codecs=opus",
                            });
                            const buffer = Buffer.from([blob], "binary");
                            let s = await blob.arrayBuffer();
                            s = new Int8Array(s);
                            console.log(
                                "on available data voice => ",
                                e.data,
                                d,
                                blob,
                                s,
                            );
                            const audioURL = window.URL.createObjectURL(blob);
                            setSource(audioURL);
                        };
                        recorder.onstop = (e) => {};
                        recorder.start();
                        setMediaRecorder(recorder);
                        setRecording(true);
                    })
                    .catch(function (err) {
                        console.log(
                            "The following getUserMedia error occurred: " + err,
                        );
                        setMediaRecorder(null);
                    });
            }
        } else {
            try {
                mediaRecorder.stop();
                setMediaRecorder(null);
                setRecording(false);
            } catch (error) {
                setRecording(false);
                setMediaRecorder(null);
                console.log("error in save voice => ", error);
            }
        }
    };

    return (
        <div className={`${classes.voiceChatContainer}`}>
            <div
                className={`${classes.voiceChat}`}
                style={{backgroundColor: theme.dark, color: theme.text}}>
                <div className="card bg-transparent h-100 w-100">
                    <div className="card-header bg-transparent w-100">
                        <button
                            onClick={() => setShow(false)}
                            className="btn btn-danger">
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                    <div className="card-body p-0 m-0 bg-transparent w-100">
                        {groupVoiceChat && (
                            <ul className={classes.voiceChatUserList}>
                                {groupVoiceChat?.JoinedUsersFullName?.map(
                                    (fn) => (
                                        <li
                                            style={{
                                                backgroundColor: theme.darker,
                                                color: theme.textGray,
                                            }}
                                            className={
                                                classes.voiceChatUserListItem
                                            }>
                                            {fn}
                                        </li>
                                    ),
                                )}
                            </ul>
                        )}
                    </div>
                    <div className="card-footer bg-transparent w-100">
                        <div className="w-100 h-100 row m-0 p-0">
                            {joined ? (
                                <>
                                    <div className="col-12 center m-0 p-0">
                                        <button
                                            onClick={handleRecoding}
                                            className="btn btn-info">
                                            {recording ? (
                                                <i className="spinner-border"></i>
                                            ) : (
                                                <i className="bi bi-soundwave"></i>
                                            )}
                                        </button>
                                    </div>
                                    <div style={{width:"0"}} className="m-0 p-0">
                                        <audio src={source} autoPlay></audio>
                                    </div>
                                </>
                            ) : (
                                <div className="col-12 m-0 p-0">
                                    <button
                                        onClick={joinGroupVoiceChat}
                                        className="btn btn-info w-100">
                                        {groupVoiceChat ? "Start" : "Join"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceChat;
