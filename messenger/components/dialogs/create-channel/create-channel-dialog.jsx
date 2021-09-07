import {useContext, useState} from "react";
import {toast} from "react-toastify";
import {UserContext} from "../../../context/user-context/user-context";
import {ViewContext} from "../../../context/view-context/view-context";
import {fetcher} from "../../../hooks/fetcher";
import {CreateGroupIllustration} from "../../illustrations/illustrations";
import CreateGroupDialog from "../create-group/create-group-dialog";
import classes from "./ccd.module.scss";
const CreateChannelDialog = () => {
    const {showCreateChannel, setShowCreateChannel, theme} =
        useContext(ViewContext);
    const {userId, token} = useContext(UserContext);
    const [channelUserName, setChannelUserName] = useState("");
    const [channelName, setChannelName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShowCreateChannel(false);
    };
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            Name: channelName,
            ChannelUserName: channelUserName,
            CreatorID: userId,
            ChannelDescription: channelDescription,
        };
        const {result, isError, resStatus} = await fetcher(
            "POST",
            "Channels/CreateChannel",
            data,
            token,
        );
        if (resStatus === "201" || !isError) {
            setChannelDescription("");
            setChannelName("");
            setChannelUserName("");
            toast.success("channel created successfully");
        }
        setLoading(false);
    };

    const handleContainerClick = (e) => {
        if (e.target.id === "createChannelDialogContainer") {
            setShowCreateChannel(false);
        }
    };

    return showCreateChannel ? (
        <div
            id="createChannelDialogContainer"
            onClick={handleContainerClick}
            className={`${classes.container}`}>
            <div
                className={`${classes.card}`}
                style={{backgroundColor: theme.darker, color: theme.text}}>
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
                            Create Channel Form
                        </div>
                        <div className="form-control border-0 p-1 bg-transparent w-100 my-2">
                            <input
                                name="channelName"
                                placeholder="your channel Name"
                                type="text"
                                value={channelName}
                                onChange={(e) => {
                                    setChannelName(e.target.value);
                                }}
                                title="must be unique"
                                className="w-100 border-0 outline-none rounded-pill p-2"
                            />
                        </div>
                        <div className="form-control border-0 bg-transparent p-1 w-100 my-2">
                            <input
                                name="channelUserName"
                                placeholder="your channel userName"
                                type="text"
                                value={channelUserName}
                                onChange={(e) => {
                                    setChannelUserName(e.target.value);
                                }}
                                className="w-100 outline-none border-0 rounded-pill p-2"
                            />
                        </div>
                        <div className="form-control border-0 bg-transparent p-1 w-100 my-2">
                            <input
                                name="channelDescription"
                                placeholder="your channel description"
                                type="text"
                                value={channelDescription}
                                onChange={(e) => {
                                    setChannelDescription(e.target.value);
                                }}
                                className="w-100 outline-none border-0 rounded-pill p-2"
                            />
                        </div>
                        <div className="form-control p-1 w-100 my-2">
                            <CreateGroupIllustration
                                colors={theme.illuColors}
                                height={"200px"}
                                width={"100%"}
                            />
                        </div>
                        <div className="w-100 p-1 my-2">
                            <button
                                style={{
                                    backgroundColor: theme.info,
                                    color: theme.text,
                                }}
                                type="submit"
                                className="btn btn-outline-info w-100">
                                {!loading ? (
                                    "Send"
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

export default CreateChannelDialog;
