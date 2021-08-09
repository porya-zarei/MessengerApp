import {useContext} from "react";
import {UserContext} from "../../../context/user-context/user-context";
import Header from "../../main-parts/header/header";

const HeaderLayout = () => {
    const {isLoged} = useContext(UserContext);
    return (
        <header
            style={{zIndex: "1050", position: "fixed", top: "0", left: "0"}}
            className="p-0 bg-dark h-auto w-100 text-white-50">
            {isLoged ? <Header /> : null}
        </header>
    );
};

export default HeaderLayout;
