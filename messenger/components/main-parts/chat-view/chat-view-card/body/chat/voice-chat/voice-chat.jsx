import classes from "./voicechat.module.scss";

const VoiceChat = ({voiceName, voiceSize}) => {
    const source = `https://localhost:44389/files/voices/${voiceName}`;
    return (
        <div className={`${classes.container}`}>
            <div className={`${classes.voiceContainer}`}>
                <audio
                    src={source}
                    className={`${classes.voice}`}
                    controls></audio>
                {/* <span className="badge badge-info badge-pill h-100 w-auto">
                    {voiceSize}
                </span> */}
            </div>
        </div>
    );
};

export default VoiceChat;
