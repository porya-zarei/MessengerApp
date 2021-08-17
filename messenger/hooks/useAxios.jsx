import {useEffect, useState} from "react";
import {fetcher} from "./fetcher";

const useAxios = ({
    type = "",
    url = "",
    datas,
    token = "",
    contentType = "application/json",
}) => {
    const [result, setResult] = useState();
    const [status, setStatus] = useState();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        const {result, resStatus, error, isError} = await fetcher(
            type,
            url,
            datas,
            token,
            contentType,
        )
            .then(({error, result, isError, resStatus}) => {
                setResult(result);
                setStatus(resStatus);
                setError(error);
                setIsError(isError);
            })
            .catch((err) => {
                setError(err);
                setIsError(true);
            });
    }, []);
    return {
        result,
        status,
        error,
        isError,
    };
};

export default useAxios;
