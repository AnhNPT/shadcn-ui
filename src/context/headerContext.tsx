import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

type HeaderContextType = {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
    number: number,
    setNumber: Dispatch<SetStateAction<number>>
};

const HeaderContext = createContext<HeaderContextType>({
    state: "abc",
    setState: () => {},
    number: 1,
    setNumber: () => {}
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<string>("abc");
    const [number, setNumber] = useState<number>(1)

    return <HeaderContext.Provider value={{ state, setState, number, setNumber }}>{children}</HeaderContext.Provider>;
};

export const useHeaderContext = () => useContext(HeaderContext);
