import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { Veridical, VeridicalEditorPlugins } from 'veridical';
import { lexicalTheme } from './theme/lexicalTheme';
import { veridicalTheme } from './theme/veridicalTheme';
import TreeViewPlugin from './TreeViewPlugin';

function saveStateToLocalStorage(state: string) {
    localStorage.setItem('blog', state);
}

function saveHTMLToLocalStorage(html: string) {
    console.log(html);
    localStorage.setItem('html', html);
}

function SaveStatePlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            saveStateToLocalStorage(JSON.stringify(editorState.toJSON()));
        });
    }, [editor]);
    return null;
}

function HTMLPlugin({
    onChangeHTML,
}: {
    onChangeHTML: (html: string) => void;
}) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                onChangeHTML($generateHtmlFromNodes(editor));
            });
        });
    }, [editor]);
    return null;
}

export default function Editor() {
    const initialConfig = {
        namespace: 'playground',
        lexicalTheme,
        veridicalTheme,
        editorState: localStorage.getItem('blog'),
    };
    return (
        <Veridical initialConfig={initialConfig}>
            <VeridicalEditorPlugins />
            {<TreeViewPlugin />}
            {/*
                <ConvertFromMarkdownPlugin
                    markdown={localStorage.getItem('blog') || ''}
                />
            */}
            <SaveStatePlugin />
            <HTMLPlugin onChangeHTML={saveHTMLToLocalStorage} />
        </Veridical>
    );
}
