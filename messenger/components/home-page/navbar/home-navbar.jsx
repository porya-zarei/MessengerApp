import Link from 'next/link'
import classes from './homenavbar.module.scss'

const HomeNavbar = () => {
    return (
        <div className={classes.container}>
            <nav className={classes.homeNavbar}>
                <ul className={classes.homeNavbarList}>
                    <li className={classes.homeNavbarListItem}>
                        <button className="btn btn-outline-dark">PZE</button>
                    </li>
                    <li className={classes.homeNavbarListItem}>
                        <button className="btn btn-outline-dark">
                            online users: <span className="fw-bolder">10</span>
                        </button>
                    </li>
                    <li className={`${classes.homeNavbarListItem}`}>
                        <Link href="/Auth/Register">
                            <a className="btn btn-outline-dark">
                                Register
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
 
export default HomeNavbar;