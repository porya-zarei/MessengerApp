import {useRouter} from "next/router";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../context/main-context";
import {UserContext} from "../../../context/user-context/user-context";
import {fetcher} from "../../../hooks/fetcher";
import {toast} from "react-toastify";
import classes from "./register.module.scss";
const Register = () => {
    const router = useRouter();
    const {setIsLoged, setToken, connectionId} = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userNameError, setUserNameError] = useState("");
    const [userNameConfirmed, setUserNameConfirmed] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(false);

    const testUserName = async () => {
        if (userName.length<5) {
            setUserNameError("user name is too short must be greater than 5 character");
        } else {
            const {result} = await fetcher(
                "GET",
                "Main/TestUserName?userName=" + userName,
                null,
            );
            if (result !== undefined && result !== null && result) {
                setUserNameError("");
            } else {
                setUserNameError("user name is not unique");

            }
        }
    };

    const handleBlur = async (type) => {
        if (type === "email") {
            let err = "";
            if (!email.includes("@")) {
                err += "Email dont have @";
            }
            if (!email.includes(".")) {
                err.length > 0 ? (err += " | ") : null;
                err += "Email dont have '.'";
            }
            if (emailError !== err) setEmailError(err);
        } else if (type === "password") {
            let err = "";
            if (password.length < 4) {
                err += "password is too short";
            }
            if (passwordError != err) setPasswordError(err);
        }
    };

    const handleAllError = () => {
        let flag = false;
        if (userNameError.length > 0) {
            toast.error("username must be unique !");
            flag = true;
        }
        if (!email.includes("@") || !email.includes(".")) {
            toast.error("email must be valid !");
            flag = true;
        }
        if (password.length < 5) {
            toast.error("password must be strong !");
            flag= true;
        }

        return flag;
    };

    useEffect(() => {
        router.prefetch("/Messenger/");
    }, []);

    const handlingSubmit = async (e) => {
        e.preventDefault();

        if (!handleAllError()) {
            setLoading(true);
            const data = {
                Email: email,
                Password: password,
                UserName: userName,
                FirstName: firstName,
                LastName: lastName,
                ConnectionID: connectionId,
            };
            try {
                console.log("in handle reg => ", data);
                const {result, isError} = await fetcher(
                    "POST",
                    "Auth/Register",
                    data,
                );
                console.log("in registering => ", result, isError);
                if (!isError && result !== null && result !== undefined) {
                    setIsLoged(true);
                    setToken(result);
                    if (document) {
                        let cookie = `Token=${result};path=/;`;
                        console.log("cookie set in login => ", cookie);
                        document.cookie = cookie;
                    }
                    router.replace("/Messenger/");
                }
            } catch (error) {
                console.log("error in register =>", error);
            }
            setLoading(false);
        }
    };

    return (
        <form className={`${classes.registerForm}`} onSubmit={handlingSubmit}>
            <img
                className="mb-3"
                src="/assets/images/svg/login-svg.svg"
                alt="register Page image"
            />
            <div className="form-floating my-4">
                <Link href="/Auth/Login">
                    <a className="btn btn-warning w-100 h-auto">Login</a>
                </Link>
            </div>
            <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

            <div className="form-floating my-2">
                <input
                    type="email"
                    className="form-control"
                    id="EmailRegister"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onBlur={() => handleBlur("email")}
                    required
                />
                <label htmlFor="EmailRegister">Email</label>
                <span className="text-danger my-3 mx-1">{emailError}</span>
            </div>
            <div className="form-floating my-2">
                <input
                    type="password"
                    className="form-control"
                    id="PasswordRegister"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onBlur={() => handleBlur("password")}
                    required
                />
                <label htmlFor="PasswordRegister">Password</label>
                <span className="text-danger my-3 mx-1">{passwordError}</span>
            </div>

            <div className="form-floating my-2">
                <input
                    type="text"
                    className="form-control"
                    id="UserUniqueNameRegister"
                    placeholder="UserUniqueName"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    onBlur={testUserName}
                    required
                />
                <label htmlFor="UserUniqueNameRegister">UserName</label>
                <span
                    className={`my-3 mx-1 ${
                        userNameError.length > 0
                            ? "text-danger"
                            : "text-success"
                    }`}>
                    {userNameError.length > 0
                        ? userNameError
                        : "user name confirmed"}
                </span>
            </div>
            <div className="form-floating my-2">
                <input
                    type="text"
                    className="form-control"
                    id="FirstNameRegister"
                    placeholder="FirstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                />
                <label htmlFor="FirstNameRegister">FirstName</label>
            </div>

            <div className="form-floating my-2">
                <input
                    type="text"
                    className="form-control"
                    id="LastNameRegister"
                    placeholder="LastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                />
                <label htmlFor="LastNameRegister">LastName</label>
            </div>
            <button
                className="w-100 btn btn-lg btn-info"
                type="submit"
                disabled={loading}>
                Register
            </button>
        </form>
    );
};

export default Register;
