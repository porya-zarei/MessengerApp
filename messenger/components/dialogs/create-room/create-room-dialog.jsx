import {useContext, useState} from "react";
import {UserContext} from "../../../context/user-context/user-context";
import {ViewContext} from "../../../context/view-context/view-context";
import {fetcher} from "../../../hooks/fetcher";
import classes from "./crd.module.scss";
const CreateRoomDialog = () => {
    const {showCreateRoom, setShowCreateRoom} = useContext(ViewContext);
    const {userId, token} = useContext(UserContext);
    const [receiverUserName, setReceiverUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [successfull, setSuccessfull] = useState("");
    const handleClose = () => {
        setShowCreateRoom(false);
    };
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            SenderUserID:userId,
            ReceiverUserName:receiverUserName
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
            setShowCreateRoom(false);
        }
    };

    return showCreateRoom ? (
        <div
            id="createRoomDialogContainer"
            onClick={handleContainerClick}
            className={`${classes.container}`}>
            <div className={`${classes.card} bg-dark`}>
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
                            <img
                                src="/assets/images/svg/create.svg"
                                height="240px"
                                className="w-100"
                            />
                        </div>
                        <div className="w-100 p-1 my-2">
                            <button
                                type="submit"
                                className="btn btn-outline-info w-100">
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
