import {useEffect, useLayoutEffect, useRef} from "react";

const ChatsCount = ({count, className}) => {
    const blinker = useRef();
    useLayoutEffect(() => {
        let start = setTimeout(() => {
            blinker.current.classList.add("chats-count");
        }, 10);
        let end = setTimeout(() => {
            blinker.current.classList.remove("chats-count");
        }, 3000);
        return () => {
            clearTimeout(start);
            clearTimeout(end);
        };
    },[count]);
    return (
        <span
            id="blinker"
            ref={blinker}
            className={`${className}`}>
            <span className="">{count}</span>
        </span>
    );
};

export default ChatsCount;
