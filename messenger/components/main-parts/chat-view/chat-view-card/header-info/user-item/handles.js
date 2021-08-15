import { fetcher } from "../../../../../../hooks/fetcher";

export const handleRemoveUser = async (type, id, userId, token) => {
    if (type === "channel") {
        const data = {
            ChannelID: id,
            UserID: userId,
        };

        const {result, error} = await fetcher(
            "POST",
            "Channels/RemoveUserFromChannel",
            data,
            token,
        );
        console.log("result in remove user from channel => ", result, error);
        return result;
    } else if (type === "group") {
        const data = {
            GroupID: id,
            UserID: userId,
        };

        const {result, error} = await fetcher(
            "POST",
            "Groups/RemoveUserFromGroup",
            data,
            token,
        );
        console.log("result in remove user from group => ", result, error);
        return result;
    }
};
export const handleAddAdmin = async (type, id, userId, token) => {
    if (type === "channel") {
        const data = {
            ChannelID: id,
            UserID: userId,
        };

        const {result, error} = await fetcher(
            "POST",
            "Channels/AddAdminToChannel",
            data,
            token,
        );
        console.log("result in remove user from channel => ", result, error);
        return result;
    } else if (type === "group") {
        const data = {
            GroupID: id,
            UserID: userId,
        };

        const {result, error} = await fetcher(
            "POST",
            "Groups/AddAdminToGroup",
            data,
            token,
        );
        console.log("result in remove user from group => ", result, error);
        return result;
    }
};
export const handleRemoveAdmin = async (type, id, userId, token) => {
    if (type === "channel") {
        const data = {
            ChannelID: id,
            UserID: userId,
        };

        const {result, error} = await fetcher(
            "POST",
            "Channels/RemoveAdminFromChannel",
            data,
            token,
        );
        console.log("result in remove admin from channel => ", result, error);
        return result;
    } else if (type === "group") {
        const data = {
            GroupID: id,
            UserID: userId,
        };

        const {result, error} = await fetcher(
            "POST",
            "Groups/RemoveAdminFromGroup",
            data,
            token,
        );
        console.log("result in remove admin from group => ", result, error);
        return result;
    }
};
