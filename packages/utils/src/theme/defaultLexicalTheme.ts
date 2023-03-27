import { EditorThemeClasses } from 'lexical';

const tokenAttr = 'dark:text-teal-400 text-cyan-700';
const tokenProperty = 'dark:text-amber-500';
const tokenComment = 'dark:text-amber-100 text-neutral-500';
const tokenVariable = 'dark:text-amber-800';
const keyword = 'dark:text-purple-300 text-fuchsia-700';
const string = 'dark:text-lime-500 text-green-600';

export const defaultLexicalTheme: EditorThemeClasses = {
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
    characterLimit: 'DefaultEditorTheme__characterLimit',
    hashtag: 'DefaultEditorTheme__hashtag',
    heading: {
        h1: 'text-6xl text-editor-title-dark font-bold mt-8 mb-12 dark:text-editor-title-light',
        h2: 'text-5xl font-bold text-editor-h2-dark dark:text-editor-h2-light my-6',
        h3: 'text-3xl font-semibold text-editor-h3-dark dark:text-editor-h3-light my-4',
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
};
