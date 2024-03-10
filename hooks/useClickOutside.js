import {useEffect, useRef} from "react";

export const useClickOutside = (ref, callback, delay = 0) => {
    const timeoutRef = useRef(null);

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                callback();
            }, delay);
        }
    };

    useEffect(() => {
            document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);
}