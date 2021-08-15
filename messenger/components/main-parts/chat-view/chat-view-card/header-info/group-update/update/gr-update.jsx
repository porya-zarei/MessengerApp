import {useContext, useEffect, useRef, useState} from "react";
import classes from "./grupdate.module.scss";
import {ViewContext} from "../../../../../../../context/view-context/view-context";
import {UserContext} from "../../../../../../../context/user-context/user-context";
import {fetcher} from "../../../../../../../hooks/fetcher";

const GrUpdate = () => {
    const {theme, chatsToShow} = useContext(ViewContext);
    const {token} = useContext(UserContext);
    const [groupName, setGroupName] = useState("");
    const [groupUserName, setGroupUserName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const imageRef = useRef();

    const handleUpdateGroup = async () => {
        const data = {
            GroupID: chatsToShow.Id,
            Name: groupName !== chatsToShow.Name ? groupName : null,
            GroupUserName:
                groupUserName !== chatsToShow.userName ? groupUserName : null,
            GroupDescription:
                groupDescription !== chatsToShow.description
                    ? groupDescription
                    : null,
        };

        const formData = new FormData();

        for (var key in data) {
            if (data[key] !== null && data[key] !== "null") {
                formData.append(key, data[key]);
            }
        }

        if (imageRef.current.files[0] !== null) {
            formData.append("GroupProfileImage", imageRef.current.files[0]);
        }

        const {result, error, isError} = await fetcher(
            "POST",
            "Groups/UpdateGroup",
            formData,
            token,
            "multipart/form-data",
        );
        if (!isError) {
            toast.success("group updated successfully");
        }
        console.log("result in update group => ", result, error);
    };

    useEffect(() => {
        setGroupName(chatsToShow.Name);
        setGroupUserName(chatsToShow.userName);
        setGroupDescription(chatsToShow.description);
    }, []);

    return (
        <div className={classes.updateGroupFormContainer}>
            <div className={classes.control}>
                <label style={{color: theme.text}}>Group Name : </label>
                <input
                    style={{
                        borderColor: theme.textGray,
                        color: theme.text,
                        backgroundColor: theme.darker,
                    }}
                    name="GroupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    type="text"
                />
            </div>
            <div className={classes.control}>
                <label style={{color: theme.text}}>Group UserName : </label>
                <input
                    style={{
                        borderColor: theme.textGray,
                        color: theme.text,
                        backgroundColor: theme.darker,
                    }}
                    name="GroupUserName"
                    value={groupUserName}
                    onChange={(e) => setGroupUserName(e.target.value)}
                    type="text"
                />
            </div>
            <div className={classes.control}>
                <label style={{color: theme.text}}>Description : </label>
                <input
                    style={{
                        borderColor: theme.textGray,
                        color: theme.text,
                        backgroundColor: theme.darker,
                    }}
                    name="groupDescription"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    type="text"
                />
            </div>
            <div className={classes.control}>
                <label style={{color: theme.text}}>profile : </label>
                <input name="GroupProfile" ref={imageRef} type="file" hidden />
                <button
                    onClick={() => imageRef.current.click()}
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.textGray,
                    }}>
                    <i className="bi-image"></i>
                </button>
            </div>
            <div className={classes.control}>
                <button
                    className="w-100"
                    style={{
                        backgroundColor: theme.info,
                        color: theme.text,
                        height: "40px",
                    }}
                    onClick={handleUpdateGroup}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default GrUpdate;
