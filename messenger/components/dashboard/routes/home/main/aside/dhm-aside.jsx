import classes from "./dhmaside.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import themeData from "../../../../../../data/theme.json";
import {useContext, useMemo, useState} from "react";
import {DashboardContext} from "../../../../context/dashboard-context";
const DashboardHomeMainAside = () => {
    const {
        dashTheme: theme,
        asideIsOpen,
        toggleAside,
        changeCurrentTab,
    } = useContext(DashboardContext);

    const tabsBtn = useMemo(
        () => [
            {
                iconClass: "bi-house mx-2 center",
                iconStyle: {color: theme.text},
                btnStyle: {color: theme.text},
                btnOnClick: () => {
                    changeCurrentTab("home");
                },
                name: "Home Tab",
            },
            {
                iconClass: "bi-gear mx-2 center",
                iconStyle: {color: theme.text},
                btnStyle: {color: theme.text},
                btnOnClick: () => {
                    changeCurrentTab("setting");
                },
                name: "Setting Tab",
            },
            {
                iconClass: "bi-question mx-2 center",
                iconStyle: {color: theme.text},
                btnStyle: {color: theme.text},
                btnOnClick: () => {},
                name: "Test Tab",
            },
            {
                iconClass: "bi-question mx-2 center",
                iconStyle: {color: theme.text},
                btnStyle: {color: theme.text},
                btnOnClick: () => {},
                name: "Test Tab",
            },
            {
                iconClass: "bi-question mx-2 center",
                iconStyle: {color: theme.text},
                btnStyle: {color: theme.text},
                btnOnClick: () => {},
                name: "Test Tab",
            },
            {
                iconClass: "bi-question mx-2 center",
                iconStyle: {color: theme.text},
                btnStyle: {color: theme.text},
                btnOnClick: () => {},
                name: "Test Tab",
            },
        ],
        [],
    );

    return (
        <section
            className={`${classes.asideContainer} ${
                asideIsOpen ? classes.asideIsOpen : classes.asideIsClose
            }`}
            style={{
                backgroundColor: theme.dark,
                color: theme.text,
            }}>
            <AnimatePresence>
                <motion.aside className={classes.aside}>
                    <div className={classes.asideToggleBtnContainer}>
                        <button
                            style={{
                                color: theme.text,
                            }}
                            onClick={toggleAside}
                            className={classes.asideToggleBtn}>
                            <i className="bi-list"></i>
                        </button>
                    </div>
                    <div className={classes.navContainer}>
                        <nav className={classes.nav}>
                            {tabsBtn.map((btn) => (
                                <div className={classes.navItemBtnContainer}>
                                    <button
                                        style={btn.btnStyle}
                                        onClick={btn.btnOnClick}
                                        className={classes.navItemBtn}>
                                        <i className={btn.iconClass}></i>
                                        {asideIsOpen && (
                                            <div
                                                className={
                                                    classes.navItemBtnText
                                                }>
                                                {btn.name}
                                            </div>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </nav>
                    </div>
                </motion.aside>
            </AnimatePresence>
        </section>
    );
};

export default DashboardHomeMainAside;
