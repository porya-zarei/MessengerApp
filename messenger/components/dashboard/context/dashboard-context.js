import {createContext, useMemo, useState} from "react";
import themeData from "../../../data/theme.json";

export const DashboardContext = createContext({
    allData: {
        Channels: [{}],
        Groups: [{}],
        Rooms: [{}],
        Users: [{}],
    },
    changeAllData: () => {},
    admin: {
        FirstName: "",
        LastName: "",
        UserID: "",
        Description: "",
        UserName: "",
        ProfileImage: "",
    },
    changeAdmin: () => {},
    dashTheme: {
        name: "dark",
        light: "#DDDDDD",
        primary: "#30475E",
        primarier: "#0A043C",
        primaryLight: "#1c6ce3",
        dark: "#222831",
        darker: "#171717",
        danger: "#F05454",
        warning: "#FFD369",
        info: "#03506F",
        textGray: "#C4BBF0",
        text: "#F5EDED",
        textDark: "#151515",
        bubble1: "#577399",
        bubble2: "#495867",
    },
    changeDashTheme: () => {},
    asideIsOpen: false,
    toggleAside: () => {},
    currentTab: "",
    changeCurrentTab: (tabName = "") => {},
});

const DashboardContextProvider = ({children, data, adminData}) => {
    const [allData, setAllData] = useState(data);
    const [admin, setAdmin] = useState(adminData);
    const [dashThem, setDashTheme] = useState(themeData.darkTheme);
    const dashTheme = useMemo(() => themeData.darkTheme, [dashThem]);
    const [asideIsOpen, setAsideIsOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState("home");
    const toggleAside = (flag) => {
        // if (flag !== undefined && flag !== null) {
        //     setAsideIsOpen(flag);
        // } else {
        setAsideIsOpen((p) => !p);
        // }
    };
    const changeAllData = (d) => {
        setAllData(d);
    };

    const changeAdmin = (d) => {
        setAdmin(d);
    };
    const changeDashTheme = (d) => {
        setDashTheme(d);
    };

    const changeCurrentTab = (tabName) => {
        setCurrentTab(tabName);
    };

    const context = {
        allData,
        admin,
        dashTheme,
        changeAllData,
        changeAdmin,
        changeDashTheme,
        asideIsOpen,
        toggleAside,
        currentTab,
        changeCurrentTab,
    };

    return (
        <DashboardContext.Provider value={context}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardContextProvider;
