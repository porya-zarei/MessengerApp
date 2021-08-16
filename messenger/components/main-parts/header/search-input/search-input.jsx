import {useContext, useEffect, useState} from "react";
import classes from "./searchinput.module.scss";
import {fetcher} from "../../../../hooks/fetcher";
import {UserContext} from "../../../../context/user-context/user-context";
import {ViewContext} from "../../../../context/view-context/view-context";
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
    const {token, userId, connectionId} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const {theme} = useContext(ViewContext);
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
        console.log("data in join => ", data, token);

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
        console.log("data in join => ", data, connectionId);
        const {result, isError} = await fetcher(
            "POST",
            "Groups/JoinGroup",
            data,
            token,
        );
        if (!isError) {
            console.log("result in join Group => ", result);
        }
        setLoading(false);
    };
    return (
        <div
            style={{
                backgroundColor: theme.primarier,
                borderColor: theme.textGray,
            }}
            className={`${classes.searchInputContainer} center position-relative`}>
            <button
                onClick={handleSearch}
                className="btn btn-white"
                style={{color: theme.text}}>
                <i className="bi bi-search"></i>
            </button>
            <input
                className={`${classes.searchInput}`}
                style={{color: theme.text}}
                placeholder="searching ..."
                type="search"
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    handleSearching(e.target.value);
                }}
            />
            <div className={`${classes.searchListContainer}`}>
                <ul
                    className={`${classes.searchList}`}
                    style={{backgroundColor: theme.primaryLight}}>
                    {filteredLists.Channels.map((ch) => (
                        <li
                        key={ch.ChannelID}
                            title="click for join channel"
                            className={`${classes.searchListItem}`}>
                            <div
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.textGray,
                                }}
                                className={`${classes.itemBtnChannel}`}>
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
                            </div>
                        </li>
                    ))}
                    {filteredLists.Groups.map((gr) => (
                        <li
                        key={gr.GroupID}
                            title="click for join group"
                            className={`${classes.searchListItem}`}>
                            <div
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.textGray,
                                }}
                                className={`${classes.itemBtnGroup}`}>
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
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchInput;
