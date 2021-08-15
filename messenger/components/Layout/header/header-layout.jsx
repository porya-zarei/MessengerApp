import {useContext} from "react";
import {UserContext} from "../../../context/user-context/user-context";
import Header from "../../main-parts/header/header";

const HeaderLayout = () => {
    return (
        <header
            style={{zIndex: "1050", position: "fixed", top: "0", left: "0"}}
            className="p-0 h-auto w-100">
            <Header />
        </header>
    );
};

export default HeaderLayout;
