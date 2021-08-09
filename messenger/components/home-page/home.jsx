import classes from "./home.module.scss";
import HomeInfo from "./info/home-info";
import HomeNavbar from "./navbar/home-navbar";
import Image from "next/image";
import {useState} from "react";

const Home = () => {
    const [chats, setChats] = useState([
        "Hello",
        "hello how are you ?",
        "thanks im good what about you?",
        "Im very good",
    ]);
    return (
        <div className={classes.homeContainer}>
            <HomeNavbar />
            <div className={classes.homeRow}>
                <div className={classes.homeCol}>
                    <div className={classes.bannerContainer}>
                        <Image
                            className={classes.banner}
                            src="/assets/images/jpg/dasht.jpg"
                            layout="responsive"
                            height={400}
                            width={1000}
                        />
                    </div>
                </div>
                <div className={classes.homeCol}>
                    <div className={classes.chatsContaier}>
                        <div className={classes.detail}>
                            <div className="w-100px h-100 center fw-bolder">
                                Enjoy chatting with your friends with full
                                secure app.
                                <br />
                                create account once
                                <br />
                                use it any where any device
                            </div>
                        </div>
                        <div className={classes.chatShow}>
                            <div className={classes.chatsHeader}>
                                <div className="row p-0 m-0 h-100 w-100 align-items-center">
                                    <img
                                        style={{height: "100%", width: "70px"}}
                                        className=""
                                        src="/assets/images/png/avatar.png"
                                    />
                                    <span className="h-auto w-auto">
                                        John 😉
                                    </span>
                                </div>
                            </div>
                            <div className={classes.chatsBody}>
                                <div className={classes.chats}>
                                    {chats.map((ch, i) => (
                                        <div className={classes.chat}>
                                            <div
                                                style={{
                                                    marginLeft:
                                                        i % 2 == 0
                                                            ? "0"
                                                            : "auto",
                                                    marginRight:
                                                        i % 2 != 0
                                                            ? "0"
                                                            : "auto",
                                                    backgroundColor:
                                                        i % 2 == 0
                                                            ? "rgb(34, 109, 180)"
                                                            : "rgb(34, 44, 180)",
                                                }}
                                                className={classes.chatContent}>
                                                {ch}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={classes.chatsFooter}>
                                <div className="row m-0 p-0">
                                    <div className="col-12 p-0 m-0 h-auto center overflow-hidden rounded-2">
                                        <input
                                            className="p-2 h-100 w-100 home-input"
                                            type="text"
                                            placeholder="type ..."
                                        />
                                        <button className="h-100 btn btn-primary opacity-50">
                                            <i className="bi bi-telegram"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HomeInfo />
        </div>
    );
};

export default Home;
