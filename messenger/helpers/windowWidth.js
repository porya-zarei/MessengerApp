import {useState, useEffect} from "react";

// const getWidth = () => window.innerWidth
//     || document.documentElement.clientWidth
//     || document.body.clientWidth;

function useCurrentWidth() {
    // save current window width in the state object
    let [width, setWidth] = useState(0);

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
        // timeoutId for debounce mechanism
        const getWidth = () => window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        let timeoutId = null;
        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => {
                setWidth(getWidth());
                console.log("width => ", width);
            }, 200);
        };
        // set resize listener
        window.addEventListener("resize", resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener("resize", resizeListener);
        };
    }, [width]);

    return width;
}

export default useCurrentWidth;
