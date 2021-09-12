import {useContext, useState} from "react";
import {DashboardContext} from "../../../context/dashboard-context";
import {motion,useMotionValue} from 'framer-motion'
import classes from "./parts.module.scss";

const SimpleTask = ({
    finished = false,
    statusColor = "primary",
    title = "",
    content = "",
    sender = "Creator",
    forWho = "",
}) => {
    const {dashTheme: theme} = useContext(DashboardContext);
    const [checked, setChecked] = useState(finished);
    const xPosition = useMotionValue(0);
    let statusBgColor = "";
    switch (statusColor) {
        case "primary":
            statusBgColor = "#3b8aff73";
            break;
        case "warning":
            statusBgColor = "#f8c11c73";
            break;
        case "danger":
            statusBgColor = "#ff3e5073";
            break;
        case "info":
            statusBgColor = "#1ed4f873";
            break;
        case "secondary":
            statusBgColor = "#3b8aff73";
            break;
        case "white":
            statusBgColor = "#3b8aff73";
            break;
        case "dark":
            statusBgColor = "#3b8aff73";
            break;
        default:
            statusBgColor = "#3b8aff73";
            break;
    }
    const handleDragEnd = () => {
        
    }
    return (
        <div className={classes.simpleTaskContainer}>
            <motion.div
                style={{
                    x: xPosition,
                    backgroundColor: theme.dark,
                    color: theme.text,
                }}
                drag="x"
                dragConstraints={{left: 0, right: 0}}
                onDragEnd={handleDragEnd}
                initial={{scaleX: 0}}
                animate={{scaleX: 1}}
                exit={{scaleX: 0}}
                transition={{
                    duration: 0.5,
                    easings: "easeInOut",
                }}
                className={classes.simpleTask}>
                <div className={classes.simpleTaskLeft}>
                    <div className={classes.simpleTaskTitle}>{title}</div>
                    <div
                        style={{borderTopColor: theme.text}}
                        className={classes.simpleTaskContent}>
                        {content}
                    </div>
                </div>
                <div className={classes.simpleTaskRight}>
                    <div
                        style={{backgroundColor: statusBgColor}}
                        className={`${classes.simpleTaskFinishStatus}`}>
                        <input
                            type="checkbox"
                            className={`form-check-input bg-${statusColor}`}
                            checked={checked}
                            onChange={() => setChecked((p) => !p)}
                        />
                    </div>
                    <div className={classes.simpleTaskDetail}>
                        <div className={classes.simpleTaskDetailSender}>
                            <span>Sender :</span>
                            <span>{sender}</span>
                        </div>
                        <div
                            style={{borderTopColor: theme.text}}
                            className={classes.simpleTaskDetailForWho}>
                            <span>For :</span>
                            <span>{forWho}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SimpleTask;
