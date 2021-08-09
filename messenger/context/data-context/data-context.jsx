import {createContext, useReducer} from "react";
import { channelsReducer } from "./reducers/channels-reducer";
import { groupsReducer } from "./reducers/groups-reducer";
import { roomsReducer } from "./reducers/rooms-reducer";

export const UserDataContext = createContext({
    groups: [],
    groupsDispatcher: () => {},
    channels:[],
    channelsDispatcher: () => {},
    rooms:[],
    roomsDispatcher: () => {},
});

const UserDataContextProvider = ({children}) => {
    const [groups, groupsDispatcher] = useReducer(groupsReducer, []);
    const [channels, channelsDispatcher] = useReducer(channelsReducer, []);
    const [rooms, roomsDispatcher] = useReducer(roomsReducer, []);

    const context = {
        groups,
        groupsDispatcher,
        channels,
        channelsDispatcher,
        rooms,
        roomsDispatcher,
    };
    return (
        <UserDataContext.Provider value={context}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataContextProvider;
