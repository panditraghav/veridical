import { EditorThemeClasses } from 'lexical/LexicalEditor';
import { defaultVeridicalTheme } from './defaultVeridicalTheme';
import { defaultLexicalTheme } from './defaultLexicalTheme';

interface VeridicalThemeClasses extends EditorThemeClasses {
    editorContainer?: string;
    contentEditable?: string;
    veridicalImage?: {
        image?: string;
        container?: string;
        selected?: string;
        fallback?: string;
    };
    imageContainer?: string;
    imageSelected?: string;
    imageFallback?: string;
    placeholder?: string;
    backdrop?: string;
    dialog?: {
        dialog?: string;
        contentContainer?: string;
        title?: string;
        actionGroup?: string;
    };
    input?: {
        text?: string;
        checkbox?: {
            container?: string;
            label?: string;
            input?: string;
        };
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
        imageInput?: {
            container?: string;
        };
        actionButtonGroup?: string;
    };
    hoverMenu?: {
        animation?: string;
    };
    hoverBlockOption?: {
        container?: string;
        button?: string;
        icon?: string;
    };
    dragTargetLine?: string;
    codeActionMenu?: {
        menuLeft?: string;
        menuRight?: string;
    };
    highlightMenu?: {
        menu?: string;
        menuButton?: string;
        menuButtonIconSelected?: string;
        menuButtonIcon?: string;
        animation?: string;
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
    editImageButton?: string;
    addLinkDialog?: {
        input?: string;
        animation?: string;
    };
    openLinkDialog?: {
        link?: string;
    };
}

export { VeridicalThemeClasses, defaultVeridicalTheme, defaultLexicalTheme };
