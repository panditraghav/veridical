import { VeridicalThemeClasses } from '.';

const tokenAttr = 'dark:text-teal-400 text-cyan-700';
const tokenProperty = 'dark:text-amber-500';
const tokenComment = 'dark:text-amber-100 text-neutral-500';
const tokenVariable = 'dark:text-amber-800';
const keyword = 'dark:text-purple-300 text-fuchsia-700';
const string = 'dark:text-lime-500 text-green-600';

export const defaultVeridicalTheme: VeridicalThemeClasses = {
    editorContainer: 'md:max-w-[760px] md:mx-16 w-full px-4',
    contentEditable: 'focus:outline-none',
    characterLimit: 'DefaultEditorTheme__characterLimit',
    code: 'bg-gray-100 dark:bg-neutral-800 block w-full px-8 py-6 rounded-md box-border text-gray-800 dark:text-gray-100 drop-shadow-md',
    codeHighlight: {
        atrule: tokenAttr,
        attr: tokenAttr,
        boolean: tokenProperty,
        builtin: 'DefaultEditorTheme__tokenSelector',
        cdata: 'DefaultEditorTheme__tokenComment',
        char: 'DefaultEditorTheme__tokenSelector',
        class: tokenAttr,
        'class-name': tokenAttr,
        comment: tokenComment,
        constant: tokenProperty,
        deleted: tokenProperty,
        doctype: tokenComment,
        entity: 'DefaultEditorTheme__tokenOperator',
        function: tokenAttr,
        important: tokenVariable,
        inserted: 'DefaultEditorTheme__tokenSelector',
        keyword: keyword,
        namespace: tokenVariable,
        number: tokenProperty,
        operator: 'DefaultEditorTheme__tokenOperator',
        prolog: tokenComment,
        property: tokenProperty,
        punctuation: 'dark:text-gray-100',
        regex: tokenVariable,
        selector: 'DefaultEditorTheme__tokenSelector',
        string: string,
        symbol: tokenProperty,
        tag: tokenProperty,
        url: 'DefaultEditorTheme__tokenOperator',
        variable: tokenVariable,
    },
    hashtag: 'DefaultEditorTheme__hashtag',
    heading: {
        h1: 'text-6xl text-editor-title-dark font-bold mt-8 mb-12 dark:text-editor-title-light',
        h2: 'text-5xl font-bold text-editor-h2-dark dark:text-editor-h2-light my-6',
        h3: 'text-3xl font-semibold text-editor-h3-dark dark:text-editor-h3-light my-4',
    },
    image: 'w-full h-[420px] rounded-sm cursor-pointer',
    veridicalImage: {
        selected: 'box-border border-2 border-editor-button-primary',
        container: 'flex flex-row justify-center my-4 mx-0',
        fallback: 'bg-gray-600 animate-pulse h-[420px]',
    },
    link: 'text-blue-600',
    list: {
        ol: 'my-2 pl-8',
        ul: 'my-2 pl-8',
        listitem:
            'text-xl my-1 mx-2 text-editor-p-dark dark:text-editor-p-light',
        listitemChecked: 'DefaultEditorTheme__listItemChecked',
        listitemUnchecked: 'DefaultEditorTheme__listItemUnchecked',
        nested: {
            listitem: 'list-none',
        },
        olDepth: [
            'list-decimal',
            'list-[upper-alpha]',
            'list-[lower-alpha]',
            'list-[upper-roman]',
            'list-[lower-roman]',
        ],
        ulDepth: [
            'list-disc',
            'list-[square]',
            'list-[circle]',
            'list-[circle]',
        ],
    },
    ltr: 'DefaultEditorTheme__ltr',
    mark: 'DefaultEditorTheme__mark',
    markOverlap: 'DefaultEditorTheme__markOverlap',
    paragraph: 'text-xl text-editor-p-dark dark:text-editor-p-light my-2',
    quote: 'border-l-4 border-editor-quote-border-dark dark:border-editor-quote-border-light pl-3 text-xl text-editor-quote-dark dark:text-editor-quote-light italic',
    rtl: 'DefaultEditorTheme__rtl',
    table: 'DefaultEditorTheme__table',
    tableCell: 'DefaultEditorTheme__tableCell',
    tableCellHeader: 'DefaultEditorTheme__tableCellHeader',
    text: {
        bold: 'font-bold',
        code: 'DefaultEditorTheme__textCode',
        italic: 'DefaultEditorTheme__textItalic',
        strikethrough: 'DefaultEditorTheme__textStrikethrough',
        subscript: 'DefaultEditorTheme__textSubscript',
        superscript: 'DefaultEditorTheme__textSuperscript',
        underline: 'underline',
        underlineStrikethrough: 'line-through',
    },
    placeholder:
        'relative top-[-35px] left-1 z-[-10] text-editor-p-dark dark:text-editor-p-light',
    overlay: 'w-screen h-screen absolute top-0 z-50',
    backdrop:
        'fixed top-0 w-full h-full m-0 p-0 flex items-center justify-center backdrop-brightness-50',
    dialog: {
        dialog: 'box-border bg-editor-dialog-bg-light dark:bg-editor-dialog-bg-dark flex flex-col rounded-md animate-appear border-[1px] border-neutral-700',
        contentContainer: 'mx-4',
        title: 'text-lg my-4 mx-4 font-semibold text-editor-title-dark dark:text-editor-title-light',
        actionGroup: 'flex mt-8 mb-4 justify-end px-4',
    },
    input: {
        text: 'py-2 w-full rounded-sm px-2 dark:bg-neutral-800 dark:text-editor-p-light focus:outline-editor-button-primary',
        checkbox:{
            container: 'mt-4 flex',
            label: 'text-editor-p-dark dark:text-editor-p-light',
            input: 'ml-2 hover:cursor-pointer'
        }
    },
    button: {
        base: 'flex py-2 px-4 rounded-sm font-medium mx-2 min-w-8 ease-linear duration-100',
        primary:
            'dark:text-editor-p-light dark:fill-editor-p-light border-[1px] border-editor-button-primary hover:cursor-pointer dark:hover:text-editor-title-dark hover:dark:fill-editor-title-dark hover:bg-editor-button-primary',
        secondary:
            'dark:text-editor-p-light border-[1px] border-editor-button-secondary hover:bg-editor-button-secondary hover:text-editor-p-light',
        disabled: 'dark:text-editor-p-light dark:fill-editor-p-light border-[1px] hover:cursor-not-allowed',
    },
    addNodeDialog: {
        dialog: 'rounded-md w-auto bg-editor-dialog-bg-light flex flex-col items-center dark:bg-editor-dialog-bg-dark drop-shadow-md dark:drop-shadow-[0_35px_35px_#27272a]',
        searchInput:
            'outline-none w-[95%] bg-editor-dialog-bg-light dark:bg-editor-dialog-bg-dark dark:text-editor-p-light rounded-md py-2 px-3 my-3 mx-auto',
        nodeOptions: 'overflow-y-scroll h-[290px] w-[300px]',
        nodeOption: {
            selected:
                'dark:bg-editor-item-selected-dark bg-editor-item-selected-light',
            container:
                'flex my-1 py-2 px-2 mx-2 rounded-md hover:cursor-pointer dark:hover:bg-editor-item-selected-dark hover:bg-editor-item-selected-light',
            icon: 'w-10 h-10 fill-editor-icon-dark-hover dark:fill-editor-icon-light-hover',
            text: {
                container: 'px-3',
                name: 'text-xl font-medium dark:text-editor-title-light',
                description:
                    'text-sm text-editor-p-dark dark:text-editor-p-light',
            },
        },
    },
    addImageDialog: {
        imageInput: {
            container: 'flex justify-between items-center my-4',
        },
        actionButtonGroup: 'DefaultAddImageDialog_ActionButtonGroup',
    },
    hoverMenu: {
        animation: 'animate-appear',
    },
    hoverBlockOption: {
        container: 'flex',
        button: 'bg-transparent border-none flex justify-center items-center',
        icon: 'fill-editor-icon-dark hover:fill-editor-icon-dark-hover dark:fill-editor-icon-light dark:hover:fill-editor-icon-light-hover',
    },
    dragTargetLine:
        'absolute bg-editor-drag-target-line-light dark:bg-editor-drag-target-line-dark h-1 rounded-sm',
    codeActionMenu: {
        menuLeft: 'flex-row-reverse',
        menuRight: 'MenuRight',
    },
    codeLanguageSelection: {
        container:
            'text-editor-p-dark dark:text-editor-p-light flex items-center box-border p-1 text-xs hover:cursor-pointer',
        icon: 'fill-editor-icon-dark dark:fill-editor-icon-light',
        name: 'text-editor-p-dark dark:text-editor-p-light ml-2',
        menu: {
            container:
                'flex flex-col w-[200px] items-center rounded-md bg-editor-dialog-bg-light dark:bg-editor-dialog-bg-dark border-[1px] dark:border-neutral-700 drop-shadow-md',
            search: 'w-[90%] py-1 px-1 mx-auto my-3 outline-none bg-editor-dialog-bg-light dark:bg-editor-dialog-bg-dark text-editor-p-dark dark:text-editor-p-light',
            optionContainer: 'overflow-y-scroll max-h-[250px] w-full',
            option: 'py-2 px-2 mx-2 hover:cursor-pointer hover:bg-editor-item-selected-light hover:dark:bg-editor-item-selected-dark text-editor-p-dark dark:text-editor-p-light rounded-sm',
            optionSelected:
                'bg-editor-item-selected-light dark:bg-editor-item-selected-dark',
            animation: 'animate-appear',
        },
    },
    highlightMenu: {
        menu:
            'bg-editor-bg-dark dark:bg-editor-bg-light flex' +
            ' rounded-md dark:drop-shadow-[0_1.5px_2px_#e5e7eb]' +
            ' drop-shadow-[0_1.5px_2px_#1e293b]',
        menuButton:
            'bg-transparent cursor-pointer' + ' border-none p-0 my-0.5 mx-0',
        menuButtonIcon:
            'fill-editor-icon-light dark:fill-editor-icon-dark' +
            ' dark:hover:fill-editor-editor-icon-dark-hover' +
            ' hover:fill-editor-editor-icon-light-hover my-2 mx-1',
        menuButtonIconSelected:
            'my-2 mx-1 fill-editor-icon-light-selected' +
            ' dark:fill-editor-icon-dark-selected',
        animation: 'animate-appear',
    },
    copyCodeButton:
        'py-2 px-4 text-editor-p-dark dark:text-editor-p-light text-xs hover:cursor-pointer',
    editImageButton: 'bg-editor-bg-dark fill-editor-p-light rounded-sm animate-appear',
    addLinkDialog: {
        input:
            'bg-editor-bg-dark dark:bg-editor-bg-light' +
            ' drop-shadow-[0_1.5px_2px_#9ca3af] rounded-md p-2' +
            ' text-editor-h3-light dark:text-editor-h3-dark text-sm focus:outline-none',
        animation: 'animate-appear',
    },
    openLinkDialog: {
        link:
            'bg-editor-bg-dark dark:bg-editor-bg-light' +
            ' drop-shadow-[0_1.5px_2px_#9ca3af] rounded-md p-2' +
            ' text-editor-h3-light dark:text-editor-h3-dark text-sm focus:outline-none' +
            ' max-w-44 overflow-hidden text-center animate-appear',
    },
};
