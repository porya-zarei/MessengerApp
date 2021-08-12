import {useContext, useRef, useState} from "react";
import {ViewContext} from "../../../../../../context/view-context/view-context";
import classes from "./settingitem.module.scss";

const SettingItem = () => {
    const {theme, setTheme, setChatBackground} = useContext(ViewContext);
    const [showSetting, setShowSetting] = useState(false);

    const showingColors = ["dark", "primary", "primarier", "danger", "light"];

    const chatbgRef = useRef();
    const handleSetChatBackground = () => {
        let blob = window.URL.createObjectURL(chatbgRef.current.files[0]);
        setChatBackground(blob);
    };
    const darkTheme = {
        name: "dark",
        light: "#DDDDDD",
        primary: "#30475E",
        primarier: "#0A043C",
        primaryLight: "#1c6ce3",
        dark: "#222831",
        darker: "#171717",
        danger: "#F05454",
        warnig: "#FFD369",
        info: "#03506F",
        textGray: "#C4BBF0",
        text: "#F5EDED",
        textDark: "#151515",
        bubble1: "#577399",
        bubble2: "#495867",
    };

    const lightGreenTheme = {
        name: "lightGreen",
        light: "#DDDDDD",
        primary: "#add2c2",
        primarier: "#5fdd9d",
        primaryLight: "#f5ffc6",
        dark: "#7fb685",
        darker: "#a5be00",
        danger: "#ef6f6c",
        warnig: "#ffd449",
        info: "#3f4531",
        textGray: "#466060",
        text: "#12130f",
        textDark: "#151515",
        bubble1: "#b3e9c7",
        bubble2: "#78de77",
    };

    return (
        <div className="h-100 w-100">
            <button
                className="btn w-100 h-auto"
                style={{
                    color: theme.textGray,
                    backgroundColor: theme.dark,
                }}
                onClick={() => setShowSetting((p) => !p)}>
                <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                    <div className="col-2 center h-100">
                        <i className="bi bi-gear h-100 center big-icon"></i>
                    </div>
                    <div className="col-10 d-flex align-items-center fs-larger">
                        <span className="mx-2"> Setting </span>
                        <i className="bi bi-arrow-bar-right"></i>
                    </div>
                </div>
            </button>
            {showSetting && (
                <div className="m-0 p-0 h-auto w-100">
                    <div className={`${classes.rowContainer}`}>
                        <div className={`${classes.palletsContainer}`}>
                            <div
                                style={{color: theme.text}}
                                className={`${classes.palletsTitle}`}>
                                select your theme
                            </div>
                            <div
                                onClick={() => {
                                    
                                    localStorage.setItem(
                                        "theme",
                                        JSON.stringify(darkTheme),
                                    );
                                    setTheme(darkTheme);
                                }}
                                className={`${classes.pallet}`}>
                                {showingColors.map((color) => (
                                    <div
                                        style={{
                                            backgroundColor: darkTheme[color],
                                        }}></div>
                                ))}
                            </div>
                            <div
                                onClick={() => {
                                    
                                    localStorage.setItem(
                                        "theme",
                                        JSON.stringify(lightGreenTheme),
                                    );setTheme(lightGreenTheme);
                                }}
                                className={`${classes.pallet}`}>
                                {showingColors.map((color) => (
                                    <div
                                        style={{
                                            backgroundColor:
                                                lightGreenTheme[color],
                                        }}></div>
                                ))}
                            </div>
                            <div className={`${classes.pallet}`}>
                                {showingColors.map((color) => (
                                    <div
                                        style={{
                                            backgroundColor: darkTheme[color],
                                        }}></div>
                                ))}
                            </div>
                        </div>
                        <div className={`${classes.chatBackground}`}>
                            <button
                                onClick={() => chatbgRef.current.click()}
                                className="btn btn-warning w-100">
                                <i className="bi-image-fill mx-2"></i>
                                Set Chat Background
                            </button>
                            <input
                                onChange={handleSetChatBackground}
                                ref={chatbgRef}
                                type="file"
                                hidden
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingItem;
