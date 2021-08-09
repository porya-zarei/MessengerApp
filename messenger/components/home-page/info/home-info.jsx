import classes from "./homeinfo.module.scss";

const HomeInfo = () => {
    return (
        <div className={classes.container}>
            <ul className={classes.col}>
                Features :<li className={classes.row}>Full RealTime</li>
                <li className={classes.row}>Very Secure</li>
                <li className={classes.row}>
                    Responsive and very Simple for Use
                </li>
                <li className={classes.row}>Enjoy it</li>
            </ul>
            <ul className={classes.col}>
                App Parts :<li className={classes.row}>Login</li>
                <li className={classes.row}>Register</li>
                <li className={classes.row}>Messenger</li>
            </ul>
            <div className={classes.copyRight}>
                Porya Zarei Messenger App, all Right Reserved &copy;
            </div>
        </div>
    );
};

export default HomeInfo;
