import { useContext } from "react";
import { MainContext } from "../../../../../context/main-context";
import classes from "./burgerbtn.module.scss";

const BurgerBtn = () => {
    const {setShowBurgerMenu} = useContext(MainContext);
    return (
        <div className="m-1">
            <button
                onClick={() => setShowBurgerMenu((p) => !p)}
                className={`${classes.burgerBtn} btn btn-secondary`}>
                <i className="bi bi-list fs-large"></i>
            </button>
        </div>
    );
};

export default BurgerBtn;
