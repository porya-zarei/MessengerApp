import classes from "./dhmaside.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import themeData from "../../../../../../data/theme.json";
const DashboardHomeMainAside = ({asideIsOpen, toggleAside}) => {
    const theme = themeData.darkTheme;
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
                            <div className={classes.navItemBtnContainer}>
                                <button
                                    style={{
                                        color: theme.text,
                                    }}
                                    className={classes.navItemBtn}>
                                    <i className="bi-grid mx-2 center"></i>
                                    {asideIsOpen && (
                                        <div className={classes.navItemBtnText}>
                                            btn text
                                        </div>
                                    )}
                                </button>
                            </div>
                            <div className={classes.navItemBtnContainer}>
                                <button
                                    style={{
                                        color: theme.text,
                                    }}
                                    className={classes.navItemBtn}>
                                    <i className="bi-grid mx-2 center"></i>
                                    {asideIsOpen && (
                                        <div className={classes.navItemBtnText}>
                                            btn text
                                        </div>
                                    )}
                                </button>
                            </div>
                            <div className={classes.navItemBtnContainer}>
                                <button
                                    style={{
                                        color: theme.text,
                                    }}
                                    className={classes.navItemBtn}>
                                    <i className="bi-grid mx-2 center"></i>
                                    {asideIsOpen && (
                                        <div className={classes.navItemBtnText}>
                                            btn text
                                        </div>
                                    )}
                                </button>
                            </div>
                            <div className={classes.navItemBtnContainer}>
                                <button
                                    style={{
                                        color: theme.text,
                                    }}
                                    className={classes.navItemBtn}>
                                    <i className="bi-grid mx-2 center"></i>
                                    {asideIsOpen && (
                                        <div className={classes.navItemBtnText}>
                                            btn text
                                        </div>
                                    )}
                                </button>
                            </div>
                            <div className={classes.navItemBtnContainer}>
                                <button
                                    style={{
                                        color: theme.text,
                                    }}
                                    className={classes.navItemBtn}>
                                    <i className="bi-grid mx-2 center"></i>
                                    {asideIsOpen && (
                                        <div className={classes.navItemBtnText}>
                                            btn text
                                        </div>
                                    )}
                                </button>
                            </div>
                        </nav>
                    </div>
                </motion.aside>
            </AnimatePresence>
        </section>
    );
};

export default DashboardHomeMainAside;
