import {useEffect, useRef, useState} from "react";
import classes from "./voicechat.module.scss";

const VoiceChat = ({voiceName, voiceSize}) => {
    const source = `https://localhost:44389/files/voices/${voiceName}`;
    const audioRef = useRef();
    const [play, setPlay] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const handlePlay = () => {
        if (play) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlay((p) => !p);
    };
    const handleChange = (e) => {
        audioRef.current.volume = e.target.value / 100;
        setVolume(e.target.value);
    };
    const handleTimeUpdate = (e) => {
        // audioRef.current.currentTime = e.target.value;
        console.log(audioRef.current.currentTime,e.target);
        setCurrentTime(audioRef.current.currentTime);
        if (audioRef.current.currentTime === audioRef.current.duration) {
            audioRef.current.currentTime= 0;
            setPlay(false);
            setCurrentTime(0);
            audioRef.current.pause();
        }
        
    };
    const handleTimeUpdateRange = (e) => {
        audioRef.current.currentTime = e.target.value;
        console.log(e.target);
        setCurrentTime(e.target.value);
    };
    useEffect(() => {
        console.log("duration => ",audioRef.current.duration);
        setDuration(audioRef.current.duration);
    }, []);
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
