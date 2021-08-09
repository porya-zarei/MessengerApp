import {useContext, useEffect} from "react";
import {MainContext} from "../../context/main-context";

const OnlineUsersView = () => {
    const {onlineUsers} = useContext(MainContext);
    useEffect(() => {}, []);

    return <div>{onlineUsers}</div>;
};

export default OnlineUsersView;
