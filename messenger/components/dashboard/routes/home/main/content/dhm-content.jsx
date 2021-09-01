import classes from "./dhmcontent.module.scss";
import SimpleCard from "../../parts/simple-card";
import ListCard from "../../parts/list-card/list-card";
import AnalyzeChart from "../../parts/analyze-chart";
import {useContext, useMemo, useState} from "react";
import {DashboardContext} from "../../../../context/dashboard-context";
import HomeTab from "./home-tab/home-tab";
import SettingTab from "./setting-tab/setting-tab";
const DashboardHomeMainContent = () => {
    
    const {
        dashTheme: theme,
        asideIsOpen,
        currentTab,
    } = useContext(DashboardContext);

    let openTab = useMemo(() => {
        switch (currentTab) {
            case "home":
                return <HomeTab />;
            case "setting":
                return <SettingTab />;
            default:
                return <HomeTab />;
        }
    }, [currentTab]);

    return (
        <section
            style={{
                color: theme.text,
                backgroundColor: theme.darker,
            }}
            className={`${classes.contentSection} ${
                asideIsOpen
                    ? classes.contentAsideIsOpen
                    : classes.contentAsideIsClose
            }`}>
            <div
                style={{
                    color: theme.text,
                    backgroundColor: theme.darker,
                }}
                className={classes.contentsContainer}>
                {openTab}
            </div>
        </section>
    );
};

export default DashboardHomeMainContent;
