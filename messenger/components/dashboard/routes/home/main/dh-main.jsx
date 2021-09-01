import DashboardHomeMainAside from "./aside/dhm-aside";
import DashboardHomeMainContent from "./content/dhm-content";
import {DashboardContext} from '../../../context/dashboard-context'
import themeData from "../../../../../data/theme.json";
import { useContext } from "react";

const DashboardHomeMain = () => {
    const {
        dashTheme: theme,
    } = useContext(DashboardContext);
   
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
            <DashboardHomeMainAside />
            <DashboardHomeMainContent />
        </main>
    );
};

export default DashboardHomeMain;
