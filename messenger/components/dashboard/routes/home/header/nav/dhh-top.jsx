import classes from "./dhhtop.module.scss";
import {useContext} from "react";
import {DashboardContext} from "../../../../context/dashboard-context";
import { files_url } from "../../../../../../configs/configs";
const DashboardHomeHeaderTop = () => {
    const {dashTheme: theme, admin} = useContext(DashboardContext);
    return (
        <div className={classes.headerContainer}>
            <div className={classes.header}>
                <div className={classes.headerItemTitleContainer}>
                    <button
                        style={{
                            color: theme.textGray,
                            backgroundColor: "transparent",
                        }}
                        className={classes.headerItemTitle}>
                        PZE Messenger
                    </button>
                </div>
                <div className={classes.headerItemBtnContainer}>
                    <button
                        style={{
                            color: theme.text,
                            backgroundColor: "transparent",
                        }}
                        className={classes.headerItemBtn}>
                        <i className="bi-grid"></i>
                    </button>
                </div>
                <div className={classes.headerItemBtnContainer}>
                    <button
                        style={{
                            color: theme.text,
                            backgroundColor: "transparent",
                        }}
                        className={classes.headerItemBtn}>
                        <i className="bi-bell"></i>
                    </button>
                </div>
                <div className={classes.headerItemUserDetailContainer}>
                    <button
                        style={{
                            color: theme.text,
                            backgroundColor: "transparent",
                        }}
                        className={classes.headerItemUserImage}>
                        <img
                            src={
                                admin?.ProfileImage
                                    ? `${files_url}/images/profiles/${admin.ProfileImage}`
                                    : "/assets/images/png/avatar.png"
                            }
                        />
                    </button>
                    <div className={classes.headerItemUserName}>
                        <button
                            style={{
                                color: theme.text,
                                backgroundColor: "transparent",
                            }}
                            className={classes.headerItemUserNameBtn}>
                            {admin?.FirstName + " " + admin?.LastName}
                            <i className="bi-arrow-down m-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomeHeaderTop;
