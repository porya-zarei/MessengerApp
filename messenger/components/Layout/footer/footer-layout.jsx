import { useContext } from "react";
import { UserContext } from "../../../context/user-context/user-context";
import Navigator from "../../main-parts/navigator/navigator";
import classes from './footer.module.scss'

const FooterLayout = () => {
    const {isLoged} = useContext(UserContext);
    return (
        <footer className={`${classes.displayOnHover} fixed-bottom text-white-50 w-100 p-0 m-0`}>
            {isLoged ? <Navigator /> : null}
        </footer>
    );
};

export default FooterLayout;
