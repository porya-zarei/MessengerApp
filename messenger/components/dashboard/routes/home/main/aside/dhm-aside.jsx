import classes from "./dhmaside.module.scss";
import {AnimatePresence, motion} from "framer-motion";
const DashboardHomeMainAside = ({asideIsOpen,toggleAside}) => {
    return (
        <section
            className={`${classes.asideContainer} ${
                asideIsOpen ? classes.asideIsOpen : classes.asideIsClose
            }`}>
            <AnimatePresence>
                <motion.aside className={classes.aside}>
                    <div className={classes.asideToggleBtnContainer}>
                        <button
                            onClick={toggleAside}
                            className={classes.asideToggleBtn}>
                            <i className="bi-list"></i>
                        </button>
                    </div>
                    <div className={classes.navContainer}>
                        <nav className={classes.nav}>
                            <div className={classes.navItemBtnContainer}>
                                <button className={classes.navItemBtn}>
                                    <i className="bi-grid"></i>
                                </button>
                            </div>
                            <div className={classes.navItemBtnContainer}>
                                <button className={classes.navItemBtn}>
                                    <i className="bi-grid"></i>
                                </button>
                            </div>
                            <div className={classes.navItemBtnContainer}>
                                <button className={classes.navItemBtn}>
                                    <i className="bi-grid"></i>
                                </button>
                            </div>
                            <div className={classes.navItemBtnContainer}>
                                <button className={classes.navItemBtn}>
                                    <i className="bi-grid"></i>
                                </button>
                            </div>
                            <div className={classes.navItemBtnContainer}>
                                <button className={classes.navItemBtn}>
                                    <i className="bi-grid"></i>
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
