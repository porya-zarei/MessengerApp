import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {UserContext} from "../../../context/user-context/user-context";
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
        illuColors: ["#6e6eff", "#3f3d56"],
    },
    changeDashTheme: () => {},
    asideIsOpen: false,
    toggleAside: () => {},
    currentTab: "",
    changeCurrentTab: (tabName = "") => {},
    tasks: [
        {
            Content: "",
            FinishDate: "",
            Finished: false,
            ForWhoID: "",
            ForWhoName: "user1 user1",
            SenderID: "",
            SenderName: "",
            StartDate: "",
            StatusColor: "",
            TaskID: "",
            Title: "",
        },
    ],
    changeTasks: (newTasks, newTask, updateTask, taskId) => {},
    dashToken: "",
    changeDashToken: () => {},
});

const DashboardContextProvider = ({
    children,
    data,
    adminData,
    allTasks,
    token,
}) => {
    const {connection} = useContext(UserContext);
    const [allData, setAllData] = useState(data);
    const [admin, setAdmin] = useState(adminData);
    const [tasks, setTasks] = useState(allTasks);
    const [dashThem, setDashTheme] = useState(themeData.darkTheme);
    const dashTheme = useMemo(() => themeData.darkTheme, [dashThem]);
    const [asideIsOpen, setAsideIsOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState("home");
    const [dashToken, setDashToken] = useState(token);
    const changeDashToken = (tkn) => {
        setDashToken(tkn);
    };
    const changeTasks = (type = "set", data) => {
        console.log("in change tasks => ", type, data);
        if (type === "set") {
            setTasks(data);
        } else if (type === "update-task") {
            const otherTasks = [
                ...tasks.filter((task) => task.TaskID !== data.TaskID),
            ];
            otherTasks.push(data);
            setTasks(otherTasks);
        } else if (type === "add-task") {
            setTasks((p) => [...p, data]);
        } else if (type === "delete-task") {
            const otherTasks = [
                ...tasks.filter((task) => task.TaskID !== data),
            ];
            setTasks(otherTasks);
        } else {
            console.log("nothing in change tasks");
        }
    };
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
        tasks,
        changeTasks,
        dashToken,
        changeDashToken,
    };

    useEffect(() => {
        connection?.on("TaskCreated", (newTask) => {
            changeTasks("add-task", newTask);
        });
        connection?.on("TaskUpdated", (updateTask) => {
            console.log("in update task => ");
            changeTasks("update-task", updateTask);
        });
        connection?.on("GetAllTasks", (allTasks) => {
            changeTasks("set", allTasks);
        });
        connection?.on("TaskDeleted", (taskId) => {
            changeTasks("delete-task", taskId);
        });
    }, [connection]);

    return (
        <DashboardContext.Provider value={context}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardContextProvider;
