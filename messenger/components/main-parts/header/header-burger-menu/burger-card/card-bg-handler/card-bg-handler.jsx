import {useRef} from "react";

const CardBgHandler = ({setSource,className}) => {

    const cardBgRef = useRef();

    const handleSetCardBg = () => {
        let blob = window.URL.createObjectURL(cardBgRef.current.files[0]);
        console.log("blob => ", blob);
        setSource(`url(${blob})`);
    };

    return (
        <div className={className}>
            <button
                onClick={() => cardBgRef.current.click()}
                className="btn  bg-transparent hw-40px">
                <i className="bi bi-image-fill text-white-50"></i>
            </button>
            <input
                onChange={handleSetCardBg}
                type="file"
                hidden={true}
                style={{display: "none"}}
                ref={cardBgRef}
            />
        </div>
    );
};

export default CardBgHandler;
