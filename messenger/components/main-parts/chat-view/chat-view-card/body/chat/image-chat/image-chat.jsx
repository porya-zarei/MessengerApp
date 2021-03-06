import {useEffect, useState} from "react";
import {files_url} from "../../../../../../../configs/configs";
import classes from "./imagechat.module.scss";

const ImageChat = ({imageName, me}) => {
    const [source, setSource] = useState("");
    const [show, setShow] = useState(false);
    const handleShowImage = () => {
        setSource(`${files_url}/images/${imageName}`);
        localStorage.setItem(
            `${imageName}`,
            `${files_url}/images/${imageName}`,
        );
        setShow(true);
    };
    useEffect(() => {
        if (localStorage.getItem(`${imageName}`)) {
            setSource(localStorage.getItem(`${imageName}`));
        }
    }, []);
    if (!show && source.length > 0) {
        return (
            <img
                alt={imageName}
                title={imageName}
                src={source}
                style={{transformOrigin: `bottom ${me ? "right" : "left"}`}}
                className={`w-100 ${classes.image}`}
                height="200px"
            />
        );
    }
    return show ? (
        <img
            alt={imageName}
            title={imageName}
            src={source}
            style={{transformOrigin: `bottom ${me ? "right" : "left"}`}}
            className={`w-100 ${classes.image}`}
            height="200px"
        />
    ) : (
        <div className="bg-secondary w-100 center" style={{height: "200px"}}>
            <button
                onClick={handleShowImage}
                className="rounded rounded-circle hw-40px center btn btn-dark text-white">
                <i className="bi bi-download text-white"></i>
            </button>
        </div>
    );
};

export default ImageChat;
