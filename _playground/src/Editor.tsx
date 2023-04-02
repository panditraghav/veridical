import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { Veridical, VeridicalEditorPlugins } from 'veridical';
import { lexicalTheme } from './theme/lexicalTheme';
import { veridicalTheme } from './theme/veridicalTheme';
import TreeViewPlugin from './TreeViewPlugin';
import { useEffect } from 'react';

function saveMarkdownToLocalStorage(markdown: string) {
    localStorage.setItem('blog', markdown);
}

function HTMLPlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                console.log($generateHtmlFromNodes(editor));
            });
        });
    }, [editor]);
    return null;
}

function TestPlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        // editor.setEditorState(
        //     editor.parseEditorState(localStorage.getItem('blog') || '{}'),
        // );
        return editor.registerUpdateListener(({ editorState }) => {
            saveMarkdownToLocalStorage(JSON.stringify(editorState.toJSON()));
        });
    }, []);
    return null;
}

export default function Editor() {
    const initialConfig = {
        namespace: 'playground',
        lexicalTheme,
        veridicalTheme,
        editorState: localStorage.getItem('blog'),
    };
    console.log(initialConfig);
    return (
        <Veridical initialConfig={initialConfig}>
            <VeridicalEditorPlugins />
            {<TreeViewPlugin />}
            {/*
                <ConvertFromMarkdownPlugin
                    markdown={localStorage.getItem('blog') || ''}
                />
            */}
            <TestPlugin />
        </Veridical>
    );
}
