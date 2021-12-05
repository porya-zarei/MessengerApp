import {useContext, useState} from "react";
import {UserContext} from "../../../context/user-context/user-context";
import {ViewContext} from "../../../context/view-context/view-context";
import {fetcher} from "../../../hooks/fetcher";
import {CreateGroupIllustration} from "../../illustrations/illustrations";
import classes from "./crd.module.scss";
const CreateRoomDialog = () => {
    const {showCreateRoom, setShowCreateRoom, theme} = useContext(ViewContext);
    const {userId, token} = useContext(UserContext);
    const [receiverUserName, setReceiverUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [successfull, setSuccessfull] = useState("");
    const [animationClass, setAnimationClass] = useState(classes.scaleInAnimation);
    const handleClose = (e) => {
        e.preventDefault();
        setAnimationClass(classes.moveDownAnimation);
    };
    const handleAnimationEnd = (e) => {
        e.preventDefault();
        if (animationClass === classes.moveDownAnimation) {
            setShowCreateRoom(false);
            setAnimationClass(classes.scaleInAnimation);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            SenderUserID: userId,
            ReceiverUserName: receiverUserName,
        };
        const {result, isError, resStatus} = await fetcher(
            "POST",
            "Rooms/CreateRoom",
            data,
            token,
        );
        if (resStatus === "201" || !isError) {
            setSuccessfull("Created");
        }
        setLoading(false);
    };

    const handleContainerClick = (e) => {
        if (e.target.id === "createRoomDialogContainer") {
            handleClose(e);
        }
    };

    return showCreateRoom ? (
        <div
            id="createRoomDialogContainer"
            onClick={handleContainerClick}
            className={`${classes.container}`}>
            <div
                style={{backgroundColor: theme.darker, color: theme.text}}
                className={`${classes.card} ${animationClass}`}
                onAnimationEnd={handleAnimationEnd}>
                <form
                    onSubmit={handleSubmit}
                    className={`${classes.form} h-100 w-100`}>
                    <div className="h-100 w-100 position-relative">
                        <button
                            onClick={handleClose}
                            style={{top: "3px", right: "3px"}}
                            className="btn btn-danger position-absolute">
                            <i className="bi bi-x"></i>
                        </button>
                        <div className="text-white-50 m-auto mb-4">
                            Create Room Form
                        </div>
                        <div className="form-control border-0 p-1 bg-transparent w-100 my-2">
                            <input
                                name="receiverUserName"
                                placeholder="your Friend Username"
                                type="text"
                                value={receiverUserName}
                                onChange={(e) => {
                                    setReceiverUserName(e.target.value);
                                }}
                                title="unique id"
                                className="w-100 border-0 outline-none rounded-pill p-2"
                            />
                        </div>
                        <div className="form-control p-1 w-100 my-2">
                            <CreateGroupIllustration
                                colors={theme.illuColors}
                                className={"w-100"}
                                height={"300px"}
                            />
                        </div>
                        <div className="w-100 p-1 my-2">
                            <button
                                style={{
                                    backgroundColor: theme.info,
                                    color: theme.text,
                                }}
                                type="submit"
                                className="btn w-100">
                                {!loading ? (
                                    "Send" + " " + successfull
                                ) : (
                                    <i className="spinner-border"></i>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default CreateRoomDialog;
