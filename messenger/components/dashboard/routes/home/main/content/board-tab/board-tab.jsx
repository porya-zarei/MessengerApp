import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../../../context/user-context/user-context";
import {DashboardContext} from "../../../../../context/dashboard-context";
import SimpleElementCreateEdit from "../../../parts/simple-element-create-edit";
import {motion} from "framer-motion";

const BoardTab = () => {
    const {
        boardUsers,
        boardElements,
        handleDragElement,
        handleMoveMouseOnBoard,
    } = useContext(DashboardContext);

    const boardRef = useRef();

    const [dragging, setDragging] = useState(false);
    const [joined, setJoined] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const changeJoined = (joined) => {
        setJoined(joined);
    };

    const handleDrag = (e, info, id) => {
        console.log("handle drag =>", e, info);
        if (joined) {
            handleDragElement(id, info.point.x, info.point.y);
        }
    };

    const changeShowForm = (show = "") => {
        if (show === "yes") {
            setShowForm(true);
        } else if (show === "no") {
            setShowForm(false);
        } else if (show === "toggle") {
            setShowForm((p) => !p);
        }
    };

    const getElement = (element) => {
        console.log("element => ", element);
        if (element.Type === 0) {
            return (
                <motion.div
                    key={element.ElementID}
                    style={{
                        height: `${element.Height}px`,
                        width: `${element.Width}px`,
                        position: "absolute",
                        top: `${element.Position.Y}px`,
                        left: `${element.Position.X}px`,
                    }}
                    className={`bg-${element.Color}`}>
                    <textarea
                        className="form-control w-100 h-100"
                        type="text"
                        value={element.Content}></textarea>
                </motion.div>
            );
        } else if (element.Type === 1) {
            return (
                <motion.div
                    key={element.ElementID}
                    style={{
                        height: `${element.R * 2}px`,
                        width: `${element.R * 2}px`,
                        position: "absolute",
                        top: `${element.Position.Y}px`,
                        left: `${element.Position.X}px`,
                    }}
                    className={`bg-${element.Color}`}>
                    {element.Content}
                </motion.div>
            );
        } else if (element.Type === 2) {
            return (
                <motion.div
                    key={element.ElementID}
                    drag
                    dragConstraints={boardRef}
                    onDrag={(ev, info) =>
                        handleDrag(ev, info, element.ElementID)
                    }
                    style={{
                        height: `${element.R * 2}px`,
                        width: `${element.R * 2}px`,
                        position: "absolute",
                        top: `${element.Position.Y}px`,
                        left: `${element.Position.X}px`,
                        borderRadius: "50%",
                    }}
                    className={`bg-${element.Color}`}>
                    {element.Content}
                </motion.div>
            );
        } else if (element.Type === 3) {
            return (
                <motion.div
                    key={element.ElementID}
                    style={{
                        height: `${element.Height}px`,
                        width: `${element.Width}px`,
                        position: "absolute",
                        top: `${element.Position.Y}px`,
                        left: `${element.Position.X}px`,
                    }}
                    className={`bg-${element.Color}`}>
                    {element.Content}
                </motion.div>
            );
        } else if (element.Type === 4) {
            return (
                <motion.div
                    key={element.ElementID}
                    style={{
                        height: `${element.Height}px`,
                        width: `${element.Width}px`,
                        position: "absolute",
                        top: `${element.Position.Y}px`,
                        left: `${element.Position.X}px`,
                    }}
                    className={`bg-${element.Color}`}>
                    {element.Content}
                </motion.div>
            );
        } else {
        }
    };

    const mouseMoveListener = (e) => {
        handleMoveMouseOnBoard(e.offsetX, e.offsetY);
    };

    useEffect(() => {
        return () => {
            boardRef.current.removeEventListener(
                "mousemove",
                mouseMoveListener,
            );
        };
    }, []);

    return (
        <div className="row p-0 m-0 h-100 w-100 align-content-start">
            <div className="col-12 p-0 m-0 h-auto center">
                <SimpleElementCreateEdit
                    showForm={showForm}
                    changeShowForm={changeShowForm}
                    selectedElementForEdit={{}}
                    boardRef={boardRef}
                    changeJoined={changeJoined}
                    mouseMoveListener={mouseMoveListener}
                />
            </div>
            <div className="col-12 p-0 m-0 h-auto center">
                <div
                    className="w-100 bg-white rounded rounded-3 mt-2"
                    ref={boardRef}
                    style={{
                        height: "500px",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                    {boardUsers &&
                        boardUsers?.length > 0 &&
                        boardUsers?.map((user) => (
                            <div
                                key={user.UserID}
                                style={{
                                    position: "absolute",
                                    top: user?.MousePoint?.Y,
                                    left: user?.MousePoint?.X,
                                    height: "auto",
                                    width: "auto",
                                    backgroundColor: "black",
                                    color: "white",
                                }}>
                                {user?.FullName}
                            </div>
                        ))}
                    {boardElements &&
                        boardElements?.length > 0 &&
                        boardElements?.map((element) => getElement(element))}
                </div>
            </div>
        </div>
    );
};

export default BoardTab;
