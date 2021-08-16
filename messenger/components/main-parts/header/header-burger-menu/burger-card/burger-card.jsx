import Image from "next/image";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {ViewContext} from "../../../../../context/view-context/view-context";
import classes from "./burgercard.module.scss";

const BurgerCard = () => {
    const {user} = useContext(UserContext);
    const {theme} = useContext(ViewContext);
    const cardBgRef = useRef();
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

    // useEffect(() => {
    //     // if (localStorage.getItem("cardBgR")) {
    //     //     console.log("base64 cardbg => ", localStorage.getItem("cardBg"));
    //     //     setSource(localStorage.getItem("cardBg"));
    //     // }
    // }, []);
    const handleSetCardBg = () => {
        // toBase64(cardBgRef.current.files[0]).then((r) => {
        //     localStorage.setItem("cardBg", r);
        //     console.log("b64 => ", r);
        //     setSource(r);
        // });
        let blob = window.URL.createObjectURL(cardBgRef.current.files[0]);
        console.log("blob => ", blob);
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
                            hidden={true}
                            style={{display: "none"}}
                            ref={cardBgRef}
                        />
                    </div>
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
