import React, { useContext } from "react";
import { EditorThemeClasses } from "lexical/LexicalEditor";
import { defaultMarkorTheme } from "./defaultMarkorTheme";

interface MarkorThemeClasses extends EditorThemeClasses {
    dialog: string;
}

const MarkorThemeContext = React.createContext<
    MarkorThemeClasses | null | undefined
>(null);

function MarkorThemeComposer({
    theme,
    children,
}: {
    theme?: MarkorThemeClasses;
    children?: React.ReactNode;
}) {
    return (
        <MarkorThemeContext.Provider value={theme}>
            {children}
        </MarkorThemeContext.Provider>
    );
}

function useMarkorTheme(): MarkorThemeClasses | null | undefined {
    return useContext(MarkorThemeContext);
}

export {
    MarkorThemeClasses,
    useMarkorTheme,
    MarkorThemeComposer,
    defaultMarkorTheme,
};
