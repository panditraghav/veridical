import { SerializedEditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export default function EditorStatePlugin({
    onChange,
}: {
    onChange: ({ editorState }: { editorState: SerializedEditorState }) => void;
}) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.registerUpdateListener(({ editorState }) => {
            onChange({ editorState: editorState.toJSON() });
        });
    }, [editor, onChange]);
    return null;
}
