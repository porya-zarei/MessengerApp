import {http} from "../axios/http";

export const fetcher = async (
    type = "",
    url = "",
    datas,
    token = "",
    contentType = "application/json",
) => {
    const base_Url = "https://localhost:44389/api";
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": contentType,
        },
    };

    let result,
        error,
        isError = false,
        resStatus;
    console.log("in fetcher => ", type, `${base_Url}/${url}`, datas);
    switch (type) {
        case "GET":
            try {
                console.log("in get => ", type, `${base_Url}/${url}`, options);
                const {data, status} = await http.get(
                    `${base_Url}/${url}`,
                    datas,
                    options,
                );
                result = data;
                resStatus = status;
            } catch (err) {
                isError = true;
                error = err;
            }
            break;

        case "POST":
            try {
                console.log("data in post => ", type, datas);
                const {data, status} = await http.post(
                    `${base_Url}/${url}`,
                    datas,
                    options,
                );
                console.log("res in post => ", data);
                result = data;
                resStatus = status;
            } catch (err) {
                console.log(`err => `, err);
                isError = true;
                error = err;
            }
            break;

        case "PUT":
            try {
                const {data, status} = await http.put(
                    `${base_Url}/${url}`,
                    datas,
                    options,
                );
                result = data;
                resStatus = status;
            } catch (err) {
                isError = true;
                error = err;
            }
            break;

        case "DELET":
            try {
                const {data, status} = await http.delete(
                    `${base_Url}/${url}`,
                    datas,
                    options,
                );
                result = data;
                resStatus = status;
            } catch (err) {
                isError = true;
                error = err;
            }
            break;
    }
    return {
        result,
        resStatus,
        error,
        isError,
    };
};
