import classes from "./dhmcontent.module.scss";
import themeData from "../../../../../../data/theme.json";
import SimpleCard from "../../parts/simple-card";
import ListCard from "../../parts/list-card/list-card";
import AnalyzeChart from "../../parts/analyze-chart";
import {memo, useMemo} from "react";
const DashboardHomeMainContent = ({asideIsOpen}) => {
    const theme = useMemo(() => themeData.darkTheme, []);

    const transactionHistoryData = useMemo(
        () => ({
            labels: ["Paypal", "Stripe", "Cash"],
            datasets: [
                {
                    data: [55, 25, 20],
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
                iconClass: "bi-grid",
                iconColor: "primary",
                title: "admin dashboard design 1",
                details: ["detail for dashboard 1", "small detail2"],
                time: "2020/10/10,12:12",
            },
            {
                iconClass: "bi-grid",
                iconColor: "danger",
                title: "admin dashboard design 2",
                details: ["detail for dashboard 1", "small detail2"],
                time: "2020/10/10,12:12",
            },
            {
                iconClass: "bi-grid",
                iconColor: "info",
                title: "admin dashboard design 3",
                details: ["detail for dashboard 1", "small detail2"],
                time: "2020/10/10,12:12",
            },
            {
                iconClass: "bi-grid",
                iconColor: "warning",
                title: "admin dashboard design 4",
                details: ["detail for dashboard 1", "small detail2"],
                time: "2020/10/10,12:12",
            },
        ],
        [],
    );
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
                <div className="row p-0 m-0 h-100 w-100 align-content-start">
                    <div className="col-12 p-1 m-0 h-auto">
                        <div className="row p-0 m-0 h-auto w-100">
                            <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 center">
                                <div className={classes.cardContainer}>
                                    <SimpleCard
                                        iconClass="bi-arrow-up"
                                        title="Daily Income"
                                        mainText="$12.54"
                                        detailText="+11%"
                                        status={true}
                                        bgColor={theme.dark}
                                        textColors={[
                                            theme.text,
                                            theme.textGray,
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 center">
                                <div className={classes.cardContainer}>
                                    <SimpleCard
                                        iconClass="bi-arrow-up"
                                        title="Daily Income"
                                        mainText="$12.54"
                                        detailText="+11%"
                                        status={true}
                                        bgColor={theme.dark}
                                        textColors={[
                                            theme.text,
                                            theme.textGray,
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 center">
                                <div className={classes.cardContainer}>
                                    <SimpleCard
                                        iconClass="bi-arrow-up"
                                        title="Daily Income"
                                        mainText="$12.54"
                                        detailText="+11%"
                                        status={true}
                                        bgColor={theme.dark}
                                        textColors={[
                                            theme.text,
                                            theme.textGray,
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-lg-3 col-sm-6 col-xs-6 p-0 m-0 center">
                                <div className={classes.cardContainer}>
                                    <SimpleCard
                                        iconClass="bi-arrow-up"
                                        title="Daily Income"
                                        mainText="$12.54"
                                        detailText="+11%"
                                        status={true}
                                        bgColor={theme.dark}
                                        textColors={[
                                            theme.text,
                                            theme.textGray,
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-1 m-0 h-auto">
                        <div
                            className="row p-0 m-0 w-100 justify-content-evenly h-auto">
                            <div className="col-md-4 mb-2 col-lg-4 col-sm-12 p-0 m-0 center h-auto">
                                <AnalyzeChart
                                    data={transactionHistoryData}
                                    options={transactionHistoryOptions}
                                    bgColor={theme.dark}
                                    textColors={[theme.text, theme.textGray]}
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
                        <div className="row p-0 m-0 h-auto w-100">
                            <div className="col-md-4 col-lg-4 col-sm-12 p-0 m-0 center"></div>
                            <div className="col-md-8 col-lg-8 col-sm-12 p-0 m-0 center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardHomeMainContent;
