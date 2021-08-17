import { useContext, useMemo } from "react";
import { ViewContext } from "../../../context/view-context/view-context";
import BurgerBtn from "./header-burger-menu/burger-btn/burger-btn";
import BurgerMenu from "./header-burger-menu/burger-menu";
import classes from "./header.module.scss";
import SearchInput from "./search-input/search-input";


const Header = () => {
    
    const {theme} = useContext(ViewContext);

    return (
        <div
            className={`${classes.header} m-0 w-100`}
            style={{
                backgroundColor: theme.dark,
                borderBottomColor: theme.textGray,
            }}>
            <BurgerMenu />
            <div className="p-0 m-0 w-100">
                <div className="row d-inline-flex w-100 h-100 align-items-center">
                    <div className={`col-3 p-0 h-100 center`}>
                        <BurgerBtn />
                    </div>
                    <div className="col-9 my-auto p-0 h-100">
                        <SearchInput />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
