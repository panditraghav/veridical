import { EditorThemeClasses } from 'lexical';
import { EditorThemeClassName } from 'lexical/LexicalEditor';

interface VeridicalThemeClasses {
    editorContainer?: EditorThemeClassName;
    contentEditable?: EditorThemeClassName;
    veridicalImage?: {
        image?: EditorThemeClassName;
        selected?: EditorThemeClassName;
        fallback?: EditorThemeClassName;
        container?: EditorThemeClassName;
    };
    imageContainer?: EditorThemeClassName;
    imageSelected?: EditorThemeClassName;
    imageFallback?: EditorThemeClassName;
    placeholder?: EditorThemeClassName;
    overlay?: EditorThemeClassName;
    backdrop?: EditorThemeClassName;
    dialog?: {
        dialog?: EditorThemeClassName;
        contentContainer?: EditorThemeClassName;
        title?: EditorThemeClassName;
        actionGroup?: EditorThemeClassName;
    };
    input?: {
        text?: EditorThemeClassName;
        checkbox?: {
            container?: EditorThemeClassName;
            label?: EditorThemeClassName;
            input?: EditorThemeClassName;
        };
    };
    button?: {
        base?: EditorThemeClassName;
        primary?: EditorThemeClassName;
        secondary?: EditorThemeClassName;
        disabled?: EditorThemeClassName;
    };
    addNodeDialog?: {
        dialog?: EditorThemeClassName;
        searchInput?: EditorThemeClassName;
        nodeOptions?: EditorThemeClassName;
        nodeOption?: {
            container?: EditorThemeClassName;
            selected?: EditorThemeClassName;
            icon?: EditorThemeClassName;
            text?: {
                container?: EditorThemeClassName;
                name?: EditorThemeClassName;
                description?: EditorThemeClassName;
            };
        };
    };
    addImageDialog?: {
        imageInput?: {
            container?: EditorThemeClassName;
        };
        actionButtonGroup?: EditorThemeClassName;
    };
    hoverMenu?: {
        animation?: EditorThemeClassName;
    };
    hoverBlockOption?: {
        container?: EditorThemeClassName;
        button?: EditorThemeClassName;
        icon?: EditorThemeClassName;
    };
    dragTargetLine?: EditorThemeClassName;
    codeActionMenu?: {
        menuLeft?: EditorThemeClassName;
        menuRight?: EditorThemeClassName;
    };
    highlightMenu?: {
        menu?: EditorThemeClassName;
        menuButton?: EditorThemeClassName;
        menuButtonIconSelected?: EditorThemeClassName;
        menuButtonIcon?: EditorThemeClassName;
        animation?: EditorThemeClassName;
    };
    codeLanguageSelection?: {
        container?: EditorThemeClassName;
        name?: EditorThemeClassName;
        icon?: EditorThemeClassName;
        menu?: {
            container?: EditorThemeClassName;
            search?: EditorThemeClassName;
            optionContainer?: EditorThemeClassName;
            option?: EditorThemeClassName;
            optionSelected?: EditorThemeClassName;
            animation?: EditorThemeClassName;
        };
    };
    copyCodeButton?: EditorThemeClassName;
    editImageButton?: EditorThemeClassName;
    addLinkDialog?: {
        input?: EditorThemeClassName;
        animation?: EditorThemeClassName;
    };
    openLinkDialog?: {
        link?: EditorThemeClassName;
    };
    [key: string]: any;
}

interface LexicalThemeClasses extends EditorThemeClasses {
    imageContainer?: EditorThemeClassName;
}

export { VeridicalThemeClasses, LexicalThemeClasses };
