import {useContext, useState} from "react";
import {toast} from "react-toastify";
import {UserContext} from "../../../context/user-context/user-context";
import {ViewContext} from "../../../context/view-context/view-context";
import {fetcher} from "../../../hooks/fetcher";
import {CreateGroupIllustration} from "../../illustrations/illustrations";
import classes from "./cgd.module.scss";
const CreateGroupDialog = () => {
    const {showCreateGroup, setShowCreateGroup, theme} =
        useContext(ViewContext);
    const {userId, token} = useContext(UserContext);
    const [groupUserName, setGroupUserName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [animationClass, setAnimationClass] = useState(
        classes.scaleInAnimation,
    );

    const handleClose = (e) => {
        e.preventDefault();
        setAnimationClass(classes.moveDownAnimation);
    };
    const handleAnimationEnd = (e) => {
        e.preventDefault();
        if (animationClass === classes.moveDownAnimation) {
            setShowCreateGroup(false);
            setAnimationClass(classes.scaleInAnimation);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            Name: groupName,
            GroupUserName: groupUserName,
            GroupDescription: groupDescription,
            CreatorID: userId,
        };
        const {result, isError, resStatus} = await fetcher(
            "POST",
            "Groups/CreateGroup",
            data,
            token,
        );
        if (resStatus === "201" || !isError) {
            setGroupName("");
            setGroupUserName("");
            setGroupDescription("");
            toast.success("group created successfully");
        }
        setLoading(false);
    };

    const handleContainerClick = (e) => {
        if (e.target.id === "createGroupDialogContainer") {
            handleClose(e);
        }
    };

    return showCreateGroup ? (
        <div
            id="createGroupDialogContainer"
            onClick={handleContainerClick}
            className={`${classes.container}`}>
            <div
                className={`${classes.card} ${animationClass}`}
                onAnimationEnd={handleAnimationEnd}
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
                            Create Group Form
                        </div>
                        <div className="form-control border-0 p-1 bg-transparent w-100 my-2">
                            <input
                                name="groupName"
                                placeholder="your group Name"
                                type="text"
                                value={groupName}
                                onChange={(e) => {
                                    setGroupName(e.target.value);
                                }}
                                title="must be unique"
                                className="w-100 border-0 outline-none rounded-pill p-2"
                            />
                        </div>
                        <div className="form-control border-0 bg-transparent p-1 w-100 my-2">
                            <input
                                name="groupUserName"
                                placeholder="your group userName"
                                type="text"
                                value={groupUserName}
                                onChange={(e) => {
                                    setGroupUserName(e.target.value);
                                }}
                                className="w-100 outline-none border-0 rounded-pill p-2"
                            />
                        </div>
                        <div className="form-control border-0 bg-transparent p-1 w-100 my-2">
                            <input
                                name="groupDescription"
                                placeholder="your group description"
                                type="text"
                                value={groupDescription}
                                onChange={(e) => {
                                    setGroupDescription(e.target.value);
                                }}
                                className="w-100 outline-none border-0 rounded-pill p-2"
                            />
                        </div>
                        <div className="form-control p-1 w-100 my-2">
                            <CreateGroupIllustration
                                width={"100%"}
                                colors={theme.illuColors}
                                height={"200px"}
                            />
                        </div>
                        <div className="w-100 p-1 my-2">
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: theme.info,
                                    color: theme.text,
                                }}
                                className="btn w-100">
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

export default CreateGroupDialog;
