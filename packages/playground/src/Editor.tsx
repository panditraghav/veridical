import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { Veridical, VeridicalEditorPlugins } from 'veridical';
import { lexicalTheme } from './theme/lexicalTheme';
import { veridicalTheme } from './theme/veridicalTheme';
import TreeViewPlugin from './TreeViewPlugin';

function saveStateToLocalStorage(state: string) {
    localStorage.setItem('blog', state);
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

export default function Editor() {
    const editorState = localStorage.getItem('blog');
    const initialConfig = {
        namespace: 'playground',
        lexicalTheme,
        veridicalTheme,
        editorState,
    };
    return (
        <Veridical initialConfig={initialConfig}>
            <VeridicalEditorPlugins />
            <TreeViewPlugin />
            <SaveStatePlugin />
        </Veridical>
    );
}
