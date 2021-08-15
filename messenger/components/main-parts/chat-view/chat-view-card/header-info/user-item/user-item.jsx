import { useContext } from "react";
import { ViewContext } from "../../../../../../context/view-context/view-context";
import {handleAddAdmin, handleRemoveAdmin, handleRemoveUser} from "./handles";
import classes from "./useritem.module.scss";

const UserItem = ({user, type, id, token, setUsers}) => {
    const {theme} = useContext(ViewContext);
    const handleAddAdminTo = async () => {
        console.log("start add admin => ", type, id, user, token);
        const res = await handleAddAdmin(type, id, user.UserID, token);
        if (res) {
            setUsers(res);
        }
        console.log("after add admin user => ", res);
    };
    const handleRemoveAdminFrom = async () => {
        const res = await handleRemoveAdmin(type, id, user.UserID, token);
        if (res) {
            setUsers(res);
        }
    };
    const handleRemoveMember = async () => {
        console.log("start remove => ",type,id,user,token);
        const res = await handleRemoveUser(type, id, user.UserID, token);
        console.log("after remove user => ",res);
        if (res) {
            setUsers(res);
        }
    };
    return (
        <div className={classes.itemContainer} style={{color:theme.text,backgroundColor:theme.primary}}>
            <div className={classes.imageContainer}>
                <img
                    src={
                        user.ProfileImage && user.ProfileImage.length > 0
                            ? `https://localhost:44389/files/images/profiles/${user.ProfileImage}`
                            : "/assets/images/png/avatar.png"
                    }
                />
            </div>
            <div className={classes.userInfo}>
                <div className={classes.fullName}>
                   FullName : {user.FirstName} {user.LastName}
                </div>
                <div className={classes.userName}>User Name : {user.UserName}</div>
            </div>
            <div className={classes.btnsContainer}>
                <button
                    style={{
                        backgroundColor: user.IsAdmin ? "#ffff66" : "#00ffff",
                    }}
                    onClick={
                        user.IsAdmin ? handleRemoveAdminFrom : handleAddAdminTo
                    }
                    className={classes.adminBtn}>
                    {user.IsAdmin ? (
                        <i className="bi-arrow-down"></i>
                    ) : (
                        <i className="bi-arrow-up"></i>
                    )}
                </button>
                <button
                    onClick={handleRemoveMember}
                    style={{backgroundColor:theme.danger,color:theme.text}}
                    className={classes.removeBtn}>
                    <i className="bi-trash2"></i>
                </button>
            </div>
        </div>
    );
};

export default UserItem;
