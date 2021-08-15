import {motion, useMotionValue, AnimatePresence} from "framer-motion";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import classes from "./burgermenu.module.scss";
import BurgerCard from "./burger-card/burger-card";
import BurgerList from "./burger-list/burger-list";
import EditUser from "./burger-edit-user/burger-edit-user";
import {ViewContext} from "../../../../context/view-context/view-context";
const BurgerMenu = () => {
    const constraintsRef = useRef(null);
    const burger = useRef(null);
    const {showBurgerMenu, setShowBurgerMenu, theme} = useContext(ViewContext);
    const xPosition = useMotionValue(0);

    const handleShowNavbar = useCallback(() => {
        setShowBurgerMenu((p) => !p);
    }, []);

    const handleDragEnd = () => {
        if (xPosition.get() < -50) {
            handleShowNavbar();
        }
    };
    const handleMainContainerClick = useCallback((event) => {
        if (event.target.id === "mainContainerInNavbar") {
            handleShowNavbar();
        }
    }, []);

    useEffect(() => {}, []);

    return (
        <motion.div
            id="mainContainerInNavbar"
            className={`${classes.burgerMenuContainer}`}
            ref={constraintsRef}
            style={{display: showBurgerMenu ? "block" : "none"}}
            onClick={handleMainContainerClick}>
            <AnimatePresence>
                <motion.div
                    className={`${classes.burgerMenu}`}
                    ref={burger}
                    drag="x"
                    style={{transformOrigin: "left"}}
                    dragConstraints={{left: 0, right: 0}}
                    style={{x: xPosition, backgroundColor: theme.dark}}
                    onDragEnd={handleDragEnd}
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    exit={{scaleX: 0}}
                    transition={{
                        duration: 0.5,
                        easings: "easeInOut",
                    }}>
                    <div className="p-0 m-0">
                        <BurgerCard />
                        <EditUser />
                        <BurgerList />
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default BurgerMenu;
