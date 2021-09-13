import {useContext, useState} from "react";
import {DashboardContext} from "../../../context/dashboard-context";
import {motion, useMotionValue} from "framer-motion";
import classes from "./parts.module.scss";

const SimpleTask = ({
    task = {},
    selectedTaskForEdit,
    changeSelectedTaskForEdit,
    showForm,
    changeShowForm,
}) => {
    const {
        TaskID,
        Title,
        Content,
        StartDate,
        FinishDate,
        Finished,
        SenderID,
        SenderName,
        ForWhoID,
        ForWhoName,
        StatusColor,
    } = task;
    const {dashTheme: theme} = useContext(DashboardContext);
    const [checked, setChecked] = useState(Finished);
    const xPosition = useMotionValue(0);
    let statusBgColor = "";
    switch (StatusColor) {
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
        if (xPosition.get() > 70) {
            console.log("delete");
        } else if (xPosition.get() < -70) {
            console.log("edit");
            changeSelectedTaskForEdit(task);
            changeShowForm(true);
        } else {
            console.log("no delete no edit");
        }
    };
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
                    <div className={classes.simpleTaskTitle}>{Title}</div>
                    <div
                        style={{borderTopColor: theme.text}}
                        className={classes.simpleTaskContent}>
                        {Content}
                    </div>
                    <div
                        style={{borderTopColor: theme.text}}
                        className={classes.simpleTaskTimes}>
                        <div>{StartDate}</div>
                        <div>{FinishDate}</div>
                    </div>
                </div>
                <div className={classes.simpleTaskRight}>
                    <div
                        style={{backgroundColor: statusBgColor}}
                        className={`${classes.simpleTaskFinishStatus}`}>
                        <input
                            type="checkbox"
                            className={`form-check-input bg-${StatusColor}`}
                            checked={checked}
                            onChange={() => setChecked((p) => !p)}
                        />
                    </div>
                    <div className={classes.simpleTaskDetail}>
                        <div className={classes.simpleTaskDetailSender}>
                            <span>Sender :</span>
                            <span>{SenderName}</span>
                        </div>
                        <div
                            style={{borderTopColor: theme.text}}
                            className={classes.simpleTaskDetailForWho}>
                            <span>For :</span>
                            <span>{ForWhoName}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SimpleTask;
