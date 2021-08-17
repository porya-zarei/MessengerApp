import {http} from "../axios/http";
import {api_url} from "../configs/configs";

export const fetcher = async (
    type = "",
    url = "",
    datas,
    token = "",
    contentType = "application/json",
) => {
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
    console.log("in fetcher => ", type, `${api_url}/${url}`, datas);
    switch (type) {
        case "GET":
            try {
                console.log("in get => ", type, `${api_url}/${url}`, options);
                const {data, status} = await http.get(
                    `${api_url}/${url}`,
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
                console.log("data in post => ", type, datas,token);
                const {data, status} = await http.post(
                    `${api_url}/${url}`,
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
                    `${api_url}/${url}`,
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
                    `${api_url}/${url}`,
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
