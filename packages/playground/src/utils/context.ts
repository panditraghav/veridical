import { createContext, useContext } from 'react';

type Modes = 'light' | 'dark';
export const AppContext = createContext<{
    isHTML: boolean;
    setIsHTML: (isHTML: boolean) => void;
    showTreeView: boolean;
    setShowTreeView: (showTreeView: boolean) => void;
    mode: Modes;
    setMode: (mode: Modes) => void;
}>({
    isHTML: false,
    setIsHTML: () => {
        //
    },
    showTreeView: true,
    setShowTreeView: () => {
        //
    },
    mode: 'dark',
    setMode: () => {
        //
    },
});

export const useAppContext = () => useContext(AppContext);
