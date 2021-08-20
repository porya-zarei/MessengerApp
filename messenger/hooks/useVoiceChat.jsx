import {useEffect, useRef, useState} from "react";

const useVoiceChat = () => {
    const audioRef = useRef();
    const [play, setPlay] = useState(false);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // const  = (number) => number.toFixed(2);

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
        console.log(
            "in time update => ",
            e.target.currentTime,
            audioRef.current.currentTime,
            audioRef.current.duration,
        );
        console.log(audioRef.current.currentTime, e.target);
        setCurrentTime(audioRef.current.currentTime);
        if (audioRef.current.currentTime === audioRef.current.duration) {
            audioRef.current.currentTime = 0;
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
        console.log("duration => ", audioRef.current?.duration);
        setDuration(audioRef.current?.duration);
    }, []);
    return {
        audioRef,
        play,
        volume,
        currentTime,
        duration,
        handlePlay,
        handleChange,
        handleTimeUpdate,
        handleTimeUpdateRange,
    };
};

export default useVoiceChat;
