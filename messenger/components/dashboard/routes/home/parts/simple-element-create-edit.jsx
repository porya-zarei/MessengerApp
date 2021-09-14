import {useContext, useEffect, useMemo, useState} from "react";
import {DashboardContext} from "../../../context/dashboard-context";
import {fetcher} from "../../../../../hooks/fetcher";
import {toast} from "react-toastify";

const SimpleElementCreateEdit = ({
    selectedElementForEdit,
    showForm,
    changeShowForm,
    boardRef,
    changeJoined,
    mouseMoveListener
}) => {
    const {
        dashToken: token,
        handleJoinBoard,
        handleLeaveBoard,
        handleMoveMouseOnBoard,
        handleCreateElement,
    } = useContext(DashboardContext);

    const [position, setPosition] = useState(
        selectedElementForEdit?.Position || {X: 0.0, Y: 0.0},
    );
    const [content, setContent] = useState(
        selectedElementForEdit?.Content || "",
    );
    const [type, setType] = useState(selectedElementForEdit?.Type || 0);
    const [color, setColor] = useState(
        selectedElementForEdit?.Color || "primary",
    );
    const [height, setHeight] = useState(0.0);
    const [width, setWidth] = useState(0.0);
    const [r, setR] = useState(0.0);


    const handleJoinButton = async () => {
        await handleJoinBoard();
        boardRef.current.addEventListener("mousemove", mouseMoveListener);
        changeJoined(true);
    };

    const handleLeaveButton = () => {
        handleLeaveBoard();
        boardRef.current.removeEventListener("mousemove", mouseMoveListener);
        changeJoined(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data in send element => ");

        if (selectedElementForEdit?.ElementID) {
            //? edit
        } else {
            //? create
            const data = {
                Type: Number(type),
                Content: content,
                Color: color,
                Position: position,
                Height: Number(height),
                Width: Number(width),
                R: Number(r),
            };
            console.log("data => ", data);
            handleCreateElement(data);
        }
    };
    const allColors = useMemo(() => [
        "primary",
        "danger",
        "warning",
        "info",
        "white",
        "secondary",
        "dark",
    ]);

    const allTypes = useMemo(() => [
        "Text",
        "Line",
        "Circle",
        "Rectangle",
        "Triangle",
    ]);

    const handleCleanForm = () => {};

    useEffect(() => {
        if (selectedElementForEdit?.ElementID) {
        }
    }, [selectedElementForEdit]);

    return (
        <div className="w-100 h-auto p-0 m-0">
            <div className="row w-100 m-0 p-0 justify-content-evenly align-content-center">
                <div className="row p-0 m-0 h-40px w-100">
                    <div className="col-3 p-0 m-0 h-100 center">
                        <button
                            className="btn btn-info"
                            onClick={handleJoinButton}>
                            Join Board
                        </button>
                    </div>
                    <div className="col-3 p-0 m-0 h-100 center">
                        <button
                            className="btn btn-info"
                            onClick={handleLeaveButton}>
                            Left Board
                        </button>
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
                        <div className="container center">
                            <form
                                method="post"
                                style={{width: "300px"}}
                                onSubmit={handleSubmit}>
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
                                        for="heightField"
                                        className="col-12 col-form-label">
                                        Height :
                                    </label>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="height"
                                            id="heightField"
                                            placeholder=""
                                            value={height}
                                            onChange={(e) =>
                                                setHeight(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="widthField"
                                        className="col-12 col-form-label">
                                        Width :
                                    </label>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="width"
                                            id="widthField"
                                            placeholder=""
                                            value={width}
                                            onChange={(e) =>
                                                setWidth(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="rField"
                                        className="col-12 col-form-label">
                                        R :
                                    </label>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="r"
                                            id="rField"
                                            placeholder=""
                                            value={r}
                                            onChange={(e) =>
                                                setR(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="contentField"
                                        className="col-12 col-form-label">
                                        Position :
                                    </label>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="content"
                                            id="contentField"
                                            placeholder=""
                                            value={`${position?.X},${position?.Y}`}
                                            onChange={(e) => {
                                                const xy =
                                                    e.target.value.split(",");
                                                setPosition({
                                                    X: Number(xy[0]),
                                                    Y: Number(xy[1]),
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="colorField"
                                        className="col-12 col-form-label">
                                        Color :
                                    </label>
                                    <div className="col-12">
                                        <select
                                            value={color}
                                            onChange={(e) =>
                                                setColor(e.target.value)
                                            }
                                            className="form-control form-select"
                                            name="color"
                                            id="colorField">
                                            {allColors.map((color) => (
                                                <option
                                                    className={`bg-${color}`}
                                                    value={color}>
                                                    {color}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row w-100">
                                    <label
                                        for="typeField"
                                        className="col-12 col-form-label">
                                        Type :
                                    </label>
                                    <div className="col-12">
                                        <select
                                            value={type}
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                            className="form-control form-select"
                                            name="type"
                                            id="forWhoIdField">
                                            {allTypes.map((tp, i) => (
                                                <option value={i}>{tp}</option>
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

export default SimpleElementCreateEdit;
