import { AnimatePresence } from "framer-motion";
import {useMemo} from "react";
import SimpleTask from "../../../parts/simple-task";

const TasksTab = () => {
    const tasks = useMemo(() => [
        {
            finished: false,
            statusColor: "primary",
            title: "first task",
            content: "do it",
            sender: "Creator",
            forWho: "admin 2",
        },
        {
            finished: false,
            statusColor: "warning",
            title: "second task",
            content: "do it",
            sender: "Creator",
            forWho: "all",
        },
        {
            finished: true,
            statusColor: "info",
            title: "third task",
            content: "do it",
            sender: "Creator",
            forWho: "admin 2",
        },
        {
            finished: false,
            statusColor: "danger",
            title: "fourth task",
            content: "do it",
            sender: "admin 2",
            forWho: "admin 5",
        },
        {
            finished: true,
            statusColor: "primary",
            title: "fifth task",
            content: "do it",
            sender: "Creator",
            forWho: "admin 2",
        },
    ]);
    return (
        <div className="row p-0 m-0 h-100 w-100 align-content-start">
            <div className="col-12 p-0 m-0 h-auto center">
                <AnimatePresence>
                    <div className="row m-0 p-0 justify-content-evenly align-content-between">
                        {tasks.map((task, i) => (
                            <div
                                key={i}
                                className="col-md-5 col-lg-5 col-sm-10 col-xs-10 p-0 m-0 mb-3">
                                <SimpleTask
                                    finished={task.finished}
                                    title={task.title}
                                    content={task.content}
                                    forWho={task.forWho}
                                    sender={task.sender}
                                    statusColor={task.statusColor}
                                />
                            </div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TasksTab;
