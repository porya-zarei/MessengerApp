import {useEffect, useState} from "react";
import {fetcher} from "./fetcher";

const useAxios = ({
    type = "",
    url = "",
    datas,
    token = "",
    contentType = "application/json",
}) => {
    const base_Url = "https://localhost:44389";
    const [result, setResult] = useState();
    const [status, setStatus] = useState();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        (async () => {
            const {result, resStatus, error, isError} = await fetcher(
                type,
                url,
                datas,
                token,
                contentType,
            );
            setResult(result);
            setStatus(resStatus);
            setError(error);
            setIsError(isError);
        })().then(r => r).then(res => res);
    }, []);
    return {
        result,
        status,
        error,
        isError,
    };
};

export default useAxios;
