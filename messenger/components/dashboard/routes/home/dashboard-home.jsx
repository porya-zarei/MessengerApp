import themeData from "../../../../data/theme.json";
import DashboardContextProvider from "../../context/dashboard-context";
import DashboardHomeFooter from "./footer/dh-footer";
import DashboardHomeHeader from "./header/dh-header";
import DashboardHomeMain from "./main/dh-main";

const DashboardHome = () => {
    const theme = themeData.darkTheme;
    return (
        
            <section
                className="w-100"
                style={{
                    backgroundColor: theme.darker,
                    color: theme.text,
                    height: "100vh",
                }}>
                <DashboardHomeHeader />
                <DashboardHomeMain />
                {/* <DashboardHomeFooter /> */}
            </section>
    );
};

export default DashboardHome;
