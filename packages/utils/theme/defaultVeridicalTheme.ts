import { VeridicalThemeClasses } from '.';

export const defaultVeridicalTheme: VeridicalThemeClasses = {
    editorContainer: 'max-w-[760px] mx-16',
    contentEditable: 'focus:outline-none',
    characterLimit: 'DefaultEditorTheme__characterLimit',
    code: 'DefaultEditorTheme__code',
    codeHighlight: {
        atrule: 'DefaultEditorTheme__tokenAttr',
        attr: 'DefaultEditorTheme__tokenAttr',
        boolean: 'DefaultEditorTheme__tokenProperty',
        builtin: 'DefaultEditorTheme__tokenSelector',
        cdata: 'DefaultEditorTheme__tokenComment',
        char: 'DefaultEditorTheme__tokenSelector',
        class: 'DefaultEditorTheme__tokenFunction',
        'class-name': 'DefaultEditorTheme__tokenFunction',
        comment: 'DefaultEditorTheme__tokenComment',
        constant: 'DefaultEditorTheme__tokenProperty',
        deleted: 'DefaultEditorTheme__tokenProperty',
        doctype: 'DefaultEditorTheme__tokenComment',
        entity: 'DefaultEditorTheme__tokenOperator',
        function: 'DefaultEditorTheme__tokenFunction',
        important: 'DefaultEditorTheme__tokenVariable',
        inserted: 'DefaultEditorTheme__tokenSelector',
        keyword: 'DefaultEditorTheme__tokenAttr',
        namespace: 'DefaultEditorTheme__tokenVariable',
        number: 'DefaultEditorTheme__tokenProperty',
        operator: 'DefaultEditorTheme__tokenOperator',
        prolog: 'DefaultEditorTheme__tokenComment',
        property: 'DefaultEditorTheme__tokenProperty',
        punctuation: 'DefaultEditorTheme__tokenPunctuation',
        regex: 'DefaultEditorTheme__tokenVariable',
        selector: 'DefaultEditorTheme__tokenSelector',
        string: 'DefaultEditorTheme__tokenSelector',
        symbol: 'DefaultEditorTheme__tokenProperty',
        tag: 'DefaultEditorTheme__tokenProperty',
        url: 'DefaultEditorTheme__tokenOperator',
        variable: 'DefaultEditorTheme__tokenVariable',
    },
    hashtag: 'DefaultEditorTheme__hashtag',
    heading: {
        h1: 'text-6xl text-title-dark font-bold mt-8 mb-12 dark:text-title-light',
        h2: 'text-5xl font-bold text-h2-dark dark:text-h2-light my-6',
        h3: 'text-3xl font-semibold text-h3-dark dark:text-h3-light my-4',
    },
    image: 'w-full h-auto rounded-sm cursor-pointer',
    veridicalImage: {
        selected: 'DefaultVeridicalImageSelected',
        container: 'justify-center my-4 mx-0',
        fallback: 'bg-gray-600 animate-pulse',
    },
    link: 'text-blue-800 underline',
    list: {
        ol: 'my-2 pl-8',
        ul: 'my-2 pl-8',
        listitem: 'text-xl my-1 mx-2 text-p-dark dark:text-p-light',
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
    paragraph: 'text-xl text-p-dark dark:text-p-light my-2',
    quote: 'DefaultEditorTheme__quote',
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
        underline: 'DefaultEditorTheme__textUnderline',
        underlineStrikethrough:
            'DefaultEditorTheme__textUnderlineStrikethrough',
    },
    placeholder: 'DefaultEditorTheme__Placeholder',
    backdrop:
        'fixed top-0 w-full h-full m-0 p-0 flex items-center justify-center backdrop-brightness-50',
    dialog: {
        dialog: 'box-border bg-dialog-bg-light dark:bg-dialog-bg-dark flex flex-col rounded-md animate-appear border-[1px] border-neutral-700',
        contentContainer: 'mx-4',
        title: 'text-lg my-4 mx-4 font-semibold text-text-title-light dark:text-title-light',
        actionGroup: 'flex mt-8 mb-4 justify-end px-4',
    },
    input: {
        text: 'py-2 w-full rounded-sm px-2 dark:bg-neutral-800 dark:text-p-light focus:outline-button-primary',
    },
    button: {
        base: 'flex py-2 px-4 rounded-sm font-medium mx-2 min-w-8 ease-linear duration-100',
        primary:
            'dark:text-p-light dark:fill-p-light border-[1px] border-button-primary hover:cursor-pointer hover:dark:text-title-dark hover:dark:fill-title-dark hover:bg-button-primary',
        secondary:
            'dark:text-p-light border-[1px] border-button-secondary hover:bg-button-secondary hover:text-p-light',
        disabled: 'DefaultButton_Disabled',
    },
    addNodeDialog: {
        dialog: 'rounded-md w-auto bg-dialog-bg-light flex flex-col items-center dark:bg-dialog-bg-dark drop-shadow-md dark:drop-shadow-[0_35px_35px_#27272a]',
        searchInput:
            'outline-none w-[95%] dark:bg-dialog-bg-dark dark:text-p-light drop-shadow-sm rounded-md py-2 px-3 my-3 mx-auto',
        nodeOptions: 'overflow-y-scroll h-[290px] w-[300px]',
        nodeOption: {
            selected: 'dark:bg-item-selected-dark bg-item-selected-light',
            container:
                'flex my-1 py-2 px-2 mx-2 rounded-md hover:cursor-pointer dark:hover:bg-item-selected-dark hover:bg-item-selected-light',
            icon: 'w-10 h-10 fill-icon-dark-hover dark:fill-icon-light-hover',
            text: {
                container: 'px-3',
                name: 'text-xl font-medium dark:text-title-light',
                description: 'text-sm text-p-dark dark:text-p-light',
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
        icon: 'fill-icon-dark hover:fill-icon-dark-hover dark:fill-icon-light dark:hover:fill-icon-light-hover',
    },
    imageResizer: {
        container: 'DefaultImageResizerContainer',
        paddle: 'DefaultImageResizerPaddle',
    },
    codeActionMenu: {
        menuLeft: 'DefaultCodeActionMenuLeft',
        menuRight: 'DefaultCodeActionMenuRight',
    },
    codeLanguageSelection: {
        container: 'DefaultCodeLanguageSelectionContainer',
        icon: 'DefaultCodeLanguageSelectionIcon',
        name: 'DefaultCodeLanguageSelectionName',
        menu: {
            container: 'DefaultCodeLanguageSelectionMenuContainer',
            search: 'DefaultCodeLanguageSelectionMenuSearch',
            optionContainer: 'DefaultCodeLanguageSelectionMenuOptionContainer',
            option: 'DefaultCodeLanguageSelectionMenuOption',
            optionSelected: 'DefaultCodeLanguageSelectionMenuOptionSelected',
            animation: 'DefaultVeridicalDialogAnimation',
        },
    },
    copyCodeButton: 'DefaultCopyCodeButton',
    highlightMenu: {
        menu:
            'bg-bg-dark dark:bg-bg-light flex' +
            ' rounded-md dark:drop-shadow-[0_1.5px_2px_#e5e7eb]' +
            ' drop-shadow-[0_1.5px_2px_#1e293b]',
        menuButton:
            'bg-transparent cursor-pointer' + ' border-none p-0 my-0.5 mx-0',
        menuButtonIcon:
            'fill-icon-light dark:fill-icon-dark' +
            ' dark:hover:fill-icon-dark-hover' +
            ' hover:fill-icon-light-hover my-2 mx-1',
        menuButtonIconSelected:
            'my-2 mx-1 fill-icon-light-selected' +
            ' dark:fill-icon-light-selected',
        animation: 'animate-appear',
    },
    addLinkDialog: {
        input:
            'bg-bg-dark dark:bg-bg-light' +
            ' drop-shadow-[0_1.5px_2px_#9ca3af] rounded-md p-2' +
            ' text-h3-light dark:text-h3-dark text-sm focus:outline-none',
        animation: 'animate-appear',
    },
    openLinkDialog: {
        link:
            'bg-bg-dark dark:bg-bg-light' +
            ' drop-shadow-[0_1.5px_2px_#9ca3af] rounded-md p-2' +
            ' text-h3-light dark:text-h3-dark text-sm focus:outline-none' +
            ' max-w-44 overflow-hidden text-center animate-appear',
    },
};
