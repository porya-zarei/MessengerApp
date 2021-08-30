import themeData from "../../../../../data/theme.json";
import DashboardHomeHeaderTop from "./nav/dhh-top";
const DashboardHomeHeader = () => {
    const theme = themeData.darkTheme;
    return (
        <header
            className="h-auto w-100"
            style={{
                backgroundColor: theme.darker,
                color: theme.text,
                position: "fixed",
                top: "0",
                left: "0",
                zIndex:"10"
            }}>
            <DashboardHomeHeaderTop />
        </header>
    );
};

export default DashboardHomeHeader;
