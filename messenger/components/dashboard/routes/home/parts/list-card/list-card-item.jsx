import classes from "./listcard.module.scss";
const ListItemCard = ({
    iconClass,
    iconColor,
    title,
    details,
    time,
    textColors,
}) => {
    return (
        <div style={{color: textColors[0]}} className={classes.cardContainer}>
            <div className={classes.card}>
                <di className={classes.cardIconContainer}>
                    <div className={`${classes.cardIcon} bg-${iconColor}`}>
                        <i className={iconClass}></i>
                    </div>
                </di>
                <div className={classes.cardContent}>
                    <div className={classes.cardContentTop}>
                        <div className={classes.cardContentTopTitle}>
                            {title}
                        </div>
                        <div
                            style={{color: textColors[1]}}
                            className={classes.cardContentTopTime}>
                            {time}
                        </div>
                    </div>
                    <div className={classes.cardContentBottom}>
                        <div className={classes.cardContentBottomDetail0}>
                            {details[0]}
                        </div>
                        <div
                            style={{color: textColors[1]}}
                            className={classes.cardContentBottomDetail1}>
                            {details[1]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListItemCard;
