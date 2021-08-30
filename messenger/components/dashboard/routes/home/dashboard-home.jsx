import { useContext, useRef, useState } from "react";
import {Doughnut} from "react-chartjs-2";
import { ViewContext } from "../../../../context/view-context/view-context";
import themeData from "../../../../data/theme.json";
import DashboardHomeFooter from "./footer/dh-footer";
import DashboardHomeHeader from "./header/dh-header";
import DashboardHomeMain from "./main/dh-main";

const DashboardHome = () => {
    const theme = themeData.darkTheme;
    return (
        <section className="h-auto w-100" style={{backgroundColor:theme.darker,color:theme.text}}>
            <DashboardHomeHeader/>
            <DashboardHomeMain/>
            <DashboardHomeFooter/>
        </section>
    );
};

export default DashboardHome;
