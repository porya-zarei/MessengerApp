import { useContext } from "react";
import { ViewContext } from "../../../../../context/view-context/view-context";
import classes from "./burgerbtn.module.scss";

const BurgerBtn = () => {
    const {setShowBurgerMenu,theme} = useContext(ViewContext);
    return (
        <div className="m-1">
            <button
                onClick={() => setShowBurgerMenu((p) => !p)}
                className={`${classes.burgerBtn} btn`} style={{backgroundColor:theme.primary,color:theme.textGray}}>
                <i className="bi bi-list fs-large"></i>
            </button>
        </div>
    );
};

export default BurgerBtn;
