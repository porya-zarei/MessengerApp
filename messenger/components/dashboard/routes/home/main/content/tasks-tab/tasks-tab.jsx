import {AnimatePresence} from "framer-motion";
import {useContext, useEffect, useMemo, useState} from "react";
import { DashboardContext } from "../../../../../context/dashboard-context";
import SimpleTask from "../../../parts/simple-task";
import SimpleTaskCreateEdit from "../../../parts/simple-task-create-edit";

const TasksTab = () => {
    const {tasks} = useContext(DashboardContext);
    const [selectedTaskForEdit, setSelectedTaskForEdit] = useState({});
    const [showForm, setShowForm] = useState(false);
    const changeSelectedTaskForEdit = (task) => {
        setSelectedTaskForEdit(task);
    };
    const changeShowForm = (show) => {
        if (show) {
            setShowForm(show);
        } else {
            setShowForm((p) => !p);
        }
        
    };

    return (
        <div className="row p-0 m-0 h-100 w-100 align-content-start">
            <div className="col-12 p-0 mb-4 m-0 h-auto center">
                <SimpleTaskCreateEdit
                    showForm={showForm}
                    selectedTaskForEdit={selectedTaskForEdit}
                    changeShowForm={changeShowForm}
                    changeSelectedTaskForEdit={changeSelectedTaskForEdit}
                />
            </div>
            <div className="col-12 p-0 m-0 h-auto center">
                <AnimatePresence>
                    <div className="row m-0 p-0 justify-content-evenly align-content-between">
                        {tasks?.map((task) => (
                            <div
                                key={task.TaskID}
                                className="col-md-5 col-lg-5 col-sm-11 col-xs-11 p-0 m-0 mb-3">
                                <SimpleTask
                                    showForm={showForm}
                                    selectedTaskForEdit={selectedTaskForEdit}
                                    changeShowForm={changeShowForm}
                                    changeSelectedTaskForEdit={
                                        changeSelectedTaskForEdit
                                    }
                                    task={task}
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
