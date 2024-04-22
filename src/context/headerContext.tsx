import React, { createContext, useContext, useState,  Dispatch, SetStateAction  } from 'react';

type HeaderContextType = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
};

const HeaderContext = createContext<HeaderContextType>({
  state: 'abc',
  setState: () => {},
});

export const HeaderProvider = ({ children }: {
    children: React.ReactNode
}) => {
  const [state, setState] = useState<string>('abc');

  return <HeaderContext.Provider value={{ state, setState }}>{children}</HeaderContext.Provider>;
};

export const useHeaderContext = () => useContext(HeaderContext);
