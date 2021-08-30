import classes from "./dhmcontent.module.scss";
const DashboardHomeMainContent = ({asideIsOpen}) => {
    return (
        <section
            className={`${classes.contentSection} ${
                asideIsOpen
                    ? classes.contentAsideIsOpen
                    : classes.contentAsideIsClose
            }`}>
            content
        </section>
    );
};

export default DashboardHomeMainContent;
