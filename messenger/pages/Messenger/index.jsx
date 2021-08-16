import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import ChatLists from "../../components/main-parts/chat-lists/chat-lists";
import ChatView from "../../components/main-parts/chat-view/chat-view";
import {UserDataContext} from "../../context/data-context/data-context";
import {UserContext} from "../../context/user-context/user-context";
import Cookies from "cookies";
import {ViewContext} from "../../context/view-context/view-context";
import Container from "../../components/container/container";
import HeaderLayout from "../../components/Layout/header/header-layout";
import MainLayout from "../../components/Layout/main/main-layout";
import Dialogs from "../../components/dialogs/dialogs";
import ContextMenu from "../../components/context-menu/context-menu";
import {ToastContainer} from "react-toastify";

const MainPage = ({userData, isError}) => {
    const router = useRouter();
    const {roomsDispatcher, groupsDispatcher, channelsDispatcher} =
        useContext(UserDataContext);

    const {isLoged} = useContext(UserContext);

    console.log("in messenger index");

    if (isError) {
        return <div>im so sorry please relogin</div>;
    }

    useEffect(() => {
        if (!isLoged || isError) {
            router.replace("/Auth/Login");
        }
        if (userData !== null && userData !== undefined) {
            console.log("userData => ", userData);
            roomsDispatcher({type: "Initial", payload: [...userData.Rooms]});
            groupsDispatcher({type: "Initial", payload: [...userData.Groups]});
            channelsDispatcher({
                type: "Initial",
                payload: [...userData.Channels],
            });
        }
    }, []);

    return <Container />;
};

export default MainPage;

export async function getServerSideProps({req, res}) {
    let cookies = new Cookies(req, res);
    const token = cookies.get("Token");
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    console.log(`token in serverside => `, token);

    if (token === null) {
        return {
            props: {isError: true},
        };
    }

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
