import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../../../context/view-context/view-context";
import {fetcher} from "../../../../../../../hooks/fetcher";
import UserItem from "../../user-item/user-item";
import classes from "./grusershandle.module.scss";

const GrUsersHandle = () => {
    const [users, setUsers] = useState([]);
    const {chatsToShow,theme} = useContext(ViewContext);
    const {token} = useContext(UserContext);
    useEffect(() => {
        const data = {
            Id: chatsToShow.Id,
        };
        fetcher("POST", "Groups/GetGroupUsers", data, token)
            .then((r) => r)
            .then(({result, error, isError}) => {
                console.log(
                    "result in get users for admin => ",
                    result,
                    error,
                    isError,
                    data,
                    token
                );
                if (!isError) {
                    setUsers(result);
                }
            });
    }, [token]);
    return users.length > 0 ? (
        <div
            className={classes.handleUsersContainer}
            style={{backgroundColor: theme.darker, color: theme.text}}>
            <div className={classes.handleUsersTitle}>Handle Users</div>
            <div className={classes.handleUsers}>
                <ul className={classes.usersList}>
                    {users.map((user) => (
                        <li key={user.UserID} className={classes.usersListItem}>
                            <UserItem
                                id={chatsToShow.Id}
                                setUsers={setUsers}
                                token={token}
                                type={chatsToShow.type}
                                user={user}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <div className="center">premission denied</div>
    );
};

export default GrUsersHandle;
