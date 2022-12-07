import React, { useContext } from "react";
import { EditorThemeClasses } from "lexical/LexicalEditor";
import { defaultMarkorTheme } from "./defaultMarkorTheme";

interface MarkorThemeClasses extends EditorThemeClasses {
    placeholder?: string;
    backdrop?: string;
    dialog?: {
        dialog?: string;
        animation?: string;
    };
    button?:{
        base?: string;
        primary?: string;
        secondary?: string;
        disabled?: string;
    }
    addNodeDialog?: {
        dialog?: string;
        searchInput?: string;
        nodeOption?: {
            container?: string;
            selected?: string;
            image?: string;
            text?: {
                container?: string;
                name?: string;
                description?: string;
            };
        };
    };
    addImageDialog?: {
        dialog?: string;
        title?: string;
        imageInput?: {
            container?: string;
            urlInput?: string;
            fileInput?: string;
            fileInputLabel?: string;
        };
        altTextInput?: string;
        actionButtonGroup?: string;
    };
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
