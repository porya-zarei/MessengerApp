import {Formik} from "formik";
import {useRouter} from "next/router";
import {useCallback, useContext, useEffect} from "react";
import {MainContext} from "../../../context/main-context";
import {UserContext} from "../../../context/user-context/user-context";
import {fetcher} from "../../../hooks/fetcher";
import classes from "./register.module.scss";
const Register = () => {
    const router = useRouter();
    const {setIsLoged, setToken,connectionId} = useContext(UserContext);
    const {onlineUsers} = useContext(MainContext);
    useEffect(() => {
        router.prefetch("/Messanger/");
    }, []);

    const handlingSubmit = async (values) => {
        const data = {...values};
        data["ConnectionID"] = connectionId;
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
    };

    return (
        <Formik
            initialValues={{
                Email: "",
                Password: "",
                UserName: "",
                FirstName: "",
                LastName: "",
            }}
            validate={(values) => {
                console.log("validate values in reg =>", values);
                const errors = {};
                const reg = new RegExp(
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                );
                if (!values.Email) {
                    errors.Email = "Required";
                } else if (reg.test(values.Email)) {
                    errors.Email = "Invalid email address";
                }
                return errors;
            }}
            onSubmit={async (values, {setSubmitting}) => {
                await handlingSubmit(values);
                console.log("values in reg =>", values);
                setSubmitting(false);
            }}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form
                    className={`${classes.registerForm}`}
                    onSubmit={handleSubmit}>
                    <img
                        className="mb-3"
                        src="/assets/images/svg/login-svg.svg"
                        alt=""
                    />
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="Email"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Email}
                        />
                        <label htmlFor="Email">Email</label>
                        {errors.Email || touched.Email || errors.Email}
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="Password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Password}
                        />
                        <label htmlFor="Password">Password</label>
                        {errors.Password || touched.Password || errors.Password}
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="UserName"
                            placeholder="UserName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.UserName}
                        />
                        <label htmlFor="UserName">UserName</label>
                        {errors.UserName || touched.UserName || errors.UserName}
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="FirstName"
                            placeholder="FirstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.FirstName}
                        />
                        <label htmlFor="FirstName">FirstName</label>
                        {errors.FirstName ||
                            touched.FirstName ||
                            errors.FirstName}
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="LastName"
                            placeholder="LastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.LastName}
                        />
                        <label htmlFor="LastName">LastName</label>
                        {errors.LastName || touched.LastName || errors.LastName}
                    </div>

                    <div className="mb-3">
                        <label>unline users : {onlineUsers}</label>
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-info"
                        type="submit"
                        disabled={isSubmitting}>
                        Register
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default Register;
