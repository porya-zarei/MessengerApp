import { memo } from "react";
import ListItemCard from "./list-card-item";
import classes from "./listcard.module.scss";
const ListCard = ({bgColor,textColors, items,title}) => {
    return (
        <div style={{backgroundColor:bgColor,color:textColors[0]}} className={classes.listCardContainer}>
            <div className={classes.listCard}>
                <div className={classes.listCardTitleContainer}>
                    <div className={classes.listCardTitle}>{title}</div>
                </div>
                <div className={classes.listCardListConainer}>
                    <ul className={classes.listCardList}>
                        {items.map((item, i) => (
                            <li className={classes.listCardListItem} key={i}>
                                <ListItemCard
                                    title={item.title}
                                    time={item.time}
                                    details={item.details}
                                    iconClass={item.iconClass}
                                    iconColor={item.iconColor}
                                    textColors={textColors}
                                    onClick={item.iconClick}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ListCard;
