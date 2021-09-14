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
    boardUsers: [
        {
            UserID: "",
            ConnectionID: "",
            MousePoint: {X: 0.0, Y: 0.0},
            FullName: "",
        },
    ],
    changeBoardUsers: (type = "", changeData) => {},
    handleJoinBoard: async () => {},
    handleLeaveBoard: () => {},
    handleMoveMouseOnBoard: (x = 0, y = 0) => {},
    boardElements: [
        {
            ElementID: "",
            Type: 0,
            Content: "",
            Color: "",
            Position: {X: 0.0, Y: 0.0},
            Height: 0.0,
            Width: 0.0,
            R: 0.0,
        },
    ],
    changeBoardElements: (type = "", data) => {},
    handleCreateElement: (
        element = {
            ElementID: "",
            Type: 0,
            Content: "",
            Color: "",
            Position: {X: 0.0, Y: 0.0},
            Height: 0.0,
            Width: 0.0,
            R: 0.0,
        },
    ) => {},
    handleDragElement: (elementId, x, y) => {},
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
    const [boardUsers, setBoardUsers] = useState([{}]);
    const [boardElements, setBoardElements] = useState([{}]);

    const changeBoardElements = (tyoe = "", data) => {
        if (type === "set") {
            setBoardElements(data);
        } else {
        }
    };

    const changeBoardUsers = (type = "set", changeData) => {
        if (type == "set") {
            setBoardUsers(changeData);
        } else {
            console.log("nothing in set boardusers");
        }
    };
    const changeDashToken = (tkn) => {
        setDashToken(tkn);
    };
    const changeTasks = (type = "set", changeData) => {
        console.log("in change tasks => ", type, changeData);
        if (type === "set") {
            setTasks(changeData);
        } else if (type === "update-task") {
            const otherTasks = [
                ...tasks.filter((task) => task.TaskID !== changeData.TaskID),
            ];
            otherTasks.push(changeData);
            setTasks(otherTasks);
        } else if (type === "add-task") {
            setTasks((p) => [...p, changeData]);
        } else if (type === "delete-task") {
            const otherTasks = [
                ...tasks.filter((task) => task.TaskID !== changeData),
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

    const handleJoinBoard = async () => {
        await connection.invoke("UserJoinBoard", admin.UserID);
    };
    const handleLeaveBoard = () => {
        connection.send("UserLeaveBoard", admin.UserID);
    };
    const handleMoveMouseOnBoard = (x, y) => {
        connection.send("UserMoveMouseOnBoard", admin.UserID, {X: x, Y: y});
    };

    const handleCreateElement = (element) => {
        connection.send("CreateBoardElement", element);
    };

    const handleDragElement = (elementId, x, y) => {
        connection.send("UserMoveElementOnBoard", elementId, {X: x, Y: y});
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
        boardUsers,
        changeBoardUsers,
        handleJoinBoard,
        handleLeaveBoard,
        handleMoveMouseOnBoard,
        boardElements,
        changeBoardElements,
        handleCreateElement,
        handleDragElement,
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
        connection?.on("GetAllBoardUsers", (allBoardUsers) => {
            setBoardUsers(allBoardUsers);
        });
        connection?.on("GetAllBoardElements", (AllBoardElements) => {
            console.log("in get all board elements => ", AllBoardElements);
            setBoardElements(AllBoardElements);
        });
        connection?.invoke("SendBoardElementsToUser").then((dt) => {
            console.log("all elmnt => ", dt);
            setBoardElements(dt);
        });
    }, [connection]);

    return (
        <DashboardContext.Provider value={context}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardContextProvider;
