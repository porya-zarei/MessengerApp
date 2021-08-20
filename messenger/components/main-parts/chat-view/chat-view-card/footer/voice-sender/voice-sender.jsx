import {useContext, useEffect, useRef, useState} from "react";
import { ViewContext } from "../../../../../../context/view-context/view-context";
import useMediaVoiceRecording from "../../../../../../hooks/useMediaVoiceRecorder";

const VoiceSender = ({voice, setVoice}) => {
    
    const {theme} = useContext(ViewContext);
    
    const {handleRecoding,recordingState,url} = useMediaVoiceRecording(setVoice);

    return (
        <>
            <button
                onClick={handleRecoding}
                title="send voice"
                className="btn bg-transparent text-white-50 emoji-button">
                {!recordingState ? (
                    <i
                        style={{color: theme.textGray}}
                        className="bi bi-soundwave fs-larger"></i>
                ) : (
                    <i
                        style={{color: theme.textGray}}
                        className="spinner-border fs-larger"></i>
                )}
            </button>
            <audio hidden={true} src={url} autoPlay controls></audio>
        </>
    );
};

export default VoiceSender;
