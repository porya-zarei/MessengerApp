import {useRouter} from "next/router";
import {useCallback, useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {UserContext} from "../../../context/user-context/user-context";
import classes from "./login.module.scss";
import {fetcher} from "../../../hooks/fetcher";

const Login = () => {
    const router = useRouter();
    const {setIsLoged, connectionId, setToken} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [emailError, setErrorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setErrorPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleBlur = (type="") => {
        if (type === "password") {
            if (password.length < 4) {
                setErrorPassword(" Your Password is too Short ");
            } else {
                setErrorPassword("");
            }
        } else if (type === "email") {
            const reg = new RegExp(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
            if (!email.includes("@") || !email.includes(".")) {
                setErrorEmail(" Email Address is Wrong ");
            } else {
                setErrorEmail("");
            }
        } else {
            const reg = new RegExp(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
            if (
                email.includes("@") &&
                email.includes(".") &&
                password.length > 4
            ) {
                return true;
            }
        }
    };

    useEffect(() => {
        router.prefetch("/Messanger/");
        let timeOut = setTimeout(()=>{
            if (
                connectionId.length > 0 &&
                localStorage.getItem("userLoginInfo")
            ) {
                if (localStorage.getItem("userLoginInfo").length > 0) {
                    let autoLoginData = JSON.parse(
                        localStorage.getItem("userLoginInfo"),
                    );
                    autoLoginData.ConnectionID = connectionId;
                    handleAutoLogin(autoLoginData)
                        .then((r) => r)
                        .then((res) => {
                            console.log(
                                "result in promis of auto login => ",
                                res,
                            );
                        })
                        .catch((error) => {
                            console.log(
                                "error in promis of auto login => ",
                                error,
                            );
                        });
                }
            }
        },500);
        return ()=>{
            clearTimeout(timeOut);
        }
    }, [connectionId]);

    const handleAutoLogin = async (data) => {
        const {result, isError} = await fetcher("POST", "Auth/Login", data);
        if (!isError && result !== null && result !== undefined) {
            setIsLoged(true);
            setToken(result);
            if (document) {
                let cookie = `Token=${result};path=/;`;
                console.log("cookie set in Auto login => ", cookie);
                document.cookie = cookie;
            }
            router.replace("/Messanger/");
        }
    };

    const handlingSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(
            "before test login => ",
            email,
            password,
            rememberMe,
            handleBlur("test"),
        );
        if (handleBlur("test")) {
            const data = {
                Email: email,
                Password: password,
                ConnectionID: connectionId,
            };

            try {
                console.log("in handle reg => ", data);
                const {result, isError} = await fetcher(
                    "POST",
                    "Auth/Login",
                    data,
                );
                console.log("in loging => ", result, isError);
                if (!isError && result !== null && result !== undefined) {
                    setIsLoged(true);
                    setToken(result);
                    if (document) {
                        let cookie = `Token=${result};path=/;`;
                        console.log("cookie set in login => ", cookie);
                        document.cookie = cookie;
                    }
                    if (rememberMe) {
                        localStorage.setItem(
                            "userLoginInfo",
                            JSON.stringify({Email: email, Password: password}),
                        );
                    }
                    router.replace("/Messanger/");
                }
            } catch (error) {
                console.log("error in login =>", error);
            }
        }
        setLoading(false);
    };

    return (
        <form className={`${classes.loginForm} mb-3`} onSubmit={handlingSubmit}>
            <img
                className="mb-4"
                src="/assets/images/svg/login-svg.svg"
                alt=""
            />
            <h1 className="h3 mb-3 fw-normal">Please Login For Join</h1>

            <div className="form-floating mb-2">
                <input
                    type="email"
                    className="form-control"
                    id="EmailField"
                    placeholder="name@example.com"
                    onChange={handleChangeEmail}
                    value={email}
                    onBlur={() => handleBlur("email")}
                />
                <label htmlFor="EmailField">Email address</label>
                <span className="text-danger my-3 mx-1">{emailError}</span>
            </div>
            <div className="form-floating mb-2">
                <input
                    type="password"
                    className="form-control"
                    id="PasswordField"
                    placeholder="Password"
                    onChange={handleChangePassword}
                    value={password}
                    onBlur={() => handleBlur("password")}
                />
                <label htmlFor="PasswordField">Password</label>
                <span className="text-danger mx-1 my-3">{passwordError}</span>
            </div>

            <div className="checkbox mb-3">
                <label>
                    <input
                        type="checkbox"
                        value={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />{" "}
                    Remember me
                </label>
            </div>
            <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled={loading}>
                {loading ? <i className="spinner-border h-100"></i> : "Login"}
            </button>
        </form>
    );
};

export default Login;
