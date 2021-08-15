import {useContext, useEffect, useState} from "react";
import {ViewContext} from "../../../../../context/view-context/view-context";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from "framer-motion";
import classes from "./headerinfo.module.scss";
import ChannelUpdate from "./channel-update/channel-update";
import GroupUpdate from "./group-update/group-update";
import Medias from "./medias/medias";

const HeaderInfo = () => {
    const {showHeaderInfo, setShowHeaderInfo, chatsToShow, theme} =
        useContext(ViewContext);
    const xPosition = useMotionValue(0);
    const xRange = [-200, 0, 200];
    const opacityRange = [0, 1, 0];
    const opacity = useTransform(xPosition, xRange, opacityRange);

   
    let imgSrc = "";
    if (chatsToShow.type === "room") {
        imgSrc = "https://localhost:44389/files/images/profiles/" + chatsToShow.Image;
    } else if (chatsToShow.type === "group") {
        imgSrc = "https://localhost:44389/files/images/groups/" + chatsToShow.Image;
    } else {
        imgSrc = "https://localhost:44389/files/images/channels/" + chatsToShow.Image;
    }

    const handleDragEnd = () => {
        if (xPosition.get() > 70) {
            setShowHeaderInfo(false);
        }
    };

    return (
        showHeaderInfo && (
            <div className={`${classes.headerInfoContainer}`}>
                <AnimatePresence>
                    <motion.div
                        drag="x"
                        style={{
                            x: xPosition,
                            opacity,
                            backgroundColor: theme.dark,
                            color: theme.text,
                        }}
                        dragConstraints={{
                            left: 0,
                            right: 0,
                        }}
                        onDragEnd={() => handleDragEnd()}
                        className={`${classes.headerInfo}`}>
                        <div className={`${classes.imageContainer}`}>
                            <img
                                src={
                                    chatsToShow.Image.length > 0
                                        ? imgSrc
                                        : "/assets/images/jpg/dasht.jpg"
                                }
                                className={`${classes.image}`}
                            />
                            <div
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.text,
                                }}
                                className={`${classes.userFullName}`}>
                                {chatsToShow.Name}
                            </div>
                        </div>
                        <div className={`${classes.infoContainer}`}>
                            <div
                                style={{
                                    backgroundColor: theme.primarier,
                                    color: theme.text,
                                }}
                                className={`${classes.info}`}>
                                <div
                                    style={{
                                        color: theme.info,
                                    }}
                                    className={`${classes.infoTitle}`}>
                                    Info
                                </div>
                                <div className={`${classes.infoUserName}`}>
                                    @{chatsToShow.userName}
                                </div>
                                <div
                                    style={{
                                        color: theme.textGray,
                                    }}
                                    className={`${classes.infoUserNameTitle}`}>
                                    Username
                                </div>
                                <div className={`${classes.infoBio}`}>
                                    {chatsToShow.description}
                                </div>
                                <div
                                    style={{
                                        color: theme.textGray,
                                    }}
                                    className={`${classes.infoBioTitle}`}>
                                    Bio
                                </div>
                                <button
                                    onClick={() => setShowHeaderInfo(false)}
                                    className={`${classes.infoGotoChatBtn}`}
                                    style={{
                                        backgroundColor: theme.dark,
                                        color: theme.text,
                                        border:`2px solid ${theme.text}`
                                    }}>
                                    <i className="bi-chat"></i>
                                </button>
                            </div>
                        </div>
                        {chatsToShow.UserAccess && (
                            <div className="w-100 h-auto">
                                {chatsToShow.type === "group" && (
                                    <GroupUpdate />
                                )}
                                {chatsToShow.type === "channel" && (
                                    <ChannelUpdate />
                                )}
                            </div>
                        )}
                        <div className={`${classes.mediaContainer}`}>
                            <Medias/>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        )
    );
};

export default HeaderInfo;
