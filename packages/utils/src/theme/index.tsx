import React, { useContext } from "react";
import { EditorThemeClasses } from "lexical/LexicalEditor";
import { defaultVeridicalTheme } from "./defaultVeridicalTheme";

interface VeridicalThemeClasses extends EditorThemeClasses {
    imageContainer?: string;
    imageSelected?: string;
    imageFallback?: string;
    placeholder?: string;
    backdrop?: string;
    dialog?: {
        dialog?: string;
        animation?: string;
    };
    button?: {
        base?: string;
        primary?: string;
        secondary?: string;
        disabled?: string;
    };
    addNodeDialog?: {
        dialog?: string;
        searchInput?: string;
        nodeOptions?: string;
        nodeOption?: {
            container?: string;
            selected?: string;
            icon?: string;
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
    highlightMenu?:{
        menu?: string;
        menuContainer?: string;
        menuButton?: string;
        menuButtonIcon?: string;
    },
    hoverMenu?: {
        animation?: string;
    };
    hoverBlockOption?: {
        container?: string;
    };
    imageResizer?: {
        container?: string;
        paddle?: string;
    };
    codeActionMenu?: {
        menuLeft?: string;
        menuRight?: string;
    };
    codeLanguageSelection?: {
        container?: string;
        name?: string;
        icon?: string;
        menu?: {
            container?: string;
            search?: string;
            optionContainer?: string;
            option?: string;
            optionSelected?: string;
            animation?: string;
        };
    };
    copyCodeButton?: string;
}

const VeridicalThemeContext = React.createContext<
    VeridicalThemeClasses | null | undefined
>(null);

function VeridicalThemeComposer({
    theme,
    children,
}: {
    theme?: VeridicalThemeClasses;
    children?: React.ReactNode;
}) {
    return (
        <VeridicalThemeContext.Provider value={theme}>
            {children}
        </VeridicalThemeContext.Provider>
    );
}

function useVeridicalTheme(): VeridicalThemeClasses | null | undefined {
    return useContext(VeridicalThemeContext);
}

export {
    VeridicalThemeClasses,
    useVeridicalTheme,
    VeridicalThemeComposer,
    defaultVeridicalTheme,
};
