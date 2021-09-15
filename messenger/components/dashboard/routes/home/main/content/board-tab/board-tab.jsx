import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../../../context/user-context/user-context";
import {DashboardContext} from "../../../../../context/dashboard-context";
import SimpleElementCreateEdit from "../../../parts/simple-element-create-edit";

const BoardTab = () => {
    const {connection} = useContext(UserContext);

    const boardRef = useRef();
    const curr = useRef({color: "#212529", x: 0.0, y: 0.0, lineWidth: 2});

    const [showForm, setShowForm] = useState(false);

    const changeColor = (cr) => {
        curr.current.color = cr;
    };

    const changeLineWidth = (st) => {
        curr.current.lineWidth = st;
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

    useEffect(() => {
        const canvas = boardRef.current;
        const current = curr.current;

        let drawing = false;
        const drawLine = (x0, y0, x1, y1, color, lw, emit) => {
            if (!emit) {
                const context = boardRef.current.getContext("2d");
                // console.log("before draw => ", x0, y0, x1, y1);
                context.beginPath();
                context.moveTo(x0, y0);
                context.lineTo(x1, y1);
                context.strokeStyle = color;
                context.lineWidth = lw;
                context.stroke();
                context.closePath();
                // console.log("after draw => ", context);
                return;
            } else {
                const w = canvas.width;
                const h = canvas.height;
                // console.log("before send line => ", x0, y0, x1, y1);
                connection.send("UserDrawOnBoard", {
                    X0: x0 / w,
                    Y0: y0 / h,
                    X1: x1 / w,
                    Y1: y1 / h,
                    Color: color,
                    LineWidth: Number(lw),
                });
                return;
            }
        };

        const onMouseDown = (e) => {
            drawing = true;
            current.x = e?.offsetX || e?.touches[0]?.offsetX;
            current.y = e?.offsetY || e?.touches[0]?.offsetY;
        };

        const onMouseMove = (e) => {
            
            if (!drawing) {
                return;
            }
            drawLine(
                current.x,
                current.y,
                e?.offsetX || e?.touches[0]?.offsetX,
                e?.offsetY || e?.touches[0]?.offsetY,
                curr.current.color,
                curr.current.lineWidth,
                true,
            );
            current.x = e?.offsetX || e?.touches[0]?.offsetX;
            current.y = e?.offsetY || e?.touches[0]?.offsetY;
        };

        const onMouseUp = (e) => {
            
            if (!drawing) {
                return;
            }
            drawing = false;
            drawLine(
                current.x,
                current.y,
                e?.offsetX || e?.touches[0]?.offsetX,
                e?.offsetY || e?.touches[0]?.offsetY,
                curr.current.color,
                curr.current.lineWidth,
                true,
            );
        };

        const throttle = (callback, delay) => {
            let previousCall = new Date().getTime();
            return function () {
                const time = new Date().getTime();

                if (time - previousCall >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        };

        canvas.addEventListener("mousedown", onMouseDown, false);
        canvas.addEventListener("mouseup", onMouseUp, false);
        canvas.addEventListener("mouseout", onMouseUp, false);
        canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

        canvas.addEventListener("touchstart", onMouseDown, false);
        canvas.addEventListener("touchend", onMouseUp, false);
        canvas.addEventListener("touchcancel", onMouseUp, false);
        canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", onResize, false);

        onResize();

        const onDrawingEvent = (data) => {
            const w = canvas.width;
            const h = canvas.height;
            // console?.log("on draw event => ", data);
            drawLine(
                data.X0 * w,
                data.Y0 * h,
                data.X1 * w,
                data.Y1 * h,
                data.Color,
                data.LineWidth,
                false,
            );
        };
        connection?.on("Drawing", onDrawingEvent);
    }, []);

    return (
        <div className="row p-0 m-auto h-100 w-100 overflow-hidden">
            <div className="col-12 p-0 m-0 h-auto center">
                <SimpleElementCreateEdit
                    showForm={showForm}
                    changeShowForm={changeShowForm}
                    changeColor={changeColor}
                    changeLineWidth={changeLineWidth}
                />
            </div>
            <div className="col-12 p-0 m-0 h-auto center"></div>
            <div className="col-12 p-0 m-0 h-auto center">
                <div
                    style={{
                        height: "500px",
                        width: "100%",
                        position: "relative",
                    }}>
                    <canvas
                        className="bg-white text-dark rounded rounded-3 mt-2"
                        style={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            overflow: "hidden",
                            top: 0,
                            left: 0,
                        }}
                        ref={boardRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default BoardTab;
