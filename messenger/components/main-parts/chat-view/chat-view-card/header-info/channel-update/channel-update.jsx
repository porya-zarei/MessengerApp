import {useContext, useState} from "react";
import { ViewContext } from "../../../../../../context/view-context/view-context";
import classes from "./channelupdate.module.scss";
import ChUpdate from "./update/ch-update";
import ChUsersHandle from "./users-handle/ch-users-handle";

const ChannelUpdate = () => {
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showHandleUsers, setShowHandleUsers] = useState(false);
    const {theme} = useContext(ViewContext);
    return (
        <div className={classes.container}>
            <button
                onClick={() => setShow((p) => !p)}
                style={{
                    backgroundColor: theme.primary,
                    color: theme.textGray,
                    borderColor: theme.text,
                }}
                className={classes.updateBtn}>
                channel setting
            </button>
            {show && (
                <div className={classes.update}>
                    <div className={classes.innerContainer}>
                        <div className={classes.updateChannel}>
                            <button
                                className={classes.updateChannelBtn}
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.textGray,
                                    borderColor: theme.text,
                                }}
                                onClick={() => setShowUpdate((p) => !p)}>
                                update channel
                            </button>
                            {showUpdate && <ChUpdate />}
                        </div>
                        <div className={classes.handleUsers}>
                            <button
                                className={classes.handleUsersBtn}
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.textGray,
                                    borderColor: theme.text,
                                }}
                                onClick={() => setShowHandleUsers((p) => !p)}>
                                handle users
                            </button>
                            {showHandleUsers && <ChUsersHandle />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChannelUpdate;
