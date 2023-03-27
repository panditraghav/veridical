import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { Veridical, VeridicalEditorPlugins } from 'veridical';
import {
    ConvertToMarkdownPlugin,
    ConvertFromMarkdownPlugin,
} from '@veridical/plugins';
import TreeViewPlugin from './TreeViewPlugin';
import { useEffect } from 'react';

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
        <Veridical>
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
            <HTMLPlugin />
        </Veridical>
    );
}
