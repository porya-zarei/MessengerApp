import {useContext, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import {files_url} from "../../../../../configs/configs";
import classes from "./burgercard.module.scss";
import CheckUserConnection from "./check-user-connection/check-user-connection";
import CardBgHandler from "./card-bg-handler/card-bg-handler";

const BurgerCard = () => {
    const {user} = useContext(UserContext);
    const {theme} = useContext(ViewContext);

    const [source, setSource] = useState(
        "url(/assets/images/jpg/avatar-bg.jpg)",
    );

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const setCardBgSource = (src) => {
        setSource(src);
    };

    return (
        <div className="p-0 m-0">
            <div
                style={{
                    backgroundImage: `${source}`,
                }}
                className={`${classes.burgerCard} row p-0 m-0`}>
                <div className={`${classes.burgerCardHeader} col-12 p-0 m-0`}>
                    <div className={`${classes.burgerAvatar} center`}>
                        <img
                            src={
                                user?.ProfileImage?.length > 0
                                    ? `${files_url}/images/profiles/${user.ProfileImage}`
                                    : "/assets/images/png/avatar.png"
                            }
                            height="66px"
                            width="66px"
                            className="h-100 w-100 circle"
                        />
                    </div>
                    <CardBgHandler
                        className={classes.bgSetter}
                        setSource={setCardBgSource}
                    />
                    <CheckUserConnection />
                </div>
                <div className={`${classes.burgerCardBody} col-12 p-0 m-0`}>
                    <div
                        className={`${classes.burgerCardBodyPart1}`}
                        style={{
                            backgroundColor: theme.darker,
                            color: theme.text,
                        }}>
                        <div className={`${classes.burgerUserName} p-0 m-0`}>
                            {`${user?.FirstName} ${user?.LastName}`}
                        </div>
                        <div className={`${classes.burgerUserID} p-0 m-0`}>
                            {`@${user.UserName}`}
                        </div>
                    </div>
                    <div
                        className={`${classes.burgerCardBodyPart2}`}
                        style={{
                            backgroundColor: theme.darker,
                            color: theme.text,
                        }}>
                        {user?.Description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BurgerCard;
