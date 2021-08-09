import classes from './homeinfo.module.scss'

const HomeInfo = () => {
    return (
        <div className={classes.container}>
            <ul className={classes.col}>
                <li className={classes.row}>1</li>
                <li className={classes.row}>2</li>
                <li className={classes.row}>3</li>
                <li className={classes.row}>4</li>
                <li className={classes.row}>5</li>
            </ul>
            <ul className={classes.col}>
                <li className={classes.row}>1</li>
                <li className={classes.row}>2</li>
                <li className={classes.row}>3</li>
                <li className={classes.row}>4</li>
                <li className={classes.row}>5</li>
            </ul>
            <ul className={classes.col}>
                <li className={classes.row}>1</li>
                <li className={classes.row}>2</li>
                <li className={classes.row}>3</li>
                <li className={classes.row}>4</li>
                <li className={classes.row}>5</li>
            </ul>
        </div>
    );
}
 
export default HomeInfo;