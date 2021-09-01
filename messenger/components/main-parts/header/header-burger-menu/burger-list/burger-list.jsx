import {useContext, useMemo} from "react";
import {ViewContext} from "../../../../../context/view-context/view-context";
import classes from "./burgerlist.module.scss";
import SettingItem from "./setting/setting-item";
import Link from "next/link";

const BurgerList = () => {

    const {
        setShowCreateGroup,
        setShowCreateChannel,
        setShowCreateRoom,
        setShowBurgerMenu,
        theme,
    } = useContext(ViewContext);

    const burgerListItems = useMemo(
        () => [
            {
                btnStyle: {
                    color: theme.textGray,
                    backgroundColor: theme.dark,
                },
                btnOnClick: () => {
                    setShowBurgerMenu(false);
                    setShowCreateRoom(true);
                },
                iconStyle: {color: theme.text},
                iconClass: "bi bi-person-fill h-100 center big-icon",
                name: "New Room",
            },
            {
                btnStyle: {
                    color: theme.textGray,
                    backgroundColor: theme.dark,
                },
                btnOnClick: () => {
                    setShowBurgerMenu(false);
                    setShowCreateGroup(true);
                },
                iconStyle: {color: theme.text},
                iconClass: "bi bi-people-fill h-100 center big-icon",
                name: "New Group",
            },
            {
                btnStyle: {
                    color: theme.textGray,
                    backgroundColor: theme.dark,
                },
                btnOnClick: () => {
                    setShowBurgerMenu(false);
                    setShowCreateChannel(true);
                },
                iconStyle: {color: theme.text},
                iconClass: "bi bi-megaphone-fill h-100 center big-icon",
                name: "New Channel",
            },
            {
                btnStyle: {
                    color: theme.textGray,
                    backgroundColor: theme.dark,
                },
                btnOnClick: () => {},
                iconStyle: {color: theme.text},
                iconClass: "bi bi-bookmark-fill h-100 center big-icon",
                name: "Saved Messages",
            },
            {
                btnStyle: {
                    color: theme.textGray,
                    backgroundColor: theme.dark,
                },
                btnOnClick: () => {},
                iconStyle: {color: theme.text},
                iconClass: "bi bi-question-circle-fill h-100 center big-icon",
                name: "About Me",
            },
        ],
        [theme],
    );
    return (
        <ul className={`${classes.burgerList} p-0 m-0`}>
            {burgerListItems.map((cr, i) => (
                <li key={i} className={`${classes.burgerListItem}`}>
                    <button
                        onClick={cr.btnOnClick}
                        className="btn w-100 h-100 shadow-none"
                        style={cr.btnStyle}>
                        <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                            <div className="col-2 center h-100">
                                <i
                                    style={cr.iconStyle}
                                    className={cr.iconClass}></i>
                            </div>
                            <div className="col-10 d-flex align-items-center fs-larger">
                                <span className="mx-2">{cr.name}</span>
                            </div>
                        </div>
                    </button>
                </li>
            ))}
            <li className={`${classes.burgerListItem}`}>
                <SettingItem />
            </li>
            <li className={`${classes.burgerListItem}`}>
                <Link href="/Dashboard">
                    <a
                        className="btn w-100 h-100 shadow-none"
                        style={{
                            color: theme.textGray,
                            backgroundColor: theme.dark,
                        }}>
                        <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                            <div className="col-2 center h-100">
                                <i
                                    style={{color: theme.text}}
                                    className="bi-list-task h-100 center big-icon"></i>
                            </div>
                            <div className="col-10 d-flex align-items-center fs-larger">
                                <span className="mx-2"> Dashboard </span>
                            </div>
                        </div>
                    </a>
                </Link>
            </li>
        </ul>
    );
};

export default BurgerList;
