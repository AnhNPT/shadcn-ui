import { useEffect, useState } from "react";

const useDebounce = (value: string | number | any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string | number | any>(value);

    useEffect(() => {
        if (delay) {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        } else {
            setDebouncedValue(value);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
