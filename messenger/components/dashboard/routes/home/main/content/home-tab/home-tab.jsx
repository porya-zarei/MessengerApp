import {useContext, useMemo, useState} from "react";
import {DashboardContext} from "../../../../../context/dashboard-context";
import AnalyzeChart from "../../../parts/analyze-chart";
import ListCard from "../../../parts/list-card/list-card";
import SimpleCard from "../../../parts/simple-card";
import classes from "./hometab.module.scss";
const HomeTab = () => {
    const {dashTheme: theme, allData} = useContext(DashboardContext);

    const [listData, setListData] = useState({
        title: "",
        data: [{}],
    });

    const [showListData, setShowListData] = useState(false);

    const changeListData = (name) => {
        switch (name) {
            case "rooms":
                setListData({
                    title: "Rooms",
                    data: allData?.Rooms?.map((ro) => ({
                        iconClass: "bi-person-square",
                        iconColor: "primary",
                        title: ro?.SenderName + " | " + ro?.ReceiverName,
                        details: [
                            ro?.SenderUserID + " | " + ro?.ReceiverUserID,
                            ro?.RoomID,
                        ],
                        time: ro?.CreateDate,
                        iconClick: () => {},
                    })),
                });
                break;
            case "groups":
                setListData({
                    title: "Groups",
                    data: allData?.Groups?.map((gr) => ({
                        iconClass: "bi-people",
                        iconColor: "danger",
                        title: gr?.Name + " | " + "@" + gr?.GroupUserName,
                        details: [gr?.GroupDescription, gr?.GroupID],
                        time: "@" + gr?.GroupUserName,
                        iconClick: () => {},
                    })),
                });
                break;
            case "channels":
                setListData({
                    title: "Channels",
                    data: allData?.Channels?.map((ch) => ({
                        iconClass: "bi-megaphone",
                        iconColor: "info",
                        title: ch?.Name + " | " + "@" + ch?.ChannelUserName,
                        details: [ch?.ChannelDescription, ch?.ChannelID],
                        time: ch?.CreatorName,
                        iconClick: () => {},
                    })),
                });
                break;
            case "users":
                setListData({
                    title: "Users",
                    data: allData?.Users?.map((user) => ({
                        iconClass: "bi-megaphone",
                        iconColor: "warning",
                        title: user?.FirstName + " | " + user?.LastName,
                        details: [user?.Description, user?.UserName],
                        time: user?.UserID,
                        iconClick: () => {},
                    })),
                });
                break;
            default:
                setListData({
                    title: "",
                    data: [{}],
                });
                break;
        }
    };

    const transactionHistoryData = useMemo(
        () => ({
            labels: ["Channels", "Groups", "Rooms"],
            datasets: [
                {
                    data: [
                        allData?.Channels?.length,
                        allData?.Groups?.length,
                        allData?.Rooms?.length,
                    ],
                    backgroundColor: ["#111111", "#00d25b", "#ffab00"],
                },
            ],
        }),
        [],
    );

    const transactionHistoryOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 70,
            elements: {
                arc: {
                    borderWidth: 0,
                },
            },
            legend: {
                display: false,
            },
            tooltips: {
                enabled: true,
            },
        }),
        [],
    );
    const items = useMemo(
        () => [
            {
                iconClass: "bi-person-square",
                iconColor: "primary",
                title: "See Rooms",
                details: ["detail for dashboard 1", "small detail2"],
                time: "2020/10/10,12:12",
                iconClick: () => {
                    changeListData("rooms");
                    setShowListData(true);
                },
            },
            {
                iconClass: "bi-people",
                iconColor: "danger",
                title: "See Groups",
                details: ["detail for dashboard 1", "small detail2"],
                time: "2020/10/10,12:12",
                iconClick: () => {
                    changeListData("groups");
                    setShowListData(true);
                },
            },
            {
                iconClass: "bi-megaphone",
                iconColor: "info",
                title: "See Channels",
                details: ["detail for dashboard 1", "small detail2"],
                time: "2020/10/10,12:12",
                iconClick: () => {
                    changeListData("channels");
                    setShowListData(true);
                },
            },
            {
                iconClass: "bi-grid",
                iconColor: "warning",
                title: "See Users",
                details: ["detail for dashboard 1", "small detail2"],
                time: "2020/10/10,12:12",
                iconClick: () => {
                    changeListData("users");
                    setShowListData(true);
                },
            },
        ],
        [],
    );

    const simpleCards = useMemo(
        () => [
            {
                iconClass: "bi-arrow-down",
                title: "Daily Income",
                mainText: "$34.76",
                detailText: "-11.6%",
                status: false,
                bgColor: theme.dark,
                textColors: [theme.text, theme.textGray],
            },
            {
                iconClass: "bi-arrow-up",
                title: "Monthly Income",
                mainText: "$4.33",
                detailText: "+1.6%",
                status: true,
                bgColor: theme.dark,
                textColors: [theme.text, theme.textGray],
            },
            {
                iconClass: "bi-arrow-up",
                title: "Yearly Income",
                mainText: "$340.76",
                detailText: "+7.9%",
                status: true,
                bgColor: theme.dark,
                textColors: [theme.text, theme.textGray],
            },
            {
                iconClass: "bi-person-square",
                title: "Users",
                mainText: allData?.Users?.length,
                detailText: "+-0",
                status: true,
                bgColor: theme.dark,
                textColors: [theme.text, theme.textGray],
            },
        ],
        [],
    );
    return (
        <div className="row p-0 m-0 h-100 w-100 align-content-start">
            <div className="col-12 p-1 m-0 h-auto">
                <div
                    className="w-100 row justify-content-start align-items-center m-0 p-0 rounded rounded-pill"
                    style={{
                        height: "150px",
                        backgroundImage: "url(/assets/images/jpg/banner1.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}>
                    <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-3 m-0 h-100 center">
                        <button className="btn btn-primary w-auto h-auto center">
                            Like what?
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-12 p-1 m-0 h-auto">
                <div className="row p-0 m-0 h-auto w-100">
                    {simpleCards.map((card, i) => (
                        <div
                            key={i}
                            className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 center">
                            <div className={classes.cardContainer}>
                                <SimpleCard
                                    iconClass={card.iconClass}
                                    title={card.title}
                                    mainText={card.mainText}
                                    detailText={card.detailText}
                                    status={card.status}
                                    bgColor={card.bgColor}
                                    textColors={card.textColors}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-12 p-1 m-0 h-auto">
                <div className="row p-0 m-0 w-100 justify-content-evenly h-auto">
                    <div className="col-md-4 mb-2 col-lg-4 col-sm-12 p-0 m-0 center h-auto">
                        <AnalyzeChart
                            data={transactionHistoryData}
                            options={transactionHistoryOptions}
                            bgColor={theme.dark}
                            textColors={[theme.text, theme.textGray]}
                            total={
                                allData?.Channels?.length +
                                allData?.Groups?.length +
                                allData?.Rooms?.length
                            }
                        />
                    </div>
                    <div className="col-md-7 mb-2 col-lg-7 col-sm-12 p-0 m-0 center h-auto">
                        <ListCard
                            title={"list card title"}
                            bgColor={theme.dark}
                            textColors={[theme.text, theme.textGray]}
                            items={items}
                        />
                    </div>
                </div>
            </div>
            <div className="col-12 p-1 m-0 h-auto">
                <div className="row p-0 m-0">
                    <div className="col-12 p-0 m-0">
                        <button
                            onClick={() => setShowListData((p) => !p)}
                            className="btn btn-secondary w-100 h-auto">
                            {showListData ? "Hide " : "Show "} Data
                        </button>
                    </div>
                    <div className="col-12 p-0 m-0">
                        {showListData && listData.title?.length > 0 && (
                            <ListCard
                                title={listData.title}
                                bgColor={theme.dark}
                                textColors={[theme.text, theme.textGray]}
                                items={listData.data}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="col-12 p-1 m-0 h-auto">
                <div className="row p-0 m-0 h-auto w-100">
                    <div className="col-md-4 col-lg-4 col-sm-12 p-0 m-0 center"></div>
                    <div className="col-md-8 col-lg-8 col-sm-12 p-0 m-0 center"></div>
                </div>
            </div>
        </div>
    );
};

export default HomeTab;
