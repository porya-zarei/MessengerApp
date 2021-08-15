import {useContext} from "react";
import {ViewContext} from "../../../../../context/view-context/view-context";
import classes from "./burgerlist.module.scss";
import SettingItem from "./setting/setting-item";

const BurgerList = () => {
    const {
        setShowCreateGroup,
        setShowCreateChannel,
        setShowCreateRoom,
        setShowBurgerMenu,
        theme,
    } = useContext(ViewContext);
    return (
        <ul className={`${classes.burgerList} p-0 m-0`}>
            <li className={`${classes.burgerListItem}`}>
                <button
                    onClick={() => {
                        setShowBurgerMenu(false);
                        setShowCreateRoom(true);
                    }}
                    className="btn w-100 h-100 shadow-none"
                    style={{
                        color: theme.textGray,
                        backgroundColor: theme.dark,
                    }}>
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i style={{color:theme.text}} className="bi bi-person-fill h-100 center big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger">
                            <span className="mx-2">New Room </span>
                            
                        </div>
                    </div>
                </button>
            </li>
            <li className={`${classes.burgerListItem}`}>
                <button
                    onClick={() => {
                        setShowBurgerMenu(false);
                        setShowCreateGroup(true);
                    }}
                    className="btn w-100 h-100 shadow-none"
                    style={{
                        color: theme.textGray,
                        backgroundColor: theme.dark,
                    }}>
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i style={{color:theme.text}} className="bi bi-people-fill h-100 center big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger">
                            <span className="mx-2">New Group </span>
                            
                        </div>
                    </div>
                </button>
            </li>
            <li className={`${classes.burgerListItem}`}>
                <button
                    onClick={() => {
                        setShowBurgerMenu(false);
                        setShowCreateChannel(true);
                    }}
                    className="btn w-100 h-100 shadow-none"
                    style={{
                        color: theme.textGray,
                        backgroundColor: theme.dark,
                    }}>
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i style={{color:theme.text}} className="bi bi-megaphone-fill h-100 center big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger">
                            <span className="mx-2">New Channel </span>
                            
                        </div>
                    </div>
                </button>
            </li>
            <li className={`${classes.burgerListItem}`}>
                <SettingItem/>
            </li>
            <li className={`${classes.burgerListItem}`}>
                <button
                    className="btn w-100 h-100 shadow-none"
                    style={{
                        color: theme.textGray,
                        backgroundColor: theme.dark,
                    }}>
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i style={{color:theme.text}} className="bi bi-bookmark-fill h-100 center big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger">
                            <span className="mx-2"> Saved Messege </span>
                            
                        </div>
                    </div>
                </button>
            </li>
            <div className="h-0 p-1px bg-white mx-3"></div>
            <li className={`${classes.burgerListItem}`}>
                <button
                    className="btn w-100 h-100 shadow-none"
                    style={{
                        color: theme.textGray,
                        backgroundColor: theme.dark,
                    }}>
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i style={{color:theme.text}} className="bi bi-question-circle-fill h-100 center big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger">
                            <span className="mx-2"> About Me </span>
                            
                        </div>
                    </div>
                </button>
            </li>
            <li className={`${classes.burgerListItem}`}>
                <button
                    className="btn w-100 h-100 shadow-none"
                    style={{
                        color: theme.textGray,
                        backgroundColor: theme.dark,
                    }}>
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i style={{color:theme.text}} className="bi bi-info-circle-fill h-100 center big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger">
                            <span className="mx-2"> App Info </span>
                            
                        </div>
                    </div>
                </button>
            </li>
        </ul>
    );
};

export default BurgerList;
