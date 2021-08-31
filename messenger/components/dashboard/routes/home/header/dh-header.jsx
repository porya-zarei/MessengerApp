import {useContext} from "react";
import DashboardHomeHeaderTop from "./nav/dhh-top";
import {DashboardContext} from "../../../context/dashboard-context";
const DashboardHomeHeader = () => {
    const {dashTheme: theme} = useContext(DashboardContext);
    return (
        <header
            className="h-auto w-100"
            style={{
                backgroundColor: theme.dark,
                color: theme.text,
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "10",
                boxShadow: "0px 1px 20px 0px #8080807d",
            }}>
            <DashboardHomeHeaderTop />
        </header>
    );
};

export default DashboardHomeHeader;
