import {useContext, useEffect, useState} from "react";
import classes from "./searchinput.module.scss";
import {fetcher} from "../../../../hooks/fetcher";
import {UserContext} from "../../../../context/user-context/user-context";
const SearchInput = () => {
    const [filteredLists, setFilteredLists] = useState({
        Groups: [],
        Channels: [],
    });
    const [lists, setLists] = useState({
        Groups: [],
        Channels: [],
    });
    const [text, setText] = useState("");
    const {token, userId,connectionId} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // fetcher("GET", "Main/GetAllData", null, token)
        if (token.length > 0) {
            fetch("https://localhost:44389/api/Main/GetAllData", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            })
                .then((r) => r.json())
                .then((res) => {
                    console.log("result in get all data => ", res);
                    if (res !== null) {
                        setLists({
                            Channels: res.Channels,
                            Groups: res.Groups,
                        });
                        setFilteredLists({
                            Channels: res.Channels,
                            Groups: res.Groups,
                        });
                    }
                })
                .catch((error) => {
                    console.log("error in get all data => ", error);
                });
        }
    }, [token]);
    const handleSearch = () => {
        if (text.length === 0) {
            setFilteredLists({Channels: lists.Channels, Groups: lists.Groups});
        }
        let chs = lists?.Channels?.filter((ch) => ch?.Name?.includes(text));
        let grs = lists?.Groups?.filter((gr) => gr?.Name?.includes(text));
        setFilteredLists({Channels: chs, Groups: grs});
        console.log("filtered => ", chs, grs);
    };

    const handleSearching = (txt = "") => {
        if (txt.length === 0) {
            setFilteredLists({Channels: lists.Channels, Groups: lists.Groups});
        }
        let chs = lists?.Channels?.filter((ch) => ch?.Name?.includes(txt));
        let grs = lists?.Groups?.filter((gr) => gr?.Name?.includes(txt));
        setFilteredLists({Channels: chs, Groups: grs});
        console.log("filtered => ", chs, grs);
    };
    const handleJoinChannel = async (chId) => {
        setLoading(true);
        const data = {
            UserID: userId,
            ChannelID: chId,
        };
        console.log("data in join => ", data,token);
        // const resp = await fetch(
        //     `https://localhost:44389/api/Channels/JoinChannel`,
        //     {
        //         body: data,
        //         method: "POST",
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     },
        // );

        const {result, isError} = await fetcher(
            "POST",
            "Channels/JoinChannel",
            data,
            token,
        );
        if (!isError) {
            console.log("result in join channel => ", result);
        }
        setLoading(false);
    };
    const handleJoinGroup = async (grId) => {
        setLoading(true);
        const data = {
            UserID: userId,
            GroupID: grId,
        };
        console.log("data in join => ",data,connectionId);
        // const resp = await fetch(
        //     "https://localhost:44389/api/Groups"+"​/JoinGroup",
        //     {
        //         body: data,
        //         method: "POST",
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     },
        // );
        // if (resp.ok) {
        //     let result = await resp.text();
        //     console.log("result in join Group => ", result);
        // }
        const { result,isError} = await fetcher("POST","Groups/JoinGroup",data,token);
        if (!isError) {
            console.log("result in join Group => ", result);
        }
        setLoading(false);
    };
    return (
        <div
            className={`${classes.searchInputContainer} center position-relative`}>
            <button onClick={handleSearch} className="btn btn-white">
                <i className="bi bi-search text-white"></i>
            </button>
            <input
                className={`${classes.searchInput}`}
                placeholder="searching ..."
                type="search"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    handleSearching(e.target.value);
                }}
            />
            <div className={`${classes.searchListContainer}`}>
                <ul className={`${classes.searchList}`}>
                    {filteredLists.Channels.map((ch) => (
                        <li
                            title="click for join channel"
                            className={`${classes.searchListItem}`}>
                            <button
                                className={`${classes.itemBtnChannel} text-white-50`}>
                                <span>ch : {ch.Name}</span>
                                <button
                                    onClick={() => {
                                        handleJoinChannel(ch?.ChannelID);
                                    }}
                                    disabled={loading}
                                    className="btn">
                                    {loading ? (
                                        <i className="spinner-border"></i>
                                    ) : (
                                        "Join"
                                    )}
                                </button>
                            </button>
                        </li>
                    ))}
                    {filteredLists.Groups.map((gr) => (
                        <li
                            title="click for join group"
                            className={`${classes.searchListItem}`}>
                            <button
                                className={`${classes.itemBtnGroup} text-white-50`}>
                                <span>gr : {gr.Name}</span>
                                <button
                                    onClick={() => {
                                        handleJoinGroup(gr?.GroupID);
                                    }}
                                    disabled={loading}
                                    className="btn">
                                    {loading ? (
                                        <i className="spinner-border"></i>
                                    ) : (
                                        "Join"
                                    )}
                                </button>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchInput;
