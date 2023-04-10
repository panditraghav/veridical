import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Veridical, VeridicalEditorPlugins } from 'veridical';
import { lexicalTheme } from './theme/lexicalTheme';
import { veridicalTheme } from './theme/veridicalTheme';
import TreeViewPlugin from './TreeViewPlugin';
import { useEffect } from 'react';

function saveStateToLocalStorage(state: string) {
    localStorage.setItem('blog', state);
}

function SaveStatePlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            saveStateToLocalStorage(JSON.stringify(editorState.toJSON()));
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
        </Veridical>
    );
}
