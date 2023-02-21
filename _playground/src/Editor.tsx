import { Veridical, VeridicalEditorPlugins } from 'veridical';
import {
    ConvertToMarkdownPlugin,
    ConvertFromMarkdownPlugin,
} from '@veridical/plugins';
import {
    $getFirstImageNode,
    $getTitleNode,
    defaultVeridicalTheme,
} from '@veridical/utils';
import TreeViewPlugin from './TreeViewPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

function Plugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                console.log('TitleNode: ',$getTitleNode()?.getTextContent());
                console.log('ImageNode: ',$getFirstImageNode());
            });
        });
    }, []);
    return null;
}
export default function Editor() {
    function saveMarkdownToLocalStorage(markdown: string) {
        localStorage.setItem('blog', markdown);
    }
    return (
        <Veridical initialConfig={{ theme: defaultVeridicalTheme }}>
            <VeridicalEditorPlugins />
            {<TreeViewPlugin />}
            {
                <ConvertToMarkdownPlugin
                    onChangeMarkdown={(markdown) => {
                        saveMarkdownToLocalStorage(markdown);
                    }}
                />
            }
            {
                <ConvertFromMarkdownPlugin
                    markdown={localStorage.getItem('blog') || ''}
                />
            }
            <Plugin />
        </Veridical>
    );
}
