import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import ChatLists from "../../components/main-parts/chat-lists/chat-lists";
import ChatView from "../../components/main-parts/chat-view/chat-view";
import {UserDataContext} from "../../context/data-context/data-context";
import {UserContext} from "../../context/user-context/user-context";
import {getcookie} from "../../helpers/getCookie";
import {fetcher} from "../../hooks/fetcher";
import Cookies from "cookies";
import {ViewContext} from "../../context/view-context/view-context";

const MainPage = ({userData, isError}) => {
    const router = useRouter();
    const {
        roomsDispatcher,
        groupsDispatcher,
        channelsDispatcher,
    } = useContext(UserDataContext);
    const {isLoged, setConnection, token, setConnectionId} =
        useContext(UserContext);
    const {isMobile, isInChat} = useContext(ViewContext);

    const [chatListClass, setChatListClass] = useState("");
    const [chatViewClass, setChatViewClass] = useState("hidden-sm");

    console.log("is chat # mobile => ", isInChat, isMobile);

    if (isError) {
        <div>im so sorry please relogin</div>;
    }

    // if (userData !== null && userData !== undefined) {
    //     console.log("userData => ", userData);
    //     roomsDispatcher({type: "Initial", payload: [userData.Rooms]});
    //     groupsDispatcher({type: "Initial", payload: [userData.Groups]});
    //     channelsDispatcher({type: "Initial", payload: [userData.Channels]});
    // }

    useEffect(() => {
        if (!isLoged || isError) {
            router.replace("/Auth/Login");
        }
        if (isInChat && isMobile) {
            setChatListClass("hidden-sm");
            setChatViewClass("");
        } else if (!isInChat && isMobile) {
            setChatListClass("");
            setChatViewClass("hidden-sm");
        }
        if (!isMobile) {
            setChatListClass("");
            setChatViewClass("");
        }
    }, [isInChat]);

    useEffect(()=>{
        if (userData !== null && userData !== undefined) {
            console.log("userData => ", userData);
            roomsDispatcher({type: "Initial", payload: [...userData.Rooms]});
            groupsDispatcher({type: "Initial", payload: [...userData.Groups]});
            channelsDispatcher({
                type: "Initial",
                payload: [...userData.Channels],
            });
        }
    },[])
    return (
        <div className="w-100 row m-0 p-0" style={{height:"100vh"}}>
            <div
                className={`col-md-4 col-lg-4 col-sm-12 h-100 bg-dark p-0 ${chatListClass} m-0`}>
                <ChatLists />
            </div>
            <div
                className={`col-md-8 col-lg-8 col-sm-12 h-100 bg-primary ${chatViewClass} p-0 m-0`}>
                <ChatView />
            </div>
        </div>
    );
};

export default MainPage;

export async function getServerSideProps({req, res}) {
    let cookies = new Cookies(req, res);
    const token = cookies.get("Token");
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    console.log(`token in serverside => `, token);

    // req.headers.authorization = `Bearer ${token}`;

    if (token === null) {
        return {
            props: {isError: true},
        };
    }

    // const {result, isError, resStatus, error} = await fetcher(
    //     "GET",
    //     "Main/GetUserInitialData",
    //     null,
    //     token,
    // );

    const resp = await fetch(
        "https://localhost:44389/api/Main/GetUserInitialData",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "GET",
        },
    );

    const result = await resp.json();

    console.log("in Messanger => ", result);
    if (result === undefined || result === null) {
        return {
            props: {isError: true},
        };
    }
    return {
        props: {
            userData: result,
        },
    };
}
