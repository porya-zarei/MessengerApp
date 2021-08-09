import {useEffect, useState} from "react";

const ImageChat = ({imageName}) => {
    const [source, setSource] = useState("");
    const [show, setShow] = useState(false);
    const handleShowImage = () => {
        setSource(`https://localhost:44389/files/images/${imageName}`);
        localStorage.setItem(
            `${imageName}`,
            `https://localhost:44389/files/images/${imageName}`,
        );
        setShow(true);
    };
    useEffect(() => {
        if (localStorage.getItem(`${imageName}`)) {
            setSource(localStorage.getItem(`${imageName}`));
        }
    }, []);
    if (!show&& source.length > 0) {
        return <img alt={imageName} title={imageName} src={source} className="w-100" height="200px" />;
    }
    return show ? (
        <img alt={imageName} title={imageName} src={source} className="w-100" height="200px" />
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
