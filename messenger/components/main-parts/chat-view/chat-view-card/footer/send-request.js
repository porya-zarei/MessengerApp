import {fetcher} from "../../../../../hooks/fetcher";

export const sendRequest = async (
    chatsToShow,
    token,
    text,
    userId,
    file = null,
    image = null,
    video = null,
    voice = null,
) => {
    if (chatsToShow.type === "channel") {
        const data = {
            Text: text,
            ChannelID: chatsToShow.Id,
            SenderID: userId,
        };
        var form_data = new FormData();

        for (var key in data) {
            form_data.append(key, data[key]);
        }
        if (file !== null) {
            form_data.append("File", file);
        }
        if (image !== null) {
            form_data.append("Image", image);
        } else {
            if (video !== null) {
                form_data.append("Video", video);
            }
        }
        if (voice !== null) {
            form_data.append("Voice", voice);
        }
        console.log(
            "data in channel => ",
            form_data.keys(),
            form_data.values(),
        );
        const {result, isError, resStatus, error} = await fetcher(
            "POST",
            "Channels/SendChannelChat",
            form_data,
            token,
            "multipart/form-data",
        );
        return {result, isError, resStatus, error};
    } else if (chatsToShow.type === "group") {
        const data = {
            Text: text,
            GroupID: chatsToShow.Id,
            SenderID: userId,
        };
        var form_data = new FormData();

        for (var key in data) {
            form_data.append(key, data[key]);
        }
        if (file !== null) {
            form_data.append("File", file);
        }
        if (image !== null) {
            form_data.append("Image", image);
        } else {
            if (video !== null) {
                form_data.append("Video", video);
            }
        }
        if (voice !== null) {
            form_data.append("Voice", voice);
        }
        console.log(
            "data in channel => ",
            form_data.keys(),
            form_data.values(),
        );
        const {result, isError, resStatus, error} = await fetcher(
            "POST",
            "Groups/SendGroupChat",
            form_data,
            token,
            "multipart/form-data",
        );
        return {result, isError, resStatus, error};
    } else {
        const data = {
            Text: text,
            RoomID: chatsToShow.Id,
            SenderID: userId,
        };
        var form_data = new FormData();

        for (var key in data) {
            form_data.append(key, data[key]);
        }
        if (file !== null) {
            form_data.append("File", file);
        }
        if (image !== null) {
            form_data.append("Image", image);
        } else {
            if (video !== null) {
                form_data.append("Video", video);
            }
        }
        if (voice !== null) {
            form_data.append("Voice", voice);
        }
        console.log("data in room => ", token, data, image, file, form_data);
        const {result, isError, resStatus, error} = await fetcher(
            "POST",
            "Rooms/SendRoomChat",
            form_data,
            token,
            "multipart/form-data",
        );
        return {result, isError, resStatus, error};
    }
};
