import {useContext, useEffect, useMemo, useState} from "react";
import {DashboardContext} from "../../../context/dashboard-context";
import {fetcher} from "../../../../../hooks/fetcher";
import {UserContext} from "../../../../../context/user-context/user-context";
import {toast} from "react-toastify";

const SimpleTaskCreateEdit = ({
    selectedTaskForEdit,
    changeSelectedTaskForEdit,
    showForm,
    changeShowForm,
}) => {
    const {allData,dashToken:token} = useContext(DashboardContext);
    console.log("selected task => ", selectedTaskForEdit);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(
            "data in send task => ",
            title,
            content,
            forWhoId,
            statusColor,
            finished,
        );
        if (selectedTaskForEdit?.TaskID) {
            //? edit
            const data = {
                TaskID:selectedTaskForEdit.TaskID,
                Title: title,
                Content: content,
                Finished: finished,
                ForWhoID: forWhoId,
                StatusColor: statusColor,
            };
            const {result, isError} = await fetcher(
                "POST",
                "Dashboard/UpdateTask",
                data,
                token,
            );
            if (!isError) {
                toast.success("task updated");
            }
        } else {
            //? create
            const data = {
                Title: title,
                Content: content,
                Finished: finished,
                ForWhoID: forWhoId,
                StatusColor: statusColor,
            };
            const {result, isError} = await fetcher(
                "POST",
                "Dashboard/CreateTask",
                data,
                token,
            );
            if (!isError) {
                toast.success("task created");
            }
        }
    };
    const allStatuses = useMemo(() => [
        "primary",
        "danger",
        "warning",
        "info",
        "white",
        "secondary",
        "dark",
    ]);

    const [title, setTitle] = useState(selectedTaskForEdit?.Title || "");
    const [content, setContent] = useState(selectedTaskForEdit?.Content || "");
    const [forWhoId, setForWhoId] = useState(
        selectedTaskForEdit?.ForWhoID || "",
    );
    const [statusColor, setStatusColor] = useState(
        selectedTaskForEdit?.StatusColor || "primary",
    );
    const [finished, setFinished] = useState(
        selectedTaskForEdit?.Finished || false,
    );

    const handleCleanForm = () => {
        changeSelectedTaskForEdit({});
        setTitle("");
        setContent("");
        setFinished(false);
        setForWhoId("");
        setStatusColor("");
    }

    useEffect(() => {
        if (selectedTaskForEdit?.TaskID) {
            setTitle(selectedTaskForEdit.Title);
            setContent(selectedTaskForEdit.Content);
            setFinished(Boolean(selectedTaskForEdit.Finished));
            setForWhoId(selectedTaskForEdit.ForWhoID);
            setStatusColor(selectedTaskForEdit.StatusColor);
        }
    }, [selectedTaskForEdit]);

    return (
        <div className="w-100 h-auto p-0 m-0">
            <div className="row w-100 m-0 p-0 justify-content-evenly align-content-center">
                <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 mb-3 center">
                    <button className="btn btn-lg btn-info">Create</button>
                </div>
                <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 mb-3 center">
                    <button className="btn btn-lg btn-warning" onClick={handleCleanForm}>Clean Form</button>
                </div>
                <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 mb-3 center">
                    <button className="btn btn-lg btn-secondary">Create</button>
                </div>
                <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 mb-3 center">
                    <button className="btn btn-lg btn-danger">Create</button>
                </div>
            </div>
            <div className="row w-100 m-0 p-0 justify-content-evenly align-content-between">
                <div className="col-12 p-0 m-0">
                    <button
                        onClick={()=> changeShowForm(null)}
                        className="btn btn-secondary w-100">
                        {showForm ? "hide" : "show"} form
                    </button>
                </div>
                <div className="col-12 p-0 m-0">
                    {showForm && (
                        <div className="container center">
                            <form
                                method="post"
                                style={{width: "300px"}}
                                onSubmit={handleSubmit}>
                                <div className="form-group row w-100">
                                    <label
                                        for="titleField"
                                        className="col-12 col-form-label">
                                        Title :
                                    </label>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            id="titleField"
                                            placeholder=""
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="contentField"
                                        className="col-12 col-form-label">
                                        Content :
                                    </label>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="content"
                                            id="contentField"
                                            placeholder=""
                                            value={content}
                                            onChange={(e) =>
                                                setContent(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="finishedField"
                                        className="col-12 col-form-label">
                                        Finished ? :
                                    </label>
                                    <div className="col-12">
                                        <input
                                            type="checkbox"
                                            className="form-check"
                                            name="finished"
                                            id="finishedField"
                                            placeholder=""
                                            checked={finished}
                                            onChange={(e) =>
                                                setFinished(e.target.checked)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="statusColorField"
                                        className="col-12 col-form-label">
                                        Status Color :
                                    </label>
                                    <div className="col-12">
                                        <select
                                            value={statusColor}
                                            onChange={(e) =>
                                                setStatusColor(e.target.value)
                                            }
                                            className="form-control form-select"
                                            name="statusColor"
                                            id="statusColorField">
                                            {allStatuses.map((status) => (
                                                <option
                                                    className={`bg-${status}`}
                                                    value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="forWhoIdField"
                                        className="col-12 col-form-label">
                                        for Who :
                                    </label>
                                    <div className="col-12">
                                        <select
                                            value={forWhoId}
                                            onChange={(e) =>
                                                setForWhoId(e.target.value)
                                            }
                                            className="form-control form-select"
                                            name="statusColor"
                                            id="forWhoIdField">
                                            {allData.Users.map((user) => (
                                                <option value={user.UserID}>
                                                    {user.FirstName +
                                                        " " +
                                                        user.LastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row mt-2 w-100">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-success w-100">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimpleTaskCreateEdit;
