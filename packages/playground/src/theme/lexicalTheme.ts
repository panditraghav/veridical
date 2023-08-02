import { EditorThemeClasses } from 'lexical';

const tokenAttr = 'dark:text-teal-400 text-cyan-700';
const tokenProperty = 'dark:text-amber-500';
const tokenComment = 'dark:text-amber-100 text-neutral-500';
const tokenVariable = 'dark:text-amber-800';
const keyword = 'dark:text-purple-300 text-fuchsia-700';
const string = 'dark:text-lime-500 text-green-600';

export const lexicalTheme: EditorThemeClasses = {
    code: 'bg-muted rounded-md box-border text-foreground drop-shadow-md block overflow-x-auto w-full md:px-8 md:py-6 px-6 py-4 my-2 whitespace-pre scrollbar scrollbar-thin dark:scrollbar-track-neutral-700 dark:scrollbar-thumb-neutral-600 scrollbar-track-gray-200 scrollbar-thumb-gray-400',
    image: 'w-full h-[420px] rounded-sm',
    imageContainer: 'flex flex-row justify-center my-4 mx-0',
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
        h1: 'md:text-6xl md:mt-8 md:mb-12 text-4xl mt-6 mb-8 font-bold text-foreground',
        h2: 'font-bold md:text-5xl md:my-6 text-3xl my-4 text-foreground/90',
        h3: 'font-semibold md:text-3xl md:my-4 text-xl my-2 text-foreground/95',
    },
    link: 'text-blue-600',
    list: {
        ol: 'my-2 pl-8',
        ul: 'my-2 pl-8',
        listitem:
            'my-1 mx-2 text-lg text-editor-p-dark dark:text-editor-p-light',
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
    paragraph: 'md:my-3 md:leading-7 text-lg my-2 text-foreground/95',
    quote: 'border-l-4 border-editor-quote-border-dark dark:border-editor-quote-border-light pl-3 text-xl text-editor-quote-dark dark:text-editor-quote-light italic',
    rtl: 'DefaultEditorTheme__rtl',
    table: 'DefaultEditorTheme__table',
    tableCell: 'DefaultEditorTheme__tableCell',
    tableCellHeader: 'DefaultEditorTheme__tableCellHeader',
    text: {
        bold: 'font-bold',
        code: 'bg-muted text-foreground/90 px-[0.25rem] py-[0.125rem] text-[95%]',
        italic: 'italic',
        strikethrough: 'line-through',
        subscript: 'DefaultEditorTheme__textSubscript',
        superscript: 'DefaultEditorTheme__textSuperscript',
        underline: 'underline',
        underlineStrikethrough: 'underline line-through',
    },
};
