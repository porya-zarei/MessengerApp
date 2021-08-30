import classes from "./dhhtop.module.scss";
import themeData from "../../../../../../data/theme.json";
const DashboardHomeHeaderTop = () => {
    const theme = themeData.darkTheme;
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
                        <img src="/assets/images/png/avatar.png" />
                    </button>
                    <div className={classes.headerItemUserName}>
                        <button
                            style={{
                                color: theme.text,
                                backgroundColor: "transparent",
                            }}
                            className={classes.headerItemUserNameBtn}>
                            Porya Zarei
                            <i className="bi-arrow-down m-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomeHeaderTop;
