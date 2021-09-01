import {useRouter} from "next/router";
import {useContext, useEffect} from "react";
import {UserDataContext} from "../../context/data-context/data-context";
import {UserContext} from "../../context/user-context/user-context";
import Cookies from "cookies";
import Container from "../../components/container/container";
import {api_url} from "../../configs/configs";
import {fetcher} from "../../hooks/fetcher";
import {toast} from "react-toastify";
import {getCookieValue} from "../../helpers/getCookie";
import {decodeToken} from "../../helpers/jwt-helper";
import ContextProvider from "../../context/main-context";
import Layout from "../../components/Layout/layout";

const MainPage = ({userData, isError}) => {
    const router = useRouter();
    const {roomsDispatcher, groupsDispatcher, channelsDispatcher} =
        useContext(UserDataContext);

    const {userId, connectionId, setToken} = useContext(UserContext);

    console.log("in messenger index");
    useEffect(() => {
        console.log("in first useEffect in messenger => ", isError, userData);
        if (isError) {
            console.log("in isError");
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
    useEffect(() => {
        const tkn = getCookieValue("Token", document.cookie);
        const decodedToken = decodeToken(tkn);
        console.log(
            "in index js useEffect => ",
            userId,
            connectionId,
            tkn,
            decodedToken,
        );

        if (!tkn || ( !decodedToken || tkn?.length < 1)) {
            router.replace("/Auth/Login");
        } else if (connectionId.length > 0) {
            console.log("in index js useEffect => ", userId, connectionId, tkn);
            const data = {
                UserID: decodedToken?.payload?.UserID,
                ConnectionID: connectionId,
            };
            fetcher("POST", "Users/SetUserConnectionId", data, tkn)
                .then(({isError, result, error}) => {
                    if (result !== connectionId || isError) {
                        console.log("error in set Connection ", error, result);
                        router.replace("/Auth/Login");
                    } else {
                        toast.dark("realtime connection started");
                        setToken(tkn);
                    }
                })
                .catch((err) => {
                    console.log("error in set Connection ", err);
                });
        }
    }, [connectionId]);

    if (isError) {
        return <div>im so sorry please relogin</div>;
    }
    return <Container />;
};

export default MainPage;

export async function getServerSideProps({req, res}) {
    try {
        let cookies = new Cookies(req, res);
        const token = cookies.get("Token");
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        console.log(`token in serverside => `, token);

        if (token === null) {
            return {
                props: {isError: true},
            };
        }

        const resp = await fetch(`${api_url}/Main/GetUserInitialData`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "GET",
        });

        if (!resp.json) {
            return {
                props: {isError: true},
            };
        }

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
    } catch (error) {
        return {
            props: {isError: true},
        };
    }
}
