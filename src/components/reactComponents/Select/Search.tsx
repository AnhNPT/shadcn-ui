/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable linebreak-style */

import useDebounce from "@/utils/useDebounce";
import { HTMLProps, useEffect, useRef, useState } from "react";

interface ISearch extends HTMLProps<HTMLInputElement> {
    searchClassName: string;
    setSearchKeyword: (keyword: string, name?: string) => void;
    delay?: number;
    name?: string;
}

// keyword
const Search = (props: ISearch) => {
    const { searchClassName, value, delay, setSearchKeyword, name, ...inputProps } = props;
    const [debounceSearch, setDebounceSearch] = useState<string | number | readonly string[] | undefined>(() => {
        return value;
    });
    const keyword = useDebounce(debounceSearch, delay ?? 1000);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setDebounceSearch("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    useEffect(() => {
        setSearchKeyword(keyword, name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    useEffect(() => {
        return () => {
            handleClear();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={searchClassName}>
            <input
                type="text"
                ref={inputRef}
                {...inputProps}
                value={debounceSearch}
                className="global_search text_sm_medium"
                onChange={(e) => {
                    setDebounceSearch(e.currentTarget.value);
                }}></input>
            <div className="input_search_button"></div>
            <div onClick={handleClear} className={`cursor_pointer input_clear_button  ${debounceSearch ? "" : "d_none"}`}></div>
        </div>
    );
};

export default Search;
