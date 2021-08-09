import {useRouter} from "next/router";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../context/main-context";
import {UserContext} from "../../../context/user-context/user-context";
import {fetcher} from "../../../hooks/fetcher";
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
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(false);
    const handleBlur = (type) => {
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
        } else {
            let err = "";
            if (userName.length < 5) {
                err += "userName is too Short and must be unique";
            }
            if (userNameError != err) setUserNameError(err);
        }
    };

    useEffect(() => {
        router.prefetch("/Messanger/");
    }, []);

    const handlingSubmit = async (e) => {
        e.preventDefault();
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
                router.replace("/Messanger/");
            }
        } catch (error) {
            console.log("error in register =>", error);
        }
        setLoading(false);
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
                    onBlur={() => handleBlur("username")}
                    required
                />
                <label htmlFor="UserUniqueNameRegister">UserName</label>
                <span className="text-danger my-3 mx-1">{userNameError}</span>
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