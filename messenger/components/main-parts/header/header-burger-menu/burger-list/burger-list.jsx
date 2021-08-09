import {useContext} from "react";
import {MainContext} from "../../../../../context/main-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import classes from "./burgerlist.module.scss";

const BurgerList = () => {
    const {setShowCreateGroup, setShowCreateChannel, setShowCreateRoom} =
        useContext(ViewContext);
    const {showBurgerMenu, setShowBurgerMenu} = useContext(MainContext);
    return (
        <ul className={`${classes.burgerList} p-0 m-0 text-white-50`}>
            <li className={`${classes.burgerListItem}`}>
                <button
                    onClick={() => {
                        setShowBurgerMenu(false);
                        setShowCreateRoom(true);
                    }}
                    className="btn btn-outline-dark w-100 h-100">
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i className="bi bi-broadcast h-100 center big-icon text-white-50"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger text-white">
                            <span className="mx-2">New Room </span>
                            <i className="bi bi-arrow-bar-right"></i>
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
                    className="btn btn-outline-dark w-100 h-100">
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i className="bi bi-people h-100 center big-icon text-white-50"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger text-white">
                            <span className="mx-2">New Group </span>
                            <i className="bi bi-arrow-bar-right"></i>
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
                    className="btn btn-outline-dark w-100 h-100">
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i className="bi bi-broadcast h-100 center big-icon text-white-50"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger text-white">
                            <span className="mx-2">New Channel </span>
                            <i className="bi bi-arrow-bar-right"></i>
                        </div>
                    </div>
                </button>
            </li>
            <li className={`${classes.burgerListItem}`}>
                <button className="btn btn-outline-dark w-100 h-100">
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i className="bi bi-gear h-100 center text-white-50 big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger text-white">
                            <span className="mx-2"> Setting </span>
                            <i className="bi bi-arrow-bar-right"></i>
                        </div>
                    </div>
                </button>
            </li>
            <li className={`${classes.burgerListItem}`}>
                <button className="btn btn-outline-dark w-100 h-100">
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i className="bi bi-bookmark h-100 center big-icon text-white-50"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger text-white">
                            <span className="mx-2"> Saved Messege </span>
                            <i className="bi bi-arrow-bar-right"></i>
                        </div>
                    </div>
                </button>
            </li>
            <div className="h-0 p-1px bg-white mx-3"></div>
            <li className={`${classes.burgerListItem}`}>
                <button className="btn btn-outline-dark w-100 h-100">
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i className="bi bi-question-circle h-100 center text-white-50 big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger text-white">
                            <span className="mx-2"> About Me </span>
                            <i className="bi bi-arrow-bar-right"></i>
                        </div>
                    </div>
                </button>
            </li>
            <li className={`${classes.burgerListItem}`}>
                <button className="btn btn-outline-dark w-100 h-100">
                    <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                        <div className="col-2 center h-100">
                            <i className="bi bi-info-circle h-100 center text-white-50 big-icon"></i>
                        </div>
                        <div className="col-10 d-flex align-items-center fs-larger text-white">
                            <span className="mx-2"> App Info </span>
                            <i className="bi bi-arrow-bar-right"></i>
                        </div>
                    </div>
                </button>
            </li>
        </ul>
    );
};

export default BurgerList;
