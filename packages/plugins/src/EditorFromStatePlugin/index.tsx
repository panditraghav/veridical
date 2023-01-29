import React, { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function EditorFromStatePlugin({
    stringifiedEditorState,
}: {
    stringifiedEditorState: string;
}) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return () => {
            const editorState = editor.parseEditorState(stringifiedEditorState);
            editor.setEditorState(editorState);
        };
    }, []);
    return null;
}
