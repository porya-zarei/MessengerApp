import {useContext} from "react";
import {ViewContext} from "../../../context/view-context/view-context";
import NavItem from "./nav-item/nav-item";
import classes from "./navigator.module.scss";
const Navigator = () => {
    const {setIsInChat} = useContext(ViewContext);

    const homeIcon = <i className="bi bi-house"></i>;
    const broadcastIcon = <i className="bi bi-broadcast"></i>;
    const groupIcon = <i className="bi bi-people"></i>;
    return (
        <div className="h-auto  p-0 m-0">
            <nav className={`${classes.navigator} w-100  p-0 m-0`}>
                <div className="m-0 p-1 h-100 w-100">
                    <div className="row justify-content-evenly align-items-center h-100 w-100 p-0 m-0 position-relative">
                        <NavItem name={"channels"} icon={broadcastIcon} />
                        <NavItem
                            onClick={() => {
                                setIsInChat(false);
                            }}
                            name={"home"}
                            icon={homeIcon}
                        />
                        <NavItem name={"groups"} icon={groupIcon} />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navigator;
