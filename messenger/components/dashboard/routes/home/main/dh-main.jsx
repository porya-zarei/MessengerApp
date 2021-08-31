import DashboardHomeMainAside from "./aside/dhm-aside";
import DashboardHomeMainContent from "./content/dhm-content";
import themeData from "../../../../../data/theme.json";
import { useState } from "react";

const DashboardHomeMain = () => {
    const theme = themeData.darkTheme;
    const [asideIsOpen, setAsideIsOpen] = useState(false);
    const toggleAside = (flag) => {
        // if (flag !== undefined && flag !== null) {
        //     setAsideIsOpen(flag);
        // } else {
            setAsideIsOpen((p) => !p);
        // }
    };
    return (
        <main
            style={{
                backgroundColor: theme.darker,
                color: theme.text,
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "nowrap",
                zIndex: "0",
                overflow:"hidden"
            }}>
            <DashboardHomeMainAside asideIsOpen={asideIsOpen} toggleAside={toggleAside} />
            <DashboardHomeMainContent asideIsOpen={asideIsOpen} />
        </main>
    );
};

export default DashboardHomeMain;
