import {motion, useMotionValue, AnimatePresence} from "framer-motion";
import {useContext, useEffect, useRef, useState} from "react";
import {MainContext} from "../../../../context/main-context";
import classes from "./burgermenu.module.scss";
import BurgerCard from "./burger-card/burger-card";
import BurgerList from "./burger-list/burger-list";
import EditUser from "./burger-edit-user/burger-edit-user";
const BurgerMenu = () => {
    const constraintsRef = useRef(null);
    const burger = useRef(null);
    const {showBurgerMenu, setShowBurgerMenu} = useContext(MainContext);
    const xPosition = useMotionValue(0);

    const handleShowNavbar = () => {
        setShowBurgerMenu((p) => !p);
    };

    const handleDragEnd = () => {
        if (xPosition.get() < -50) {
            handleShowNavbar();
        }
    };
    const handleMainContainerClick = (event) => {
        if (event.target.id === "mainContainerInNavbar") {
            handleShowNavbar();
        }
    };
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
                    style={{x: xPosition}}
                    onDragEnd={handleDragEnd}
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    exit={{scaleX: 0}}
                    transition={{
                        duration: 0.5,
                        easings: "easeInOut",
                    }}>
                    <div className="p-0 m-0">
                        <BurgerCard/>
                        <EditUser/>
                        <BurgerList/>
                        
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default BurgerMenu;