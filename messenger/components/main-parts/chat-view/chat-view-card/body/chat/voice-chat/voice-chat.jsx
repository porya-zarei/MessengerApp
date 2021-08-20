import {useEffect, useRef, useState} from "react";
import { files_url } from "../../../../../../../configs/configs";
import useVoiceChat from "../../../../../../../hooks/useVoiceChat";
import classes from "./voicechat.module.scss";


const VoiceChat = ({voiceName, voiceSize}) => {
    const source = `${files_url}/voices/${voiceName}`;
    
    const {
        audioRef,
        play,
        volume,
        currentTime,
        duration,
        handlePlay,
        handleChange,
        handleTimeUpdate,
        handleTimeUpdateRange,
    } = useVoiceChat();
    
    return (
        <div className={`${classes.container}`}>
            <div className={`${classes.voiceContainer}`}>
                <audio
                    src={source}
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    className={`${classes.voice}`}></audio>
                <div className={classes.customAudio}>
                    <button onClick={handlePlay} className={classes.playBtn}>
                        {play ? (
                            <i className="bi-pause"></i>
                        ) : (
                            <i className="bi-play"></i>
                        )}
                    </button>
                    <div className={classes.volumeRange}>
                        <i className="bi-volume-up text-dark"></i>
                        <input
                            onChange={handleChange}
                            type="range"
                            value={volume}
                            max="100"
                            min="0"
                            step="1"
                        />
                    </div>
                    <div className={classes.durationRange}>
                        <input
                            onChange={handleTimeUpdateRange}
                            type="range"
                            value={currentTime}
                            max={duration}
                            min="0"
                            step="0.1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceChat;
