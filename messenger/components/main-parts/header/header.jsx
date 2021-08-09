import BurgerBtn from "./header-burger-menu/burger-btn/burger-btn";
import BurgerMenu from "./header-burger-menu/burger-menu";
import classes from "./header.module.scss";
import SearchInput from "./search-input/search-input";
const Header = () => {
    return (
        <div className={`${classes.header} m-0 w-100`}>
            <BurgerMenu />
            <div className="p-0 m-0 w-100">
                <div className="row d-inline-flex w-100 h-100 align-items-center">
                    <div
                        className={`${classes.burgerBtnContainer} col-3 p-0 h-100 center`}>
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
