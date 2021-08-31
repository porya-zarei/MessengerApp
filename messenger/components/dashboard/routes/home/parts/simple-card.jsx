import classes from "./parts.module.scss";

const SimpleCard = ({
    iconClass,
    title,
    mainText,
    detailText,
    status,
    textColors,
    bgColor,
}) => {
    return (
        <div
            style={{color: textColors[0], backgroundColor: bgColor}}
            className={classes.sc__cardContainer}>
            <div className={classes.sc__card}>
                <div className={classes.sc__cardTexts}>
                    <div className={classes.sc__cardMainTexts}>
                        <div className={classes.sc__cardMainText}>
                            {mainText}
                        </div>
                        <div
                            className={
                                status
                                    ? classes.sc__cardDetailTextSuccess
                                    : classes.sc__cardDetailTextError
                            }>
                            {detailText}
                        </div>
                    </div>
                    <div
                        className={
                            status
                                ? classes.sc__cardIconSuccess
                                : classes.sc__cardIconError
                        }>
                        <button>
                            <i className={iconClass}></i>
                        </button>
                    </div>
                </div>
                <div
                    style={{color: textColors[1]}}
                    className={classes.sc__cardTitle}>
                    {title}
                </div>
            </div>
        </div>
    );
};

export default SimpleCard;
