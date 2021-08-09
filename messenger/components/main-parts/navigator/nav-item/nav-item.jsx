import classes from "./navitem.module.scss";
const NavItem = ({name, icon, onClick}) => {
    return (
        <div className={`col-4 center`}>
            <button
                onClick={() => {
                    onClick && onClick();
                }}
                className={`${classes.navItem} p-0 m-0 center`}>
                <div className="center" title={name}>
                    {icon}
                </div>
                <span>{name}</span>
            </button>
        </div>
    );
};

export default NavItem;
