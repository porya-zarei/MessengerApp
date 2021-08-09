import Image from "next/image";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import classes from "./burgercard.module.scss";

const BurgerCard = () => {
    const {user} = useContext(UserContext);
    const cardBgRef = useRef();
    const [source, setSource] = useState("url(/assets/images/jpg/avatar-bg.jpg)");
    useEffect(() => {
    }, []);
    const handleSetCardBg = () => {
        let blob = window.URL.createObjectURL(cardBgRef.current.files[0]);
        console.log("blob => ", blob);
        // localStorage.setItem(
        //     "burgerCardBackground",
        //     JSON.stringify(cardBgRef.current.files[0]),
        // );
        setSource(`url(${blob})`);
    };
    return (
        <div className="p-0 m-0">
            <div
                style={{
                    backgroundImage: `${source}`,
                }}
                className={`${classes.burgerCard} row p-0 m-0`}>
                <div className={`${classes.burgerCardHeader} col-12 p-0 m-0`}>
                    <div className={`${classes.burgerAvatar}`}>
                        <img
                            src={
                                user?.ProfileImage?.length > 0
                                    ? `https://localhost:44389/files/images/profiles/${user.ProfileImage}`
                                    : "/assets/images/png/avatar.png"
                            }
                            height="66px"
                            width="66px"
                            className="h-100 w-100 img-circle"
                        />
                    </div>
                    <div className={`${classes.bgSetter}`}>
                        <button
                            onClick={() => cardBgRef.current.click()}
                            className="btn  bg-transparent hw-40px">
                            <i className="bi bi-image-fill text-white-50"></i>
                        </button>
                        <input
                            onChange={() => {
                                handleSetCardBg();
                            }}
                            type="file"
                            hidden="true"
                            style={{display: "none"}}
                            ref={cardBgRef}
                        />
                    </div>
                </div>
                <div className={`${classes.burgerCardBody} col-12 p-0 m-0`}>
                    <div className={`${classes.burgerCardBodyPart1}`}>
                        <div className={`${classes.burgerUserName} p-0 m-0`}>
                            {`${user?.FirstName} ${user?.LastName}`}
                        </div>
                        <div className={`${classes.burgerUserID} p-0 m-0`}>
                            {`@${user.UserName}`}
                        </div>
                    </div>
                    <div className={`${classes.burgerCardBodyPart2}`}>
                        {user?.Description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BurgerCard;