import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../../context/user-context/user-context";
import {fetcher} from "../../../../../hooks/fetcher";
import classes from "./burgeredituser.module.scss";

const EditUser = () => {
    const [showForm, setShowForm] = useState(false);
    const {user, token, setUser} = useContext(UserContext);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const imageRef = useRef();
    useEffect(() => {
        console.log("user in edit => ", user);
        setUserName(user?.UserName);
        setFirstName(user?.FirstName);
        setLastName(user?.LastName);
        setEmail(user?.Email);
        setPassword(user?.Password);
        setDescription(user?.Description);
    }, [user]);

    const handleUpdateUser = async () => {
        const data = {
            FirstName: firstName === user.FirstName ? null : firstName,
            LastName: lastName === user.LastName ? null : lastName,
            UserName: userName === user.UserName ? null : userName,
            Email: email === user.Email ? null : email,
            Password: password === user.Password ? null : password,
            Description: description === user.Description ? null : description,
            Image:
                imageRef.current.files[0] === null
                    ? null
                    : imageRef.current.files[0],
        };
        console.log("detail befor update user => ", token, data);
        var form_data = new FormData();
        for (var key in data) {
            if (data[key]!== null) {
                form_data.append(key, data[key]);
            }
        }
        const {result, isError, error} = await fetcher(
            "POST",
            "Users/UpdateUser",
            form_data,
            token,
            "multipart/form-data",
        );
        if (!isError) {
            console.log("result in update User => ", result);
            setUser(result);
        } else {
            console.log("error in handle update user \n", result, error);
        }
    };

    return (
        <div className={`${classes.container}`}>
            <div className={`${classes.btnContainer}`}>
                <button
                    onClick={() => {
                        setShowForm((p) => !p);
                    }}
                    className={`${classes.btn} btn btn-outline-dark`}>
                        Edit your info
                    </button>
            </div>
            <div
                style={{display: showForm ? "block" : "none"}}
                className={`${classes.editUserFormContainer}`}>
                <div className={`${classes.title}`}>
                    <div className="text-white-50">Editing your info</div>
                    <button
                        onClick={() => setShowForm(false)}
                        className="btn btn-danger hw-40px rounded rounded-circle">
                        <i className="bi bi-x"></i>
                    </button>
                </div>

                <div className={`${classes.inputContainer}`}>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        type="text"
                        className={`${classes.input}`}
                    />
                    <div className="text-white-50">FirstName : </div>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        type="text"
                        className={`${classes.input}`}
                    />
                    <div className="text-white-50">LastName : </div>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <input
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        type="text"
                        className={`${classes.input}`}
                    />
                    <div className="text-white-50">UserName : </div>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        className={`${classes.input}`}
                    />
                    <div className="text-white-50">Email : </div>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="text"
                        className={`${classes.input}`}
                    />
                    <div className="text-white-50">Password : </div>
                </div>
                <div className={`${classes.inputContainer}`}>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        type="text"
                        className={`${classes.input}`}
                    />
                    <div className="text-white-50">Bio : </div>
                </div>
                <div className={`${classes.imageContainer}`}>
                    <input
                        ref={imageRef}
                        type="file"
                        className={`${classes.image}`}
                        hidden="true"
                    />
                    <button
                        onClick={() => {
                            imageRef.current.click();
                        }}
                        className={`${classes.imageBtn}`}>
                        <i className="bi bi-image"></i>
                    </button>
                </div>
                <div className={`${classes.sendBtnContainer}`}>
                    <button
                        onClick={handleUpdateUser}
                        className={`${classes.sendBtn}`}>
                        send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
