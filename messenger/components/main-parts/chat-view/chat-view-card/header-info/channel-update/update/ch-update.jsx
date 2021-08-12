import {useContext, useEffect, useRef, useState} from "react";
import classes from "./chupdate.module.scss";
import {ViewContext} from "../../../../../../../context/view-context/view-context";
import {UserContext} from "../../../../../../../context/user-context/user-context";
import {fetcher} from "../../../../../../../hooks/fetcher";

const ChUpdate = () => {
    const {theme, chatsToShow} = useContext(ViewContext);
    const {token} = useContext(UserContext);
    const [channelName, setChannelName] = useState("");
    const [channelUserName, setChannelUserName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");
    const imageRef = useRef();

    const handleUpdateChannel = async () => {
        const data = {
            ChannelID: chatsToShow.Id,
            Name: channelName !== chatsToShow.Name ? channelName : null,
            ChannelUserName:
                channelUserName !== chatsToShow.userName
                    ? channelUserName
                    : null,
            ChannelDescription:
                channelDescription !== chatsToShow.description
                    ? channelDescription
                    : null,
        };

        const formData = new FormData();

        for (var key in data) {
            form_data.append(key, data[key]);
        }

        if (imageRef.current.files[0] !== null) {
            formData.append("ChannelProfileImage", imageRef.current.files[0]);
        }

        const {result, error, isError} = await fetcher(
            "POST",
            "Channels/UpdateChannel",
            data,
            token,
        );
        console.log("result in update channel => ", result, error);
    };

    useEffect(() => {
        setChannelName(chatsToShow.Name);
        setChannelUserName(chatsToShow.userName);
        setChannelDescription(chatsToShow.description);
    }, []);

    return (
        <div className={classes.updateChannelFormContainer}>
            <div className={classes.control}>
                <label style={{color: theme.text}}>Channel Name : </label>
                <input
                    style={{
                        borderColor: theme.textGray,
                        color: theme.text,
                        backgroundColor: theme.darker,
                    }}
                    name="ChannelName"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    type="text"
                />
            </div>
            <div className={classes.control}>
                <label style={{color: theme.text}}>Channel UserName : </label>
                <input
                    style={{
                        borderColor: theme.textGray,
                        color: theme.text,
                        backgroundColor: theme.darker,
                    }}
                    name="ChannelUserName"
                    value={channelUserName}
                    onChange={(e) => setChannelUserName(e.target.value)}
                    type="text"
                />
            </div>
            <div className={classes.control}>
                <label style={{color: theme.text}}>Description : </label>
                <input
                    style={{
                        borderColor: theme.textGray,
                        color: theme.text,
                        backgroundColor: theme.darker,
                    }}
                    name="channelDescription"
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                    type="text"
                />
            </div>
            <div className={classes.control}>
                <label style={{color: theme.text}}>profile : </label>
                <input
                    name="ChannelProfile"
                    ref={imageRef}
                    type="file"
                    hidden
                />
                <button
                    onClick={() => imageRef.current.click()}
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.textGray,
                    }}>
                    <i className="bi-image"></i>
                </button>
            </div>
            <div className={classes.control}>
                <button onClick={handleUpdateChannel}>Send</button>
            </div>
        </div>
    );
};

export default ChUpdate;
