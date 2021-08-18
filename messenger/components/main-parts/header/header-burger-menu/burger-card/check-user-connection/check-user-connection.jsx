import {useContext, useState} from "react";
import {toast} from "react-toastify";
import {UserContext} from "../../../../../../context/user-context/user-context";
import classes from "./checkuserconnection.module.scss";
const CheckUserConnection = () => {
    const [loading, setLoading] = useState(false);
    const {connection, connectionId, setConnectionId, userId} =
        useContext(UserContext);
    const handleCheck = () => {
        setLoading(true);
        if (connection?.connectionId !== connectionId) {
            connection
                .invoke("ChackConnection", userId, connection.connectionId)
                .then((res) => {
                    if (res !== null && res === connection?.connectionId) {
                        setConnectionId(res);
                        toast.success("your connection submited");
                    } else {
                        toast.error(
                            "your connection is incorrect please relogin",
                        );
                    }
                    setLoading(false);
                });
        } else {
            connection
                .invoke("ChackConnection", userId, connectionId)
                .then((res) => {
                    if (res !== null) {
                        toast.success("your connection submited");
                    } else {
                        toast.error(
                            "your connection is incorrect please relogin",
                        );
                    }
                    setLoading(false);
                });
        }
    };
    return (
        <div className={`${classes.checkUserConnection}`}>
            <button
                title="check your connection"
                onClick={handleCheck}
                className="btn  bg-transparent hw-40px">
                {loading ? (
                    <i className="spinner-border text-white-50"></i>
                ) : (
                    <i className="bi bi-check-circle text-white-50"></i>
                )}
            </button>
        </div>
    );
};

export default CheckUserConnection;
