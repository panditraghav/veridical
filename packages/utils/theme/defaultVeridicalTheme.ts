import { VeridicalThemeClasses } from '.';

export const defaultVeridicalTheme: VeridicalThemeClasses = {
    editorContainer: 'md:max-w-[760px] md:mx-16 w-full px-4',
    contentEditable: 'focus:outline-none',
    characterLimit: 'DefaultEditorTheme__characterLimit',
    code: 'bg-gray-100 dark:bg-neutral-800 block w-full px-8 py-4 rounded-md box-border text-gray-800 dark:text-gray-100 drop-shadow-md',
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
        keyword: 'text-fuchsia-700',
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
        h1: 'text-6xl text-editor-title-dark font-bold mt-8 mb-12 dark:text-editor-title-light',
        h2: 'text-5xl font-bold text-editor-h2-dark dark:text-editor-h2-light my-6',
        h3: 'text-3xl font-semibold text-editor-h3-dark dark:text-editor-h3-light my-4',
    },
    image: 'w-full h-auto rounded-sm cursor-pointer',
    veridicalImage: {
        selected: 'DefaultVeridicalImageSelected',
        container: 'justify-center my-4 mx-0',
        fallback: 'bg-gray-600 animate-pulse',
    },
    link: 'text-blue-600',
    list: {
        ol: 'my-2 pl-8',
        ul: 'my-2 pl-8',
        listitem: 'text-xl my-1 mx-2 text-editor-p-dark dark:text-editor-p-light',
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
        dialog: 'box-border bg-editor-dialog-bg-light dark:bg-editor-dialog-bg-dark flex flex-col rounded-md animate-appear border-[1px] border-neutral-700',
        contentContainer: 'mx-4',
        title: 'text-lg my-4 mx-4 font-semibold text-text-editor-title-light dark:text-title-light',
        actionGroup: 'flex mt-8 mb-4 justify-end px-4',
    },
    input: {
        text: 'py-2 w-full rounded-sm px-2 dark:bg-neutral-800 dark:text-editor-p-light focus:outline-button-primary',
    },
    button: {
        base: 'flex py-2 px-4 rounded-sm font-medium mx-2 min-w-8 ease-linear duration-100',
        primary:
            'dark:text-editor-p-light dark:fill-p-light border-[1px] border-button-primary hover:cursor-pointer hover:dark:text-editor-title-dark hover:dark:fill-title-dark hover:bg-button-primary',
        secondary:
            'dark:text-editor-p-light border-[1px] border-button-secondary hover:bg-button-secondary hover:text-p-light',
        disabled: 'DefaultButton_Disabled',
    },
    addNodeDialog: {
        dialog: 'rounded-md w-auto bg-editor-dialog-bg-light flex flex-col items-center dark:bg-editor-dialog-bg-dark drop-shadow-md dark:drop-shadow-[0_35px_35px_#27272a]',
        searchInput:
            'outline-none w-[95%] dark:bg-editor-dialog-bg-dark dark:text-editor-p-light drop-shadow-sm rounded-md py-2 px-3 my-3 mx-auto',
        nodeOptions: 'overflow-y-scroll h-[290px] w-[300px]',
        nodeOption: {
            selected: 'dark:bg-item-selected-dark bg-item-selected-light',
            container:
                'flex my-1 py-2 px-2 mx-2 rounded-md hover:cursor-pointer dark:hover:bg-item-selected-dark hover:bg-item-selected-light',
            icon: 'w-10 h-10 fill-editor-editor-icon-dark-hover dark:fill-editor-editor-icon-light-hover',
            text: {
                container: 'px-3',
                name: 'text-xl font-medium dark:text-editor-title-light',
                description: 'text-sm text-editor-p-dark dark:text-editor-p-light',
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
            'my-2 mx-1 fill-editor-editor-icon-light-selected' +
            ' dark:fill-editor-editor-icon-light-selected',
        animation: 'animate-appear',
    },
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
