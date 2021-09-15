import {useContext, useEffect, useMemo, useState} from "react";
import {DashboardContext} from "../../../context/dashboard-context";
import {fetcher} from "../../../../../hooks/fetcher";
import {toast} from "react-toastify";

const SimpleElementCreateEdit = ({
    showForm,
    changeShowForm,
    changeLineWidth,
    changeColor,
}) => {
    const {
        dashToken: token,
        handleJoinBoard,
        handleLeaveBoard,
        joinedToBoard,
        boardUsers,
    } = useContext(DashboardContext);

    const handleJoinLeftButton = async () => {
        if (joinedToBoard) {
            await handleLeaveBoard();
        } else {
            await handleJoinBoard();
        }
    };

    const allColors = useMemo(() => ({
        white: "#fff",
        secondary: "#6c757d",
        primary: "#0d6efd",
        secondary: "#6c757d",
        success: "#198754",
        info: "#0dcaf0",
        warning: "#ffc107",
        danger: "#dc3545",
        light: "#f8f9fa",
        dark: "#212529",
    }));

    const handleCleanForm = () => {};

    useEffect(() => {
        return () => {
            joinedToBoard && handleLeaveBoard().then((res) => {});
        };
    }, []);

    return (
        <div className="w-100 h-auto p-0 m-0">
            <div className="row w-100 m-0 p-0 justify-content-evenly align-content-center">
                <div className="row p-0 m-0 h-40px w-100">
                    <div className="col-3 p-0 m-0 h-100 center">
                        <button
                            className="btn btn-info"
                            onClick={handleJoinLeftButton}>
                            {joinedToBoard ? "Left" : "Join"} Board
                        </button>
                    </div>
                    <div className="col-3 p-0 m-0 h-100 center">
                        <button className="btn btn-info">? Board</button>
                    </div>
                    <div className="col-3 p-0 m-0 h-100 center">
                        <button
                            onClick={handleCleanForm}
                            className="btn btn-info">
                            Clean Form
                        </button>
                    </div>
                    <div className="col-3 p-0 m-0 h-100 center">
                        <button className="btn btn-info">Add Element</button>
                    </div>
                </div>
            </div>
            <div className="row w-100 m-0 p-0 justify-content-evenly align-content-between">
                <div className="col-12 p-0 m-0 mt-2">
                    <button
                        onClick={() => changeShowForm("toggle")}
                        className="btn btn-secondary w-100">
                        {showForm ? "hide" : "show"} form
                    </button>
                </div>
                <div className="col-12 p-0 m-0">
                    {showForm && (
                        <div className="row p-0 m-0">
                            <div className="col-12 p-0 m-0 mb-2">
                                <div className="row p-1 m-0 justify-content-evenly align-content-center ">
                                    {Object.keys(allColors).map((k) => (
                                        <button
                                            onClick={() =>
                                                changeColor(allColors[k])
                                            }
                                            className={`btn btn-${k} col-1`}></button>
                                    ))}
                                </div>
                            </div>
                            <div className="col-12 d-inline-flex p-0 m-0 mb-2">
                                <label className="form-label mx-3">
                                    Line Width :
                                </label>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        changeLineWidth(Number(e.target.value))
                                    }
                                    className="form-control w-auto m-auto"
                                />
                            </div>
                            <div className="col-12 p-0 m-0 mb-2">
                                {boardUsers.map((u) => (
                                    <span className="badge bg-secondary text-white m-1">
                                        {u.FullName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimpleElementCreateEdit;
