import {useState} from "react";
import classes from "./groupupdate.module.scss";
import GrUpdate from "./update/gr-update";
import GrUsersHandle from "./users-handle/gr-users-handle";

const GroupUpdate = () => {
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showHandleUsers, setShowHandleUsers] = useState(false);
    return (
        <div className={classes.container}>
            <button
                onClick={() => setShow((p) => !p)}
                className={classes.updateBtn}>
                group setting
            </button>
            {show && (
                <div className={classes.update}>
                    <div className={classes.innerContainer}>
                        <div className={classes.updateGroup}>
                            <button
                                className={classes.updateGroupBtn}
                                onClick={() => setShowUpdate((p) => !p)}>
                                update group
                            </button>
                            {showUpdate && <GrUpdate />}
                        </div>
                        <div className={classes.handleUsers}>
                            <button
                                className={classes.handleUsersBtn}
                                onClick={() => setShowHandleUsers((p) => !p)}>
                                handle users
                            </button>
                            {showHandleUsers && <GrUsersHandle />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupUpdate;
