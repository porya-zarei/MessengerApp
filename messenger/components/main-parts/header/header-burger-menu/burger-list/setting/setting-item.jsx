import {useContext, useRef, useState} from "react";
import {ViewContext} from "../../../../../../context/view-context/view-context";
import classes from "./settingitem.module.scss";
import themeData from "../../../../../../data/theme.json";

const SettingItem = () => {
    const {darkTheme, lightGreenTheme} = themeData;
    const {theme, setTheme, setChatBackground, sendByEnter, changeSendByEnter} =
        useContext(ViewContext);
    const [showSetting, setShowSetting] = useState(false);

    const showingColors = ["dark", "primary", "primarier", "danger", "light"];

    const chatbgRef = useRef();
    const handleSetChatBackground = () => {
        let blob = window.URL.createObjectURL(chatbgRef.current.files[0]);
        setChatBackground(blob);
    };

    return (
        <div className="h-100 w-100">
            <button
                className="btn shadow-none w-100 h-auto"
                style={{
                    color: theme.textGray,
                    backgroundColor: theme.dark,
                }}
                onClick={() => setShowSetting((p) => !p)}>
                <div className="row h-100 p-0 m-0 justify-content-center align-items-center">
                    <div className="col-2 center h-100">
                        <i
                            style={{color: theme.text}}
                            className="bi bi-gear-fill h-100 center big-icon"></i>
                    </div>
                    <div className="col-10 d-flex align-items-center fs-larger">
                        <span className="mx-2"> Setting </span>
                    </div>
                </div>
            </button>
            {showSetting && (
                <div
                    style={{backgroundColor: "#ffffff2b"}}
                    className="m-0 p-0 h-auto w-100">
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
                                    );
                                    setTheme(lightGreenTheme);
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
                                hidden={true}
                            />
                        </div>
                        <div className={`${classes.sendByEnterContainer}`}>
                            Send Chat By Enter :{" "}
                            <input
                                type="checkbox"
                                checked={sendByEnter}
                                style={{color: theme.textGray}}
                                onChange={() =>
                                    changeSendByEnter((p) => !p, "reverse")
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingItem;
